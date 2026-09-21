import { ApiResponse } from "../utils/apiResponse.js";
import {
  createPayment,
  getPaymentById,
  initiateCheckout,
  handleGatewayResult,
} from "../services/payment.service.js";

// POST /payments — manual create for testing this step; step 2 replaces this
// entry point with the "booking.created" RabbitMQ consumer. guestId always
// comes from the token, never the body, so a caller can't create a payment
// attributed to someone else.
async function createPaymentHandler(req, res) {
  const payment = await createPayment({ ...req.body, guestId: req.user.id });
  res.status(201).json(new ApiResponse(201, { payment }, "Payment created"));
}

// GET /payments/:id
async function getPaymentHandler(req, res) {
  const payment = await getPaymentById(req.params.id, { guestId: req.user.id, role: req.user.role });
  res.json(new ApiResponse(200, { payment }, "Fetched payment"));
}

// POST /payments/:id/initiate — GUEST (owner) or ADMIN
async function initiateCheckoutHandler(req, res) {
  const result = await initiateCheckout(req.params.id, {
    guestId: req.user.id,
    role: req.user.role,
    gateway: req.body.gateway,
  });
  res.json(new ApiResponse(200, result, "Checkout session created"));
}

// The three browser-redirect targets SSLCommerz posts back to, plus the
// server-to-server IPN — all four funnel through the same handleGatewayResult
// so whichever arrives first does the real work and the other is a no-op.
// These are public routes (no requireAuth): the gateway calls them directly,
// with no JWT of ours to present.
function redirectToFrontend(res, reservationId, outcome) {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  res.redirect(`${frontendUrl}/my-bookings?payment=${outcome}${reservationId ? `&reservationId=${reservationId}` : ""}`);
}

async function sslcommerzSuccessHandler(req, res) {
  const payment = await handleGatewayResult({
    tranId: req.body.tran_id,
    valId: req.body.val_id,
    rawStatus: req.body.status,
  });
  redirectToFrontend(res, payment?.reservationId, payment?.status === "SUCCESS" ? "success" : "failed");
}

async function sslcommerzFailHandler(req, res) {
  const payment = await handleGatewayResult({
    tranId: req.body.tran_id,
    valId: req.body.val_id,
    rawStatus: "FAILED",
  });
  redirectToFrontend(res, payment?.reservationId, "failed");
}

async function sslcommerzCancelHandler(req, res) {
  const payment = await handleGatewayResult({
    tranId: req.body.tran_id,
    valId: req.body.val_id,
    rawStatus: "CANCELLED",
  });
  redirectToFrontend(res, payment?.reservationId, "cancelled");
}

// Server-to-server — no browser to redirect, just acknowledge with 200.
async function sslcommerzIpnHandler(req, res) {
  await handleGatewayResult({
    tranId: req.body.tran_id,
    valId: req.body.val_id,
    rawStatus: req.body.status,
  });
  res.status(200).send("OK");
}

export {
  createPaymentHandler,
  getPaymentHandler,
  initiateCheckoutHandler,
  sslcommerzSuccessHandler,
  sslcommerzFailHandler,
  sslcommerzCancelHandler,
  sslcommerzIpnHandler,
};
