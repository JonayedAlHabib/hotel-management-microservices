import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";


function verifyTokenIfPresent(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return next();

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.sub, role: payload.role }; // gateway-side only, e.g. for logging
    next();
  } catch (err) {
    next(new ApiError(401, "Invalid or expired token"));
  }
}

export { verifyTokenIfPresent };
