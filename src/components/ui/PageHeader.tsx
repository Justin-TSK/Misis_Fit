import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  subtitle,
  icon,
  action,
  className,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-4",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {icon ? (
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary-600/10 text-primary-700">
            {icon}
          </div>
        ) : null}
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>
          ) : null}
        </div>
      </div>
      {action}
    </div>
  );
}
