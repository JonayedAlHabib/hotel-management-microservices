import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/User.js";

async function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    throw new ApiError(401, "Missing bearer token");
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token");
  }

  // signature/expiry alone isn't enough — also check the token hasn't been
  // logged out since it was issued (its tokenVersion must match the user's current one)
  const user = await User.findById(payload.sub);
  if (!user || !user.isActive || user.tokenVersion !== payload.tokenVersion) {
    throw new ApiError(401, "Session expired, please log in again");
  }

  req.user = { id: user._id.toString(), role: user.role };
  next();
}

export { requireAuth };
