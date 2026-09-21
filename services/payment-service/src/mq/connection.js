import amqplib from "amqplib";

// One topic exchange shared by every service — a service publishes an event
// once and doesn't need to know who (if anyone) is listening. New listeners
// just declare their own queue and bind it, with no change to the publisher.
export const EXCHANGE_NAME = "hotel_events";

let channel = null;
let connecting = null;

// RabbitMQ connections drop (network blip, broker restart) — reconnecting
// automatically here means every consumer/publisher that calls getChannel()
// doesn't have to carry its own retry logic.
async function connect() {
  const connection = await amqplib.connect(process.env.RABBITMQ_URL);

  connection.on("error", (err) => {
    console.error("[rabbitmq] connection error:", err.message);
  });
  connection.on("close", () => {
    console.error("[rabbitmq] connection closed, will reconnect on next use");
    channel = null;
    connecting = null;
  });

  const ch = await connection.createChannel();
  await ch.assertExchange(EXCHANGE_NAME, "topic", { durable: true });
  return ch;
}

// Concurrent callers during a reconnect share the same in-flight connect
// attempt instead of each opening their own connection.
export async function getChannel() {
  if (channel) return channel;
  if (!connecting) {
    connecting = connect()
      .then((ch) => {
        channel = ch;
        return ch;
      })
      .catch((err) => {
        connecting = null;
        throw err;
      });
  }
  return connecting;
}
