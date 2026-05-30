import type { ReactNode } from "react";

/** Card that groups dataset/algorithm controls. */
export function ParameterPanel({
  title = "Parameters",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">{title}</h2>
      <div className="mt-4 space-y-5">{children}</div>
    </section>
  );
}
