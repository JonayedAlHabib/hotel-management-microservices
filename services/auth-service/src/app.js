import express from "express";
import cors from "cors";
import { ApiError } from "./utils/apiError.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "auth-service" });
});


// Router import 
import authRoutes from "./routes/auth.routes.js";



// Router Declaration
app.use("/auth", authRoutes);

// centralized error handler — anything thrown or passed to next(err)
// anywhere in the app (sync middleware, or async via asyncHandler) lands here
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
