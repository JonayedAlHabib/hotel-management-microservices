import { useState } from "react";

// UC-A11.2 AC1: a reason is mandatory for an admin cancellation — Confirm
// stays disabled until something is typed.
export default function CancelReasonModal({ open, onCancel, onConfirm, submitting }) {
  const [reason, setReason] = useState("");

  if (!open) return null;

  function handleClose() {
    setReason("");
    onCancel();
  }

  function handleConfirm() {
    const trimmed = reason.trim();
    if (!trimmed) return;
    onConfirm(trimmed);
    setReason("");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/60 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-navy-900">Cancel this booking?</h2>
          <p className="text-sm text-navy-500 mt-1">A reason is required for admin cancellations.</p>
        </div>

        <div>
          <label className="block text-xs font-medium text-navy-500 mb-1">Reason for cancellation</label>
          <textarea
            autoFocus
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Guest requested cancellation by phone"
            className="w-full border border-navy-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bronze-400/30 focus:border-bronze-400"
          />
        </div>

        <div className="flex gap-3 pt-1">
          <button
            onClick={handleClose}
            disabled={submitting}
            className="flex-1 border border-navy-100 text-navy-700 rounded-lg py-2 text-sm font-medium hover:bg-navy-50 disabled:opacity-50"
          >
            Keep Booking
          </button>
          <button
            onClick={handleConfirm}
            disabled={submitting || !reason.trim()}
            className="flex-1 bg-red-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-red-700 disabled:opacity-50"
          >
            {submitting ? "Cancelling…" : "Cancel Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}
