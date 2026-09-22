import { prisma } from "../db/prisma.js";
import { ApiError } from "../utils/apiError.js";
import { PAYMENT_TRANSITIONS, DEPOSIT_PERCENT_BP } from "../config/constants.js";
import { initiateSession, validateTransaction } from "../gateways/sslcommerz.js";
import { publishPaymentSucceeded, publishPaymentFailed } from "../mq/publisher.js";

// Manual create for now — step 2 replaces the caller with the "booking.created"
// RabbitMQ consumer, but the one-FULL-payment-per-reservation guarantee below
// stays the same either way (DEPOSIT/BALANCE rows are created by their own
// dedicated functions below, never through this one).
async function createPayment({ reservationId, guestId, amount, currency, gateway }) {
  const existing = await prisma.payment.findFirst({ where: { reservationId, type: "FULL" } });
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
//
// Scoped to type: "FULL" specifically (not just reservationId, which is no
// longer unique once UC-G13's deposit/balance rows exist) — this consumer's
// job is unchanged: create/find THE one full-amount row for this reservation,
// exactly as before. A redelivered event still finds the same row and
// returns it; it never creates or interacts with a DEPOSIT/BALANCE row.
async function createPaymentFromBookingEvent({ reservationId, guestId, guestName, guestPhone, guestEmail, totalAmount, currency }) {
  const existing = await prisma.payment.findFirst({ where: { reservationId, type: "FULL" } });
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
      type: "FULL",
    },
  });
}

// UC-G13 — a guest may choose to pay a deposit instead of the full amount.
// Guarded the same way createPaymentFromBookingEvent guards against
// duplicates: reuse an existing DEPOSIT row if one's already there (never
// create a second), and refuse outright if this reservation is already paid
// in full or already has a successful deposit (nothing left to "deposit" on).
async function createDepositPayment(reservationId, { guestId, role }) {
  const fullPayment = await prisma.payment.findFirst({ where: { reservationId, type: "FULL" } });
  if (!fullPayment) throw new ApiError(404, "Payment not found for this reservation");
  if (role !== "ADMIN" && fullPayment.guestId !== guestId) {
    throw new ApiError(404, "Payment not found for this reservation");
  }

  const anySuccess = await prisma.payment.findFirst({ where: { reservationId, status: "SUCCESS" } });
  if (anySuccess) {
    throw new ApiError(409, "This reservation already has a successful payment");
  }

  const existingDeposit = await prisma.payment.findFirst({ where: { reservationId, type: "DEPOSIT" } });
  if (existingDeposit) return existingDeposit;

  const depositAmount = (Number(fullPayment.amount) * DEPOSIT_PERCENT_BP) / 10000;

  return prisma.payment.create({
    data: {
      reservationId,
      guestId: fullPayment.guestId,
      guestName: fullPayment.guestName,
      guestPhone: fullPayment.guestPhone,
      guestEmail: fullPayment.guestEmail,
      amount: depositAmount.toFixed(2),
      currency: fullPayment.currency,
      type: "DEPOSIT",
    },
  });
}

// UC-G13 — the remaining balance after a successful deposit. Only creatable
// once the deposit has actually succeeded (there's nothing to "balance"
// against otherwise), and only once (reuses an existing row the same way
// createDepositPayment does).
async function createBalancePayment(reservationId, { guestId, role }) {
  const fullPayment = await prisma.payment.findFirst({ where: { reservationId, type: "FULL" } });
  if (!fullPayment) throw new ApiError(404, "Payment not found for this reservation");
  if (role !== "ADMIN" && fullPayment.guestId !== guestId) {
    throw new ApiError(404, "Payment not found for this reservation");
  }

  const successfulDeposit = await prisma.payment.findFirst({
    where: { reservationId, type: "DEPOSIT", status: "SUCCESS" },
  });
  if (!successfulDeposit) {
    throw new ApiError(409, "No successful deposit payment found for this reservation");
  }

  const existingBalance = await prisma.payment.findFirst({ where: { reservationId, type: "BALANCE" } });
  if (existingBalance) return existingBalance;

  const balanceAmount = Number(fullPayment.amount) - Number(successfulDeposit.amount);
  if (balanceAmount <= 0) {
    throw new ApiError(409, "No remaining balance for this reservation");
  }

  return prisma.payment.create({
    data: {
      reservationId,
      guestId: fullPayment.guestId,
      guestName: fullPayment.guestName,
      guestPhone: fullPayment.guestPhone,
      guestEmail: fullPayment.guestEmail,
      amount: balanceAmount.toFixed(2),
      currency: fullPayment.currency,
      type: "BALANCE",
    },
  });
}

// UC-G14 — every payment belonging to the authenticated guest, optionally
// narrowed to one reservation. Always self-scoped by guestId; there's no
// "ADMIN sees everyone's" branch because this is specifically the guest's
// own payment-history view, not an admin report.
async function listMyPayments(guestId, { reservationId } = {}) {
  return prisma.payment.findMany({
    where: { guestId, ...(reservationId ? { reservationId } : {}) },
    orderBy: { createdAt: "desc" },
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
//
// Picks the MOST RECENTLY UPDATED row for this reservation, not just the
// FULL one — since UC-G13 lets a guest choose deposit-vs-full on the same
// new-booking flow this is polled from (PaymentPage.jsx), "the payment for
// this reservation" now legitimately means "whichever row just succeeded."
// Right after booking creation there's only the freshly-created FULL row, so
// this is unchanged for the plain full-payment path; once a DEPOSIT row is
// chosen and succeeds, its updatedAt becomes the newest and it's correctly
// picked up instead.
async function getPaymentByReservationId(reservationId, { guestId, role }) {
  const payment = await prisma.payment.findFirst({
    where: { reservationId, ...(role !== "ADMIN" ? { guestId } : {}) },
    orderBy: { updatedAt: "desc" },
  });
  return payment ?? null;
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

// UC-G14 — invoice PDF. `booking` is descriptive-only text the caller
// supplies (room name/dates/nights — display text, never money); the actual
// payment line items and total paid come from this service's own DB for
// this reservationId+guestId, never from the request body.
async function getInvoiceData(reservationId, { guestId, role }) {
  const payments = await prisma.payment.findMany({
    where: { reservationId, ...(role !== "ADMIN" ? { guestId } : {}) },
    orderBy: { createdAt: "asc" },
  });
  if (payments.length === 0) {
    throw new ApiError(404, "No payments found for this reservation");
  }
  return payments;
}

export {
  createPayment,
  createPaymentFromBookingEvent,
  createDepositPayment,
  createBalancePayment,
  listMyPayments,
  getInvoiceData,
  getPaymentById,
  getPaymentByReservationId,
  initiateCheckout,
  handleGatewayResult,
};
