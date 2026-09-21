import express from "express";
import {
  createRoomType,
  listRoomTypes,
  getRoomType,
  deactivateRoomType,
  reactivateRoomType,
  uploadRoomTypePhotos,
  deleteRoomTypePhoto,
} from "../controllers/roomType.controller.js";
import { validateRoomType } from "../middleware/validate.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";
import { upload } from "../middleware/upload.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.post("/", requireAuth, requireRole("ADMIN"), validateRoomType, asyncHandler(createRoomType));
router.get("/", asyncHandler(listRoomTypes));
router.get("/:id", asyncHandler(getRoomType));
router.patch("/:id/deactivate", requireAuth, requireRole("ADMIN"), asyncHandler(deactivateRoomType));
router.patch("/:id/reactivate", requireAuth, requireRole("ADMIN"), asyncHandler(reactivateRoomType));
router.post("/:id/photos", requireAuth, requireRole("ADMIN"), upload.array("photos", 10), asyncHandler(uploadRoomTypePhotos));
router.delete("/:id/photos/:photoId", requireAuth, requireRole("ADMIN"), asyncHandler(deleteRoomTypePhoto));

export default router;
