import { useEffect, useState } from "react";
import { Download, Receipt } from "lucide-react";
import paymentApi from "../../../api/paymentClient";
import { formatMoney, formatMajorMoney } from "../../../utils/money";

const GATEWAY_LABELS = { SSLCOMMERZ: "SSLCommerz", BKASH: "bKash" };
const TYPE_LABELS = { FULL: "Full Payment", DEPOSIT: "Deposit", BALANCE: "Balance" };
const STATUS_STYLES = {
  SUCCESS: "bg-green-50 text-green-700 border-green-200",
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  INITIATED: "bg-forest-50 text-forest-700 border-forest-200",
  FAILED: "bg-red-50 text-red-700 border-red-200",
  CANCELLED: "bg-forest-50 text-forest-900/50 border-forest-900/10",
  REFUNDED: "bg-forest-50 text-forest-900/50 border-forest-900/10",
};

// UC-G14 — lazy-loaded per booking (not fetched eagerly for every card on
// page load): payment history, invoice download, and — since it already has
// to fetch the guest's payments for this reservation — the "Pay Remaining
// Balance" follow-up action (UC-G13) once a deposit has succeeded, and the
// "Refund pending" figure (UC-G11 AC3) once the booking is cancelled.
export default function PaymentsPanel({ reservation }) {
  const [payments, setPayments] = useState(null);
  const [error, setError] = useState("");
  const [payingBalance, setPayingBalance] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await paymentApi.get("/payments/mine", { params: { reservationId: reservation.id } });
        if (!cancelled) setPayments(res.data.data.payments);
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || "Could not load payment history");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [reservation.id]);

  async function handlePayBalance() {
    setPayingBalance(true);
    setError("");
    try {
      const balanceRes = await paymentApi.post(`/payments/reservation/${reservation.id}/balance`);
      const balancePayment = balanceRes.data.data.payment;
      const initiateRes = await paymentApi.post(`/payments/${balancePayment.id}/initiate`, { gateway: "SSLCOMMERZ" });
      const gatewayPageURL = initiateRes.data.data.gatewayPageURL;
      if (!gatewayPageURL) throw new Error("Payment gateway did not return a checkout page");
      window.location.href = gatewayPageURL;
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Could not start balance payment");
      setPayingBalance(false);
    }
  }

  async function handleDownloadInvoice() {
    setDownloading(true);
    setError("");
    try {
      const res = await paymentApi.post(
        `/payments/reservation/${reservation.id}/invoice`,
        {
          reference: reservation.reference,
          roomTypeName: reservation.roomType?.name,
          checkIn: reservation.checkIn,
          checkOut: reservation.checkOut,
          nights: Math.round((new Date(reservation.checkOut) - new Date(reservation.checkIn)) / 86400000),
          guestCount: reservation.guestCount,
        },
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${reservation.reference}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.response?.data?.message || "Could not generate invoice");
    } finally {
      setDownloading(false);
    }
  }

  if (error) {
    return <p className="text-sm text-red-600 px-1 py-2">{error}</p>;
  }
  if (payments === null) {
    return <p className="text-sm text-forest-900/50 px-1 py-2">Loading payments…</p>;
  }

  const successfulTotal = payments.filter((p) => p.status === "SUCCESS").reduce((sum, p) => sum + Number(p.amount), 0);
  const successfulDeposit = payments.find((p) => p.type === "DEPOSIT" && p.status === "SUCCESS");
  const balancePayment = payments.find((p) => p.type === "BALANCE");
  const canPayBalance = successfulDeposit && !balancePayment;

  const isCancelled = reservation.status === "CANCELLED";
  const fee = reservation.cancellationFeeAmount;
  const refundDue = isCancelled && fee !== null && fee !== undefined ? Math.max(successfulTotal - fee / 100, 0) : null;

  return (
    <div className="space-y-3 px-1 py-2">
      {isCancelled && fee !== null && fee !== undefined && (
        <div className="text-sm bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 space-y-0.5">
          <p className="text-amber-800">
            Cancellation fee: <span className="font-semibold">{formatMoney(fee)}</span>
          </p>
          <p className="text-amber-800">
            Refund pending: <span className="font-semibold">{formatMajorMoney(refundDue)}</span>
          </p>
        </div>
      )}

      {payments.length === 0 ? (
        <p className="text-sm text-forest-900/50">No payments yet.</p>
      ) : (
        <div className="space-y-2">
          {payments.map((p) => (
            <div key={p.id} className="flex items-center justify-between text-sm border border-forest-900/10 rounded-lg px-3 py-2">
              <div>
                <p className="font-medium text-forest-900">{TYPE_LABELS[p.type] || p.type}</p>
                <p className="text-xs text-forest-900/50">
                  {GATEWAY_LABELS[p.gateway] || p.gateway || "—"} · {new Date(p.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-forest-900">{formatMajorMoney(p.amount)}</p>
                <span className={`text-xs font-medium border rounded-full px-2 py-0.5 ${STATUS_STYLES[p.status] || ""}`}>
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 pt-1">
        {canPayBalance && (
          <button
            type="button"
            onClick={handlePayBalance}
            disabled={payingBalance}
            className="text-xs font-medium bg-forest-900 text-white rounded-full px-3 py-1.5 hover:bg-forest-800 disabled:opacity-50"
          >
            {payingBalance ? "Starting…" : "Pay Remaining Balance"}
          </button>
        )}
        {payments.length > 0 && (
          <button
            type="button"
            onClick={handleDownloadInvoice}
            disabled={downloading}
            className="flex items-center gap-1.5 text-xs font-medium border border-forest-900/15 text-forest-900 rounded-full px-3 py-1.5 hover:bg-forest-50 disabled:opacity-50"
          >
            {downloading ? <Receipt size={13} /> : <Download size={13} />}
            {downloading ? "Preparing…" : "Download Invoice"}
          </button>
        )}
      </div>
    </div>
  );
}
