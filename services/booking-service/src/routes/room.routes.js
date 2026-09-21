import express from "express";
import { createRoom, listRooms, updateRoomStatus, deactivateRoom, reactivateRoom } from "../controllers/room.controller.js";
import { validateRoom, validateRoomStatus } from "../middleware/validate.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.use(requireAuth, requireRole("ADMIN")); // rooms are operational data, not guest-facing

router.post("/", validateRoom, asyncHandler(createRoom));
router.get("/", asyncHandler(listRooms));
router.patch("/:id/status", validateRoomStatus, asyncHandler(updateRoomStatus));
router.patch("/:id/deactivate", asyncHandler(deactivateRoom));
router.patch("/:id/reactivate", asyncHandler(reactivateRoom));

export default router;
