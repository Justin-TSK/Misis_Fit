"use client";

import { Award, CalendarDays, Flame, Medal, TrendingUp } from "lucide-react";

import { AttendanceTable } from "@/components/features/AttendanceTable";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { useI18n } from "@/i18n";
import { ATTENDANCE, WEEKLY_ATTENDANCE } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function ProgressPage() {
  const { t, locale } = useI18n();

  const presentCount = ATTENDANCE.filter((a) => a.present).length;
  const attendanceRate = Math.round((presentCount / ATTENDANCE.length) * 100);
  const maxWeek = Math.max(...WEEKLY_ATTENDANCE.map((w) => w.total), 1);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        title={t.progressTitle}
        subtitle={t.progressSubtitle}
        icon={<TrendingUp className="size-5" />}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label={t.statAttendanceRate}
          value={`${attendanceRate}%`}
          icon={<Medal className="size-5" />}
        />
        <StatCard
          label={t.statSessionsAttended}
          value={String(presentCount)}
          icon={<CalendarDays className="size-5" />}
        />
        <StatCard
          label={t.statCurrentStreak}
          value="5"
          icon={<Flame className="size-5" />}
        />
        <StatCard
          label="Best 100 m"
          value="12.2 s"
          icon={<Award className="size-5" />}
        />
      </div>

      <Card>
        <CardHeader title={t.weeklyAttendance} />
        <CardContent>
          <div className="flex h-40 items-end gap-3 sm:gap-4">
            {WEEKLY_ATTENDANCE.map((week) => {
              const height = Math.round((week.attended / maxWeek) * 100);
              const date = new Date(week.weekStart);
              return (
                <div key={week.weekStart} className="group flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-28 w-full items-end justify-center">
                    <div
                      className={cn(
                        "w-full max-w-10 rounded-t-lg transition-all group-hover:opacity-80",
                        week.attended === week.total
                          ? "bg-emerald-500"
                          : week.attended >= week.total - 1
                            ? "bg-primary-500"
                            : "bg-amber-400",
                      )}
                      style={{ height: `${height}%` }}
                      title={`${week.attended}/${week.total}`}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-slate-700">
                      {week.attended}/{week.total}
                    </p>
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">
                      {date.toLocaleDateString(locale, { month: "short" })}{" "}
                      {date.getDate()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title={t.attendanceHistory} />
        <CardContent className="px-3 sm:px-4">
          <AttendanceTable records={ATTENDANCE} />
        </CardContent>
      </Card>
    </div>
  );
}
