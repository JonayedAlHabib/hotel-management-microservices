import express from "express";
import { register, login, me, logout } from "../controllers/auth.controller.js";
import { validateRegister, validateLogin } from "../middleware/validate.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { checkLoginRateLimit } from "../middleware/rateLimiter.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

// requireAuth and checkLoginRateLimit are both `async` (they call the DB / Redis), so both
// need asyncHandler — same reason the controllers do. A plain sync throw would still be
// auto-caught by Express, but an async one needs the explicit .catch(next) asyncHandler gives.
// Order matters on /login: validateLogin runs first so `email` is guaranteed to exist
// before checkLoginRateLimit tries to build a Redis key out of it.
router.post("/register", validateRegister, asyncHandler(register));
router.post("/login", validateLogin, asyncHandler(checkLoginRateLimit), asyncHandler(login));
router.get("/get-me", asyncHandler(requireAuth), asyncHandler(me));
router.post("/logout", asyncHandler(requireAuth), asyncHandler(logout));

export default router;
