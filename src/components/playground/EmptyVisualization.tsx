import type { ReactNode } from "react";
import { ImageOff } from "lucide-react";

/** Placeholder shown in the visualization area before data exists. */
export function EmptyVisualization({
  message = "No data yet",
  hint = "Generate a dataset to see the visualization.",
  icon,
}: {
  message?: string;
  hint?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-slate-900/40 p-8 text-center">
      <div className="text-slate-500">{icon ?? <ImageOff className="h-10 w-10" />}</div>
      <p className="mt-4 font-medium text-slate-300">{message}</p>
      <p className="mt-1 max-w-xs text-sm text-slate-500">{hint}</p>
    </div>
  );
}
