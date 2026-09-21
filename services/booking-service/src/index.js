import dotenv from "dotenv";
import { app } from "./app.js";
import { prisma } from "./db/prisma.js";
import { startExpiryJob } from "./jobs/expireHolds.js";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 4002;

prisma
  .$connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️ booking-service running at port : ${PORT}`);
    });
    startExpiryJob();
  })
  .catch((err) => {
    console.log("Startup failed !!! ", err);
    process.exit(1);
  });
