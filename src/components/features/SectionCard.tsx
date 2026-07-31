"use client";

import { CalendarDays, MapPin, UserRound } from "lucide-react";

import { SportIcon } from "@/components/features/SportIcon";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import type { SportSection } from "@/lib/types";

export function CategoryBadge({
  category,
}: {
  category: SportSection["category"];
}) {
  const { t } = useI18n();
  const tone =
    category === "team"
      ? "primary"
      : category === "combat"
        ? "danger"
        : "success";
  const label =
    category === "team"
      ? t.catTeam
      : category === "combat"
        ? t.catCombat
        : t.catIndividual;
  return <Badge tone={tone}>{label}</Badge>;
}

export function SectionCard({
  section,
  isEnrolled,
  canEnroll,
  onEnrollClick,
  onUnenroll,
  className,
}: {
  section: SportSection;
  isEnrolled: boolean;
  canEnroll: boolean;
  onEnrollClick: (section: SportSection) => void;
  onUnenroll: (section: SportSection) => void;
  className?: string;
}) {
  const { t, pick } = useI18n();
  const full = section.enrolled >= section.capacity;

  return (
    <Card
      className={cn(
        "flex flex-col transition-shadow hover:shadow-md",
        className,
      )}
    >
      <CardContent className="flex flex-1 flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
              <SportIcon sport={section.sport} className="size-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {pick(section.name)}
              </h3>
              <p className="text-xs text-slate-500">{section.teacher}</p>
            </div>
          </div>
          <CategoryBadge category={section.category} />
        </div>

        <p className="text-sm leading-relaxed text-slate-600">
          {pick(section.description)}
        </p>

        <div className="space-y-2 text-sm text-slate-600">
          {section.sessions.map((session, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <CalendarDays className="size-4 shrink-0 text-slate-400" />
              <span className="font-medium text-slate-800">
                {t[`day${session.day.charAt(0).toUpperCase()}${session.day.slice(1)}` as keyof typeof t]}
              </span>
              <span className="text-slate-500">
                {session.start}–{session.end}
              </span>
              <span className="ml-auto flex items-center gap-1 text-xs text-slate-400">
                <MapPin className="size-3.5" />
                {pick(session.location)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-auto space-y-4 pt-2">
          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500">
                {t.capacityLabel} · {section.enrolled}/{section.capacity}{" "}
                {t.placesLabel}
              </span>
              <span className={cn(full ? "font-semibold text-red-600" : "text-slate-400")}>
                {Math.round((section.enrolled / section.capacity) * 100)}%
              </span>
            </div>
            <ProgressBar value={section.enrolled} max={section.capacity} />
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <UserRound className="size-3.5" />
              {section.teacher}
            </span>
            {isEnrolled ? (
              <Button variant="danger" size="sm" onClick={() => onUnenroll(section)}>
                {t.unsubscribe}
              </Button>
            ) : canEnroll && !full ? (
              <Button size="sm" onClick={() => onEnrollClick(section)}>
                {t.enroll}
              </Button>
            ) : (
              <Badge tone={full ? "danger" : "neutral"}>
                {full ? t.sectionFull : t.signupsClosed}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
