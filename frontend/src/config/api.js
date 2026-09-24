const configuredGatewayUrl = import.meta.env.VITE_GATEWAY_URL;

export const API_BASE_URL = configuredGatewayUrl
  ? `${configuredGatewayUrl}/api`
  : import.meta.env.DEV
    ? "http://localhost:4000/api"
    : "/api";
