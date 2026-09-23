import { getChannel, EXCHANGE_NAME } from "../connection.js";
import { createNotificationFromEvent } from "../../services/notification.service.js";

const QUEUE_NAME = "notification_service.events";

// Explicit bindings, not one wildcard — "booking.created" is deliberately
// NOT bound (out of scope, see PROGRESS.md), so a "booking.*"/"payment.*"
// wildcard would over-match.
const ROUTING_KEYS = ["booking.confirmed", "booking.cancelled", "payment.succeeded", "payment.failed"];

export async function startNotificationEventsConsumer() {
  const channel = await getChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });
  for (const routingKey of ROUTING_KEYS) {
    await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, routingKey);
  }

  channel.consume(QUEUE_NAME, async (msg) => {
    if (!msg) return;

    try {
      const event = JSON.parse(msg.content.toString());
      await createNotificationFromEvent(msg.fields.routingKey, event);
      channel.ack(msg);
    } catch (err) {
      console.error(`[rabbitmq] failed to process ${msg.fields.routingKey}:`, err.message);
      channel.nack(msg, false, false);
    }
  });

  console.log(`[rabbitmq] consuming [${ROUTING_KEYS.join(", ")}] on queue ${QUEUE_NAME}`);
}
