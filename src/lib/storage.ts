import type { Lang, Session } from "@/lib/types";

const KEYS = {
  session: "misis-fit:session",
  enrollments: "misis-fit:enrollments",
  lang: "misis-fit:lang",
} as const;

function get<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function set(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

function remove(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

export const storage = {
  getSession: () => get<Session>(KEYS.session),
  setSession: (session: Session) => set(KEYS.session, session),
  clearSession: () => remove(KEYS.session),

  getEnrollments: () => get<string[]>(KEYS.enrollments) ?? [],
  setEnrollments: (ids: string[]) => set(KEYS.enrollments, ids),

  getLang: () => get<Lang>(KEYS.lang),
  setLang: (lang: Lang) => set(KEYS.lang, lang),
};
