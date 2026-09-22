import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { CheckCircle2, LayoutDashboard } from "lucide-react";
import bookingApi from "../../api/bookingClient";
import paymentApi from "../../api/paymentClient";
import { formatMoney, formatMajorMoney } from "../../utils/money";

const GATEWAY_LABELS = { SSLCOMMERZ: "SSLCommerz", BKASH: "bKash" };

function formatDateTime(iso) {
  return new Date(iso).toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Reached by a client-side redirect from MyBookingsPage, not directly from
// payment-service — the gateway's own browser-redirect targets
// (`/my-bookings?payment=success&reservationId=...`) are hardcoded
// server-side and out of scope to change (see PaymentPage.jsx's earlier
// notes). MyBookingsPage detects a `payment=success` outcome and forwards
// here with the same reservationId, which is all this page needs to fetch
// the real reservation + payment records and show them.
export default function PaymentSuccessPage() {
  const location = useLocation();
  const reservationId = new URLSearchParams(location.search).get("reservationId");

  const [reservation, setReservation] = useState(null);
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!reservationId) return;
    async function load() {
      try {
        const [reservationRes, paymentRes] = await Promise.all([
          bookingApi.get(`/bookings/${reservationId}`),
          paymentApi.get(`/payments/reservation/${reservationId}`),
        ]);
        setReservation(reservationRes.data.data.reservation);
        setPayment(paymentRes.data.data.payment);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load your booking confirmation");
      }
    }
    load();
  }, [reservationId]);

  if (!reservationId) {
    return (
      <div className="px-6 py-10 max-w-md space-y-3">
        <p className="text-sm text-forest-900/60">No booking to show a confirmation for.</p>
        <Link to="/my-bookings" className="text-sm text-forest-700 font-medium">
          Go to My Bookings
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-full bg-sand-cream flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-forest-900/10 overflow-hidden">
        <div className="px-6 pt-8 pb-6 text-center border-b border-dashed border-forest-900/15">
          <div className="mx-auto h-14 w-14 rounded-full bg-forest-50 flex items-center justify-center text-forest-700 mb-4">
            <CheckCircle2 size={30} />
          </div>
          <h1 className="font-serif text-xl font-semibold text-forest-900">Payment Successful</h1>
          <p className="text-sm text-forest-900/50 mt-1">Your booking is confirmed</p>
        </div>

        {error && <p className="text-sm text-red-600 px-6 py-4">{error}</p>}

        {!error && (!reservation || !payment) && (
          <p className="text-sm text-forest-900/50 px-6 py-8 text-center">Loading confirmation…</p>
        )}

        {reservation && payment && (
          <div className="px-6 py-5 space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-forest-900/40 mb-2">Payment Details</p>
              <dl className="space-y-2 text-sm">
                <Row label="Reference" value={reservation.reference} />
                <Row label="Paid On" value={formatDateTime(payment.updatedAt)} />
                <Row label="Payment Method" value={GATEWAY_LABELS[payment.gateway] || payment.gateway || "—"} />
                <Row
                  label="Payment Status"
                  value={
                    <span className="bg-green-50 text-green-700 border border-green-200 text-xs font-medium rounded-full px-2.5 py-0.5">
                      {payment.status}
                    </span>
                  }
                />
                <Row label="Amount" value={formatMajorMoney(payment.amount)} />
              </dl>
            </div>

            <div className="border-t border-dashed border-forest-900/15 pt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-forest-900/40 mb-2">Booking Details</p>
              <dl className="space-y-2 text-sm">
                <Row label="Room Type" value={reservation.roomType.name} />
                <Row
                  label="Dates"
                  value={`${reservation.checkIn.slice(0, 10)} → ${reservation.checkOut.slice(0, 10)}`}
                />
                <Row label="Guests" value={String(reservation.guestCount)} />
                <Row label="Total Amount" value={formatMoney(reservation.totalAmount)} />
              </dl>
            </div>

            <Link
              to="/my-bookings"
              className="flex items-center justify-center gap-2 w-full bg-forest-900 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-forest-800 transition-colors"
            >
              <LayoutDashboard size={16} />
              Go to Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-forest-900/50">{label}</dt>
      <dd className="text-forest-900 font-medium text-right">{value}</dd>
    </div>
  );
}
