import cron from "node-cron";
import { prisma } from "../db/prisma.js";

const SYSTEM_ACTOR = "system";

// Not required for correctness — availability.service.js already treats a
// PENDING row past its holdExpiresAt as free, live, without waiting for this
// job. What this job is actually for: making the STORED data match reality,
// so reports/history don't show a booking as "PENDING" for a slot it no
// longer actually holds, and so the guest's own booking list reflects what
// really happened to it.
async function expireStaleHolds() {
  const now = new Date();
  const stale = await prisma.reservation.findMany({
    where: { status: "PENDING", holdExpiresAt: { lt: now } },
    select: { id: true },
  });

  let expiredCount = 0;
  for (const { id } of stale) {
    try {
      await prisma.$transaction(async (tx) => {
        // Re-checked inside the transaction, not trusted from the findMany above —
        // a real user could have cancelled, confirmed, or paid for this exact
        // reservation in the gap between that query and this one running.
        const reservation = await tx.reservation.findUnique({ where: { id } });
        if (!reservation || reservation.status !== "PENDING" || !reservation.holdExpiresAt || reservation.holdExpiresAt >= new Date()) {
          return;
        }

        await tx.reservation.update({ where: { id }, data: { status: "EXPIRED" } });
        await tx.reservationStatusHistory.create({
          data: {
            reservationId: id,
            fromStatus: "PENDING",
            toStatus: "EXPIRED",
            changedBy: SYSTEM_ACTOR,
            reason: "Payment hold expired (BR-05)",
          },
        });
      });
      expiredCount += 1;
    } catch (err) {
      console.error(`expireStaleHolds: failed to expire reservation ${id}`, err);
    }
  }

  if (expiredCount > 0) {
    console.log(`⏱ expired ${expiredCount} stale PENDING reservation(s)`);
  }
}

function startExpiryJob() {
  // Every minute — BR-05's hold is 30 minutes by default, so a minute of
  // slack before a stale row is swept is well within that margin, and the
  // query itself is cheap (PENDING rows are a small slice of the table).
  cron.schedule("* * * * *", () => {
    expireStaleHolds().catch((err) => console.error("expireStaleHolds failed:", err));
  });
  console.log("⏱ hold-expiry sweep job scheduled (every minute)");
}

export { expireStaleHolds, startExpiryJob };
