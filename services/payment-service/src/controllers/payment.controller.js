import { ApiResponse } from "../utils/apiResponse.js";
import {
  createPayment,
  createDepositPayment,
  createBalancePayment,
  listMyPayments,
  getInvoiceData,
  getPaymentById,
  getPaymentByReservationId,
  initiateCheckout,
  handleGatewayResult,
} from "../services/payment.service.js";
import { renderInvoice } from "../utils/invoice.js";

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

// GET /payments/reservation/:reservationId — payment is `null` (200, not 404)
// while the "booking.created" consumer hasn't created the row yet; the
// frontend polls this until it appears.
async function getPaymentByReservationHandler(req, res) {
  const payment = await getPaymentByReservationId(req.params.reservationId, {
    guestId: req.user.id,
    role: req.user.role,
  });
  res.json(new ApiResponse(200, { payment }, payment ? "Fetched payment" : "Payment not created yet"));
}

// POST /payments/reservation/:reservationId/deposit — UC-G13
async function createDepositPaymentHandler(req, res) {
  const payment = await createDepositPayment(req.params.reservationId, {
    guestId: req.user.id,
    role: req.user.role,
  });
  res.status(201).json(new ApiResponse(201, { payment }, "Deposit payment ready"));
}

// POST /payments/reservation/:reservationId/balance — UC-G13
async function createBalancePaymentHandler(req, res) {
  const payment = await createBalancePayment(req.params.reservationId, {
    guestId: req.user.id,
    role: req.user.role,
  });
  res.status(201).json(new ApiResponse(201, { payment }, "Balance payment ready"));
}

// GET /payments/mine?reservationId= — UC-G14
async function listMyPaymentsHandler(req, res) {
  const payments = await listMyPayments(req.user.id, { reservationId: req.query.reservationId });
  res.json(new ApiResponse(200, { payments }, "Fetched payment history"));
}

// POST /payments/reservation/:reservationId/invoice — UC-G14, streams a PDF
async function getInvoiceHandler(req, res) {
  const payments = await getInvoiceData(req.params.reservationId, {
    guestId: req.user.id,
    role: req.user.role,
  });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="invoice-${req.params.reservationId}.pdf"`);
  renderInvoice(res, { booking: req.body, payments });
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
  createDepositPaymentHandler,
  createBalancePaymentHandler,
  listMyPaymentsHandler,
  getInvoiceHandler,
  getPaymentHandler,
  getPaymentByReservationHandler,
  initiateCheckoutHandler,
  sslcommerzSuccessHandler,
  sslcommerzFailHandler,
  sslcommerzCancelHandler,
  sslcommerzIpnHandler,
};
