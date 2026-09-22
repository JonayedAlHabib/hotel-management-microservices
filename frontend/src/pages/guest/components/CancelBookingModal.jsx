import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { formatMoney } from "../../../utils/money";
import { previewCancellationFee, FREE_CANCELLATION_HOURS_BEFORE_CHECKIN } from "../../../utils/cancellation";

// UC-G11 — shows the cancellation fee (if any) before the guest confirms,
// instead of a blind window.confirm(). The fee shown here is a client-side
// preview (utils/cancellation.js); the authoritative value is computed and
// stored server-side in cancelReservation() at the moment of cancellation.
export default function CancelBookingModal({ reservation, open, onCancel, onConfirm, submitting }) {
  const [reason, setReason] = useState("");

  if (!open) return null;

  const fee = previewCancellationFee(reservation);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest-950/60 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 space-y-4">
        <div className="flex items-start gap-3">
          <span className="h-10 w-10 shrink-0 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
            <AlertTriangle size={18} />
          </span>
          <div>
            <h2 className="font-serif text-lg font-semibold text-forest-900">Cancel this booking?</h2>
            <p className="text-sm text-forest-900/50 mt-1">{reservation.roomType?.name}</p>
          </div>
        </div>

        {fee > 0 ? (
          <div className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5 space-y-1">
            <p>
              Check-in is within {FREE_CANCELLATION_HOURS_BEFORE_CHECKIN} hours, so a cancellation fee applies:
            </p>
            <p className="font-semibold">{formatMoney(fee)}</p>
          </div>
        ) : (
          <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2.5">
            Free cancellation — no fee applies.
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-forest-900/60 mb-1">Reason (optional)</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={2}
            className="w-full border border-forest-900/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
          />
        </div>

        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="flex-1 border border-forest-900/15 text-forest-900 rounded-full py-2 text-sm font-medium hover:bg-forest-50 disabled:opacity-50"
          >
            Keep Booking
          </button>
          <button
            type="button"
            onClick={() => onConfirm(reason)}
            disabled={submitting}
            className="flex-1 bg-red-600 text-white rounded-full py-2 text-sm font-medium hover:bg-red-700 disabled:opacity-50"
          >
            {submitting ? "Cancelling…" : "Yes, Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}
