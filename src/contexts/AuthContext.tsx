"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isDevMode: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  devLogin: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  const isDevMode = process.env.NODE_ENV === "development";

  useEffect(() => {
    const saved = localStorage.getItem("servio-user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {}
    }
    setMounted(true);
  }, []);

  const login = (email: string, password: string) => {
    // Auth API will be implemented later
    const devUser: User = {
      id: "dev-user-1",
      name: email.split("@")[0],
      email,
    };
    setUser(devUser);
    localStorage.setItem("servio-user", JSON.stringify(devUser));
  };

  const register = (name: string, email: string, password: string) => {
    const newUser: User = {
      id: "user-" + Date.now(),
      name,
      email,
    };
    setUser(newUser);
    localStorage.setItem("servio-user", JSON.stringify(newUser));
  };

  const devLogin = () => {
    const devUser: User = {
      id: "dev-user-1",
      name: "Dev User",
      email: "dev@servio.com",
    };
    setUser(devUser);
    localStorage.setItem("servio-user", JSON.stringify(devUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("servio-user");
  };

  if (!mounted) {
    return (
      <AuthContext.Provider value={{ user: null, isDevMode, login, register, devLogin, logout }}>
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isDevMode, login, register, devLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
