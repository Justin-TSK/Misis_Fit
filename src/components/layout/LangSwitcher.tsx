"use client";

import { Languages } from "lucide-react";

import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import type { Lang } from "@/lib/types";

const LANGS: { code: Lang; label: string }[] = [
  { code: "ru", label: "RU" },
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
];

export function LangSwitcher({ className }: { className?: string }) {
  const { lang, setLang } = useI18n();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-lg border border-white/10 bg-white/5 p-0.5",
        className,
      )}
    >
      <Languages className="mx-1.5 size-3.5 text-slate-400" />
      {LANGS.map((item) => (
        <button
          key={item.code}
          onClick={() => setLang(item.code)}
          className={cn(
            "rounded-md px-2 py-1 text-xs font-semibold transition-colors",
            lang === item.code
              ? "bg-primary-600 text-white"
              : "text-slate-400 hover:bg-white/10 hover:text-white",
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
