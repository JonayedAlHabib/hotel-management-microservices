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

function userTokenSetKey(userId) {
  return `user-refresh-tokens:${userId}`;
}

// Not a JWT on purpose — it carries no information of its own, it's just a random
// id. Its only job is to be looked up in Redis; Redis is the actual source of truth
// for whether it's still valid, which is what makes it revocable (a JWT can't be
// "deleted" once issued — this can).
async function generateRefreshToken(user) {
  const token = crypto.randomBytes(40).toString("hex");
  const userId = user._id.toString();
  // read here, inside the function, not as a module-level constant — same reason
  // db/redis.js builds its client lazily: this file is imported before dotenv.config()
  // runs in index.js, so a top-level `process.env.X` read here would always be undefined
  const ttlSeconds = (Number(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS) || 7) * 24 * 60 * 60;
  await redisClient.set(`refresh:${token}`, userId, "EX", ttlSeconds);
  // tracked separately so revokeAllRefreshTokens(userId) can find every token
  // belonging to this user without a Redis KEYS scan
  await redisClient.sadd(userTokenSetKey(userId), token);
  await redisClient.expire(userTokenSetKey(userId), ttlSeconds);
  return token;
}

// Returns the userId the token belongs to, or null if it doesn't exist / already expired
async function verifyRefreshToken(token) {
  return redisClient.get(`refresh:${token}`);
}

async function revokeRefreshToken(token) {
  const userId = await redisClient.get(`refresh:${token}`);
  await redisClient.del(`refresh:${token}`);
  if (userId) {
    await redisClient.srem(userTokenSetKey(userId), token);
  }
}

// Kills every refresh token issued to this user, on every device — used when
// change-password/reset-password succeeds, so no other session can silently get
// a new access token again. The access token(s) already held by other sessions
// still work until they naturally expire (ACCESS_TOKEN_EXPIRES_IN) — same
// "isn't instant" tradeoff the existing single-token logout already accepts.
async function revokeAllRefreshTokens(userId) {
  const key = userTokenSetKey(userId);
  const tokens = await redisClient.smembers(key);
  if (tokens.length > 0) {
    await redisClient.del(...tokens.map((t) => `refresh:${t}`));
  }
  await redisClient.del(key);
}

export {
  signAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  revokeRefreshToken,
  revokeAllRefreshTokens,
};
