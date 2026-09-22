import { createApiClient } from "./createApiClient";

const paymentApi = createApiClient(import.meta.env.VITE_PAYMENT_API_URL || "http://localhost:4003");

export default paymentApi;
