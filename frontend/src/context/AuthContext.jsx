import { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await apiClient.get("/auth/get-me");
        setUser(res.data.data.user);
      } catch (err) {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [token]);

  async function register(payload) {
    const res = await apiClient.post("/auth/register", payload);
    const { token: newToken, user: newUser } = res.data.data;
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(newUser);
  }

  async function login(payload) {
    const res = await apiClient.post("/auth/login", payload);
    const { token: newToken, user: newUser } = res.data.data;
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(newUser);
  }

  async function logout() {
    try {
      await apiClient.post("/auth/logout");
    } finally {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
