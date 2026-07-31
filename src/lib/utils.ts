import type { WeekDay } from "@/lib/types";

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export const DAY_INDEX: Record<WeekDay, number> = {
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
  saturday: 5,
  sunday: 6,
};

export const WEEK_ORDER: WeekDay[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export function formatDate(date: string, locale: string): string {
  return new Date(date).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateShort(date: string, locale: string): string {
  return new Date(date).toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
  });
}

export function formatWeekday(date: string, locale: string): string {
  return new Date(date).toLocaleDateString(locale, { weekday: "long" });
}

export function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

export function weekdayKey(date: Date): WeekDay {
  const day = date.getDay();
  const map: Record<number, WeekDay> = {
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday",
    0: "sunday",
  };
  return map[day];
}

export function nextSessionDate(sessionDay: WeekDay, today: Date): Date {
  const todayIndex = today.getDay();
  const targetIndex = DAY_INDEX[sessionDay] + 1;
  let diff = targetIndex - todayIndex;
  if (diff <= 0) diff += 7;
  const next = new Date(today);
  next.setDate(today.getDate() + diff);
  return next;
}

export function deriveNameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? email;
  const parts = local.replace(/[._-]+/g, " ").trim().split(/\s+/);
  return parts
    .filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}
