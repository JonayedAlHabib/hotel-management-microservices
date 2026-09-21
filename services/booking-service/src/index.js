import dotenv from "dotenv";
import { app } from "./app.js";
import { prisma } from "./db/prisma.js";
import { startExpiryJob } from "./jobs/expireHolds.js";
import { getChannel } from "./mq/connection.js";
import { startPaymentResultConsumer } from "./mq/consumers/paymentResult.consumer.js";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 4002;

prisma
  .$connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️ booking-service running at port : ${PORT}`);
    });
    startExpiryJob();
    // Connect at startup, not on the first booking — a broken RABBITMQ_URL
    // shows up in the logs immediately instead of silently on someone's first
    // real request. Non-fatal: publishBookingCreated already tolerates a
    // down broker on its own, this is just for an earlier signal.
    getChannel().catch((err) => console.error("[rabbitmq] initial connection failed:", err.message));
    startPaymentResultConsumer().catch((err) => console.error("[rabbitmq] consumer startup failed:", err.message));
  })
  .catch((err) => {
    console.log("Startup failed !!! ", err);
    process.exit(1);
  });
