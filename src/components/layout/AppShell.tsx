"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

import { LangSwitcher } from "@/components/layout/LangSwitcher";
import { SidebarContent } from "@/components/layout/Sidebar";
import { useI18n } from "@/i18n";

export function AppShell({
  role,
  children,
}: {
  role: "student" | "teacher";
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col bg-gradient-to-b from-primary-950 via-primary-900 to-primary-950 lg:flex">
        <SidebarContent role={role} />
      </aside>

      <div
        className={
          open
            ? "fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm lg:hidden"
            : "hidden"
        }
        onClick={() => setOpen(false)}
      />

      <aside
        className={
          open
            ? "fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-gradient-to-b from-primary-950 via-primary-900 to-primary-950 transition-transform lg:hidden"
            : "fixed inset-y-0 left-0 z-50 flex w-72 -translate-x-full flex-col bg-gradient-to-b from-primary-950 via-primary-900 to-primary-950 transition-transform lg:hidden"
        }
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"
          aria-label="Close menu"
        >
          <X className="size-5" />
        </button>
        <SidebarContent role={role} onNavigate={() => setOpen(false)} />
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:hidden">
          <button
            onClick={() => setOpen(true)}
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
          <p className="text-sm font-bold text-slate-900">{t.brand}</p>
          <LangSwitcher />
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
