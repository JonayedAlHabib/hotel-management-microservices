import { useState } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { CreditCard, Wallet, ShieldCheck, Lock, Headset, ArrowLeft, ArrowRight } from "lucide-react";
import bookingApi from "../../api/bookingClient";
import paymentApi from "../../api/paymentClient";
import { formatMoney } from "../../utils/money";

// Only SSLCOMMERZ is wired up in payment-service right now (see
// initiateCheckout in payment.service.js) — PayPal is shown disabled rather
// than removed, so the UI doesn't lie about what's actually payable. No card
// number/CVV/expiry fields are collected here at all: SSLCommerz's own
// hosted checkout page takes those directly, so raw card data never passes
// through this app's client code, satisfying the hard limit on not
// handling/storing/logging it here.
const PAYMENT_METHODS = [
  {
    key: "SSLCOMMERZ",
    label: "Card / Mobile Banking",
    icon: CreditCard,
    body: "Pay securely via SSLCommerz — cards, bKash, Nagad, Rocket and more.",
    enabled: true,
  },
  {
    key: "PAYPAL",
    label: "PayPal",
    icon: Wallet,
    body: "Coming soon.",
    enabled: false,
  },
];

// Poll for the Payment row payment-service's "booking.created" consumer
// creates asynchronously after POST /bookings returns — it isn't there yet
// on the same tick the reservation is created.
const POLL_ATTEMPTS = 10;
const POLL_INTERVAL_MS = 500;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForPayment(reservationId) {
  for (let attempt = 0; attempt < POLL_ATTEMPTS; attempt++) {
    const res = await paymentApi.get(`/payments/reservation/${reservationId}`);
    const payment = res.data.data.payment;
    if (payment) return payment;
    await sleep(POLL_INTERVAL_MS);
  }
  throw new Error("Payment could not be started for this booking — please try again from My Bookings.");
}

export default function PaymentPage() {
  const { roomTypeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  const [method, setMethod] = useState(null);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState("idle"); // idle | booking | starting-payment | redirecting

  if (!state) {
    return (
      <div className="px-6 py-10 max-w-md space-y-3">
        <p className="text-sm text-forest-900/60">Start a booking first to reach payment.</p>
        <Link to={`/rooms/${roomTypeId}`} className="text-sm text-forest-700 font-medium">
          Back to room
        </Link>
      </div>
    );
  }

  const { checkIn, checkOut, guestCount, form, idempotencyKey, roomType, nights, estimatedSubtotal } = state;

  async function handleConfirm(e) {
    e.preventDefault();
    if (!method) return;

    setSubmitError("");
    setSubmitting(true);
    try {
      setStep("booking");
      const bookingRes = await bookingApi.post(
        "/bookings",
        { roomTypeId, checkIn, checkOut, guestCount, ...form },
        { headers: { "Idempotency-Key": idempotencyKey } }
      );
      const reservation = bookingRes.data.data.reservation;

      setStep("starting-payment");
      const payment = await waitForPayment(reservation.id);

      const initiateRes = await paymentApi.post(`/payments/${payment.id}/initiate`, { gateway: method });
      const gatewayPageURL = initiateRes.data.data.gatewayPageURL;
      if (!gatewayPageURL) {
        throw new Error("Payment gateway did not return a checkout page");
      }

      setStep("redirecting");
      window.location.href = gatewayPageURL;
    } catch (err) {
      setSubmitError(err.response?.data?.message || err.message || "Something went wrong while booking");
      setStep("idle");
    } finally {
      setSubmitting(false);
    }
  }

  const checkoutLabel = {
    idle: "Checkout",
    booking: "Creating booking…",
    "starting-payment": "Starting payment…",
    redirecting: "Redirecting to payment…",
  }[step];

  return (
    <div className="w-full bg-sand-cream min-h-full">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <StepIndicator />

        <form onSubmit={handleConfirm} className="grid gap-6 lg:grid-cols-[1fr_320px] items-start">
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-forest-900/10 p-6 space-y-4">
              <h1 className="font-serif text-xl font-semibold text-forest-900">Choose your payment method</h1>

              {submitError && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {submitError}
                </div>
              )}

              <div className="space-y-3">
                {PAYMENT_METHODS.map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    disabled={!m.enabled}
                    onClick={() => setMethod(m.key)}
                    className={`w-full text-left flex items-start gap-3 rounded-xl border p-4 transition-colors ${
                      method === m.key ? "border-sand-gold bg-forest-50" : "border-forest-900/10 hover:border-forest-900/20"
                    } ${!m.enabled ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <span
                      className={`mt-0.5 h-4 w-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                        method === m.key ? "border-sand-gold" : "border-forest-900/25"
                      }`}
                    >
                      {method === m.key && <span className="h-2 w-2 rounded-full bg-sand-gold" />}
                    </span>
                    <m.icon size={20} className="text-forest-800 shrink-0 mt-0.5" />
                    <span>
                      <span className="block text-sm font-semibold text-forest-900">
                        {m.label}
                        {!m.enabled && <span className="ml-2 text-xs font-normal text-forest-900/40">Coming soon</span>}
                      </span>
                      <span className="block text-xs text-forest-900/50 mt-0.5">{m.body}</span>
                    </span>
                  </button>
                ))}
              </div>

              {!method && <p className="text-xs text-forest-900/50">Select a payment method to continue.</p>}
            </div>

            <div className="bg-white rounded-2xl border border-forest-900/10 p-5 grid sm:grid-cols-3 gap-4 text-sm">
              <SecurityRow icon={Lock} title="100% Secure" body="Your payment details stay with our gateway partner" />
              <SecurityRow icon={ShieldCheck} title="Encrypted" body="Every transaction is protected end-to-end" />
              <SecurityRow icon={Headset} title="24/7 Support" body="We're here if anything goes wrong" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-forest-900/10 p-5 space-y-4">
            <h2 className="font-serif text-lg font-semibold text-forest-900">Summary</h2>
            <div className="text-sm text-forest-900/70 space-y-2">
              <div className="flex justify-between">
                <span>Room</span>
                <span className="font-medium text-forest-900 text-right">{roomType.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Dates</span>
                <span className="font-medium text-forest-900 text-right">
                  {checkIn} → {checkOut}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Nights</span>
                <span className="font-medium text-forest-900">{nights}</span>
              </div>
              <div className="flex justify-between">
                <span>Guests</span>
                <span className="font-medium text-forest-900">{guestCount}</span>
              </div>
            </div>

            <div className="border-t border-forest-900/10 pt-3 flex justify-between font-semibold text-forest-900">
              <span>Total</span>
              <span>{formatMoney(estimatedSubtotal)}</span>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="submit"
                disabled={!method || submitting}
                className="w-full flex items-center justify-center gap-2 bg-forest-900 text-white rounded-full py-2.5 text-sm font-medium hover:bg-forest-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {checkoutLabel}
                {step === "idle" && <ArrowRight size={16} />}
              </button>
              <button
                type="button"
                onClick={() => navigate(`/rooms/${roomTypeId}`)}
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 border border-forest-900/15 text-forest-900 rounded-full py-2.5 text-sm font-medium hover:bg-forest-50 disabled:opacity-50"
              >
                <ArrowLeft size={16} />
                Go Back
              </button>
            </div>

            <p className="text-xs text-forest-900/40 text-center">
              This holds your room for 30 minutes while payment is completed.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

function StepIndicator() {
  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="flex items-center gap-2 text-forest-900/40">
        <span className="h-6 w-6 rounded-full border-2 border-forest-900/25 flex items-center justify-center text-xs">✓</span>
        Room & Booking
      </div>
      <div className="flex-1 h-px bg-forest-900/10" />
      <div className="flex items-center gap-2 font-semibold text-forest-900">
        <span className="h-6 w-6 rounded-full bg-forest-900 text-white flex items-center justify-center text-xs">2</span>
        Payment
      </div>
    </div>
  );
}

function SecurityRow({ icon: Icon, title, body }) {
  return (
    <div className="flex items-start gap-2">
      <Icon size={18} className="text-forest-700 shrink-0 mt-0.5" />
      <div>
        <p className="font-medium text-forest-900">{title}</p>
        <p className="text-xs text-forest-900/50">{body}</p>
      </div>
    </div>
  );
}
