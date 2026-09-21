import { prisma } from "../db/prisma.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ROOM_STATUS_TRANSITIONS } from "../config/constants.js";

// POST /rooms — ADMIN only
async function createRoom(req, res) {
  const { roomTypeId, roomNumber, floor } = req.body;

  const roomType = await prisma.roomType.findUnique({ where: { id: roomTypeId } });
  if (!roomType) throw new ApiError(404, "Room type not found");

  const existing = await prisma.room.findUnique({ where: { roomNumber } });
  if (existing) throw new ApiError(409, "A room with this number already exists");

  const room = await prisma.room.create({ data: { roomTypeId, roomNumber, floor } });
  res.status(201).json(new ApiResponse(201, { room }, "Room created"));
}

// GET /rooms — ADMIN only, optional ?roomTypeId=&status=
async function listRooms(req, res) {
  const { roomTypeId, status } = req.query;
  const rooms = await prisma.room.findMany({
    where: {
      ...(roomTypeId ? { roomTypeId } : {}),
      ...(status ? { status } : {}),
    },
    orderBy: { roomNumber: "asc" },
  });
  res.json(new ApiResponse(200, { rooms }, "Fetched rooms"));
}

// PATCH /rooms/:id/status — ADMIN only, transition must be legal per Appendix B.2.
// UC-A07 AC3: each change stores who/when/old/new/optional note — wrapped in a
// transaction so the status update and its history row commit together.
async function updateRoomStatus(req, res) {
  const { status: toStatus, note } = req.body;

  const updated = await prisma.$transaction(async (tx) => {
    const room = await tx.room.findUnique({ where: { id: req.params.id } });
    if (!room) throw new ApiError(404, "Room not found");

    // UC-A07 AC2: OCCUPIED is set only by check-in (not built yet — Phase 2),
    // never through this manual status endpoint, even though the transition
    // table itself topologically allows AVAILABLE -> OCCUPIED.
    if (toStatus === "OCCUPIED") {
      throw new ApiError(409, "OCCUPIED can only be set automatically during check-in, not manually");
    }

    const allowedNext = ROOM_STATUS_TRANSITIONS[room.status] || [];
    if (!allowedNext.includes(toStatus)) {
      throw new ApiError(409, `Cannot move a room from ${room.status} to ${toStatus}`);
    }

    const result = await tx.room.update({ where: { id: req.params.id }, data: { status: toStatus } });
    await tx.roomStatusHistory.create({
      data: {
        roomId: room.id,
        fromStatus: room.status,
        toStatus,
        changedBy: req.user.id,
        note: note ?? null,
      },
    });
    return result;
  });

  res.json(new ApiResponse(200, { room: updated }, "Room status updated"));
}

// Shared by deactivate/reactivate — future PENDING/CONFIRMED reservations
// assigned to this specific room block deactivation (UC-A06.3). roomId is
// only ever set by room assignment, which doesn't exist yet (Phase 3), so
// this list is expected to be empty for now — implemented correctly ahead of
// that landing, not exercised by real data yet.
async function findBlockingReservationsForRoom(roomId) {
  return prisma.reservation.findMany({
    where: { roomId, status: { in: ["PENDING", "CONFIRMED"] } },
    select: { reference: true, status: true, checkIn: true },
  });
}

// PATCH /rooms/:id/deactivate — ADMIN only
async function deactivateRoom(req, res) {
  const room = await prisma.room.findUnique({ where: { id: req.params.id } });
  if (!room) throw new ApiError(404, "Room not found");

  if (room.status === "OCCUPIED") {
    throw new ApiError(409, "Cannot deactivate an occupied room");
  }

  const blocking = await findBlockingReservationsForRoom(room.id);
  if (blocking.length > 0) {
    throw new ApiError(
      409,
      "Cannot deactivate a room with future reservations assigned to it",
      blocking.map((r) => ({ field: "reservation", message: `${r.reference} (${r.status}, check-in ${r.checkIn.toISOString().slice(0, 10)})` }))
    );
  }

  const updated = await prisma.room.update({ where: { id: req.params.id }, data: { isActive: false } });
  res.json(new ApiResponse(200, { room: updated }, "Room deactivated"));
}

// PATCH /rooms/:id/reactivate — ADMIN only
async function reactivateRoom(req, res) {
  const room = await prisma.room.findUnique({ where: { id: req.params.id } });
  if (!room) throw new ApiError(404, "Room not found");

  const updated = await prisma.room.update({ where: { id: req.params.id }, data: { isActive: true } });
  res.json(new ApiResponse(200, { room: updated }, "Room reactivated"));
}

export { createRoom, listRooms, updateRoomStatus, deactivateRoom, reactivateRoom };
