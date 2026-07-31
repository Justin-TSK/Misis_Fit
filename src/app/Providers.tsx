"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { AuthProvider, useAuth } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";
import { ToastProvider } from "@/context/ToastContext";
import { I18nProvider } from "@/i18n";
import type { Role } from "@/lib/types";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <ToastProvider>
        <AuthProvider>
          <DataProvider>{children}</DataProvider>
        </AuthProvider>
      </ToastProvider>
    </I18nProvider>
  );
}

export function AuthGate({
  children,
  requireRole,
}: {
  children: React.ReactNode;
  requireRole?: Role;
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }
    if (requireRole && user.role !== requireRole) {
      router.replace("/app/dashboard");
    }
  }, [user, requireRole, router]);

  if (!user) return null;
  if (requireRole && user.role !== requireRole) return null;

  return <>{children}</>;
}
