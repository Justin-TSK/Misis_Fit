"use client";

import { CalendarDays, Clock3, MapPin } from "lucide-react";

import { SportIcon } from "@/components/features/SportIcon";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { useI18n } from "@/i18n";
import { formatDateShort } from "@/lib/utils";
import type { NewsEvent } from "@/lib/types";

export function NewsList({ events }: { events: NewsEvent[] }) {
  const { t, pick, locale } = useI18n();

  if (events.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-500">
        {t.noUpcomingSessions}
      </p>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {events.map((event) => (
        <Card key={event.id} className="transition-shadow hover:shadow-md">
          <CardContent className="flex items-start gap-4">
            <div className="flex flex-col items-center rounded-xl bg-primary-50 px-3 py-2 text-center ring-1 ring-inset ring-primary-600/10">
              <span className="text-lg font-bold leading-none text-primary-700">
                {new Date(event.date).getDate()}
              </span>
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-primary-600/80">
                {new Date(event.date).toLocaleDateString(locale, {
                  month: "short",
                })}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-sm font-bold leading-snug text-slate-900">
                  {pick(event.title)}
                </h4>
                <div className="flex shrink-0 items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                    <SportIcon sport={event.sport} className="size-4" />
                  </div>
                  <Badge tone={event.status === "upcoming" ? "success" : "neutral"}>
                    {event.status === "upcoming" ? t.upcomingEvents : t.pastEvents}
                  </Badge>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="size-3.5 text-slate-400" />
                  {formatDateShort(event.date, locale)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock3 className="size-3.5 text-slate-400" />
                  {event.time} {t.atHour}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-slate-400" />
                  {pick(event.location)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
