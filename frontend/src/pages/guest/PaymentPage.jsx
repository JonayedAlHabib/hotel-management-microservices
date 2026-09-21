import { useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import bookingApi from "../../api/bookingClient";
import { formatMoney } from "../../utils/money";

const PAYMENT_METHODS = [
  { key: "CARD", label: "Cards", icon: "💳" },
  { key: "WALLET", label: "Wallet", icon: "👛" },
  { key: "NET_BANKING", label: "Net Banking", icon: "🏦" },
];

const WE_ACCEPT = ["VISA", "Mastercard", "Apple Pay", "bKash", "Nagad", "Google Pay"];

// Card details below are never sent anywhere — there is no payment gateway
// wired up yet (booking-service has no payment-service to talk to). This
// screen exists to match the design and collect them for a real integration
// later; "Confirm Booking" only ever submits the actual reservation fields.
export default function PaymentPage() {
  const { roomTypeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const [method, setMethod] = useState("CARD");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "", billingAddress: "" });
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleCardChange(e) {
    setCard({ ...card, [e.target.name]: e.target.value });
  }

  if (!state) {
    return (
      <div className="px-6 py-10 max-w-md space-y-3">
        <p className="text-sm text-navy-500">Start a booking first to reach payment.</p>
        <Link to={`/rooms/${roomTypeId}`} className="text-sm text-bronze-600 font-medium">
          Back to room
        </Link>
      </div>
    );
  }

  const { checkIn, checkOut, guestCount, form, idempotencyKey, roomType, nights, estimatedSubtotal } = state;

  async function handleConfirm(e) {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);
    try {
      const res = await bookingApi.post(
        "/bookings",
        { roomTypeId, checkIn, checkOut, guestCount, ...form },
        { headers: { "Idempotency-Key": idempotencyKey } }
      );
      const reservation = res.data.data.reservation;
      navigate("/my-bookings", { state: { justBooked: reservation.reference } });
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Something went wrong while booking");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="px-6 py-6 max-w-5xl">
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-navy-900">Payment Method</h1>
        <p className="text-sm text-navy-400 mt-1">Complete your payment method to confirm your booking</p>
      </div>

      <form onSubmit={handleConfirm} className="grid gap-6 lg:grid-cols-[1fr_280px] items-start">
        <div className="bg-white rounded-2xl border border-navy-100 p-6 space-y-5">
          {submitError && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {submitError}
            </div>
          )}

          <div>
            <h2 className="text-sm font-semibold text-navy-900 mb-3">1. Select Payment Method</h2>
            <div className="grid grid-cols-3 gap-3">
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setMethod(m.key)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border py-3 text-sm font-medium transition-colors ${
                    method === m.key
                      ? "border-bronze-500 bg-bronze-50 text-navy-900"
                      : "border-navy-100 text-navy-500 hover:border-navy-200"
                  }`}
                >
                  <span className="text-lg">{m.icon}</span>
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {method === "CARD" && (
            <div>
              <h2 className="text-sm font-semibold text-navy-900 mb-3">2. Card Details</h2>
              <div className="space-y-4">
                <Field label="Card Number" name="number" placeholder="1234 5678 9812 3456" value={card.number} onChange={handleCardChange} />
                <Field label="Cardholder Name" name="name" placeholder="Name on card" value={card.name} onChange={handleCardChange} />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Expiry Date" name="expiry" placeholder="MM / YY" value={card.expiry} onChange={handleCardChange} />
                  <Field label="CVV" name="cvv" placeholder="123" value={card.cvv} onChange={handleCardChange} />
                </div>
                <Field
                  label="Billing Address"
                  name="billingAddress"
                  placeholder="Enter billing address"
                  value={card.billingAddress}
                  onChange={handleCardChange}
                />
              </div>
            </div>
          )}

          {method !== "CARD" && (
            <p className="text-sm text-navy-400">
              {method === "WALLET" ? "Wallet" : "Net banking"} checkout isn't wired up yet — pick Cards to continue,
              or just confirm below.
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-navy-800 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-navy-900 disabled:opacity-50"
          >
            {submitting ? "Booking…" : `Confirm Booking · ${formatMoney(estimatedSubtotal)}`}
          </button>
          <p className="text-xs text-navy-400 text-center">
            This holds the room for 30 minutes while your booking is finalized.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-navy-100 p-5 space-y-3">
            <p className="text-sm font-semibold text-navy-900">We Accept</p>
            <div className="flex flex-wrap gap-2">
              {WE_ACCEPT.map((w) => (
                <span key={w} className="text-xs font-medium text-navy-600 bg-navy-50 rounded-lg px-2.5 py-1.5">
                  {w}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-navy-100 p-5 space-y-3 text-sm">
            <SecurityRow icon="🔒" title="100% Secure" body="Your payment details are safe with us" />
            <SecurityRow icon="🛡️" title="Encrypted Payment" body="We strongly encrypt data to protect you" />
            <SecurityRow icon="🎧" title="24/7 Support" body="Our team is here to help anytime" />
          </div>

          <div className="bg-white rounded-2xl border border-navy-100 p-5 space-y-2 text-sm">
            <p className="font-medium text-navy-900">{roomType.name}</p>
            <p className="text-xs text-navy-400">
              {checkIn} → {checkOut} · {nights} night(s) · {guestCount} guest(s)
            </p>
            <div className="flex justify-between font-semibold text-navy-900 border-t border-navy-100 pt-2">
              <span>Total</span>
              <span>{formatMoney(estimatedSubtotal)}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function Field({ label, name, placeholder, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-navy-700 mb-1">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-navy-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bronze-400/30 focus:border-bronze-400"
      />
    </div>
  );
}

function SecurityRow({ icon, title, body }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-base">{icon}</span>
      <div>
        <p className="font-medium text-navy-800">{title}</p>
        <p className="text-xs text-navy-400">{body}</p>
      </div>
    </div>
  );
}
