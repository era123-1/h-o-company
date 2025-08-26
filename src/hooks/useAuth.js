import { useState, useEffect } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [hasRated, setHasRated] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const hasUserRated = localStorage.getItem("hasRated") === "true";
    if (savedUser) setUser(savedUser);
    setHasRated(hasUserRated);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("hasRated", false);
  };

  const logout = () => {
    setUser(null);
    setHasRated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("hasRated");
  };

  return { user, hasRated, login, logout, setHasRated };
};