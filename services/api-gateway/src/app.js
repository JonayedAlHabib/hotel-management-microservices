import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import { verifyTokenIfPresent } from "./middleware/verifyTokenIfPresent.js";
import { ApiError } from "./utils/apiError.js";
import { resolveTarget } from "./config/proxyTargets.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FRONTEND_DIST = process.env.FRONTEND_DIST_PATH || path.resolve(__dirname, "../../../frontend/dist");
const frontendDistExists = fs.existsSync(FRONTEND_DIST);

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

// Single-container deployment: the gateway also serves the built frontend
// (same origin as /api, so no CORS/absolute-URL juggling needed in
// production — see frontend/src/config/api.js). express.static handles real
// files (JS/CSS/images) and falls through via next() for anything it
// doesn't find; the regex route below then serves index.html for every
// other GET that isn't under /api, letting React Router handle client-side
// routes like /rooms/:id on a hard refresh. Both are no-ops in local dev,
// where frontend/dist doesn't exist.
if (frontendDistExists) {
  app.use(express.static(FRONTEND_DIST));
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(FRONTEND_DIST, "index.html"));
  });
}

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
