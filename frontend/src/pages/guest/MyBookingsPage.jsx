import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, BedDouble, Users, CalendarDays, CreditCard, Receipt, ChevronDown, ChevronUp } from "lucide-react";
import bookingApi from "../../api/bookingClient";
import { formatMoney } from "../../utils/money";
import BookingFilters from "./components/BookingFilters";
import CancelBookingModal from "./components/CancelBookingModal";
import PayNowModal from "./components/PayNowModal";
import PaymentsPanel from "./components/PaymentsPanel";

const BOOKING_API_URL = import.meta.env.VITE_BOOKING_API_URL || "http://localhost:4002";

const PAYMENT_BANNER_STYLES = {
  success: "text-green-700 bg-green-50 border-green-200",
  failed: "text-red-600 bg-red-50 border-red-200",
  cancelled: "text-amber-700 bg-amber-50 border-amber-200",
};

const PAYMENT_BANNER_TEXT = {
  success: "Payment successful — your booking is confirmed.",
  failed: "Payment failed. You can retry from the booking below.",
  cancelled: "Payment was cancelled. You can retry from the booking below.",
};

// The 5-value backend enum (PENDING/CONFIRMED/CANCELLED/EXPIRED/NO_SHOW)
// collapsed into the 3 display buckets this page's cards show, per the
// design spec — PENDING/CONFIRMED-not-yet-checked-out reads as "Upcoming"
// (matches the payment-gating change: a PENDING reservation is one still
// waiting on payment, not yet a confirmed stay, but it's still something the
// guest is waiting on, not something that's over).
const STATUS_BUCKET_STYLES = {
  UPCOMING: "bg-forest-50 text-forest-800 border-forest-200",
  COMPLETED: "bg-sand-100 text-forest-900/70 border-forest-900/10",
  CANCELLED: "bg-red-50 text-red-700 border-red-200",
};

function dateOnly(iso) {
  return iso.slice(0, 10);
}

function isUpcoming(r) {
  return ["PENDING", "CONFIRMED"].includes(r.status) && new Date(r.checkIn) >= new Date();
}

function isCompleted(r) {
  return r.status === "CONFIRMED" && new Date(r.checkOut) < new Date();
}

function statusBucket(r) {
  if (isUpcoming(r)) return "UPCOMING";
  if (isCompleted(r)) return "COMPLETED";
  return "CANCELLED"; // CANCELLED, EXPIRED, NO_SHOW, or a PENDING hold that's simply expired
}

const DEFAULT_FILTERS = { status: "ALL", checkInFrom: "", checkInTo: "", roomTypeName: "" };

export default function MyBookingsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const justBooked = location.state?.justBooked;

  const [reservations, setReservations] = useState(null);
  const [roomTypePhotos, setRoomTypePhotos] = useState({}); // roomTypeId -> photo url
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);
  const [cancelTarget, setCancelTarget] = useState(null); // reservation being confirmed for cancel
  const [payTarget, setPayTarget] = useState(null); // reservation being paid via PayNowModal
  const [expandedPayments, setExpandedPayments] = useState(null); // reservation id with PaymentsPanel open
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [search, setSearch] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Captured once from the URL on mount, then the query string is cleared —
  // this keeps the banner visible across that cleanup instead of it
  // disappearing the instant the ?payment= param is stripped.
  const [paymentOutcome] = useState(() => new URLSearchParams(location.search).get("payment"));

  useEffect(() => {
    if (!paymentOutcome) return;

    // payment-service's own browser-redirect targets are hardcoded to
    // `/my-bookings?payment=...` server-side (out of scope to change here —
    // see PaymentPage.jsx) — a "success" outcome is handed off to the
    // dedicated PaymentSuccessPage via a client-side navigate rather than
    // shown as just another inline banner on this list. failed/cancelled
    // stay here as banners, since the guest still needs this list to retry.
    if (paymentOutcome === "success") {
      const reservationId = new URLSearchParams(location.search).get("reservationId");
      navigate(`/payment-success?reservationId=${reservationId || ""}`, { replace: true });
      return;
    }

    navigate(location.pathname, { replace: true, state: location.state });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchReservations() {
    // No status/date/roomType params sent here — GET /bookings already
    // scopes a non-admin caller to `guest.userId === req.user.id` server-side
    // (booking-service's reservation.controller.js), so a GUEST token can
    // only ever get their own reservations back regardless of what's asked
    // for. Filtering below is purely a client-side view over that same,
    // already-owner-scoped list — never a second, wider fetch.
    const res = await bookingApi.get("/bookings");
    return res.data.data.reservations;
  }

  useEffect(() => {
    async function load() {
      try {
        setReservations(await fetchReservations());
      } catch (err) {
        setError(err.response?.data?.message || "Could not load your bookings");
      }
    }
    load();
  }, []);

  // GET /room-types is public and already used on the homepage — reused here
  // only to look up each room type's first photo (GET /bookings doesn't
  // include photos in its roomType include), never for booking data itself.
  useEffect(() => {
    async function loadPhotos() {
      try {
        const res = await bookingApi.get("/room-types");
        const map = {};
        res.data.data.roomTypes.forEach((rt) => {
          if (rt.photos?.[0]) map[rt.id] = rt.photos[0].url;
        });
        setRoomTypePhotos(map);
      } catch {
        // Photos are decorative — a failure here shouldn't block the booking list itself.
      }
    }
    loadPhotos();
  }, []);

  async function handleConfirmCancel(reason) {
    const id = cancelTarget.id;
    setCancellingId(id);
    try {
      await bookingApi.patch(`/bookings/${id}/cancel`, reason ? { reason } : {});
      setReservations(await fetchReservations());
      setCancelTarget(null);
      // Cancellation fee/refund-due for this one booking is shown via its own
      // PaymentsPanel (UC-G11 AC3) — open it automatically so the guest sees
      // the outcome without an extra click.
      setExpandedPayments(id);
    } catch (err) {
      setError(err.response?.data?.message || "Could not cancel this booking");
    } finally {
      setCancellingId(null);
    }
  }

  const canCancel = (r) => ["PENDING", "CONFIRMED"].includes(r.status) && new Date() < new Date(r.checkIn);
  // UC-G13 — the only window a fresh/retry payment is meaningful: still
  // PENDING and the 30-minute hold hasn't expired yet (past that, the sweep
  // job flips it to EXPIRED and it's genuinely no longer payable).
  const canPay = (r) => r.status === "PENDING" && r.holdExpiresAt && new Date() < new Date(r.holdExpiresAt);

  const roomTypeOptions = useMemo(() => {
    if (!reservations) return [];
    return [...new Set(reservations.map((r) => r.roomType.name))].sort();
  }, [reservations]);

  const visible = useMemo(() => {
    if (!reservations) return null;
    const term = search.trim().toLowerCase();
    return reservations.filter((r) => {
      if (filters.status !== "ALL" && statusBucket(r) !== filters.status) return false;
      if (filters.roomTypeName && r.roomType.name !== filters.roomTypeName) return false;
      if (filters.checkInFrom && dateOnly(r.checkIn) < filters.checkInFrom) return false;
      if (filters.checkInTo && dateOnly(r.checkIn) > filters.checkInTo) return false;
      if (term && !`${r.reference} ${r.roomType.name}`.toLowerCase().includes(term)) return false;
      return true;
    });
  }, [reservations, filters, search]);

  const filtersActive =
    filters.status !== "ALL" || filters.checkInFrom || filters.checkInTo || filters.roomTypeName;

  return (
    <div className="w-full bg-sand-cream min-h-full">
      <div className="flex">
        <aside className="hidden lg:block w-72 shrink-0 border-r border-forest-900/10 bg-white px-5 py-6">
          <BookingFilters filters={filters} onChange={setFilters} roomTypeOptions={roomTypeOptions} />
        </aside>

        <div className="flex-1 min-w-0 px-4 sm:px-6 py-6 space-y-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="font-serif text-2xl font-semibold text-forest-900">My Bookings</h1>
              <p className="text-sm text-forest-900/50 mt-1">Manage and track all your hotel reservations</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-900/40" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by reference or room..."
                  className="pl-9 pr-3 py-2 border border-forest-900/15 rounded-lg text-sm w-56 focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
                />
              </div>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden relative flex items-center gap-1.5 border border-forest-900/15 rounded-lg px-3 py-2 text-sm font-medium text-forest-900"
              >
                <SlidersHorizontal size={15} />
                Filters
                {filtersActive && <span className="h-1.5 w-1.5 rounded-full bg-sand-gold absolute -top-0.5 -right-0.5" />}
              </button>
            </div>
          </div>

          {justBooked && (
            <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
              Booking {justBooked} created — it holds your room for 30 minutes.
            </div>
          )}
          {paymentOutcome && (
            <div
              className={`text-sm border rounded-lg px-3 py-2 ${PAYMENT_BANNER_STYLES[paymentOutcome] || "text-forest-900/70 bg-forest-50 border-forest-100"}`}
            >
              {PAYMENT_BANNER_TEXT[paymentOutcome] || "Payment status updated."}
            </div>
          )}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>
          )}

          {reservations === null && !error && <p className="text-sm text-forest-900/50">Loading…</p>}

          {visible && (
            <p className="text-xs text-forest-900/40">
              Showing {visible.length} of {reservations.length} booking{reservations.length === 1 ? "" : "s"}
            </p>
          )}

          {visible?.length === 0 && (
            <p className="text-sm text-forest-900/50 bg-white border border-forest-900/10 rounded-xl px-4 py-8 text-center">
              No bookings match these filters.
            </p>
          )}

          <div className="space-y-3">
            {visible?.map((r) => (
              <BookingCard
                key={r.id}
                r={r}
                photoUrl={roomTypePhotos[r.roomTypeId]}
                canCancel={canCancel(r)}
                canPay={canPay(r)}
                cancelling={cancellingId === r.id}
                onCancel={() => setCancelTarget(r)}
                onPay={() => setPayTarget(r)}
                paymentsOpen={expandedPayments === r.id}
                onTogglePayments={() => setExpandedPayments(expandedPayments === r.id ? null : r.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {cancelTarget && (
        <CancelBookingModal
          reservation={cancelTarget}
          open={Boolean(cancelTarget)}
          submitting={cancellingId === cancelTarget.id}
          onCancel={() => setCancelTarget(null)}
          onConfirm={handleConfirmCancel}
        />
      )}

      {payTarget && (
        <PayNowModal reservation={payTarget} open={Boolean(payTarget)} onClose={() => setPayTarget(null)} />
      )}

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-forest-950/50" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-xs bg-white p-5 overflow-y-auto">
            <BookingFilters
              filters={filters}
              onChange={setFilters}
              roomTypeOptions={roomTypeOptions}
              onClose={() => setMobileFiltersOpen(false)}
            />
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full mt-5 bg-forest-900 text-white rounded-full py-2.5 text-sm font-medium"
            >
              Show Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function BookingCard({ r, photoUrl, canCancel, canPay, cancelling, onCancel, onPay, paymentsOpen, onTogglePayments }) {
  const bucket = statusBucket(r);
  const bucketLabel = bucket.charAt(0) + bucket.slice(1).toLowerCase();

  return (
    <div className="bg-white rounded-2xl border border-forest-900/10 p-4 space-y-3">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="h-40 sm:h-24 sm:w-32 shrink-0 rounded-xl overflow-hidden bg-forest-50">
          {photoUrl ? (
            <img src={`${BOOKING_API_URL}${photoUrl}`} alt={r.roomType.name} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-forest-200">
              <BedDouble size={26} />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-semibold text-forest-900">{r.roomType.name}</p>
              <span
                className={`text-xs font-medium border rounded-full px-2.5 py-0.5 whitespace-nowrap ${STATUS_BUCKET_STYLES[bucket]}`}
              >
                {bucketLabel}
              </span>
            </div>
            <p className="text-xs text-forest-900/50 mt-1">{r.reference}</p>
            <div className="flex items-center gap-3 text-xs text-forest-900/50 mt-1.5 flex-wrap">
              <span className="flex items-center gap-1">
                <CalendarDays size={13} />
                {dateOnly(r.checkIn)} → {dateOnly(r.checkOut)}
              </span>
              <span className="flex items-center gap-1">
                <Users size={13} />
                {r.guestCount} guest{r.guestCount > 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
            <p className="font-semibold text-forest-900 text-sm">{formatMoney(r.totalAmount)}</p>
            <div className="flex items-center gap-3">
              {canPay && (
                <button
                  onClick={onPay}
                  className="flex items-center gap-1 text-xs font-medium bg-forest-900 text-white rounded-full px-3 py-1.5 hover:bg-forest-800"
                >
                  <CreditCard size={13} />
                  Pay Now
                </button>
              )}
              {canCancel && (
                <button
                  onClick={onCancel}
                  disabled={cancelling}
                  className="text-xs font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
                >
                  {cancelling ? "Cancelling…" : "Cancel Booking"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onTogglePayments}
        className="flex items-center gap-1.5 text-xs font-medium text-forest-900/60 hover:text-forest-900"
      >
        <Receipt size={13} />
        Payments & Invoice
        {paymentsOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
      </button>

      {paymentsOpen && (
        <div className="border-t border-forest-900/10 pt-3">
          <PaymentsPanel reservation={r} />
        </div>
      )}
    </div>
  );
}
