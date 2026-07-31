import type { Dictionary } from "@/i18n/dictionaries";
import type { SportKey } from "@/lib/types";

export function sportLabel(t: Dictionary, sport: SportKey): string {
  const key = `sport${sport.charAt(0).toUpperCase()}${sport.slice(1)}` as keyof Dictionary;
  return t[key] as string;
}

export function dayLabel(t: Dictionary, day: string): string {
  const key = `day${day.charAt(0).toUpperCase()}${day.slice(1)}` as keyof Dictionary;
  return t[key] as string;
}
