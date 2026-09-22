import express from "express";
import {
  register,
  login,
  me,
  logout,
  refreshAccessToken,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import { validateRegister, validateLogin } from "../middleware/validate.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { checkLoginRateLimit, checkForgotPasswordRateLimit } from "../middleware/rateLimiter.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

// requireAuth is synchronous again (pure JWT verification, no DB/Redis lookup), so it
// no longer needs asyncHandler — Express catches a plain sync throw on its own.
// checkLoginRateLimit and every controller still call Redis/MongoDB, so they still do.
router.post("/register", validateRegister, asyncHandler(register));
router.post("/login", validateLogin, asyncHandler(checkLoginRateLimit), asyncHandler(login));
router.post("/refresh", asyncHandler(refreshAccessToken));
router.get("/get-me", requireAuth, asyncHandler(me));
router.post("/logout", requireAuth, asyncHandler(logout));

router.get("/profile", requireAuth, asyncHandler(getProfile));
router.patch("/profile", requireAuth, asyncHandler(updateProfile));
router.patch("/change-password", requireAuth, asyncHandler(changePassword));
router.post("/forgot-password", asyncHandler(checkForgotPasswordRateLimit), asyncHandler(forgotPassword));
router.post("/reset-password/:token", asyncHandler(resetPassword));

export default router;
