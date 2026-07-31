"use client";

import { useMemo, useState } from "react";
import { CalendarPlus, Dumbbell } from "lucide-react";

import { SectionCard } from "@/components/features/SectionCard";
import { SectionFilters, matchesFilters } from "@/components/features/SectionFilters";
import { SportIcon } from "@/components/features/SportIcon";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { PageHeader } from "@/components/ui/PageHeader";
import { useData } from "@/context/DataContext";
import { useToast } from "@/context/ToastContext";
import { useI18n } from "@/i18n";
import type { SportSection } from "@/lib/types";

export default function SectionsPage() {
  const { t, pick } = useI18n();
  const { sections, isEnrolled, selectionPeriodOpen, currentSection, enroll, unenroll } =
    useData();
  const { toast } = useToast();

  const [filters, setFilters] = useState({ search: "", sport: "", day: "" });
  const [pendingSection, setPendingSection] = useState<SportSection | null>(null);

  const filtered = useMemo(
    () =>
      sections.filter((section) =>
        matchesFilters(section, filters, pick(section.name)),
      ),
    [sections, filters, pick],
  );

  const handleEnrollClick = (section: SportSection) => {
    if (currentSection) {
      toast("error", t.oneSectionWarn);
      return;
    }
    setPendingSection(section);
  };

  const handleConfirmEnroll = () => {
    if (!pendingSection) return;
    const result = enroll(pendingSection.id);
    if (result.ok) {
      toast("success", `${t.enrollSuccess}: ${pick(pendingSection.name)}`);
    } else if (result.message === "full") {
      toast("error", t.sectionFull);
    } else if (result.message === "alreadyEnrolled") {
      toast("error", t.oneSectionWarn);
    } else if (result.message === "periodClosed") {
      toast("error", t.signupsClosed);
    }
    setPendingSection(null);
  };

  const handleUnenroll = (section: SportSection) => {
    if (!window.confirm(t.confirmUnsubscribe)) return;
    unenroll(section.id);
    toast("success", t.unsubscribeSuccess);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        title={t.sectionsTitle}
        subtitle={t.sectionsSubtitle}
        icon={<Dumbbell className="size-5" />}
        action={
          <Badge tone={selectionPeriodOpen ? "success" : "neutral"}>
            {selectionPeriodOpen ? t.selectionOpen : t.selectionClosed}
          </Badge>
        }
      />

      <div
        className={
          selectionPeriodOpen
            ? "flex flex-wrap items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
            : "flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"
        }
      >
        <span className="font-semibold">{t.selectionPeriod}:</span>
        <span className="font-medium">
          {selectionPeriodOpen ? t.selectionOpenNote : t.selectionClosedNote}
        </span>
      </div>

      <SectionFilters onFilterChange={setFilters} />

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center text-sm text-slate-500">
          {t.noSection}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              isEnrolled={isEnrolled(section.id)}
              canEnroll={selectionPeriodOpen && !currentSection}
              onEnrollClick={handleEnrollClick}
              onUnenroll={() => handleUnenroll(section)}
            />
          ))}
        </div>
      )}

      <Dialog
        open={pendingSection !== null}
        onClose={() => setPendingSection(null)}
        title={t.confirmEnrollTitle}
        description={t.confirmEnrollBody}
        icon={
          pendingSection ? (
            <SportIcon sport={pendingSection.sport} className="size-5" />
          ) : (
            <CalendarPlus className="size-5" />
          )
        }
        footer={
          <>
            <Button variant="secondary" onClick={() => setPendingSection(null)}>
              {t.cancel}
            </Button>
            <Button onClick={handleConfirmEnroll}>{t.confirm}</Button>
          </>
        }
      >
        {pendingSection ? (
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
              <SportIcon sport={pendingSection.sport} className="size-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                {pick(pendingSection.name)}
              </p>
              <p className="text-xs text-slate-500">{pendingSection.teacher}</p>
            </div>
          </div>
        ) : null}
      </Dialog>
    </div>
  );
}
