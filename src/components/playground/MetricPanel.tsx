import type { ModelMetric } from "@/types/ml";

/** Card that displays a grid of model metrics. */
export function MetricPanel({
  metrics,
  title = "Metrics",
}: {
  metrics: ModelMetric[];
  title?: string;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">{title}</h2>
      {metrics.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">No metrics yet.</p>
      ) : (
        <dl className="mt-4 grid grid-cols-2 gap-4">
          {metrics.map((m) => (
            <div key={m.key} title={m.description}>
              <dt className="text-xs text-slate-400">{m.label}</dt>
              <dd className="mt-0.5 text-lg font-semibold text-white">
                {m.value}
                {m.unit ? (
                  <span className="ml-1 text-sm font-normal text-slate-400">{m.unit}</span>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
