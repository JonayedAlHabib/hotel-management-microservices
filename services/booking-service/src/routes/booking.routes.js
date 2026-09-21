import express from "express";
import {
  createReservationHandler,
  listReservations,
  getReservation,
  cancelReservationHandler,
  modifyReservationHandler,
  assignRoomHandler,
  confirmReservationHandler,
  markNoShowHandler,
} from "../controllers/reservation.controller.js";
import {
  validateReservation,
  validateCancelReservation,
  validateModifyReservation,
  validateAssignRoom,
  validateConfirmReservation,
} from "../middleware/validate.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.use(requireAuth);

router.post("/", validateReservation, asyncHandler(createReservationHandler));
router.get("/", asyncHandler(listReservations));
router.get("/:id", asyncHandler(getReservation));
router.patch("/:id/cancel", validateCancelReservation, asyncHandler(cancelReservationHandler));
// The following four are admin-only in practice (enforced inside each service
// function, which is where UC-G12's "guest self-modify is P2" distinction is
// actually decided) rather than blocked at the route with requireRole — a
// guest hitting these gets a clear 403 from the same place cancel's admin
// rules live, not a generic route-level rejection.
router.patch("/:id", validateModifyReservation, asyncHandler(modifyReservationHandler));
router.patch("/:id/room", validateAssignRoom, asyncHandler(assignRoomHandler));
router.patch("/:id/confirm", validateConfirmReservation, asyncHandler(confirmReservationHandler));
router.patch("/:id/no-show", asyncHandler(markNoShowHandler));

export default router;
