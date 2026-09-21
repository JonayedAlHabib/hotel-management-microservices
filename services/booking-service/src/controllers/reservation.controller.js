import { prisma } from "../db/prisma.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { parseDateParam } from "../utils/date.js";
import { PAGE_SIZE } from "../config/constants.js";
import {
  createReservation,
  cancelReservation,
  modifyReservation,
  assignRoom,
  confirmReservation,
  markNoShow,
} from "../services/reservation.service.js";

// POST /bookings — GUEST or ADMIN (requireAuth). Guest contact fields come from
// the request body rather than a lookup against auth-service — booking-service
// doesn't hold profile data, and this avoids a synchronous inter-service call
// on the guest's critical path. See PROGRESS.md for the tradeoff.
//
// Requires an Idempotency-Key header, generated once by the client per logical
// booking attempt (not per HTTP request) and resent unchanged on any retry —
// see reservation.service.js for why this is required, not optional.
async function createReservationHandler(req, res) {
  const idempotencyKey = req.headers["idempotency-key"];
  if (!idempotencyKey) {
    throw new ApiError(400, "Idempotency-Key header is required");
  }

  const reservation = await createReservation({
    ...req.body,
    idempotencyKey,
    createdBy: req.user.id,
    callerRole: req.user.role,
  });
  res.status(201).json(new ApiResponse(201, { reservation }, "Reservation created"));
}

// GET /bookings — UC-A08.1: search by reference/guest name/phone/email;
// filters for status/room type/room number/source/date ranges; paginated
// (20/page); sortable by checkIn. GUEST sees only their own regardless of
// what else is filtered; ADMIN sees everything matching.
//
// Built as an `AND` array of independent conditions, not object-spread onto
// one `where` — a GUEST's own-only restriction and the free-text search both
// need their own `guest: {...}` condition, and a plain object can only hold
// one key named `guest`; spreading both in would let the second silently
// overwrite the first, quietly leaking every guest's bookings into search
// results instead of just the caller's own.
async function listReservations(req, res) {
  const {
    search,
    status,
    roomTypeId,
    roomNumber,
    source,
    checkInFrom,
    checkInTo,
    checkOutFrom,
    checkOutTo,
    createdFrom,
    createdTo,
    page: pageRaw,
    sortDir,
  } = req.query;

  const page = Math.max(1, Number(pageRaw) || 1);

  const and = [];
  if (status) and.push({ status });
  if (roomTypeId) and.push({ roomTypeId });
  if (source) and.push({ source });
  if (roomNumber) and.push({ room: { roomNumber } });
  if (req.user.role !== "ADMIN") and.push({ guest: { userId: req.user.id } });

  const checkInFilter = {};
  if (checkInFrom) checkInFilter.gte = parseDateParam(checkInFrom, "checkInFrom");
  if (checkInTo) checkInFilter.lte = parseDateParam(checkInTo, "checkInTo");
  if (Object.keys(checkInFilter).length > 0) and.push({ checkIn: checkInFilter });

  const checkOutFilter = {};
  if (checkOutFrom) checkOutFilter.gte = parseDateParam(checkOutFrom, "checkOutFrom");
  if (checkOutTo) checkOutFilter.lte = parseDateParam(checkOutTo, "checkOutTo");
  if (Object.keys(checkOutFilter).length > 0) and.push({ checkOut: checkOutFilter });

  const createdFilter = {};
  if (createdFrom) createdFilter.gte = parseDateParam(createdFrom, "createdFrom");
  if (createdTo) {
    // createdAt is a full timestamp, not a date-only column — "to" a calendar
    // day means through its end, not its midnight start, or that whole day's
    // results would be silently excluded
    const end = parseDateParam(createdTo, "createdTo");
    end.setUTCHours(23, 59, 59, 999);
    createdFilter.lte = end;
  }
  if (Object.keys(createdFilter).length > 0) and.push({ createdAt: createdFilter });

  if (search) {
    and.push({
      OR: [
        { reference: { contains: search, mode: "insensitive" } },
        { guest: { fullName: { contains: search, mode: "insensitive" } } },
        { guest: { phone: { contains: search, mode: "insensitive" } } },
        { guest: { email: { contains: search, mode: "insensitive" } } },
      ],
    });
  }

  const where = and.length > 0 ? { AND: and } : {};

  const [reservations, total] = await Promise.all([
    prisma.reservation.findMany({
      where,
      include: { guest: true, roomType: true, room: true },
      orderBy: { checkIn: sortDir === "desc" ? "desc" : "asc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.reservation.count({ where }),
  ]);

  res.json(
    new ApiResponse(
      200,
      { reservations, pagination: { page, pageSize: PAGE_SIZE, total, totalPages: Math.ceil(total / PAGE_SIZE) } },
      "Fetched reservations"
    )
  );
}

// GET /bookings/:id — BR-09: a non-owner gets 404, never 403
async function getReservation(req, res) {
  const reservation = await prisma.reservation.findUnique({
    where: { id: req.params.id },
    include: { guest: true, roomType: true, room: true, history: true, changeLog: true },
  });

  if (!reservation) throw new ApiError(404, "Reservation not found");

  const isOwner = reservation.guest.userId === req.user.id;
  if (req.user.role !== "ADMIN" && !isOwner) {
    throw new ApiError(404, "Reservation not found");
  }

  res.json(new ApiResponse(200, { reservation }, "Fetched reservation"));
}

// PATCH /bookings/:id/cancel — reason is optional for a GUEST, mandatory for
// an ADMIN (enforced in reservation.service.js, where the role is checked)
async function cancelReservationHandler(req, res) {
  const reservation = await cancelReservation({
    reservationId: req.params.id,
    actingUserId: req.user.id,
    actingRole: req.user.role,
    reason: req.body.reason,
  });
  res.json(new ApiResponse(200, { reservation }, "Reservation cancelled"));
}

// PATCH /bookings/:id — UC-A10.1, admin-only (role check itself lives in the
// service, so the same 403 message is used everywhere that rule applies)
async function modifyReservationHandler(req, res) {
  const reservation = await modifyReservation({
    reservationId: req.params.id,
    actingUserId: req.user.id,
    actingRole: req.user.role,
    ...req.body,
  });
  res.json(new ApiResponse(200, { reservation }, "Reservation updated"));
}

// PATCH /bookings/:id/room — UC-A10.2
async function assignRoomHandler(req, res) {
  const reservation = await assignRoom({
    reservationId: req.params.id,
    roomId: req.body.roomId,
    actingUserId: req.user.id,
    actingRole: req.user.role,
  });
  res.json(new ApiResponse(200, { reservation }, "Room assigned"));
}

// PATCH /bookings/:id/confirm — UC-A11.1
async function confirmReservationHandler(req, res) {
  const reservation = await confirmReservation({
    reservationId: req.params.id,
    actingUserId: req.user.id,
    actingRole: req.user.role,
    note: req.body.note,
  });
  res.json(new ApiResponse(200, { reservation }, "Reservation confirmed"));
}

// PATCH /bookings/:id/no-show — UC-A12
async function markNoShowHandler(req, res) {
  const reservation = await markNoShow({
    reservationId: req.params.id,
    actingUserId: req.user.id,
    actingRole: req.user.role,
  });
  res.json(new ApiResponse(200, { reservation }, "Reservation marked as no-show"));
}

export {
  createReservationHandler,
  listReservations,
  getReservation,
  cancelReservationHandler,
  modifyReservationHandler,
  assignRoomHandler,
  confirmReservationHandler,
  markNoShowHandler,
};
