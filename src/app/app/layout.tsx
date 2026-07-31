"use client";

import { useAuth } from "@/context/AuthContext";
import { AppShell } from "@/components/layout/AppShell";
import { AuthGate } from "@/app/Providers";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  return (
    <AuthGate>
      <AppShell role={user?.role === "teacher" ? "teacher" : "student"}>
        {children}
      </AppShell>
    </AuthGate>
  );
}
