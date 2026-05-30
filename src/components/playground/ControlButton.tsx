"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const variantStyles: Record<Variant, string> = {
  primary: "bg-indigo-500 text-white hover:bg-indigo-400",
  secondary: "bg-slate-800 text-slate-100 hover:bg-slate-700",
  ghost: "bg-transparent text-slate-300 hover:bg-slate-800",
};

/** Styled action button for playground controls (Generate, Run, Step, Reset). */
export function ControlButton({
  children,
  onClick,
  variant = "secondary",
  disabled = false,
  icon,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: Variant;
  disabled?: boolean;
  icon?: ReactNode;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40",
        variantStyles[variant],
      )}
    >
      {icon}
      {children}
    </button>
  );
}
