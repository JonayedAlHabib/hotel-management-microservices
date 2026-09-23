import { Prisma } from "../generated/prisma/index.js";
import { prisma } from "../db/prisma.js";
import { ApiError } from "../utils/apiError.js";
import { publishBookingCreated, publishBookingConfirmed, publishBookingCancelled } from "../mq/publisher.js";
import { checkAvailability } from "./availability.service.js";
import { todayInHotelTimezone, currentHourInHotelTimezone } from "../utils/date.js";
import {
  HOLD_DURATION_MINUTES,
  RESERVATION_TRANSITIONS,
  MAX_PENDING_PER_GUEST,
  MIN_STAY_NIGHTS,
  MAX_STAY_NIGHTS,
  EDITABLE_RESERVATION_STATUSES,
  NO_SHOW_CUTOFF_HOUR,
  FREE_CANCELLATION_HOURS_BEFORE_CHECKIN,
  CANCELLATION_FEE_NIGHTS,
  ROOM_STATUSES_EXCLUDED_FROM_AVAILABILITY,
} from "../config/constants.js";

const MAX_RETRIES = 3;

// HotelConfig is a singleton row (see prisma/schema.prisma) — the single
// source of truth for the tax rate, read live instead of a hardcoded constant.
async function getTaxRateBp(client) {
  const config = await client.hotelConfig.findFirst();
  if (!config) throw new ApiError(500, "Hotel configuration is not set up");
  return config.taxRateBp;
}

async function findOrCreateGuest(tx, { userId, guestName, guestPhone, guestEmail }) {
  if (userId) {
    const existing = await tx.guest.findFirst({ where: { userId } });
    if (existing) return existing;
  }
  return tx.guest.create({
    data: { userId: userId ?? null, fullName: guestName, phone: guestPhone ?? null, email: guestEmail ?? null },
  });
}

// A real Postgres sequence (see the migration), not COUNT(*)+1 — never collides
// under concurrent inserts, and sequences aren't transactional so a retried/
// rolled-back attempt just leaves a small gap, never a duplicate. BR-04/BR-11.
async function nextReference(tx) {
  const rows = await tx.$queryRaw`SELECT nextval('reservation_reference_seq') AS seq`;
  return `BK${rows[0].seq}`;
}

function recordHistory(tx, reservationId, fromStatus, toStatus, changedBy, reason) {
  return tx.reservationStatusHistory.create({
    data: { reservationId, fromStatus, toStatus, changedBy, reason },
  });
}

// Distinct from BR-02: BR-02 stops two DIFFERENT guests from both winning the
// last room. This stops the SAME guest's duplicate submission (a double-click,
// a client retry after a slow/dropped response, a resubmitted form) from
// creating two separate reservations — and, later, being charged twice. The
// caller supplies one key per logical booking attempt (an Idempotency-Key
// header, generated once when the "Book Now" click happens, reused on any
// retry of that same click — never a fresh key per HTTP request).
//
// Two layers, on purpose:
//  1. A cheap pre-check outside any transaction — handles the common case (a
//     retry arriving after the first attempt already committed) without
//     paying for a SERIALIZABLE transaction at all.
//  2. The `idempotencyKey` column's UNIQUE constraint is the actual
//     guarantee — it's what a pre-check alone can't provide, because two
//     requests with the same key can both pass step 1 if they arrive close
//     enough together (the identical class of race BR-02 itself guards
//     against, just on a different column). When the second insert hits that
//     constraint, Postgres/Prisma reports it as error P2002; we catch it and
//     return the row the *other* request already created, instead of
//     surfacing a raw conflict to a guest who did nothing wrong.
async function createReservation(input) {
  const {
    idempotencyKey,
    roomTypeId,
    roomId,
    checkIn,
    checkOut,
    guestCount,
    guestName,
    guestPhone,
    guestEmail,
    specialRequest,
    createdBy,
    callerRole,
    source,
    confirmImmediately,
  } = input;

  const alreadyProcessed = await prisma.reservation.findUnique({ where: { idempotencyKey } });
  if (alreadyProcessed) return alreadyProcessed;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await prisma.$transaction(
        async (tx) => {
          // Re-checked here, not just once before the loop: a losing attempt from
          // an earlier iteration (or a truly-simultaneous sibling request) may have
          // committed the real result while THIS attempt was retrying. Without this,
          // a retry would run the full availability check again, see the room the
          // winner just took, and honestly report "sold out" — correct for a
          // genuinely different booking, wrong for a retry of the same one.
          const winner = await tx.reservation.findUnique({ where: { idempotencyKey } });
          if (winner) return { reservation: winner, isNew: false };

          const roomType = await tx.roomType.findUnique({ where: { id: roomTypeId } });
          if (!roomType || !roomType.isActive) {
            throw new ApiError(404, "Room type not found");
          }
          if (guestCount > roomType.maxGuests) {
            throw new ApiError(400, `guestCount exceeds this room type's capacity of ${roomType.maxGuests}`);
          }

          const { available } = await checkAvailability(tx, { roomTypeId, checkIn, checkOut });
          if (!available) {
            throw new ApiError(409, "Room type is sold out for these dates");
          }

          // Guest picked a specific physical room — a stricter, separate
          // guarantee from the pooled type-level check above: re-validated
          // here (not trusted from an earlier read-only /available-rooms
          // call) and re-checked for conflicts inside this same SERIALIZABLE
          // transaction, so two guests racing for the same room number can't
          // both win it, the same protection BR-02 gives at the type level.
          let assignedRoomId = null;
          if (roomId) {
            const room = await tx.room.findUnique({ where: { id: roomId } });
            if (!room || !room.isActive || room.roomTypeId !== roomTypeId) {
              throw new ApiError(404, "Selected room not found for this room type");
            }
            if (ROOM_STATUSES_EXCLUDED_FROM_AVAILABILITY.includes(room.status)) {
              throw new ApiError(409, "Selected room is not available right now");
            }
            const now = new Date();
            const roomConflict = await tx.reservation.findFirst({
              where: {
                roomId,
                checkIn: { lt: checkOut },
                checkOut: { gt: checkIn },
                OR: [{ status: "CONFIRMED" }, { status: "PENDING", holdExpiresAt: { gt: now } }],
              },
            });
            if (roomConflict) {
              throw new ApiError(409, "Selected room was just booked by someone else for these dates — please pick another room");
            }
            assignedRoomId = roomId;
          }

          const guest = await findOrCreateGuest(tx, { userId: createdBy, guestName, guestPhone, guestEmail });

          // US-G09.2 AC5: checked by the GUEST's identity, not who's creating the
          // request — an admin creating a 4th walk-in booking for a guest who
          // already has 3 unpaid PENDING ones is blocked too, same as the guest
          // self-service case. Counted inside this transaction (not as a separate
          // pre-check) so it can't be raced past by two concurrent requests each
          // seeing "2 so far" and both proceeding to create a 3rd and 4th.
          const pendingCount = await tx.reservation.count({
            where: { guestId: guest.id, status: "PENDING" },
          });
          if (pendingCount >= MAX_PENDING_PER_GUEST) {
            throw new ApiError(409, `This guest already has ${MAX_PENDING_PER_GUEST} pending unpaid bookings`);
          }

          // BR-03: room charge = nights x rate; no service charges yet (folio is a later phase)
          const nights = Math.round((checkOut - checkIn) / 86400000);
          const subtotal = nights * roomType.basePrice;
          const taxRateBp = await getTaxRateBp(tx);
          const tax = Math.round((subtotal * taxRateBp) / 10000);
          const totalAmount = subtotal + tax;

          // UC-A: admin can confirm a walk-in/phone booking immediately, skipping the payment hold
          const isAdminConfirming = callerRole === "ADMIN" && confirmImmediately === true;
          const status = isAdminConfirming ? "CONFIRMED" : "PENDING";
          const holdExpiresAt = isAdminConfirming
            ? null
            : new Date(Date.now() + HOLD_DURATION_MINUTES * 60 * 1000);

          const reference = await nextReference(tx);

          const reservation = await tx.reservation.create({
            data: {
              idempotencyKey,
              reference,
              guestId: guest.id,
              roomTypeId,
              roomId: assignedRoomId,
              checkIn,
              checkOut,
              guestCount,
              specialRequest: specialRequest ?? null,
              status,
              source: source ?? "ONLINE",
              rateSnapshot: roomType.basePrice,
              taxRateBp,
              totalAmount,
              holdExpiresAt,
              createdBy,
            },
          });

          await recordHistory(tx, reservation.id, null, status, createdBy, "Booking created");

          return {
            reservation,
            isNew: true,
            guestUserId: guest.userId,
            guestName: guest.fullName,
            guestPhone: guest.phone,
            guestEmail: guest.email,
          };
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
      ).then(async (result) => {
        // Published only for a genuinely new PENDING reservation, after the
        // transaction has actually committed (not from inside it — an event
        // sent from inside the callback could go out even if the transaction
        // then failed to commit for some other reason). An admin's
        // confirmImmediately booking skips this entirely — it's already
        // CONFIRMED, no payment is coming.
        if (result.isNew && result.reservation.status === "PENDING") {
          await publishBookingCreated({
            reservationId: result.reservation.id,
            guestId: result.guestUserId,
            guestName: result.guestName,
            guestPhone: result.guestPhone,
            guestEmail: result.guestEmail,
            // booking-service stores amounts as an Int in minor units (poisha);
            // payment-service/gateways expect major currency units (taka).
            totalAmount: result.reservation.totalAmount / 100,
          });
        }
        return result.reservation;
      });
    } catch (err) {
      const isIdempotencyRace = err.code === "P2002" && err.meta?.target?.includes("idempotency_key");
      if (isIdempotencyRace) {
        const winner = await prisma.reservation.findUnique({ where: { idempotencyKey } });
        if (winner) return winner;
        throw err; // the racing insert committed but somehow isn't findable — don't mask that
      }

      const isSerializationConflict = err.code === "P2034";
      if (isSerializationConflict && attempt < MAX_RETRIES) continue;
      throw err;
    }
  }
}

// UC-G11 / A-04: free cancellation until 48h before check-in; inside that
// window, a fee of the first CANCELLATION_FEE_NIGHTS night(s), priced at the
// reservation's own rateSnapshot (not the room type's current rate — same
// "snapshot is the quote" reasoning modifyReservation uses for the total).
function calculateCancellationFee(reservation) {
  const hoursUntilCheckIn = (reservation.checkIn.getTime() - Date.now()) / (60 * 60 * 1000);
  if (hoursUntilCheckIn >= FREE_CANCELLATION_HOURS_BEFORE_CHECKIN) return 0;
  return reservation.rateSnapshot * CANCELLATION_FEE_NIGHTS;
}

// BR-09: a non-owner gets 404, never 403 — existence of another guest's
// reservation is not revealed. Cancellation window itself is deliberately
// simple (before check-in) — the PRD lists the real window/fee as an open
// question (Q-03), not yet decided. Reason: mandatory for an admin (UC-A11
// AC1), optional for a guest (UC-G11 main flow, "optionally gives a reason")
// — not the same rule for both, so it's enforced here, not in validate.js,
// where req.user.role isn't available yet.
async function cancelReservation({ reservationId, actingUserId, actingRole, reason }) {
  if (actingRole === "ADMIN" && !reason) {
    throw new ApiError(400, "reason is required when an admin cancels a reservation");
  }

  let guestForEvent = null;

  const updated = await prisma.$transaction(async (tx) => {
    const reservation = await tx.reservation.findUnique({
      where: { id: reservationId },
      include: { guest: true },
    });
    if (!reservation) throw new ApiError(404, "Reservation not found");

    const isOwner = reservation.guest.userId === actingUserId;
    if (actingRole !== "ADMIN" && !isOwner) {
      throw new ApiError(404, "Reservation not found");
    }

    // Sourced from the same Appendix B.1 table room status transitions use,
    // instead of a separately hardcoded status list that could drift from it.
    const allowedNext = RESERVATION_TRANSITIONS[reservation.status] || [];
    if (!allowedNext.includes("CANCELLED")) {
      throw new ApiError(409, `Cannot cancel a reservation in ${reservation.status} status`);
    }
    if (new Date() >= reservation.checkIn) {
      throw new ApiError(409, "Cannot cancel on or after the check-in date");
    }

    const cancellationFeeAmount = calculateCancellationFee(reservation);

    const updatedReservation = await tx.reservation.update({
      where: { id: reservationId },
      data: { status: "CANCELLED", cancellationFeeAmount },
    });
    await recordHistory(
      tx,
      reservationId,
      reservation.status,
      "CANCELLED",
      actingUserId,
      reason ? `${reason} (cancelled by ${actingRole})` : `Cancelled by ${actingRole}`
    );

    guestForEvent = reservation.guest;
    return updatedReservation;
  });

  // Published only after the transaction has actually committed — same
  // reasoning createReservation already uses for booking.created.
  await publishBookingCancelled({
    reservationId: updated.id,
    reference: updated.reference,
    userId: guestForEvent.userId,
    guestName: guestForEvent.fullName,
    guestEmail: guestForEvent.email,
    reason,
  });

  return updated;
}

function fieldChange(field, oldValue, newValue) {
  return { field, oldValue: oldValue === null || oldValue === undefined ? null : String(oldValue), newValue: newValue === null || newValue === undefined ? null : String(newValue) };
}

async function recordChanges(tx, reservationId, changedBy, changes) {
  for (const change of changes) {
    await tx.reservationChangeLog.create({ data: { reservationId, changedBy, ...change } });
  }
}

// UC-A10.1 — admin-only (UC-G12, a guest modifying their own booking, is P2 in
// the PRD, out of scope here). Editable only while PENDING/CONFIRMED. Changing
// dates or room type re-runs the exact same BR-01/BR-02 availability check
// used at creation, excluding this reservation's own current hold — retried
// under SERIALIZABLE on conflict, same pattern as createReservation. Price is
// recomputed at the room type's CURRENT rate, not the original rateSnapshot —
// a modify is a new decision about what's being booked, not an edit of the
// original quote.
async function modifyReservation(input) {
  const { reservationId, actingUserId, actingRole, checkIn, checkOut, guestCount, roomTypeId, specialRequest } = input;

  if (actingRole !== "ADMIN") {
    throw new ApiError(403, "Only an admin can modify a reservation");
  }

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await prisma.$transaction(
        async (tx) => {
          const reservation = await tx.reservation.findUnique({ where: { id: reservationId } });
          if (!reservation) throw new ApiError(404, "Reservation not found");

          if (!EDITABLE_RESERVATION_STATUSES.includes(reservation.status)) {
            throw new ApiError(409, `Cannot modify a reservation in ${reservation.status} status`);
          }

          const effectiveCheckIn = checkIn ?? reservation.checkIn;
          const effectiveCheckOut = checkOut ?? reservation.checkOut;
          const effectiveGuestCount = guestCount ?? reservation.guestCount;
          const effectiveRoomTypeId = roomTypeId ?? reservation.roomTypeId;

          if (effectiveCheckIn < todayInHotelTimezone()) {
            throw new ApiError(400, "checkIn cannot be in the past");
          }
          if (effectiveCheckOut <= effectiveCheckIn) {
            throw new ApiError(400, "checkOut must be after checkIn");
          }
          const nights = Math.round((effectiveCheckOut - effectiveCheckIn) / 86400000);
          if (nights < MIN_STAY_NIGHTS || nights > MAX_STAY_NIGHTS) {
            throw new ApiError(400, `Stay must be between ${MIN_STAY_NIGHTS} and ${MAX_STAY_NIGHTS} nights`);
          }

          const roomType = await tx.roomType.findUnique({ where: { id: effectiveRoomTypeId } });
          if (!roomType || !roomType.isActive) throw new ApiError(404, "Room type not found");
          if (effectiveGuestCount > roomType.maxGuests) {
            throw new ApiError(400, `guestCount exceeds this room type's capacity of ${roomType.maxGuests}`);
          }

          const datesOrTypeChanged =
            effectiveCheckIn.getTime() !== reservation.checkIn.getTime() ||
            effectiveCheckOut.getTime() !== reservation.checkOut.getTime() ||
            effectiveRoomTypeId !== reservation.roomTypeId;

          if (datesOrTypeChanged) {
            const { available } = await checkAvailability(tx, {
              roomTypeId: effectiveRoomTypeId,
              checkIn: effectiveCheckIn,
              checkOut: effectiveCheckOut,
              excludeReservationId: reservationId,
            });
            if (!available) throw new ApiError(409, "Room type is sold out for these dates");
          }

          const subtotal = nights * roomType.basePrice;
          const taxRateBp = await getTaxRateBp(tx);
          const tax = Math.round((subtotal * taxRateBp) / 10000);
          const newTotalAmount = subtotal + tax;

          const changes = [];
          if (effectiveCheckIn.getTime() !== reservation.checkIn.getTime()) {
            changes.push(fieldChange("checkIn", reservation.checkIn.toISOString().slice(0, 10), effectiveCheckIn.toISOString().slice(0, 10)));
          }
          if (effectiveCheckOut.getTime() !== reservation.checkOut.getTime()) {
            changes.push(fieldChange("checkOut", reservation.checkOut.toISOString().slice(0, 10), effectiveCheckOut.toISOString().slice(0, 10)));
          }
          if (effectiveGuestCount !== reservation.guestCount) {
            changes.push(fieldChange("guestCount", reservation.guestCount, effectiveGuestCount));
          }
          if (effectiveRoomTypeId !== reservation.roomTypeId) {
            changes.push(fieldChange("roomTypeId", reservation.roomTypeId, effectiveRoomTypeId));
          }
          if (specialRequest !== undefined && specialRequest !== reservation.specialRequest) {
            changes.push(fieldChange("specialRequest", reservation.specialRequest, specialRequest));
          }
          if (newTotalAmount !== reservation.totalAmount) {
            changes.push(fieldChange("totalAmount", reservation.totalAmount, newTotalAmount));
          }

          if (changes.length === 0) return reservation;

          const updated = await tx.reservation.update({
            where: { id: reservationId },
            data: {
              checkIn: effectiveCheckIn,
              checkOut: effectiveCheckOut,
              guestCount: effectiveGuestCount,
              roomTypeId: effectiveRoomTypeId,
              specialRequest: specialRequest !== undefined ? specialRequest : reservation.specialRequest,
              rateSnapshot: roomType.basePrice,
              totalAmount: newTotalAmount,
              // a room assigned under the OLD room type is no longer valid once the type itself changes
              roomId: effectiveRoomTypeId !== reservation.roomTypeId ? null : reservation.roomId,
            },
          });

          await recordChanges(tx, reservationId, actingUserId, changes);

          return updated;
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
      );
    } catch (err) {
      const isSerializationConflict = err.code === "P2034";
      if (isSerializationConflict && attempt < MAX_RETRIES) continue;
      throw err;
    }
  }
}

// UC-A10.2 — a deliberately separate operation from modifyReservation: room
// must be active, of the reserved TYPE, and not already assigned to another
// reservation with overlapping dates. Reassigning (calling this again with a
// different roomId) frees the previous room immediately — nothing else keeps
// a claim on it once this reservation's roomId no longer points there.
async function assignRoom({ reservationId, roomId, actingUserId, actingRole }) {
  if (actingRole !== "ADMIN") {
    throw new ApiError(403, "Only an admin can assign a room");
  }

  return prisma.$transaction(async (tx) => {
    const reservation = await tx.reservation.findUnique({ where: { id: reservationId } });
    if (!reservation) throw new ApiError(404, "Reservation not found");

    if (!EDITABLE_RESERVATION_STATUSES.includes(reservation.status)) {
      throw new ApiError(409, `Cannot assign a room to a reservation in ${reservation.status} status`);
    }

    const room = await tx.room.findUnique({ where: { id: roomId } });
    if (!room || !room.isActive) throw new ApiError(404, "Room not found");
    if (room.roomTypeId !== reservation.roomTypeId) {
      throw new ApiError(409, "Room is not of the reserved room type");
    }

    const now = new Date();
    const conflicting = await tx.reservation.findFirst({
      where: {
        roomId,
        id: { not: reservationId },
        checkIn: { lt: reservation.checkOut },
        checkOut: { gt: reservation.checkIn },
        OR: [{ status: "CONFIRMED" }, { status: "PENDING", holdExpiresAt: { gt: now } }],
      },
    });
    if (conflicting) {
      throw new ApiError(409, "This room is already assigned to another reservation for overlapping dates");
    }

    const previousRoomId = reservation.roomId;
    const updated = await tx.reservation.update({ where: { id: reservationId }, data: { roomId } });
    await recordChanges(tx, reservationId, actingUserId, [fieldChange("roomId", previousRoomId, roomId)]);

    return updated;
  });
}

// UC-A11.1 — standalone confirm, separate from the confirmImmediately shortcut
// at creation time. PENDING -> CONFIRMED only (checked via RESERVATION_TRANSITIONS,
// same source of truth as cancel). Clears holdExpiresAt: a CONFIRMED reservation
// is no longer subject to the payment-hold expiry.
async function confirmReservation({ reservationId, actingUserId, actingRole, note }) {
  if (actingRole !== "ADMIN") {
    throw new ApiError(403, "Only an admin can confirm a reservation");
  }

  let guestForEvent = null;

  const updated = await prisma.$transaction(async (tx) => {
    const reservation = await tx.reservation.findUnique({
      where: { id: reservationId },
      include: { guest: true },
    });
    if (!reservation) throw new ApiError(404, "Reservation not found");

    const allowedNext = RESERVATION_TRANSITIONS[reservation.status] || [];
    if (!allowedNext.includes("CONFIRMED")) {
      throw new ApiError(409, `Cannot confirm a reservation in ${reservation.status} status`);
    }

    const updatedReservation = await tx.reservation.update({
      where: { id: reservationId },
      data: { status: "CONFIRMED", holdExpiresAt: null },
    });
    await recordHistory(tx, reservationId, reservation.status, "CONFIRMED", actingUserId, note ?? "Confirmed by admin");

    guestForEvent = reservation.guest;
    return updatedReservation;
  });

  await publishBookingConfirmed({
    reservationId: updated.id,
    reference: updated.reference,
    userId: guestForEvent.userId,
    guestName: guestForEvent.fullName,
    guestEmail: guestForEvent.email,
  });

  return updated;
}

// System-triggered confirm, called only by the "payment.succeeded" RabbitMQ
// consumer — no actingRole gate (there's no acting user, the gateway told us
// the guest paid). Idempotent: a redelivered/duplicate "payment.succeeded"
// for an already-CONFIRMED reservation is a silent no-op, not an error, since
// RabbitMQ redelivery is a normal occurrence.
async function confirmReservationFromPayment(reservationId) {
  let guestForEvent = null;

  const updated = await prisma.$transaction(async (tx) => {
    const reservation = await tx.reservation.findUnique({
      where: { id: reservationId },
      include: { guest: true },
    });
    if (!reservation) {
      console.error(`[payment.succeeded] reservation ${reservationId} not found`);
      return null;
    }

    const allowedNext = RESERVATION_TRANSITIONS[reservation.status] || [];
    if (!allowedNext.includes("CONFIRMED")) {
      if (reservation.status === "CONFIRMED") return reservation; // already handled — redelivery
      console.error(`[payment.succeeded] cannot confirm reservation ${reservationId} in ${reservation.status} status`);
      return reservation;
    }

    const updatedReservation = await tx.reservation.update({
      where: { id: reservationId },
      data: { status: "CONFIRMED", holdExpiresAt: null },
    });
    await recordHistory(tx, reservationId, reservation.status, "CONFIRMED", "system", "Payment succeeded");

    guestForEvent = reservation.guest;
    return updatedReservation;
  });

  // guestForEvent only gets set on a genuinely fresh confirm — the
  // already-CONFIRMED (redelivery) and can't-confirm no-op paths above leave
  // it null, so a redelivered payment.succeeded never double-publishes.
  if (guestForEvent) {
    await publishBookingConfirmed({
      reservationId: updated.id,
      reference: updated.reference,
      userId: guestForEvent.userId,
      guestName: guestForEvent.fullName,
      guestEmail: guestForEvent.email,
    });
  }

  return updated;
}

// True once the no-show cut-off has passed for this reservation's check-in
// date: always true if check-in was a previous day (cutoff is definitionally
// behind us by then), hour-checked against NO_SHOW_CUTOFF_HOUR if check-in is
// today, never true if check-in is still in the future.
function isPastNoShowCutoff(checkIn) {
  const today = todayInHotelTimezone();
  if (checkIn < today) return true;
  if (checkIn.getTime() === today.getTime()) return currentHourInHotelTimezone() >= NO_SHOW_CUTOFF_HOUR;
  return false;
}

// UC-A12 — CONFIRMED only, and only after the cut-off. Fee logic is
// deliberately not implemented, same as cancellation (PRD open question
// Q-03 covers both). Inventory releases automatically: NO_SHOW isn't one of
// the statuses getOverlappingReservations treats as holding a room.
async function markNoShow({ reservationId, actingUserId, actingRole }) {
  if (actingRole !== "ADMIN") {
    throw new ApiError(403, "Only an admin can mark a reservation as no-show");
  }

  return prisma.$transaction(async (tx) => {
    const reservation = await tx.reservation.findUnique({ where: { id: reservationId } });
    if (!reservation) throw new ApiError(404, "Reservation not found");

    const allowedNext = RESERVATION_TRANSITIONS[reservation.status] || [];
    if (!allowedNext.includes("NO_SHOW")) {
      throw new ApiError(409, `Cannot mark a reservation in ${reservation.status} status as no-show`);
    }
    if (!isPastNoShowCutoff(reservation.checkIn)) {
      throw new ApiError(
        409,
        `No-show can only be marked after the ${NO_SHOW_CUTOFF_HOUR}:00 (hotel time) cut-off on the check-in date`
      );
    }

    const updated = await tx.reservation.update({ where: { id: reservationId }, data: { status: "NO_SHOW" } });
    await recordHistory(tx, reservationId, reservation.status, "NO_SHOW", actingUserId, "Marked as no-show");

    return updated;
  });
}

export {
  createReservation,
  cancelReservation,
  modifyReservation,
  assignRoom,
  confirmReservation,
  confirmReservationFromPayment,
  markNoShow,
};
