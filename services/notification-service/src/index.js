import dotenv from "dotenv";
import { app } from "./app.js";
import { prisma } from "./db/prisma.js";
import { startNotificationEventsConsumer } from "./mq/consumers/events.consumer.js";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 4004;

prisma
  .$connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️ notification-service running at port : ${PORT}`);
    });
    return startNotificationEventsConsumer();
  })
  .catch((err) => {
    console.log("Startup failed !!! ", err);
    process.exit(1);
  });
