import express from "express";
import { getAvailability } from "../controllers/availability.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.get("/", asyncHandler(getAvailability));

export default router;
