import Link from "next/link";
import { BrainCircuit } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-white">
          <BrainCircuit className="h-6 w-6 text-indigo-400" />
          <span>ML Playground</span>
        </Link>
        <div className="flex items-center gap-6 text-sm text-slate-300">
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <Link href="/playground" className="transition-colors hover:text-white">
            Playground
          </Link>
        </div>
      </nav>
    </header>
  );
}
