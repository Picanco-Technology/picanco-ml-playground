import Link from "next/link";
import { ArrowRight, Sliders, LineChart } from "lucide-react";
import type { AlgorithmInfo, AlgorithmStatus } from "@/types";
import { cn } from "@/lib/utils";

const statusStyles: Record<AlgorithmStatus, string> = {
  MVP: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  "Coming Soon": "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  Advanced: "bg-violet-500/15 text-violet-300 ring-violet-500/30",
};

export function AlgorithmCard({ algorithm }: { algorithm: AlgorithmInfo }) {
  const { name, category, difficulty, summary, controls, visualization, status, available, slug } =
    algorithm;

  return (
    <article className="flex flex-col rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-black/20 transition-colors hover:border-indigo-400/40">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
            {category} · {difficulty}
          </p>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ring-1",
            statusStyles[status],
          )}
        >
          {status}
        </span>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">{summary}</p>

      <dl className="mt-4 space-y-2 text-xs text-slate-400">
        <div className="flex gap-2">
          <Sliders className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-400" />
          <span>{controls}</span>
        </div>
        <div className="flex gap-2">
          <LineChart className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-400" />
          <span>{visualization}</span>
        </div>
      </dl>

      <div className="mt-5">
        {available ? (
          <Link
            href={`/playground/${slug}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-400"
          >
            Start Demo
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <span className="inline-flex cursor-not-allowed items-center rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-slate-500">
            Coming Soon
          </span>
        )}
      </div>
    </article>
  );
}
