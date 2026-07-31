"use client";

import { useMemo } from "react";
import { CalendarDays } from "lucide-react";

import { SportIcon } from "@/components/features/SportIcon";
import { useI18n } from "@/i18n";
import { WEEK_ORDER, cn } from "@/lib/utils";
import type { SessionSlot, SportKey } from "@/lib/types";

const SLOT_START_HOURS = [8, 10, 12, 14, 16, 18];

function slotIndex(start: string): number {
  const hour = Number.parseInt(start.slice(0, 2), 10);
  return Math.max(0, SLOT_START_HOURS.findIndex((h) => h <= hour));
}

function formatSlot(start: number): string {
  const end = start + 2;
  return `${String(start).padStart(2, "0")}:00 – ${String(end).padStart(2, "0")}:00`;
}

export function ScheduleWeek({
  sessions,
  sport,
}: {
  sessions: SessionSlot[];
  sport?: SportKey;
}) {
  const { t, pick } = useI18n();

  const cells = useMemo(() => {
    const map = new Map<string, SessionSlot[]>();
    for (const session of sessions) {
      const key = `${session.day}|${slotIndex(session.start)}`;
      const list = map.get(key) ?? [];
      list.push(session);
      map.set(key, list);
    }
    return map;
  }, [sessions]);

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[640px] border-collapse">
        <thead>
          <tr>
            <th className="w-32 border-b border-r border-slate-100 bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t.timeColumn}
            </th>
            {WEEK_ORDER.map((day) => (
              <th
                key={day}
                className="border-b border-slate-100 bg-slate-50 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                {t[`day${day.charAt(0).toUpperCase()}${day.slice(1)}` as keyof typeof t]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SLOT_START_HOURS.map((startHour) => (
            <tr key={startHour}>
              <td className="border-r border-b border-slate-100 bg-slate-50/50 px-4 py-2 text-xs font-medium text-slate-500">
                {formatSlot(startHour)}
              </td>
              {WEEK_ORDER.map((day) => {
                const cellSessions = cells.get(`${day}|${startHour}`) ?? [];
                return (
                  <td
                    key={day}
                    className={cn(
                      "border-b border-slate-100 px-2 py-2 align-top",
                      cellSessions.length === 0 && "bg-slate-50/30",
                    )}
                  >
                    {cellSessions.map((session, i) => (
                      <div
                        key={i}
                        className="rounded-lg bg-primary-50 px-3 py-2 ring-1 ring-inset ring-primary-600/10"
                      >
                        <p className="flex items-center gap-1.5 text-xs font-semibold text-primary-800">
                          {sport ? (
                            <SportIcon sport={sport} className="size-3.5" />
                          ) : (
                            <CalendarDays className="size-3.5" />
                          )}
                          {session.start}–{session.end}
                        </p>
                        <p className="mt-0.5 text-xs text-primary-700/80">
                          {pick(session.location)}
                        </p>
                      </div>
                    ))}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
