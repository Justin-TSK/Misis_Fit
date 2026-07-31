"use client";

import { FileText } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { useI18n } from "@/i18n";
import { TEACHER_REPORTS } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default function ReportsPage() {
  const { t, pick, locale } = useI18n();

  const totalPresent = TEACHER_REPORTS.reduce((sum, r) => sum + r.present, 0);
  const totalExpected = TEACHER_REPORTS.reduce(
    (sum, r) => sum + r.present + r.absent,
    0,
  );
  const avgAttendance = Math.round((totalPresent / Math.max(1, totalExpected)) * 100);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        title={t.reportsTitle}
        subtitle={t.reportsSubtitle}
        icon={<FileText className="size-5" />}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label={t.reportAvgAttendance}
          value={`${avgAttendance}%`}
          icon={<FileText className="size-5" />}
        />
        <StatCard
          label={t.reportPresent}
          value={String(totalPresent)}
          icon={<FileText className="size-5" />}
        />
        <StatCard
          label={t.reportAbsent}
          value={String(totalExpected - totalPresent)}
          icon={<FileText className="size-5" />}
        />
      </div>

      <Card>
        <CardHeader title={t.reportsTitle} />
        <CardContent className="px-3 sm:px-4">
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {t.reportDate}
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {t.reportGroup}
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {t.reportPresent}
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {t.reportAbsent}
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {t.reportNotes}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TEACHER_REPORTS.map((report) => (
                  <tr
                    key={report.id}
                    className="transition-colors hover:bg-slate-50/60"
                  >
                    <td className="whitespace-nowrap px-5 py-3.5 text-sm font-medium text-slate-700">
                      {formatDate(report.date, locale)}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-slate-600">
                      {pick(report.group)}
                    </td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-emerald-600">
                      {report.present}
                    </td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-red-600">
                      {report.absent}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-slate-500">
                      {pick(report.notes)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
