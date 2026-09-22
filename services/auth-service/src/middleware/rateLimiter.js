import { redisClient } from "../db/redis.js";
import { ApiError } from "../utils/apiError.js";

const MAX_ATTEMPTS = 5;
const WINDOW_SECONDS = 15 * 60; // 15 minutes — matches PRD UC-G02 AC3

const FORGOT_PASSWORD_MAX_ATTEMPTS = 3;
const FORGOT_PASSWORD_WINDOW_SECONDS = 15 * 60;

function attemptsKey(email) {
  return `login-attempts:${email.toLowerCase()}`;
}

function forgotPasswordKey(email) {
  return `forgot-password-attempts:${email.toLowerCase()}`;
}

// Runs BEFORE the login controller — rejects fast if this email is already locked out,
// so a locked account never even reaches bcrypt.compare.
async function checkLoginRateLimit(req, res, next) {
  const { email } = req.body;
  const key = attemptsKey(email);

  const attempts = await redisClient.get(key);

  if (attempts && Number(attempts) >= MAX_ATTEMPTS) {
    const ttl = await redisClient.ttl(key);
    const minutes = Math.max(1, Math.ceil(ttl / 60));
    throw new ApiError(429, `Too many failed login attempts. Try again in ${minutes} minute(s).`);
  }

  next();
}

// Called by the controller itself on a failed password check — INCR is atomic, so
// concurrent failed attempts for the same email can never race past the limit.
async function recordFailedLogin(email) {
  const key = attemptsKey(email);
  const attempts = await redisClient.incr(key);
  if (attempts === 1) {
    // only the request that just created this key sets its expiry —
    // later increments extend nothing, so the 15-minute window is fixed from the first failure
    await redisClient.expire(key, WINDOW_SECONDS);
  }
}

// Called by the controller on a successful login — a correct password should
// clear any partial failure count, not leave the user sitting close to the limit.
async function clearLoginAttempts(email) {
  await redisClient.del(attemptsKey(email));
}

// Same pattern as checkLoginRateLimit, applied to forgot-password requests — stops
// an attacker from hammering the endpoint to spam a victim's inbox with reset emails.
async function checkForgotPasswordRateLimit(req, res, next) {
  const { email } = req.body;
  if (!email) return next();

  const key = forgotPasswordKey(email);
  const attempts = await redisClient.incr(key);
  if (attempts === 1) {
    await redisClient.expire(key, FORGOT_PASSWORD_WINDOW_SECONDS);
  }

  if (attempts > FORGOT_PASSWORD_MAX_ATTEMPTS) {
    const ttl = await redisClient.ttl(key);
    const minutes = Math.max(1, Math.ceil(ttl / 60));
    throw new ApiError(429, `Too many reset requests. Try again in ${minutes} minute(s).`);
  }

  next();
}

export {
  checkLoginRateLimit,
  recordFailedLogin,
  clearLoginAttempts,
  checkForgotPasswordRateLimit,
};
