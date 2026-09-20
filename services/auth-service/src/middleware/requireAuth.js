import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";

// Pure, synchronous JWT verification — no DB or Redis lookup per request anymore.
// That's safe now specifically because access tokens are short-lived
// (ACCESS_TOKEN_EXPIRES_IN, default 15m): a stolen or "should be revoked" access
// token dies on its own soon regardless. Revocation lives at the refresh-token
// layer (Redis) instead — see tokenService.js and the /auth/refresh, /auth/logout
// controllers.
function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    throw new ApiError(401, "Missing bearer token");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token");
  }
}

export { requireAuth };
