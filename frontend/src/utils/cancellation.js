// Mirrors services/booking-service/src/config/constants.js's
// FREE_CANCELLATION_HOURS_BEFORE_CHECKIN / CANCELLATION_FEE_NIGHTS — same
// pattern already used elsewhere in this codebase (e.g. RoomUnitsPage.jsx
// mirroring ROOM_STATUS_TRANSITIONS) to preview a server-computed value
// client-side, without a network round trip just to show a number the
// guest already has all the inputs for (checkIn, rateSnapshot).
const FREE_CANCELLATION_HOURS_BEFORE_CHECKIN = 48;
const CANCELLATION_FEE_NIGHTS = 1;

// Preview only — the authoritative fee is computed and stored server-side in
// cancelReservation() at the moment of cancellation. This can drift by a few
// seconds/minutes from what the server actually charges (time keeps moving
// between when the guest opens the dialog and when they confirm), but never
// in a way that surprises them: both sides use the same 48h cutoff rule.
function previewCancellationFee(reservation) {
  const checkIn = new Date(reservation.checkIn);
  const hoursUntilCheckIn = (checkIn.getTime() - Date.now()) / (60 * 60 * 1000);
  if (hoursUntilCheckIn >= FREE_CANCELLATION_HOURS_BEFORE_CHECKIN) return 0;
  return reservation.rateSnapshot * CANCELLATION_FEE_NIGHTS;
}

export { previewCancellationFee, FREE_CANCELLATION_HOURS_BEFORE_CHECKIN };
