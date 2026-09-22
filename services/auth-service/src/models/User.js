import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["GUEST", "ADMIN"], default: "GUEST" },
    isActive: { type: Boolean, default: true },
    // bumped on password change/reset — not read by requireAuth (that stays DB-free by design,
    // see requireAuth.js), it's bumped alongside revokeAllRefreshTokens() so it accurately
    // reflects "every token issued before this point should be considered stale"
    tokenVersion: { type: Number, default: 0 },
    address: { type: String, trim: true },
    nationality: { type: String, trim: true },
    idType: { type: String, trim: true },
    idNumber: { type: String, trim: true },
    // set by /auth/forgot-password, cleared by /auth/reset-password/:token — only the
    // SHA-256 hash is ever stored, the raw token exists only in the emailed link
    passwordResetTokenHash: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
