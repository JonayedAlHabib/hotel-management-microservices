import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { recordFailedLogin, clearLoginAttempts } from "../middleware/rateLimiter.js";
import {
  signAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  revokeRefreshToken,
} from "../utils/tokenService.js";

function toPublicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };
}

// POST /auth/register — public form can only ever create the GUEST role
async function register(req, res) {
  const { name, email, phone, password } = req.body;

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    throw new ApiError(409, "Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, phone, passwordHash, role: "GUEST" });

  const accessToken = signAccessToken(user);
  const refreshToken = await generateRefreshToken(user);

  res
    .status(201)
    .json(new ApiResponse(201, { accessToken, refreshToken, user: toPublicUser(user) }, "Registered successfully"));
}

// POST /auth/login
async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !user.isActive) {
    await recordFailedLogin(email);
    throw new ApiError(401, "Email or password is incorrect");
  }

  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) {
    await recordFailedLogin(email);
    throw new ApiError(401, "Email or password is incorrect");
  }

  await clearLoginAttempts(email);

  const accessToken = signAccessToken(user);
  const refreshToken = await generateRefreshToken(user);

  res.json(new ApiResponse(200, { accessToken, refreshToken, user: toPublicUser(user) }, "Logged in successfully"));
}

// GET /auth/get-me — requires a valid access token
async function me(req, res) {
  const user = await User.findById(req.user.id);
  if (!user) throw new ApiError(404, "User not found");
  res.json(new ApiResponse(200, { user: toPublicUser(user) }, "Fetched current user"));
}

// POST /auth/refresh — trades a still-valid refresh token for a new access token.
// Rotates the refresh token too: the old one is revoked the instant a new one is
// issued, so a stolen-and-replayed refresh token breaks the real user's next
// refresh instead of quietly working forever.
async function refreshAccessToken(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    throw new ApiError(400, "Refresh token is required");
  }

  const userId = await verifyRefreshToken(refreshToken);
  if (!userId) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const user = await User.findById(userId);
  if (!user || !user.isActive) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  await revokeRefreshToken(refreshToken);
  const newAccessToken = signAccessToken(user);
  const newRefreshToken = await generateRefreshToken(user);

  res.json(
    new ApiResponse(200, { accessToken: newAccessToken, refreshToken: newRefreshToken }, "Token refreshed")
  );
}

// POST /auth/logout — requires a valid access token, and revokes the refresh token
// passed in the body. The access token used to call this stays valid until it
// naturally expires (up to ACCESS_TOKEN_EXPIRES_IN) — logout only stops FUTURE
// refreshes, it isn't instant. That's the accepted tradeoff of this pattern.
async function logout(req, res) {
  const { refreshToken } = req.body;
  if (refreshToken) {
    await revokeRefreshToken(refreshToken);
  }
  res.json(new ApiResponse(200, null, "Logged out successfully"));
}

export { register, login, me, logout, refreshAccessToken };
