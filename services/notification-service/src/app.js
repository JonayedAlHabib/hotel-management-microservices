import express from "express";
import cors from "cors";
import { ApiError } from "./utils/apiError.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "notification-service" });
});

import notificationRoutes from "./routes/notification.routes.js";

app.use("/notifications", notificationRoutes);

app.use((err, req, res, next) => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = err.message || "Internal server error";

  if (statusCode === 500) {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || [],
  });
});

export { app };
