"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { dictionaries } from "@/i18n/dictionaries";
import { storage } from "@/lib/storage";
import type { Lang, LocalizedString } from "@/lib/types";

type Dictionary = (typeof dictionaries)[Lang];

const LOCALES: Record<Lang, string> = {
  ru: "ru-RU",
  fr: "fr-FR",
  en: "en-US",
};

interface I18nValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
  locale: string;
  pick: <T>(value: LocalizedString<T>) => T;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    const saved = storage.getLang();
    if (saved) {
      // Hydrate the saved language from localStorage on mount (client only).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      setLang: (next) => {
        setLangState(next);
        storage.setLang(next);
      },
      t: dictionaries[lang],
      locale: LOCALES[lang],
      pick: (v) => v[lang],
    }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
