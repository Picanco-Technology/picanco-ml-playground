import Link from "next/link";
import { ArrowRight, Eye, MousePointerClick, BookOpen } from "lucide-react";
import { algorithms } from "@/content/algorithms";
import { AlgorithmCard } from "@/components/ui/AlgorithmCard";

const techStack = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Recharts",
  "SVG / Canvas",
  "Custom ML logic",
];

const valueProps = [
  {
    icon: MousePointerClick,
    title: "Interactive controls",
    body: "Adjust parameters with sliders and buttons, then watch the model react instantly.",
  },
  {
    icon: Eye,
    title: "See the algorithm",
    body: "Real-time visualizations turn abstract math into moving lines, clusters, and boundaries.",
  },
  {
    icon: BookOpen,
    title: "Understand the why",
    body: "Every demo includes plain-language explanations of what each parameter and metric means.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section className="py-20 text-center sm:py-28">
        <span className="inline-block rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
          Visual ML learning lab
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Understand machine learning by experimenting with it
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
          An interactive playground where you generate data, tune parameters, and watch algorithms
          learn, cluster, and classify — right in your browser.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/playground"
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-400"
          >
            Explore the playground
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Value props */}
      <section className="grid gap-6 sm:grid-cols-3">
        {valueProps.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
            <Icon className="h-6 w-6 text-indigo-400" />
            <h2 className="mt-4 font-semibold text-white">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{body}</p>
          </div>
        ))}
      </section>

      {/* Algorithm cards */}
      <section className="py-20">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Algorithms</h2>
            <p className="mt-2 text-sm text-slate-400">
              Three core demos for the MVP, with more on the roadmap.
            </p>
          </div>
          <Link
            href="/playground"
            className="hidden text-sm text-indigo-300 transition-colors hover:text-indigo-200 sm:block"
          >
            View all →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {algorithms.map((algorithm) => (
            <AlgorithmCard key={algorithm.slug} algorithm={algorithm} />
          ))}
        </div>
      </section>

      {/* Tech stack */}
      <section className="border-t border-white/10 py-16 text-center">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Built with
        </h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-slate-900/60 px-4 py-1.5 text-sm text-slate-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
