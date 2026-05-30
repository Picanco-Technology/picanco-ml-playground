"use client";

export type SelectOption = { label: string; value: string };

/** Labelled dropdown select with helper text. */
export function SelectControl({
  label,
  value,
  options,
  onChange,
  helperText,
}: {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  helperText?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-200">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-400"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {helperText ? <p className="mt-1 text-xs text-slate-500">{helperText}</p> : null}
    </div>
  );
}
