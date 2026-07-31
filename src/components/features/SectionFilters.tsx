"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useI18n } from "@/i18n";
import type { SportSection, SportKey, WeekDay } from "@/lib/types";

const SPORT_KEYS: SportKey[] = [
  "basketball",
  "football",
  "swimming",
  "athletics",
  "tennis",
  "tabletennis",
  "chess",
  "boxing",
  "karate",
  "judo",
  "sambo",
  "powerlifting",
  "hockey",
  "golf",
  "armwrestling",
];

const DAY_KEYS: WeekDay[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export function SectionFilters({
  onFilterChange,
}: {
  onFilterChange: (filters: { search: string; sport: string; day: string }) => void;
}) {
  const { t } = useI18n();
  const [search, setSearch] = useState("");
  const [sport, setSport] = useState("");
  const [day, setDay] = useState("");

  const update = (next: { search?: string; sport?: string; day?: string }) => {
    const merged = {
      search: next.search ?? search,
      sport: next.sport ?? sport,
      day: next.day ?? day,
    };
    onFilterChange(merged);
  };

  const sportOptions = useMemo(
    () => [
      { value: "", label: t.allSports },
      ...SPORT_KEYS.map((key) => ({
        value: key,
        label: t[`sport${key.charAt(0).toUpperCase()}${key.slice(1)}` as keyof typeof t] as string,
      })),
    ],
    [t],
  );

  const dayOptions = useMemo(
    () => [
      { value: "", label: t.allDays },
      ...DAY_KEYS.map((key) => ({
        value: key,
        label: t[`day${key.charAt(0).toUpperCase()}${key.slice(1)}` as keyof typeof t] as string,
      })),
    ],
    [t],
  );

  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_200px_200px]">
      <Input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          update({ search: e.target.value });
        }}
        placeholder={t.searchPlaceholder}
        icon={<Search className="size-4" />}
      />
      <Select
        value={sport}
        onChange={(e) => {
          setSport(e.target.value);
          update({ sport: e.target.value });
        }}
        options={sportOptions}
      />
      <Select
        value={day}
        onChange={(e) => {
          setDay(e.target.value);
          update({ day: e.target.value });
        }}
        options={dayOptions}
      />
    </div>
  );
}

export function matchesFilters(
  section: SportSection,
  filters: { search: string; sport: string; day: string },
  name: string,
): boolean {
  const searchMatch =
    !filters.search ||
    name.toLowerCase().includes(filters.search.toLowerCase());
  const sportMatch = !filters.sport || section.sport === filters.sport;
  const dayMatch =
    !filters.day ||
    section.sessions.some((s) => s.day === filters.day);
  return searchMatch && sportMatch && dayMatch;
}
