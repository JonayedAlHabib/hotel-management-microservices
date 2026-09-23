// Single source of truth for the gateway's base URL — every backend request
// (axios calls via createApiClient, and raw <img src> URLs for room-type and
// hotel photos) goes through this one address now, routed by api-gateway to
// the right service, instead of 4 separate service ports.
export const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL || "http://localhost:4000";
export const API_BASE_URL = `${GATEWAY_URL}/api`;
