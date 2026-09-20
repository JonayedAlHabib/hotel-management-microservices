import jwt from "jsonwebtoken";
import crypto from "crypto";
import { redisClient } from "../db/redis.js";

function signAccessToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m" }
  );
}

// Not a JWT on purpose — it carries no information of its own, it's just a random
// id. Its only job is to be looked up in Redis; Redis is the actual source of truth
// for whether it's still valid, which is what makes it revocable (a JWT can't be
// "deleted" once issued — this can).
async function generateRefreshToken(user) {
  const token = crypto.randomBytes(40).toString("hex");
  // read here, inside the function, not as a module-level constant — same reason
  // db/redis.js builds its client lazily: this file is imported before dotenv.config()
  // runs in index.js, so a top-level `process.env.X` read here would always be undefined
  const ttlSeconds = (Number(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS) || 7) * 24 * 60 * 60;
  await redisClient.set(`refresh:${token}`, user._id.toString(), "EX", ttlSeconds);
  return token;
}

// Returns the userId the token belongs to, or null if it doesn't exist / already expired
async function verifyRefreshToken(token) {
  return redisClient.get(`refresh:${token}`);
}

async function revokeRefreshToken(token) {
  await redisClient.del(`refresh:${token}`);
}

export { signAccessToken, generateRefreshToken, verifyRefreshToken, revokeRefreshToken };
