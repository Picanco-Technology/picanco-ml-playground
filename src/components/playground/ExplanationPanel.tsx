import type { ReactNode } from "react";

export type ExplanationSection = { heading: string; body: ReactNode };

/** Card explaining the algorithm, parameters, experiments, and limitations. */
export function ExplanationPanel({
  title = "How it works",
  sections = [],
  children,
}: {
  title?: string;
  sections?: ExplanationSection[];
  children?: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-300">
        {sections.map((s) => (
          <div key={s.heading}>
            <h3 className="font-medium text-white">{s.heading}</h3>
            <p className="mt-1">{s.body}</p>
          </div>
        ))}
        {children}
      </div>
    </section>
  );
}
