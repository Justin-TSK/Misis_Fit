"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { storage } from "@/lib/storage";
import { deriveNameFromEmail } from "@/lib/utils";
import type { Role, Session } from "@/lib/types";

interface AuthValue {
  user: Session | null;
  login: (email: string, role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Session | null>(null);

  useEffect(() => {
    // Hydrate the session from localStorage on mount (client only).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(storage.getSession());
  }, []);

  const login = useCallback((email: string, role: Role) => {
    const session: Session = {
      email,
      name: deriveNameFromEmail(email),
      role,
    };
    storage.setSession(session);
    setUser(session);
  }, []);

  const logout = useCallback(() => {
    storage.clearSession();
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
