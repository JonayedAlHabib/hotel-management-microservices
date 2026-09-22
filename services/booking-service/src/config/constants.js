// MVP-fixed business values. The PRD calls tax rate "configurable" too, but
// that one now lives in the HotelConfig table (see reservation.service.js) —
// HOLD_DURATION_MINUTES stays here since nothing asked to move it.
export const HOLD_DURATION_MINUTES = 30; // BR: "default 30 minutes"
export const MAX_STAY_NIGHTS = 30;
export const MIN_STAY_NIGHTS = 1;
export const MAX_PENDING_PER_GUEST = 3; // US-G09.2 AC5 — "at most 3 unpaid PENDING bookings at the same time"
export const NO_SHOW_CUTOFF_HOUR = 23; // UC-A12: "no-show cut-off time (default 23:00)", hotel local time
export const PAGE_SIZE = 20; // UC-A08.1: "Results are paginated (20 per page)"

// UC-G11 / PRD assumption A-04: free cancellation until 48h before check-in;
// after that, a fee of the first CANCELLATION_FEE_NIGHTS night(s) applies.
export const FREE_CANCELLATION_HOURS_BEFORE_CHECKIN = 48;
export const CANCELLATION_FEE_NIGHTS = 1;

// UC-A10.1 AC1 / US-A10.2 AC2: modify and room-assignment are both only
// allowed while a reservation is in one of these statuses.
export const EDITABLE_RESERVATION_STATUSES = ["PENDING", "CONFIRMED"];

// BR-01: rooms in these statuses never count toward available inventory,
// regardless of the isActive flag.
export const ROOM_STATUSES_EXCLUDED_FROM_AVAILABILITY = ["MAINTENANCE", "OUT_OF_SERVICE"];

// Reservation statuses that hold inventory for BR-01's overlap check.
// PENDING only counts while its hold hasn't expired yet — see availability.service.js.
export const RESERVATION_STATUSES_HOLDING_INVENTORY = ["PENDING", "CONFIRMED"];

// Appendix B.1 — Reservation status transitions. (new) is represented as null.
export const RESERVATION_TRANSITIONS = {
  null: ["PENDING"],
  PENDING: ["CONFIRMED", "EXPIRED", "CANCELLED"],
  CONFIRMED: ["CANCELLED", "CHECKED_IN", "NO_SHOW"], // CHECKED_IN lands when check-in itself is built
  EXPIRED: [],
  CANCELLED: [],
  NO_SHOW: [],
};

// Appendix B.2 — Room status transitions.
export const ROOM_STATUS_TRANSITIONS = {
  AVAILABLE: ["RESERVED", "OCCUPIED", "MAINTENANCE", "OUT_OF_SERVICE"],
  RESERVED: ["OCCUPIED", "AVAILABLE", "MAINTENANCE"],
  OCCUPIED: ["DIRTY"],
  DIRTY: ["CLEANING", "MAINTENANCE"],
  CLEANING: ["AVAILABLE", "MAINTENANCE"],
  MAINTENANCE: ["DIRTY", "OUT_OF_SERVICE"],
  OUT_OF_SERVICE: ["DIRTY"],
};
