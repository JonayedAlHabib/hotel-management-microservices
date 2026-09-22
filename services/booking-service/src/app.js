import express from "express";
import cors from "cors";
import multer from "multer";
import { ApiError } from "./utils/apiError.js";

const app = express();

app.use(cors());
app.use(express.json());

// Uploaded room type photos, served directly — e.g. GET /uploads/room-types/<uuid>.jpg.
// Public, no auth: same treatment as any other guest-facing static asset (matches
// UC-G07's photos being part of what a browsing, not-yet-logged-in visitor can see).
app.use("/uploads", express.static("uploads"));

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "booking-service" });
});

// Router import
import roomTypeRoutes from "./routes/roomType.routes.js";
import roomRoutes from "./routes/room.routes.js";
import availabilityRoutes from "./routes/availability.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import hotelConfigRoutes from "./routes/hotelConfig.routes.js";

// Router Declaration
app.use("/room-types", roomTypeRoutes);
app.use("/rooms", roomRoutes);
app.use("/availability", availabilityRoutes);
app.use("/bookings", bookingRoutes);
app.use("/hotel-config", hotelConfigRoutes);

app.use((err, req, res, next) => {
  // multer throws its own error type for things like "file too large" —
  // translated to the same 400 shape everything else uses, instead of falling
  // through to a generic 500 for what's really a client input problem.
  const isMulterError = err instanceof multer.MulterError;
  const statusCode = err instanceof ApiError ? err.statusCode : isMulterError ? 400 : 500;
  const message = isMulterError ? `Upload error: ${err.message}` : err.message || "Internal server error";

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
