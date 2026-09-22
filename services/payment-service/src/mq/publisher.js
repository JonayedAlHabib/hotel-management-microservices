import { getChannel, EXCHANGE_NAME } from "./connection.js";

async function publish(routingKey, payload) {
  try {
    const channel = await getChannel();
    channel.publish(EXCHANGE_NAME, routingKey, Buffer.from(JSON.stringify(payload)), {
      persistent: true,
      contentType: "application/json",
    });
  } catch (err) {
    console.error(`[rabbitmq] failed to publish ${routingKey}:`, err.message);
  }
}

export function publishPaymentSucceeded(payment) {
  return publish("payment.succeeded", {
    reservationId: payment.reservationId,
    paymentId: payment.id,
    status: "SUCCESS",
    gatewayTranId: payment.gatewayTranId,
    // UC-G13: DEPOSIT/BALANCE/FULL — booking-service's consumer doesn't
    // branch on this today (confirmReservationFromPayment is already
    // idempotent regardless of amount/type), but it's here for any future
    // consumer that wants to tell a deposit-confirmation apart from a
    // balance-settlement one.
    type: payment.type,
    // additive — notification-service needs these for a PAYMENT_CONFIRMED
    // notification; booking-service's existing consumer only reads
    // reservationId/status and ignores unknown fields, unaffected.
    guestId: payment.guestId,
    guestName: payment.guestName,
    guestEmail: payment.guestEmail,
  });
}

export function publishPaymentFailed(payment) {
  return publish("payment.failed", {
    reservationId: payment.reservationId,
    paymentId: payment.id,
    status: payment.status, // FAILED or CANCELLED — booking-service currently treats both as "do nothing, let the guest retry"
  });
}
