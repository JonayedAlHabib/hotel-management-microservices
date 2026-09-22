import express from "express";
import { getHotelConfig } from "../controllers/hotelConfig.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.get("/", asyncHandler(getHotelConfig));

export default router;
