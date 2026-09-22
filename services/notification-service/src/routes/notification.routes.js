import express from "express";
import { listNotificationsHandler, markAsReadHandler, markAllAsReadHandler } from "../controllers/notification.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.get("/", requireAuth, asyncHandler(listNotificationsHandler));
router.patch("/read-all", requireAuth, asyncHandler(markAllAsReadHandler));
router.patch("/:id/read", requireAuth, asyncHandler(markAsReadHandler));

export default router;
