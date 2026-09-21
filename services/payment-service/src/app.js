import express from "express";
import cors from "cors";
import { ApiError } from "./utils/apiError.js";

const app = express();

app.use(cors());
app.use(express.json());
// SSLCommerz posts success/fail/cancel/IPN callbacks as form-encoded bodies, not JSON.
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "payment-service" });
});

import paymentRoutes from "./routes/payment.routes.js";

app.use("/payments", paymentRoutes);

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
