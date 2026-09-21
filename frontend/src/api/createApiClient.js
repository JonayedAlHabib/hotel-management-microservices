import axios from "axios";

const AUTH_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

// Refreshing always goes through auth-service, regardless of which client
// (auth or booking) triggered the 401 — booking-service has no /auth/refresh
// of its own, it only verifies the token auth-service issued.
async function refreshAccessToken(refreshToken) {
  const res = await axios.post(`${AUTH_BASE_URL}/auth/refresh`, { refreshToken });
  return res.data.data;
}

// One factory shared by every backend client (auth, booking, and later
// payment/notification) — each service gets its own axios instance pointed
// at its own baseURL, but they all attach the same access token and share
// the exact same silent-refresh-on-401 behavior. When api-gateway exists,
// every client this creates collapses into one instance pointed at the
// gateway's URL — this file is the only thing that changes.
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
