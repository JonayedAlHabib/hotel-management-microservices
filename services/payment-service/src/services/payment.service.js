import { prisma } from "../db/prisma.js";
import { ApiError } from "../utils/apiError.js";
import { PAYMENT_TRANSITIONS } from "../config/constants.js";
import { initiateSession, validateTransaction } from "../gateways/sslcommerz.js";
import { publishPaymentSucceeded, publishPaymentFailed } from "../mq/publisher.js";

// Manual create for now — step 2 replaces the caller with the "booking.created"
// RabbitMQ consumer, but the one-payment-per-reservation guarantee below stays
// the same either way.
async function createPayment({ reservationId, guestId, amount, currency, gateway }) {
  const existing = await prisma.payment.findUnique({ where: { reservationId } });
  if (existing) {
    throw new ApiError(409, "A payment already exists for this reservation");
  }

  return prisma.payment.create({
    data: {
      reservationId,
      guestId,
      amount,
      currency: currency || "BDT",
      gateway,
    },
  });
}

// Entry point for the "booking.created" RabbitMQ consumer — replaces manual
// POST /payments as how a Payment row actually comes into existence for a
// real booking. gateway is intentionally left unset: the guest hasn't chosen
// SSLCommerz vs bKash yet, that happens at the future "initiate checkout"
// step. Idempotent by design: RabbitMQ can redeliver a message (e.g. if the
// consumer crashes after processing but before acking), and a redelivery of
// an already-handled event must not throw — it just acks and moves on.
async function createPaymentFromBookingEvent({ reservationId, guestId, guestName, guestPhone, guestEmail, totalAmount, currency }) {
  const existing = await prisma.payment.findUnique({ where: { reservationId } });
  if (existing) return existing;

  return prisma.payment.create({
    data: {
      reservationId,
      guestId: guestId ?? null,
      guestName: guestName ?? null,
      guestPhone: guestPhone ?? null,
      guestEmail: guestEmail ?? null,
      amount: totalAmount,
      currency: currency || "BDT",
    },
  });
}

// Same "non-owner gets 404, never 403" rule booking-service uses for reservations.
async function getPaymentById(id, { guestId, role }) {
  const payment = await prisma.payment.findUnique({ where: { id } });
  if (!payment) throw new ApiError(404, "Payment not found");

  if (role !== "ADMIN" && payment.guestId !== guestId) {
    throw new ApiError(404, "Payment not found");
  }

  return payment;
}

// Lets the frontend find the Payment row created asynchronously by the
// "booking.created" consumer — all it has after POST /bookings is the
// reservationId, never the payment's own id. Same ownership rule as
// getPaymentById; a null return (not found yet) is expected while the
// consumer hasn't processed the event, the caller polls for it.
async function getPaymentByReservationId(reservationId, { guestId, role }) {
  const payment = await prisma.payment.findUnique({ where: { reservationId } });
  if (!payment) return null;

  if (role !== "ADMIN" && payment.guestId !== guestId) {
    return null;
  }

  return payment;
}

// POST /payments/:id/initiate — only SSLCommerz is wired up right now (bKash
// deliberately deferred). Allowed from INITIATED (first attempt) or from
// FAILED/CANCELLED (retry, same row — see PAYMENT_TRANSITIONS) via the same
// transition table cancel/confirm use in booking-service, not a hardcoded
// status list.
async function initiateCheckout(paymentId, { guestId, role, gateway }) {
  if (gateway !== "SSLCOMMERZ") {
    throw new ApiError(400, "Only SSLCOMMERZ is supported right now");
  }

  const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
  if (!payment) throw new ApiError(404, "Payment not found");
  if (role !== "ADMIN" && payment.guestId !== guestId) {
    throw new ApiError(404, "Payment not found");
  }

  const allowedNext = PAYMENT_TRANSITIONS[payment.status] || [];
  if (!allowedNext.includes("PENDING")) {
    throw new ApiError(409, `Cannot initiate checkout for a payment in ${payment.status} status`);
  }

  const apiResponse = await initiateSession(payment);
  if (!apiResponse?.GatewayPageURL) {
    throw new ApiError(502, "Gateway did not return a checkout URL", [], apiResponse);
  }

  const updated = await prisma.payment.update({
    where: { id: paymentId },
    data: { gateway: "SSLCOMMERZ", status: "PENDING" },
  });

  return { gatewayPageURL: apiResponse.GatewayPageURL, payment: updated };
}

// Shared by the success/fail/cancel browser-redirect handlers AND the IPN
// webhook — whichever arrives first "wins", the other is a safe no-op. This
// is also what makes the browser redirect trustworthy on its own on a local
// dev machine: SSLCommerz's IPN can't reach localhost without a tunnel, but
// the success redirect calls this exact same validating logic, not just a
// blind "trust the query string" shortcut.
async function handleGatewayResult({ tranId, valId, rawStatus }) {
  const payment = await prisma.payment.findUnique({ where: { id: tranId } });
  if (!payment) return null; // nothing we know about — logged by the caller

  const TERMINAL_OR_RETRYABLE_ALREADY_HANDLED = ["SUCCESS", "FAILED", "CANCELLED", "REFUNDED"];
  if (TERMINAL_OR_RETRYABLE_ALREADY_HANDLED.includes(payment.status)) {
    return payment; // already processed this attempt — redelivery/duplicate hit, not an error
  }

  // fail_url/cancel_url hits carry no val_id — there's nothing to validate,
  // the gateway itself is telling us the attempt didn't produce a transaction.
  if (!valId) {
    const status = rawStatus === "CANCELLED" ? "CANCELLED" : "FAILED";
    const updated = await prisma.payment.update({
      where: { id: tranId },
      data: { status, gatewayResponse: { rawStatus } },
    });
    if (status === "FAILED") await publishPaymentFailed(updated);
    return updated;
  }

  const validation = await validateTransaction(valId);
  const amountMatches = parseFloat(validation.amount) === parseFloat(payment.amount.toString());
  const isValid = ["VALID", "VALIDATED"].includes(validation.status) && amountMatches;

  if (isValid) {
    const updated = await prisma.payment.update({
      where: { id: tranId },
      data: { status: "SUCCESS", gatewayTranId: valId, gatewayResponse: validation },
    });
    await publishPaymentSucceeded(updated);
    return updated;
  }

  const updated = await prisma.payment.update({
    where: { id: tranId },
    data: { status: "FAILED", gatewayResponse: validation },
  });
  await publishPaymentFailed(updated);
  return updated;
}

export {
  createPayment,
  createPaymentFromBookingEvent,
  getPaymentById,
  getPaymentByReservationId,
  initiateCheckout,
  handleGatewayResult,
};
