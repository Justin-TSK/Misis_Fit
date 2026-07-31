"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, KeyRound, Mail, Send } from "lucide-react";

import { LangSwitcher } from "@/components/layout/LangSwitcher";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useI18n } from "@/i18n";

const MOCK_CODE = "123456";

export default function ForgotPasswordPage() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError(t.errorInvalidEmail);
      return;
    }
    setError(null);
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setStep("code");
      setMessage(t.forgotCodeSent);
    }, 400);
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() !== MOCK_CODE) {
      setError(t.errorInvalidCode);
      return;
    }
    if (newPassword.length < 6) {
      setError(t.errorWeakPassword);
      return;
    }
    setError(null);
    setMessage(t.forgotResetSuccess);
    window.setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-950 via-primary-900 to-primary-950 px-4 py-12">
      <div className="fixed right-4 top-4 z-20">
        <LangSwitcher />
      </div>

      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/20">
            <KeyRound className="size-6" />
          </div>
          <h1 className="mt-4 text-xl font-bold text-white">{t.forgotTitle}</h1>
          <p className="mt-1 text-sm text-slate-300">{t.forgotSubtitle}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white p-6 shadow-2xl sm:p-8">
          {step === "email" ? (
            <form onSubmit={handleSendCode} className="space-y-4">
              <Input
                label={t.forgotEmailLabel}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                icon={<Mail className="size-4" />}
                autoComplete="email"
              />
              {error ? (
                <p className="text-xs font-medium text-red-600">{error}</p>
              ) : null}
              <Button type="submit" size="lg" className="w-full" loading={loading}>
                {t.forgotSendCode}
                <Send className="size-4" />
              </Button>
            </form>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <div className="flex items-start gap-2.5 rounded-xl bg-emerald-50 p-3 ring-1 ring-inset ring-emerald-600/10">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                <p className="text-xs leading-relaxed text-emerald-800">
                  {message ?? t.forgotCodeSent}
                </p>
              </div>
              <Input
                label={t.forgotCodeLabel}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={t.forgotCodePlaceholder}
                inputMode="numeric"
                maxLength={6}
              />
              <Input
                label={t.forgotNewPasswordLabel}
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={t.passwordPlaceholder}
              />
              {error ? (
                <p className="text-xs font-medium text-red-600">{error}</p>
              ) : null}
              <Button type="submit" size="lg" className="w-full">
                {t.forgotConfirm}
              </Button>
            </form>
          )}

          <Link
            href="/login"
            className="mt-5 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700"
          >
            <ArrowLeft className="size-3.5" />
            {t.forgotBack}
          </Link>
        </div>
      </div>
    </div>
  );
}
