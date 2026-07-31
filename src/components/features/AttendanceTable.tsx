"use client";

import { useI18n } from "@/i18n";
import { sportLabel } from "@/lib/sport";
import { formatDate } from "@/lib/utils";
import type { AttendanceRecord } from "@/lib/types";

export function AttendanceTable({ records }: { records: AttendanceRecord[] }) {
  const { t, pick, locale } = useI18n();

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <thead>
          <tr className="bg-slate-50">
            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t.columnDate}
            </th>
            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t.columnSection}
            </th>
            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t.columnAttendance}
            </th>
            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t.columnNotes}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {records.map((record) => (
            <tr key={record.id} className="transition-colors hover:bg-slate-50/60">
              <td className="whitespace-nowrap px-5 py-3.5 text-sm font-medium text-slate-700">
                {formatDate(record.date, locale)}
              </td>
              <td className="px-5 py-3.5 text-sm text-slate-600">
                {sportLabel(t, record.section)}
              </td>
              <td className="px-5 py-3.5">
                <span
                  className={
                    record.present
                      ? "text-sm font-semibold text-emerald-600"
                      : "text-sm font-semibold text-red-600"
                  }
                >
                  {record.present ? t.present : t.absent}
                </span>
              </td>
              <td className="px-5 py-3.5 text-sm text-slate-500">
                {pick(record.notes)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
