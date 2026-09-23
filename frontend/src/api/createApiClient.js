import axios from "axios";
import { API_BASE_URL } from "../config/api";

// Refreshing always goes through the gateway's /api/auth/refresh, regardless
// of which client (auth, booking, payment, notification) triggered the 401
// — every client points at the same gateway now, which routes this to
// auth-service; no service-specific special-casing needed.
async function refreshAccessToken(refreshToken) {
  const res = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
  return res.data.data;
}

// One factory shared by every backend client (auth, booking, payment,
// notification) — each used to point at its own service's port directly;
// now every client this creates points at the same api-gateway URL, and
// routing to the right service happens by path, inside the gateway.
function createApiClient(baseURL) {
  const api = axios.create({ baseURL });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      const isRefreshCall = originalRequest?.url?.includes("/auth/refresh");
      if (error.response?.status !== 401 || originalRequest._retry || isRefreshCall) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        const { accessToken, refreshToken: newRefreshToken } = await refreshAccessToken(refreshToken);

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(refreshError);
      }
    }
  );

  return api;
}

export { createApiClient };
