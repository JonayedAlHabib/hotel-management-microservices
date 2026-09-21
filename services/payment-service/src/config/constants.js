// PaymentStatus transitions — mirrors booking-service's RESERVATION_TRANSITIONS pattern
// (config/constants.js there) so status changes are validated against one source of
// truth instead of scattered checks. (new) is represented as null.
export const PAYMENT_TRANSITIONS = {
  null: ["INITIATED"],
  INITIATED: ["PENDING", "FAILED", "CANCELLED"],
  PENDING: ["SUCCESS", "FAILED", "CANCELLED"],
  SUCCESS: ["REFUNDED"],
  // Retry is allowed, not terminal — a failed card or an abandoned checkout
  // reuses the SAME Payment row (reservationId is unique, one row per
  // reservation), re-entering PENDING the next time the guest hits initiate.
  FAILED: ["PENDING"],
  CANCELLED: ["PENDING"],
  REFUNDED: [],
};
