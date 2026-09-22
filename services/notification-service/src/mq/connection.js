import amqplib from "amqplib";

export const EXCHANGE_NAME = "hotel_events";

let channel = null;
let connecting = null;

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
