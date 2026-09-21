import { createApiClient } from "./createApiClient";

const api = createApiClient(import.meta.env.VITE_API_URL || "http://localhost:4001");

export default api;
