"use client";

import { useMemo } from "react";
import { Newspaper } from "lucide-react";

import { NewsList } from "@/components/features/NewsList";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { useI18n } from "@/i18n";
import { NEWS } from "@/lib/data";

export default function NewsPage() {
  const { t } = useI18n();

  const { upcoming, past } = useMemo(() => {
    const sorted = [...NEWS].sort((a, b) =>
      a.status === b.status ? b.date.localeCompare(a.date) : 0,
    );
    return {
      upcoming: sorted.filter((e) => e.status === "upcoming"),
      past: sorted.filter((e) => e.status === "past"),
    };
  }, []);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        title={t.newsTitle}
        subtitle={t.newsSubtitle}
        icon={<Newspaper className="size-5" />}
      />

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
            {t.upcomingEvents}
          </h2>
          <Badge tone="success">{upcoming.length}</Badge>
        </div>
        <NewsList events={upcoming} />
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
            {t.pastEvents}
          </h2>
          <Badge tone="neutral">{past.length}</Badge>
        </div>
        <NewsList events={past} />
      </section>
    </div>
  );
}
