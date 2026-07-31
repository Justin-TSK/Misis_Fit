"use client";

import { useState } from "react";
import { CalendarDays, Users } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Dialog } from "@/components/ui/Dialog";
import { PageHeader } from "@/components/ui/PageHeader";
import { useI18n } from "@/i18n";
import { TEACHER_GROUPS } from "@/lib/data";
import { dayLabel } from "@/lib/sport";
import type { TeacherGroup } from "@/lib/types";

export default function GroupsPage() {
  const { t, pick } = useI18n();
  const [selected, setSelected] = useState<TeacherGroup | null>(null);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        title={t.groupsTitle}
        subtitle={t.groupsSubtitle}
        icon={<Users className="size-5" />}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {TEACHER_GROUPS.map((group) => (
          <Card key={group.id} className="transition-shadow hover:shadow-md">
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {pick(group.name)}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {t.levelLabel}: {pick(group.level)}
                  </p>
                </div>
                <Badge tone="primary">
                  {group.students} {t.studentsCount}
                </Badge>
              </div>

              <div className="space-y-1.5 text-sm text-slate-600">
                {group.sessions.map((session, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CalendarDays className="size-4 shrink-0 text-slate-400" />
                    <span className="font-medium text-slate-800">
                      {dayLabel(t, session.day)}
                    </span>
                    <span>
                      {session.start}–{session.end} ·{" "}
                      {pick(session.location)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => setSelected(group)}
                >
                  {t.manageGroup}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected ? `${t.groupMembers} — ${pick(selected.name)}` : ""}
        description={
          selected ? `${selected.members.length} ${t.memberCount}` : undefined
        }
        icon={<Users className="size-5" />}
        footer={
          <Button variant="secondary" onClick={() => setSelected(null)}>
            {t.close}
          </Button>
        }
      >
        {selected ? (
          <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200">
            {selected.members.map((member, i) => (
              <li
                key={i}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-primary-50 text-xs font-bold text-primary-700">
                  {member
                    .split(" ")
                    .slice(0, 2)
                    .map((p) => p.charAt(0))
                    .join("")}
                </span>
                {member}
              </li>
            ))}
          </ul>
        ) : null}
      </Dialog>
    </div>
  );
}
