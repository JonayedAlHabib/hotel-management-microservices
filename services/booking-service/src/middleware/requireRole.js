import { ApiError } from "../utils/apiError.js";

// Must run after requireAuth — reads req.user set by it.
function requireRole(...roles) {
  return function (req, res, next) {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new ApiError(403, "Insufficient permissions");
    }
    next();
  };
}

export { requireRole };
