import express from "express";
import { getHotelConfig, updateHotelConfig } from "../controllers/hotelConfig.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";
import { validateHotelConfig } from "../middleware/validate.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.get("/", asyncHandler(getHotelConfig));
router.patch("/", requireAuth, requireRole("ADMIN"), validateHotelConfig, asyncHandler(updateHotelConfig));

export default router;
