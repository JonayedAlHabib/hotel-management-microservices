import { createApiClient } from "./createApiClient";

const bookingApi = createApiClient(import.meta.env.VITE_BOOKING_API_URL || "http://localhost:4002");

export default bookingApi;
