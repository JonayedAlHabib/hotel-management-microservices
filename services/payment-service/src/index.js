import dotenv from "dotenv";
import { app } from "./app.js";
import { prisma } from "./db/prisma.js";
import { startBookingCreatedConsumer } from "./mq/consumers/bookingCreated.consumer.js";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 4003;

prisma
  .$connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️ payment-service running at port : ${PORT}`);
    });
    return startBookingCreatedConsumer();
  })
  .catch((err) => {
    console.log("Startup failed !!! ", err);
    process.exit(1);
  });
