import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = checking, false = logged out
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("rlk_token");
    if (!token) {
      setUser(false);
      setLoading(false);
      return;
    }
    api
      .get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("rlk_token");
        setUser(false);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (username, password) => {
    const res = await api.post("/auth/login", { username, password });
    localStorage.setItem("rlk_token", res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const register = async ({ name, username, password, role, grade }) => {
    const res = await api.post("/auth/register", { name, username, password, role, grade });
    localStorage.setItem("rlk_token", res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = () => {
    localStorage.removeItem("rlk_token");
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
