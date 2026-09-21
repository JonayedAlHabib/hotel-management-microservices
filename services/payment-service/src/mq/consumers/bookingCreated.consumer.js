import { getChannel, EXCHANGE_NAME } from "../connection.js";
import { createPaymentFromBookingEvent } from "../../services/payment.service.js";

const QUEUE_NAME = "payment_service.booking_created";
const ROUTING_KEY = "booking.created";

export async function startBookingCreatedConsumer() {
  const channel = await getChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });
  await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY);

  channel.consume(QUEUE_NAME, async (msg) => {
    if (!msg) return;

    try {
      const event = JSON.parse(msg.content.toString());
      await createPaymentFromBookingEvent(event);
      channel.ack(msg);
    } catch (err) {
      // A malformed payload will never parse/succeed no matter how many times
      // it's redelivered — requeueing it would spin forever, so it's dropped
      // (logged, not requeued). A transient failure (DB briefly down) looks
      // identical from here; a dead-letter queue is the real fix for
      // distinguishing the two, not built yet at this step.
      console.error("[rabbitmq] failed to process booking.created:", err.message);
      channel.nack(msg, false, false);
    }
  });

  console.log(`[rabbitmq] consuming ${ROUTING_KEY} on queue ${QUEUE_NAME}`);
}
