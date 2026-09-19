import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["GUEST", "ADMIN"], default: "GUEST" },
    isActive: { type: Boolean, default: true },
    // bumped on logout (and later, on password change) to invalidate every token issued before this point
    tokenVersion: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
