import { z } from "zod";
import { ApiError } from "../utils/apiError.js";
import { MAX_STAY_NIGHTS, MIN_STAY_NIGHTS, ROOM_STATUS_TRANSITIONS } from "../config/constants.js";
import { todayInHotelTimezone } from "../utils/date.js";

function runSchema(schema) {
  return function (req, res, next) {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      throw new ApiError(400, "Validation failed", errors);
    }
    req.body = result.data;
    next();
  };
}

const roomTypeSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim().optional(),
  basePrice: z.number().int().positive("basePrice must be a positive integer (minor units)"),
  maxGuests: z.number().int().positive(),
  bedType: z.string().trim().optional(),
  amenities: z.record(z.string(), z.any()).optional(),
});

const roomSchema = z.object({
  roomTypeId: z.string().uuid("roomTypeId must be a valid room type id"),
  roomNumber: z.string().trim().min(1, "roomNumber is required"),
  floor: z.number().int().optional(),
});

const roomStatusSchema = z.object({
  status: z.enum(Object.keys(ROOM_STATUS_TRANSITIONS)),
  note: z.string().trim().max(500).optional(), // UC-A07 AC3: optional note stored with the change
});

// Must be plain "YYYY-MM-DD" — new Date() parses that exact form as UTC
// midnight, matching Postgres's @db.Date column. A full datetime string would
// drift by the caller's timezone offset and silently shift which night it
// lands on (same reasoning as availability.controller.js's parseDateParam).
const dateOnly = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "must be a date in YYYY-MM-DD format")
  .transform((value) => new Date(value))
  .refine((date) => !Number.isNaN(date.getTime()), "is not a valid date");

const reservationSchema = z
  .object({
    roomTypeId: z.string().uuid("roomTypeId must be a valid room type id"),
    checkIn: dateOnly,
    checkOut: dateOnly,
    guestCount: z.number().int().min(1, "guestCount must be at least 1"),
    guestName: z.string().trim().min(1, "guestName is required"),
    guestPhone: z.string().trim().optional(),
    guestEmail: z.string().trim().email().optional(),
    specialRequest: z.string().trim().max(500, "specialRequest must be 500 characters or fewer").optional(),
    // admin-only fields — ignored by the controller for GUEST callers
    source: z.enum(["ONLINE", "WALK_IN", "PHONE"]).optional(),
    confirmImmediately: z.boolean().optional(),
  })
  .refine((data) => data.checkIn >= todayInHotelTimezone(), {
    message: "checkIn cannot be in the past",
    path: ["checkIn"],
  })
  .refine((data) => data.checkOut > data.checkIn, {
    message: "checkOut must be after checkIn",
    path: ["checkOut"],
  })
  .refine(
    (data) => {
      const nights = Math.round((data.checkOut - data.checkIn) / 86400000);
      return nights >= MIN_STAY_NIGHTS && nights <= MAX_STAY_NIGHTS;
    },
    { message: `Stay must be between ${MIN_STAY_NIGHTS} and ${MAX_STAY_NIGHTS} nights`, path: ["checkOut"] }
  );

// Reason is validated for shape only (a non-empty string, if present) here —
// whether it's actually REQUIRED depends on who's cancelling (guest: optional
// per UC-G11, admin: mandatory per UC-A11), which needs req.user.role, not
// available at this layer. That check lives in reservation.service.js instead.
const cancelReservationSchema = z.object({
  reason: z.string().trim().min(1, "reason cannot be empty").optional(),
});

// Every field optional (a partial update), but at least one must be present —
// what "effectively changed" and full date/capacity re-validation happens in
// reservation.service.js, where the EXISTING row's values are available to
// merge against (this layer can't know them).
const modifyReservationSchema = z
  .object({
    roomTypeId: z.string().uuid("roomTypeId must be a valid room type id").optional(),
    checkIn: dateOnly.optional(),
    checkOut: dateOnly.optional(),
    guestCount: z.number().int().min(1, "guestCount must be at least 1").optional(),
    specialRequest: z.string().trim().max(500, "specialRequest must be 500 characters or fewer").optional(),
  })
  .refine((data) => Object.keys(data).length > 0, { message: "At least one field must be provided to modify" });

const assignRoomSchema = z.object({
  roomId: z.string().uuid("roomId must be a valid room id"),
});

const confirmReservationSchema = z.object({
  note: z.string().trim().max(500).optional(),
});

const validateRoomType = runSchema(roomTypeSchema);
const validateRoom = runSchema(roomSchema);
const validateRoomStatus = runSchema(roomStatusSchema);
const validateReservation = runSchema(reservationSchema);
const validateCancelReservation = runSchema(cancelReservationSchema);
const validateModifyReservation = runSchema(modifyReservationSchema);
const validateAssignRoom = runSchema(assignRoomSchema);
const validateConfirmReservation = runSchema(confirmReservationSchema);

export {
  validateRoomType,
  validateRoom,
  validateRoomStatus,
  validateReservation,
  validateCancelReservation,
  validateModifyReservation,
  validateAssignRoom,
  validateConfirmReservation,
};
