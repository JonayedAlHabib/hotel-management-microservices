import { ApiError } from "../utils/apiError.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_RE = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/; // 8+ chars, at least one letter and one number

const ID_TYPES = ["NID", "PASSPORT"];
const NID_RE = /^(\d{10}|\d{13}|\d{17})$/; // Bangladeshi NID: 10, 13, or 17 digits, nothing else
const PASSPORT_RE = /^[A-Z]{1,2}\d{6,7}$/; // e.g. Bangladeshi passport "BN0123456": 1-2 letters + 6-7 digits

function validateRegister(req, res, next) {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || !name.trim()) errors.push({ field: "name", message: "Name is required" });
  if (!email || !EMAIL_RE.test(email)) errors.push({ field: "email", message: "A valid email is required" });
  if (!password || !PASSWORD_RE.test(password)) {
    errors.push({
      field: "password",
      message: "Password must be at least 8 characters and include a letter and a number",
    });
  }

  if (errors.length > 0) {
    throw new ApiError(400, "Validation failed", errors);
  }
  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }
  next();
}

export { validateRegister, validateLogin, PASSWORD_RE, ID_TYPES, NID_RE, PASSPORT_RE };
