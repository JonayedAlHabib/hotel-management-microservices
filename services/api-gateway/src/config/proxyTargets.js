const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || "http://localhost:4001";
const BOOKING_SERVICE_URL = process.env.BOOKING_SERVICE_URL || "http://localhost:4002";
const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL || "http://localhost:4003";
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || "http://localhost:4004";

const ROUTES = [
  { prefix: "/auth", target: AUTH_SERVICE_URL },
  { prefix: "/room-types", target: BOOKING_SERVICE_URL },
  { prefix: "/rooms", target: BOOKING_SERVICE_URL },
  { prefix: "/availability", target: BOOKING_SERVICE_URL },
  { prefix: "/bookings", target: BOOKING_SERVICE_URL },
  { prefix: "/hotel-config", target: BOOKING_SERVICE_URL },
  { prefix: "/uploads", target: BOOKING_SERVICE_URL }, // room-type photos, served static by booking-service
  { prefix: "/payments", target: PAYMENT_SERVICE_URL },
  { prefix: "/notifications", target: NOTIFICATION_SERVICE_URL },
];

// Exact match ("/hotel-config") or a real sub-path ("/bookings/123/cancel")
// — startsWith(prefix) alone would wrongly also match "/roomsxyz".
function resolveTarget(path) {
  const match = ROUTES.find((r) => path === r.prefix || path.startsWith(`${r.prefix}/`));
  return match?.target;
}

export { resolveTarget, ROUTES };
