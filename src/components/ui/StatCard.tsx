import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  icon,
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  hint?: ReactNode;
  icon: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm",
        className,
      )}
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-600/10 text-primary-700">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-0.5 truncate text-lg font-bold text-slate-900">
          {value}
        </p>
        {hint ? <p className="mt-0.5 text-xs text-slate-400">{hint}</p> : null}
      </div>
    </div>
  );
}
