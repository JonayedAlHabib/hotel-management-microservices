import { useState } from "react";
import { CreditCard } from "lucide-react";
import paymentApi from "../../../api/paymentClient";
import { formatMajorMoney } from "../../../utils/money";

// UC-G13 — pay (or retry paying) an EXISTING reservation from My Bookings,
// as opposed to PaymentPage.jsx's flow, which pays for a booking it just
// created in the same click and has router state (roomType/nights/etc.) to
// show. This modal has none of that — only the reservation itself — so it
// fetches the FULL payment row fresh and offers Full vs Deposit, same
// choice PaymentPage.jsx offers on the new-booking path.
export default function PayNowModal({ reservation, open, onClose }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  async function handlePay(option) {
    setError("");
    setLoading(true);
    try {
      const fullRes = await paymentApi.get(`/payments/reservation/${reservation.id}`);
      const fullPayment = fullRes.data.data.payment;
      if (!fullPayment) throw new Error("Payment could not be started for this booking — please try again shortly.");

      let paymentToInitiate = fullPayment;
      if (option === "DEPOSIT") {
        const depositRes = await paymentApi.post(`/payments/reservation/${reservation.id}/deposit`);
        paymentToInitiate = depositRes.data.data.payment;
      }

      const initiateRes = await paymentApi.post(`/payments/${paymentToInitiate.id}/initiate`, {
        gateway: "SSLCOMMERZ",
      });
      const gatewayPageURL = initiateRes.data.data.gatewayPageURL;
      if (!gatewayPageURL) throw new Error("Payment gateway did not return a checkout page");

      window.location.href = gatewayPageURL;
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Could not start payment");
      setLoading(false);
    }
  }

  const totalAmount = reservation.totalAmount / 100;
  const depositAmount = totalAmount * 0.3;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest-950/60 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 space-y-4">
        <div className="flex items-start gap-3">
          <span className="h-10 w-10 shrink-0 rounded-full bg-forest-50 flex items-center justify-center text-forest-800">
            <CreditCard size={18} />
          </span>
          <div>
            <h2 className="font-serif text-lg font-semibold text-forest-900">Pay for this booking</h2>
            <p className="text-sm text-forest-900/50 mt-1">{reservation.roomType?.name}</p>
          </div>
        </div>

        {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}

        <div className="space-y-2">
          <button
            type="button"
            disabled={loading}
            onClick={() => handlePay("FULL")}
            className="w-full text-left border border-forest-900/15 rounded-xl p-3 hover:border-sand-gold disabled:opacity-50"
          >
            <p className="text-sm font-semibold text-forest-900">Pay Full Amount</p>
            <p className="text-xs text-forest-900/50">{formatMajorMoney(totalAmount)}</p>
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => handlePay("DEPOSIT")}
            className="w-full text-left border border-forest-900/15 rounded-xl p-3 hover:border-sand-gold disabled:opacity-50"
          >
            <p className="text-sm font-semibold text-forest-900">Pay 30% Deposit</p>
            <p className="text-xs text-forest-900/50">
              {formatMajorMoney(depositAmount)} now — remaining balance due later
            </p>
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="w-full text-center text-sm font-medium text-forest-900/60 hover:text-forest-900 border border-forest-900/15 rounded-lg py-2 disabled:opacity-50"
        >
          {loading ? "Redirecting to payment…" : "Cancel"}
        </button>
      </div>
    </div>
  );
}
