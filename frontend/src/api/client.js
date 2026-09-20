import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:4001",
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// If a request fails with 401 (access token expired — they only last 15 minutes),
// try ONE silent refresh using the stored refresh token, then retry the original
// request. If the refresh itself fails (refresh token missing/expired/revoked),
// give up and clear both tokens — the app's own auth state will notice and send
// the user to /login.
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        const isRefreshCall = originalRequest?.url?.includes("/auth/refresh")
        if (error.response?.status !== 401 || originalRequest._retry || isRefreshCall) {
            return Promise.reject(error)
        }

        originalRequest._retry = true

        const refreshToken = localStorage.getItem("refreshToken")
        if (!refreshToken) {
            return Promise.reject(error)
        }

        try {
            const res = await api.post("/auth/refresh", { refreshToken })
            const { accessToken, refreshToken: newRefreshToken } = res.data.data

            localStorage.setItem("accessToken", accessToken)
            localStorage.setItem("refreshToken", newRefreshToken)

            originalRequest.headers.Authorization = `Bearer ${accessToken}`
            return api(originalRequest)
        } catch (refreshError) {
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
            return Promise.reject(refreshError)
        }
    }
)

export default api
