import { createApiClient } from "./createApiClient";

const notificationApi = createApiClient(import.meta.env.VITE_NOTIFICATION_API_URL || "http://localhost:4004");

export default notificationApi;
