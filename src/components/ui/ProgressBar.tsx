import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  max,
  className,
}: {
  value: number;
  max: number;
  className?: string;
}) {
  const percent = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  const full = percent >= 100;

  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-slate-100",
        className,
      )}
    >
      <div
        className={cn(
          "h-full rounded-full transition-all",
          full ? "bg-red-500" : "bg-primary-600",
        )}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
