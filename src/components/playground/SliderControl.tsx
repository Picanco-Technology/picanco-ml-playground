"use client";

/** Labelled range slider with a live value and helper text. */
export function SliderControl({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  helperText,
  displayValue,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  helperText?: string;
  displayValue?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-200">{label}</label>
        <span className="text-sm tabular-nums text-indigo-300">{displayValue ?? value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-indigo-500"
      />
      {helperText ? <p className="mt-1 text-xs text-slate-500">{helperText}</p> : null}
    </div>
  );
}
