"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Dumbbell,
  GraduationCap,
  Mail,
  TrendingUp,
} from "lucide-react";

import { LangSwitcher } from "@/components/layout/LangSwitcher";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import type { Role } from "@/lib/types";

export default function LoginPage() {
  const { t } = useI18n();
  const { user, login } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const [role, setRole] = useState<Role>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) router.replace("/app/dashboard");
  }, [user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast("error", t.errorRequired);
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      login(email.trim(), role);
      router.push("/app/dashboard");
    }, 450);
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <div className="fixed right-4 top-4 z-20">
        <LangSwitcher />
      </div>

      <div className="relative hidden w-1/2 overflow-hidden bg-primary-950 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <Image
          src="/images/misis-campus.jpg"
          alt="NUST MISIS campus"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/95 via-primary-900/85 to-primary-950/95" />
        <div className="relative flex items-center gap-3">
          <div className="flex items-center rounded-xl bg-white px-3 py-2 shadow-lg shadow-primary-950/40">
            <Image
              src="/images/misis-logo.png"
              alt="MISIS logo"
              width={1123}
              height={555}
              className="h-7 w-auto"
            />
          </div>
          <div className="leading-tight">
            <p className="text-lg font-bold text-white">{t.brand}</p>
            <p className="text-xs text-slate-300">{t.tagline}</p>
          </div>
        </div>

        <div className="relative">
          <h1 className="max-w-md text-3xl font-bold leading-snug text-white">
            {t.loginTitle}
          </h1>
          <p className="mt-3 max-w-md text-slate-300">{t.loginSubtitle}</p>
          <ul className="mt-8 space-y-4">
            {[
              { icon: Dumbbell, label: t.loginFeature1 },
              { icon: CalendarDays, label: t.loginFeature2 },
              { icon: TrendingUp, label: t.loginFeature3 },
            ].map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-slate-200">
                <span className="flex size-8 items-center justify-center rounded-lg bg-white/10 text-primary-300 ring-1 ring-white/10">
                  <Icon className="size-4" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-slate-500">
          © 2026 MISIS.FIT · {t.tagline}
        </p>
      </div>

      <div className="flex w-full items-center justify-center px-4 py-12 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex items-center rounded-xl bg-white px-3 py-2 shadow-lg shadow-primary-950/40">
              <Image
                src="/images/misis-logo.png"
                alt="MISIS logo"
                width={1123}
                height={555}
                className="h-7 w-auto"
              />
            </div>
            <div className="leading-tight">
              <p className="text-lg font-bold text-white">{t.brand}</p>
              <p className="text-xs text-slate-400">{t.tagline}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white p-6 shadow-2xl sm:p-8">
            <h2 className="text-xl font-bold text-slate-900">{t.loginTitle}</h2>
            <p className="mt-1 text-sm text-slate-500">{t.loginSubtitle}</p>

            <div className="mt-6 grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all",
                  role === "student"
                    ? "bg-white text-primary-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700",
                )}
              >
                <GraduationCap className="size-4" />
                {t.roleStudent}
              </button>
              <button
                type="button"
                onClick={() => setRole("teacher")}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all",
                  role === "teacher"
                    ? "bg-white text-primary-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700",
                )}
              >
                <GraduationCap className="size-4" />
                {t.roleTeacher}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <Input
                label={t.emailLabel}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                icon={<Mail className="size-4" />}
                autoComplete="email"
              />
              <Input
                label={t.passwordLabel}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.passwordPlaceholder}
                autoComplete="current-password"
              />
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-primary-600 hover:text-primary-700 hover:underline"
                >
                  {t.forgotPassword}
                </Link>
              </div>
              <Button type="submit" size="lg" className="w-full" loading={loading}>
                {t.signIn}
                <ArrowRight className="size-4" />
              </Button>
            </form>

            <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-primary-50 p-3 ring-1 ring-inset ring-primary-600/10">
              <ChevronRight className="mt-0.5 size-4 shrink-0 text-primary-500" />
              <p className="text-xs leading-relaxed text-primary-800">{t.demoHint}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
