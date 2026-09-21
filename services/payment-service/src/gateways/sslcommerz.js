import SSLCommerzPayment from "sslcommerz-lts";

const IS_LIVE = process.env.IS_LIVE === "true";

function client() {
  return new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWORD, IS_LIVE);
}

// SSLCommerz's init API requires customer name/email/phone/address — the
// booking flow doesn't collect a full address, so a fixed placeholder is used
// there (Dhaka/Bangladesh, since this is a single-hotel BD-only system); the
// contact fields that DO matter (name/email/phone) come from the guest's own
// booking details, carried over via the "booking.created" event.
async function initiateSession(payment) {
  const base = process.env.PAYMENT_SERVICE_URL;

  const data = {
    total_amount: Number(payment.amount),
    currency: payment.currency,
    tran_id: payment.id, // our own Payment.id — unique per attempt is not required here since retries reuse the same row/id
    success_url: `${base}/payments/sslcommerz/success`,
    fail_url: `${base}/payments/sslcommerz/fail`,
    cancel_url: `${base}/payments/sslcommerz/cancel`,
    ipn_url: `${base}/payments/sslcommerz/ipn`,
    shipping_method: "NO",
    product_name: "Hotel Reservation",
    product_category: "Hospitality",
    product_profile: "general",
    cus_name: payment.guestName || "Guest",
    cus_email: payment.guestEmail || "guest@example.com",
    cus_add1: "N/A",
    cus_city: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: payment.guestPhone || "01700000000",
  };

  return client().init(data);
}

// Server-to-server confirmation — the actual source of truth. Never trust a
// browser redirect's own query params alone; this is what makes that redirect
// trustworthy.
async function validateTransaction(valId) {
  return client().validate({ val_id: valId });
}

export { initiateSession, validateTransaction };
