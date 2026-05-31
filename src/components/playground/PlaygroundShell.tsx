import type { ReactNode } from "react";

type PlaygroundShellProps = {
  title: string;
  description?: string;
  status?: ReactNode;
  controls: ReactNode;
  visualization: ReactNode;
  info: ReactNode;
  notes?: ReactNode;
};

/** Standard three-zone playground layout: controls | visualization | info. */
export function PlaygroundShell({
  title,
  description,
  status,
  controls,
  visualization,
  info,
  notes,
}: PlaygroundShellProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">{title}</h1>
          {description ? <p className="mt-2 max-w-2xl text-slate-300">{description}</p> : null}
        </div>
        {status}
      </header>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)_320px]">
        <div className="space-y-6">{controls}</div>
        <div className="min-w-0">{visualization}</div>
        <div className="space-y-6">{info}</div>
      </div>

      {notes ? <div className="mt-8">{notes}</div> : null}
    </div>
  );
}
