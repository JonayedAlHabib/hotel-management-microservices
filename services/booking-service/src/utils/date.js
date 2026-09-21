import { ApiError } from "./apiError.js";

// "Today" for date-only comparisons must use the hotel's own timezone (BR-13:
// Asia/Dhaka), not the server's local time or plain UTC — a server running in
// a different timezone would otherwise reject/accept dates a day off from what
// the hotel actually considers "today".
const HOTEL_TIMEZONE = "Asia/Dhaka";

// en-CA formats as YYYY-MM-DD, matching how dateOnly-style fields are parsed
// elsewhere in this service (new Date("YYYY-MM-DD") = that date at UTC midnight).
function todayInHotelTimezone() {
  const todayStr = new Intl.DateTimeFormat("en-CA", { timeZone: HOTEL_TIMEZONE }).format(new Date());
  return new Date(todayStr);
}

// 0-23, the current hour of day in the hotel's timezone — used by the UC-A12
// no-show cut-off check ("has 23:00 hotel time passed on the check-in date").
function currentHourInHotelTimezone() {
  const hourStr = new Intl.DateTimeFormat("en-US", { timeZone: HOTEL_TIMEZONE, hour: "numeric", hourCycle: "h23" }).format(
    new Date()
  );
  return Number(hourStr);
}

// Shared by availability.controller.js (required query params) and
// reservation.controller.js (optional date-range filters, via `optional: true`
// — returns undefined instead of throwing when the value is simply absent).
// Must be plain "YYYY-MM-DD" — new Date() parses that exact form as UTC
// midnight, matching Postgres's @db.Date column; a full datetime string would
// drift by the caller's timezone offset and silently shift which night it lands on.
function parseDateParam(value, field, { optional = false } = {}) {
  if (!value) {
    if (optional) return undefined;
    throw new ApiError(400, `${field} must be a date in YYYY-MM-DD format`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new ApiError(400, `${field} must be a date in YYYY-MM-DD format`);
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new ApiError(400, `${field} is not a valid date`);
  }
  return date;
}

export { todayInHotelTimezone, currentHourInHotelTimezone, parseDateParam, HOTEL_TIMEZONE };
