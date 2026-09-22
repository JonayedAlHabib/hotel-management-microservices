import express from "express";
import {
  createPaymentHandler,
  getPaymentHandler,
  getPaymentByReservationHandler,
  initiateCheckoutHandler,
  sslcommerzSuccessHandler,
  sslcommerzFailHandler,
  sslcommerzCancelHandler,
  sslcommerzIpnHandler,
} from "../controllers/payment.controller.js";
import { validateCreatePayment, validateInitiateCheckout } from "../middleware/validate.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.post("/", requireAuth, validateCreatePayment, asyncHandler(createPaymentHandler));
router.get("/reservation/:reservationId", requireAuth, asyncHandler(getPaymentByReservationHandler));
router.get("/:id", requireAuth, asyncHandler(getPaymentHandler));
router.post("/:id/initiate", requireAuth, validateInitiateCheckout, asyncHandler(initiateCheckoutHandler));

// Public — SSLCommerz calls these directly, with no JWT of ours to present.
router.post("/sslcommerz/success", asyncHandler(sslcommerzSuccessHandler));
router.post("/sslcommerz/fail", asyncHandler(sslcommerzFailHandler));
router.post("/sslcommerz/cancel", asyncHandler(sslcommerzCancelHandler));
router.post("/sslcommerz/ipn", asyncHandler(sslcommerzIpnHandler));

export default router;
