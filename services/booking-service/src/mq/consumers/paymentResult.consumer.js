import { getChannel, EXCHANGE_NAME } from "../connection.js";
import { confirmReservationFromPayment } from "../../services/reservation.service.js";

const QUEUE_NAME = "booking_service.payment_result";
// Wildcard binding — one queue catches both "payment.succeeded" and
// "payment.failed" without a separate binding for each.
const ROUTING_PATTERN = "payment.*";

export async function startPaymentResultConsumer() {
  const channel = await getChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });
  await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_PATTERN);

  channel.consume(QUEUE_NAME, async (msg) => {
    if (!msg) return;

    try {
      const event = JSON.parse(msg.content.toString());

      // FAILED/CANCELLED: deliberately a no-op. The reservation stays PENDING
      // so the guest can retry payment; if they never do, the existing
      // hold-expiry sweep job (expireHolds.js) flips it to EXPIRED on its own
      // — no new logic needed here for an abandoned checkout.
      if (event.status === "SUCCESS") {
        await confirmReservationFromPayment(event.reservationId);
      }

      channel.ack(msg);
    } catch (err) {
      console.error("[rabbitmq] failed to process payment result event:", err.message);
      channel.nack(msg, false, false);
    }
  });

  console.log(`[rabbitmq] consuming ${ROUTING_PATTERN} on queue ${QUEUE_NAME}`);
}
