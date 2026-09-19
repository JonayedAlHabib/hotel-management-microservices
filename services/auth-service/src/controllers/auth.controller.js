import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

function signToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role, tokenVersion: user.tokenVersion },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );
}

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

  const token = signToken(user);
  res.status(201).json(new ApiResponse(201, { token, user: toPublicUser(user) }, "Registered successfully"));
}

// POST /auth/login
async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !user.isActive) {
    throw new ApiError(401, "Email or password is incorrect");
  }

  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) {
    throw new ApiError(401, "Email or password is incorrect");
  }

  const token = signToken(user);
  res.json(new ApiResponse(200, { token, user: toPublicUser(user) }, "Logged in successfully"));
}

// GET /auth/me — requires a valid bearer token
async function me(req, res) {
  const user = await User.findById(req.user.id);
  if (!user) throw new ApiError(404, "User not found");
  res.json(new ApiResponse(200, { user: toPublicUser(user) }, "Fetched current user"));
}

// POST /auth/logout — requires a valid bearer token (requireAuth sets req.user)
async function logout(req, res) {
  const user = await User.findById(req.user.id);
  if (!user) throw new ApiError(404, "User not found");

  // bumping this makes every token issued before now fail requireAuth's version check —
  // including the one this very request just used
  user.tokenVersion += 1;
  await user.save();

  res.json(new ApiResponse(200, null, "Logged out successfully"));
}

export { register, login, me, logout };
