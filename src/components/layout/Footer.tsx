import { Code2, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-slate-400 sm:flex-row">
        <p>Interactive Machine Learning Playground — a portfolio project.</p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/qhiyn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <Code2 className="h-4 w-4" />
            GitHub
          </a>
          <a
            href="#"
            className="flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <Globe className="h-4 w-4" />
            Portfolio
          </a>
        </div>
      </div>
    </footer>
  );
}
