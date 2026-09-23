import bcrypt from "bcryptjs";
import crypto from "crypto";
import { User } from "../models/User.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { recordFailedLogin, clearLoginAttempts } from "../middleware/rateLimiter.js";
import { sendPasswordResetEmail } from "../utils/mailer.js";
import { PASSWORD_RE, ID_TYPES, NID_RE, PASSPORT_RE } from "../middleware/validate.js";
import {
  signAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  revokeRefreshToken,
  revokeAllRefreshTokens,
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

// last 4 chars visible, everything before masked — no reveal-permission logic here,
// that's a separate, later feature
function maskIdNumber(idNumber) {
  if (!idNumber) return idNumber;
  const visible = idNumber.slice(-4);
  return "•".repeat(Math.max(idNumber.length - 4, 0)) + visible;
}

function toProfile(user) {
  return {
    ...toPublicUser(user),
    address: user.address,
    nationality: user.nationality,
    idType: user.idType,
    idNumber: maskIdNumber(user.idNumber),
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

// GET /auth/profile — requireAuth
async function getProfile(req, res) {
  const user = await User.findById(req.user.id);
  if (!user) throw new ApiError(404, "User not found");
  res.json(new ApiResponse(200, { user: toProfile(user) }, "Fetched profile"));
}

// PATCH /auth/profile — requireAuth. Email is not editable here: it's the login identity.
async function updateProfile(req, res) {
  const { name, phone, address, nationality, idType, idNumber } = req.body;

  const user = await User.findById(req.user.id);
  if (!user) throw new ApiError(404, "User not found");

  if (name !== undefined) {
    if (!name.trim()) throw new ApiError(400, "Name cannot be empty");
    user.name = name;
  }
  if (phone !== undefined) user.phone = phone;
  if (address !== undefined) user.address = address;
  if (nationality !== undefined) user.nationality = nationality;

  if (idType !== undefined && idType !== "" && !ID_TYPES.includes(idType)) {
    throw new ApiError(400, "ID Type must be NID or Passport");
  }

  // GET /auth/profile masks idNumber (e.g. "••••••7890"). If the client resubmits
  // that unchanged masked value (user never touched the field), treat it as a
  // no-op rather than trying to validate/store the mask itself as a real ID number.
  const idNumberUnchanged = idNumber !== undefined && idNumber === maskIdNumber(user.idNumber);

  if (idNumber !== undefined && !idNumberUnchanged && idNumber !== "") {
    const effectiveType = idType !== undefined ? idType : user.idType;
    if (!effectiveType) {
      throw new ApiError(400, "Select an ID Type before entering an ID number");
    }
    const normalized = idNumber.toUpperCase();
    if (effectiveType === "NID" && !NID_RE.test(normalized)) {
      throw new ApiError(400, "NID number must be exactly 10, 13, or 17 digits");
    }
    if (effectiveType === "PASSPORT" && !PASSPORT_RE.test(normalized)) {
      throw new ApiError(400, "Passport number must be 1-2 letters followed by 6-7 digits");
    }
  }

  if (idType !== undefined) user.idType = idType;
  if (idNumber !== undefined && !idNumberUnchanged) user.idNumber = idNumber;

  await user.save();

  res.json(new ApiResponse(200, { user: toProfile(user) }, "Profile updated"));
}

// PATCH /auth/change-password — requireAuth. Revokes every refresh token for this
// user on success, so every other session is force-logged-out within
// ACCESS_TOKEN_EXPIRES_IN of its current access token expiring.
async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "Current password and new password are required");
  }
  if (!PASSWORD_RE.test(newPassword)) {
    throw new ApiError(400, "New password must be at least 8 characters and include a letter and a number");
  }

  const user = await User.findById(req.user.id);
  if (!user) throw new ApiError(404, "User not found");

  const matches = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!matches) {
    throw new ApiError(401, "Current password is incorrect");
  }

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  user.tokenVersion += 1;
  await user.save();

  await revokeAllRefreshTokens(user._id.toString());

  res.json(new ApiResponse(200, null, "Password changed successfully"));
}

// POST /auth/forgot-password — public, rate-limited. Always returns a generic
// message regardless of whether the email exists, to avoid account enumeration.
async function forgotPassword(req, res) {
  const { email } = req.body;
  if (!email) throw new ApiError(400, "Email is required");

  const genericMessage = "If an account exists for that email, a reset link has been sent";

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    res.json(new ApiResponse(200, null, genericMessage));
    return;
  }

  const rawToken = crypto.randomBytes(32).toString("hex");
  user.passwordResetTokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
  user.passwordResetExpires = new Date(Date.now() + 30 * 60 * 1000);
  await user.save();

  const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password/${rawToken}`;
  await sendPasswordResetEmail(user.email, resetUrl);

  res.json(new ApiResponse(200, null, genericMessage));
}

// POST /auth/reset-password/:token — public. Revokes every refresh token for this
// user on success, same as change-password.
async function resetPassword(req, res) {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!newPassword || !PASSWORD_RE.test(newPassword)) {
    throw new ApiError(400, "Password must be at least 8 characters and include a letter and a number");
  }

  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetTokenHash: tokenHash,
    passwordResetExpires: { $gt: new Date() },
  }).select("+passwordResetTokenHash +passwordResetExpires");

  if (!user) {
    throw new ApiError(400, "Reset link is invalid or has expired");
  }

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  user.tokenVersion += 1;
  user.passwordResetTokenHash = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  await revokeAllRefreshTokens(user._id.toString());

  res.json(new ApiResponse(200, null, "Password reset successfully"));
}

export {
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
};
