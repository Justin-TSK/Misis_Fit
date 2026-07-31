"use client";

import { useRouter } from "next/navigation";
import { CalendarDays } from "lucide-react";

import { ScheduleWeek } from "@/components/features/ScheduleWeek";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { useI18n } from "@/i18n";
import { TEACHER_GROUPS } from "@/lib/data";

export default function SchedulePage() {
  const { t, pick } = useI18n();
  const { user } = useAuth();
  const { currentSection } = useData();
  const router = useRouter();

  const isTeacher = user?.role === "teacher";

  const sessions = isTeacher
    ? TEACHER_GROUPS.flatMap((g) => g.sessions)
    : currentSection?.sessions ?? [];

  const sport = isTeacher ? undefined : currentSection?.sport;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        title={isTeacher ? t.teacherScheduleTitle : t.scheduleTitle}
        subtitle={isTeacher ? t.teacherScheduleSubtitle : t.scheduleSubtitle}
        icon={<CalendarDays className="size-5" />}
      />

      {sessions.length > 0 ? (
        <Card>
          <CardHeader
            title={isTeacher ? t.teacherScheduleTitle : t.nextSessions}
            subtitle={
              isTeacher
                ? t.teacherScheduleSubtitle
                : currentSection
                  ? `${t.mySection}: ${pick(currentSection.name)}`
                  : undefined
            }
          />
          <CardContent>
            <ScheduleWeek sessions={sessions} sport={sport} />
          </CardContent>
        </Card>
      ) : (
        <EmptyState
          icon={<CalendarDays className="size-6" />}
          title={isTeacher ? t.noSessionsTeacher : t.noSessionsStudent}
          action={
            !isTeacher ? (
              <Button onClick={() => router.push("/app/sections")}>
                {t.noSessionsStudentCta}
              </Button>
            ) : undefined
          }
        />
      )}
    </div>
  );
}
