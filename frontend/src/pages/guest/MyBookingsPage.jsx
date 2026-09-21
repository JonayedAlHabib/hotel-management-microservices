import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import bookingApi from "../../api/bookingClient";
import { formatMoney } from "../../utils/money";

const STATUS_STYLES = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  CONFIRMED: "bg-green-50 text-green-700 border-green-200",
  CANCELLED: "bg-navy-50 text-navy-400 border-navy-100",
  EXPIRED: "bg-navy-50 text-navy-400 border-navy-100",
  NO_SHOW: "bg-red-50 text-red-700 border-red-200",
};

const TABS = [
  { key: "ALL", label: "All Bookings" },
  { key: "COMPLETED", label: "Completed" },
  { key: "CANCELLED", label: "Cancelled" },
  { key: "UPCOMING", label: "Upcoming" },
];

function dateOnly(iso) {
  return iso.slice(0, 10);
}

function isUpcoming(r) {
  return ["PENDING", "CONFIRMED"].includes(r.status) && new Date(r.checkIn) >= new Date();
}

function isCompleted(r) {
  return r.status === "CONFIRMED" && new Date(r.checkOut) < new Date();
}

function matchesTab(r, tab) {
  if (tab === "ALL") return true;
  if (tab === "CANCELLED") return ["CANCELLED", "EXPIRED", "NO_SHOW"].includes(r.status);
  if (tab === "UPCOMING") return isUpcoming(r);
  if (tab === "COMPLETED") return isCompleted(r);
  return true;
}

export default function MyBookingsPage() {
  const location = useLocation();
  const justBooked = location.state?.justBooked;

  const [reservations, setReservations] = useState(null);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);
  const [tab, setTab] = useState("ALL");

  async function fetchReservations() {
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

  async function handleCancel(id) {
    if (!window.confirm("Cancel this booking?")) return;
    setCancellingId(id);
    try {
      await bookingApi.patch(`/bookings/${id}/cancel`, {});
      setReservations(await fetchReservations());
    } catch (err) {
      setError(err.response?.data?.message || "Could not cancel this booking");
    } finally {
      setCancellingId(null);
    }
  }

  const canCancel = (r) => ["PENDING", "CONFIRMED"].includes(r.status) && new Date() < new Date(r.checkIn);

  const visible = reservations?.filter((r) => matchesTab(r, tab));
  const upcoming = tab === "ALL" ? visible?.filter(isUpcoming) : null;
  const history = tab === "ALL" ? visible?.filter((r) => !isUpcoming(r)) : visible;

  return (
    <div className="w-full px-6 py-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-navy-900">My Booking</h1>
        <p className="text-sm text-navy-400 mt-1">Manage and track all your hotel reservations</p>
      </div>

      <div className="flex gap-2 bg-white border border-navy-100 rounded-full p-1 w-fit">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              tab === t.key ? "bg-navy-800 text-white" : "text-navy-500 hover:text-navy-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {justBooked && (
        <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          Booking {justBooked} created — it holds your room for 30 minutes.
        </div>
      )}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>
      )}

      {reservations === null && !error && <p className="text-sm text-navy-400">Loading…</p>}
      {visible?.length === 0 && <p className="text-sm text-navy-400">No bookings here yet.</p>}

      {upcoming && upcoming.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-navy-900">Upcoming Stays</h2>
          {upcoming.map((r) => (
            <UpcomingCard key={r.id} r={r} canCancel={canCancel(r)} cancelling={cancellingId === r.id} onCancel={handleCancel} />
          ))}
        </div>
      )}

      {history && history.length > 0 && (
        <div className="space-y-3">
          {tab === "ALL" && <h2 className="text-sm font-semibold text-navy-900">Booking History</h2>}
          {history.map((r) => (
            <HistoryRow key={r.id} r={r} canCancel={canCancel(r)} cancelling={cancellingId === r.id} onCancel={handleCancel} />
          ))}
        </div>
      )}
    </div>
  );
}

function UpcomingCard({ r, canCancel, cancelling, onCancel }) {
  return (
    <div className="bg-white rounded-2xl border border-navy-100 p-5 flex items-start justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 rounded-xl bg-navy-50 flex items-center justify-center text-2xl shrink-0">🏨</div>
        <div>
          <p className="font-semibold text-navy-900">{r.roomType.name}</p>
          <p className="text-sm text-navy-400">
            {r.reference} · {dateOnly(r.checkIn)} → {dateOnly(r.checkOut)} · {r.guestCount} guest(s)
          </p>
          <p className="text-sm text-navy-600 mt-1">{formatMoney(r.totalAmount)}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 shrink-0">
        <span className={`text-xs font-medium border rounded-full px-2.5 py-1 whitespace-nowrap ${STATUS_STYLES[r.status] || ""}`}>
          {r.status}
        </span>
        {canCancel && (
          <button
            onClick={() => onCancel(r.id)}
            disabled={cancelling}
            className="text-xs font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
          >
            {cancelling ? "Cancelling…" : "Cancel Booking"}
          </button>
        )}
      </div>
    </div>
  );
}

function HistoryRow({ r, canCancel, cancelling, onCancel }) {
  return (
    <div className="bg-white rounded-2xl border border-navy-100 p-4 flex items-center justify-between gap-4">
      <div>
        <p className="font-medium text-navy-900 text-sm">{r.roomType.name}</p>
        <p className="text-xs text-navy-400">
          {r.reference} · {dateOnly(r.checkIn)} → {dateOnly(r.checkOut)}
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className={`text-xs font-medium border rounded-full px-2.5 py-1 whitespace-nowrap ${STATUS_STYLES[r.status] || ""}`}>
          {r.status}
        </span>
        {canCancel && (
          <button
            onClick={() => onCancel(r.id)}
            disabled={cancelling}
            className="text-xs font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
          >
            {cancelling ? "…" : "Cancel"}
          </button>
        )}
      </div>
    </div>
  );
}
