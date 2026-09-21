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
  });
}

export function publishPaymentFailed(payment) {
  return publish("payment.failed", {
    reservationId: payment.reservationId,
    paymentId: payment.id,
    status: payment.status, // FAILED or CANCELLED — booking-service currently treats both as "do nothing, let the guest retry"
  });
}
