import type { AlgorithmStatus } from "@/types/ml";
import { cn } from "@/lib/utils";

const config: Record<AlgorithmStatus, { label: string; badge: string; dot: string }> = {
  idle: { label: "Idle", badge: "bg-slate-500/15 text-slate-300 ring-slate-500/30", dot: "bg-slate-400" },
  ready: { label: "Ready", badge: "bg-sky-500/15 text-sky-300 ring-sky-500/30", dot: "bg-sky-400" },
  running: {
    label: "Running",
    badge: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
    dot: "bg-amber-400 animate-pulse",
  },
  converged: {
    label: "Converged",
    badge: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
    dot: "bg-emerald-400",
  },
  error: { label: "Error", badge: "bg-red-500/15 text-red-300 ring-red-500/30", dot: "bg-red-400" },
};

/** Pill showing the current runtime status of an algorithm. */
export function StatusBadge({ status }: { status: AlgorithmStatus }) {
  const c = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1",
        c.badge,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", c.dot)} />
      {c.label}
    </span>
  );
}
