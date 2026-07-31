"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarDays,
  Dumbbell,
  FileText,
  LayoutDashboard,
  LogOut,
  Newspaper,
  TrendingUp,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";

import { LangSwitcher } from "@/components/layout/LangSwitcher";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

const NAV_ITEMS: {
  key: keyof import("@/i18n/dictionaries").Dictionary;
  href: string;
  icon: LucideIcon;
  student: boolean;
  teacher: boolean;
}[] = [
  { key: "navDashboard", href: "/app/dashboard", icon: LayoutDashboard, student: true, teacher: true },
  { key: "navSections", href: "/app/sections", icon: Dumbbell, student: true, teacher: false },
  { key: "navSchedule", href: "/app/schedule", icon: CalendarDays, student: true, teacher: true },
  { key: "navNews", href: "/app/news", icon: Newspaper, student: true, teacher: false },
  { key: "navProgress", href: "/app/progress", icon: TrendingUp, student: true, teacher: false },
  { key: "navGroups", href: "/app/groups", icon: Users, student: false, teacher: true },
  { key: "navReports", href: "/app/reports", icon: FileText, student: false, teacher: true },
];

function Brand({ dark }: { dark?: boolean }) {
  const { t } = useI18n();
  return (
    <Link href="/app/dashboard" className="flex items-center gap-3">
      <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-primary-700 text-white shadow-lg shadow-primary-950/40">
        <Dumbbell className="size-5" />
      </div>
      <div className="leading-tight">
        <p className={cn("text-base font-bold tracking-tight", dark ? "text-white" : "text-slate-900")}>
          {t.brand}
        </p>
        <p className={cn("text-[11px] font-medium", dark ? "text-slate-400" : "text-slate-500")}>
          {t.tagline}
        </p>
      </div>
    </Link>
  );
}

export function SidebarContent({
  role,
  onNavigate,
}: {
  role: "student" | "teacher";
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const { t } = useI18n();
  const { user, logout } = useAuth();
  const router = useRouter();

  const items = NAV_ITEMS.filter((item) =>
    role === "teacher" ? item.teacher : item.student,
  );

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 pb-6 pt-6">
        <Brand dark />
        <LangSwitcher />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-white",
              )}
            >
              <Icon className="size-4.5 shrink-0" />
              {t[item.key]}
              {active ? (
                <span className="ml-auto size-1.5 rounded-full bg-primary-400" />
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-500/30 text-white">
            <UserRound className="size-4.5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
              {user?.name ?? "—"}
            </p>
            <p className="truncate text-[11px] text-slate-400">
              {t.loggedInAs}:{" "}
              {role === "teacher" ? t.roleTeacher : t.roleStudent}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-sm font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut className="size-4" />
          {t.logout}
        </button>
      </div>
    </div>
  );
}

export function Sidebar({ role }: { role: "student" | "teacher" }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col bg-gradient-to-b from-primary-950 via-primary-900 to-primary-950 lg:flex">
      <SidebarContent role={role} />
    </aside>
  );
}
