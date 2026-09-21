import { getChannel, EXCHANGE_NAME } from "./connection.js";

// Fire-and-forget from the caller's point of view — a publish failure here
// (broker briefly unreachable) is logged, not thrown, so it never fails the
// HTTP response for a booking that already committed successfully. This is a
// real gap for now (a lost event means payment-service never hears about this
// reservation) — acceptable for this learning step, revisit with an outbox
// pattern if it matters later.
export async function publishBookingCreated({
  reservationId,
  guestId,
  guestName,
  guestPhone,
  guestEmail,
  totalAmount,
  currency,
}) {
  try {
    const channel = await getChannel();
    const payload = {
      reservationId,
      guestId,
      guestName,
      guestPhone,
      guestEmail,
      totalAmount,
      currency: currency || "BDT",
    };
    channel.publish(EXCHANGE_NAME, "booking.created", Buffer.from(JSON.stringify(payload)), {
      persistent: true,
      contentType: "application/json",
    });
  } catch (err) {
    console.error("[rabbitmq] failed to publish booking.created:", err.message);
  }
}
