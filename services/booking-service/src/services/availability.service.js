import { ROOM_STATUSES_EXCLUDED_FROM_AVAILABILITY } from "../config/constants.js";

// BR-01 pool: active rooms of this type, minus rooms currently in
// MAINTENANCE/OUT_OF_SERVICE. `client` is either the plain prisma client (for
// a read-only availability search) or a `tx` handle (inside the reservation
// transaction) — same function either way.
async function getEligibleRoomCount(client, roomTypeId) {
  return client.room.count({
    where: {
      roomTypeId,
      isActive: true,
      status: { notIn: ROOM_STATUSES_EXCLUDED_FROM_AVAILABILITY },
    },
  });
}

// Reservations that hold inventory somewhere inside [checkIn, checkOut).
// "PENDING and not expired" is checked literally against holdExpiresAt here —
// not against status alone — so availability is correct even the instant
// before the expiry sweep job (jobs/expireHolds.js) gets around to relabeling
// the row EXPIRED in the database.
//
// excludeReservationId: when modifying a reservation that already holds a
// room for these same dates, it must not count against its own new check —
// without this, "does this reservation's new dates fit?" would always answer
// no, since the row currently being edited is itself part of "overlapping".
async function getOverlappingReservations(client, roomTypeId, checkIn, checkOut, excludeReservationId) {
  const now = new Date();
  return client.reservation.findMany({
    where: {
      roomTypeId,
      checkIn: { lt: checkOut },
      checkOut: { gt: checkIn },
      OR: [{ status: "CONFIRMED" }, { status: "PENDING", holdExpiresAt: { gt: now } }],
      ...(excludeReservationId ? { id: { not: excludeReservationId } } : {}),
    },
    select: { checkIn: true, checkOut: true },
  });
}

// BR-01 is a per-night guarantee, not a single range check: two reservations
// that each occupy only part of the requested range (and never overlap each
// other) must not be summed together as if they always coincide. Walk every
// night in the range and take the worst one.
function minFreeRoomsAcrossNights(totalRooms, overlapping, checkIn, checkOut) {
  let minFree = totalRooms;
  for (let night = new Date(checkIn); night < checkOut; night.setUTCDate(night.getUTCDate() + 1)) {
    const occupied = overlapping.filter((r) => r.checkIn <= night && night < r.checkOut).length;
    minFree = Math.min(minFree, totalRooms - occupied);
  }
  return minFree;
}

// The single source of truth for "is this room type bookable for these dates" —
// used both by the read-only GET /availability search and, with a `tx` handle,
// inside the reservation-creation transaction itself (BR-02 needs the exact
// same check re-run under lock, not a second slightly-different query).
async function checkAvailability(client, { roomTypeId, checkIn, checkOut, excludeReservationId }) {
  const totalRooms = await getEligibleRoomCount(client, roomTypeId);
  const overlapping = await getOverlappingReservations(client, roomTypeId, checkIn, checkOut, excludeReservationId);
  const remaining = minFreeRoomsAcrossNights(totalRooms, overlapping, checkIn, checkOut);
  return { available: remaining >= 1, remaining, totalRooms };
}

// Lets a guest pick a specific physical room (roomNumber/floor), not just a
// room type — different guarantee from checkAvailability's pooled count: a
// room is only free here if THAT exact roomId has no conflicting reservation,
// not just if the type has enough rooms somewhere. Same eligible-room rules
// (active, not MAINTENANCE/OUT_OF_SERVICE) and the same overlap definition
// assignRoom's admin-side conflict check already uses.
async function listAvailableRooms(client, { roomTypeId, checkIn, checkOut }) {
  const rooms = await client.room.findMany({
    where: {
      roomTypeId,
      isActive: true,
      status: { notIn: ROOM_STATUSES_EXCLUDED_FROM_AVAILABILITY },
    },
    orderBy: { roomNumber: "asc" },
  });
  if (rooms.length === 0) return [];

  const now = new Date();
  const conflicting = await client.reservation.findMany({
    where: {
      roomId: { in: rooms.map((r) => r.id) },
      checkIn: { lt: checkOut },
      checkOut: { gt: checkIn },
      OR: [{ status: "CONFIRMED" }, { status: "PENDING", holdExpiresAt: { gt: now } }],
    },
    select: { roomId: true },
  });
  const bookedRoomIds = new Set(conflicting.map((r) => r.roomId));

  return rooms.filter((r) => !bookedRoomIds.has(r.id));
}

export { checkAvailability, getEligibleRoomCount, getOverlappingReservations, listAvailableRooms };
