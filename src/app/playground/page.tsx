import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { algorithms } from "@/content/algorithms";
import { AlgorithmCard } from "@/components/ui/AlgorithmCard";

export const metadata: Metadata = {
  title: "Playground — Interactive ML Playground",
  description: "Browse the available machine learning demos and their status.",
};

export default function PlaygroundPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <header>
        <h1 className="text-3xl font-bold text-white">Playground</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          Pick an algorithm to experiment with. MVP demos are being built first; advanced modules
          are on the roadmap.
        </p>
        <Link
          href="/playground/demo"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-300 transition-colors hover:text-indigo-200"
        >
          Preview the shared component sandbox
          <ArrowRight className="h-4 w-4" />
        </Link>
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {algorithms.map((algorithm) => (
          <AlgorithmCard key={algorithm.slug} algorithm={algorithm} />
        ))}
      </div>
    </div>
  );
}
