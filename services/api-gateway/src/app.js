import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import { verifyTokenIfPresent } from "./middleware/verifyTokenIfPresent.js";
import { ApiError } from "./utils/apiError.js";
import { resolveTarget } from "./config/proxyTargets.js";

const app = express();

app.use(cors());


app.get("/health", (req, res) => {
  res.json({ ok: true, service: "api-gateway" });
});


app.use("/api", verifyTokenIfPresent);


app.use("/api", (req, res, next) => {
  if (!resolveTarget(req.path)) return next(new ApiError(404, "Not found"));
  next();
});

app.use(
  "/api",
  createProxyMiddleware({
    changeOrigin: true,
    router: (req) => resolveTarget(req.path),
  })
);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Not found" });
});

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
