"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  CalendarPlus,
  Flame,
  LayoutDashboard,
  MapPin,
  Percent,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import { SportIcon } from "@/components/features/SportIcon";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Dialog } from "@/components/ui/Dialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { useToast } from "@/context/ToastContext";
import { useI18n } from "@/i18n";
import { ATTENDANCE } from "@/lib/data";
import { dayLabel } from "@/lib/sport";
import { formatDate, nextSessionDate, weekdayKey, DAY_INDEX } from "@/lib/utils";

export default function DashboardPage() {
  const { t, pick, locale } = useI18n();
  const { user } = useAuth();
  const { currentSection, unenroll } = useData();
  const { toast } = useToast();
  const router = useRouter();

  const [unsubConfirm, setUnsubConfirm] = useState(false);

  const presentCount = ATTENDANCE.filter((a) => a.present).length;
  const attendanceRate = Math.round((presentCount / ATTENDANCE.length) * 100);

  const nextSession = useMemo(() => {
    if (!currentSection) return null;
    const today = new Date();
    const todayIndex = DAY_INDEX[weekdayKey(today)];
    const ordered = [...currentSection.sessions].sort(
      (a, b) => DAY_INDEX[a.day] - DAY_INDEX[b.day],
    );
    const upcoming = ordered.find((s) => DAY_INDEX[s.day] >= todayIndex);
    const session = upcoming ?? ordered[0];
    return { session, date: nextSessionDate(session.day, today) };
  }, [currentSection]);

  const handleUnsubscribe = () => {
    if (currentSection) {
      unenroll(currentSection.id);
      toast("success", t.unsubscribeSuccess);
    }
    setUnsubConfirm(false);
  };

  const stats: {
    label: string;
    value: string;
    hint?: string;
    icon: LucideIcon;
  }[] = [
    {
      label: t.statAttendanceRate,
      value: `${attendanceRate}%`,
      icon: Percent,
    },
    {
      label: t.statSessionsAttended,
      value: String(presentCount),
      icon: CalendarDays,
    },
    { label: t.statCurrentStreak, value: "5", icon: Flame },
    {
      label: t.statNextSession,
      value: nextSession
        ? `${formatDate(nextSession.date.toISOString(), locale)} · ${nextSession.session.start}`
        : t.statNone,
      icon: CalendarDays,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        title={t.navDashboard}
        subtitle={formatDate(new Date().toISOString(), locale)}
        icon={<LayoutDashboard className="size-5" />}
      />

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 p-6 text-white shadow-lg sm:p-8">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 85% 20%, rgba(92,150,252,0.35), transparent 45%)",
          }}
        />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-primary-200">
              {t.welcomeGreeting},
            </p>
            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
              {user?.name ?? "—"}
            </h2>
            <div className="mt-3 flex items-center gap-2">
              <Badge tone="primary" className="bg-white/10 text-white ring-white/20">
                {user?.role === "teacher" ? t.roleTeacher : t.roleStudent}
              </Badge>
              {currentSection ? (
                <Badge tone="success" className="bg-white/10 text-emerald-200 ring-emerald-300/20">
                  {t.statusEnrolled}
                </Badge>
              ) : null}
            </div>
          </div>
          <div className="flex size-16 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
            {currentSection ? (
              <SportIcon sport={currentSection.sport} className="size-8" />
            ) : (
              <UserRound className="size-8" />
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={<stat.icon className="size-5" />}
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title={t.mySection}
            subtitle={
              currentSection
                ? `${pick(currentSection.name)} · ${currentSection.teacher}`
                : undefined
            }
            action={
              currentSection ? (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setUnsubConfirm(true)}
                >
                  {t.unsubscribe}
                </Button>
              ) : (
                <Button size="sm" onClick={() => router.push("/app/sections")}>
                  {t.noSectionCta}
                  <CalendarPlus className="size-4" />
                </Button>
              )
            }
          />
          <CardContent>
            {currentSection ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                    <SportIcon sport={currentSection.sport} className="size-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900">
                      {pick(currentSection.name)}
                    </p>
                    <p className="text-sm text-slate-500">
                      {t.sectionLabel}:{" "}
                      {t[
                        `sport${currentSection.sport.charAt(0).toUpperCase()}${currentSection.sport.slice(1)}` as keyof typeof t
                      ]}
                    </p>
                  </div>
                </div>
                <div className="grid gap-3 text-sm sm:grid-cols-2">
                  <div className="flex items-center gap-2 text-slate-600">
                    <UserRound className="size-4 text-slate-400" />
                    {t.teacherLabel}:{" "}
                    <span className="font-medium text-slate-800">
                      {currentSection.teacher}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="size-4 text-slate-400" />
                    {t.locationLabel}:{" "}
                    <span className="font-medium text-slate-800">
                      {pick(currentSection.sessions[0]?.location)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <EmptyState
                icon={<UserRound className="size-6" />}
                title={t.noSection}
                action={
                  <Button onClick={() => router.push("/app/sections")}>
                    {t.noSectionCta}
                  </Button>
                }
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={t.nextSessions} />
          <CardContent className="space-y-3">
            {currentSection?.sessions.length ? (
              currentSection.sessions.map((session, i) => {
                const date = nextSessionDate(session.day, new Date());
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 p-3"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                      <CalendarDays className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-800">
                        {dayLabel(t, session.day)}
                      </p>
                      <p className="text-xs text-slate-500">
                        {session.start}–{session.end} ·{" "}
                        {pick(session.location)}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs font-medium text-slate-400">
                      {formatDate(date.toISOString(), locale)}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-slate-500">{t.noUpcomingSessions}</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog
        open={unsubConfirm}
        onClose={() => setUnsubConfirm(false)}
        title={t.confirmUnsubscribe}
        description={t.confirmUnsubscribeBody}
        icon={<UserRound className="size-5" />}
        footer={
          <>
            <Button variant="secondary" onClick={() => setUnsubConfirm(false)}>
              {t.cancel}
            </Button>
            <Button variant="danger" onClick={handleUnsubscribe}>
              {t.unsubscribe}
            </Button>
          </>
        }
      />
    </div>
  );
}
