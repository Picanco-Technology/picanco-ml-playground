import type { LabeledPoint2D, Point2D } from "@/types/ml";

type DecisionTreeChartProps = {
  points: LabeledPoint2D[];
  /** Class label per grid cell, grid[row][col], over the [0,1] square. */
  grid: number[][];
  selectedPoint?: Point2D | null;
  className?: string;
};

// Square viewport so shapes (e.g. circles) are not distorted.
const VW = 520;
const M = 10;
const PW = VW - M * 2;

/** Class colors: index 0 and 1. */
export const CLASS_COLORS = ["#818cf8", "#fb7185"];

const colorFor = (c: number) => CLASS_COLORS[c % CLASS_COLORS.length];

/** Dependency-free decision-boundary heatmap with classification points on top. */
export function DecisionTreeChart({ points, grid, selectedPoint, className }: DecisionTreeChartProps) {
  const sx = (x: number) => M + x * PW;
  const sy = (y: number) => M + (1 - y) * PW;
  const res = grid.length;
  const cell = res > 0 ? PW / res : 0;

  return (
    <svg
      viewBox={`0 0 ${VW} ${VW}`}
      className={className ?? "h-auto w-full"}
      role="img"
      aria-label="Decision boundary with classification points"
    >
      <rect x={M} y={M} width={PW} height={PW} fill="rgba(148,163,184,0.04)" rx={10} />

      {/* decision-boundary regions */}
      {grid.map((row, r) =>
        row.map((cls, c) => (
          <rect
            key={`${r}-${c}`}
            x={M + c * cell}
            y={M + (res - 1 - r) * cell}
            width={cell + 0.5}
            height={cell + 0.5}
            fill={colorFor(cls)}
            fillOpacity={0.16}
          />
        )),
      )}

      {/* classification points */}
      {points.map((p, i) => (
        <circle key={i} cx={sx(p.x)} cy={sy(p.y)} r={4.5} fill={colorFor(p.label)} stroke="#0f172a" strokeWidth={1}>
          <title>{`x: ${p.x.toFixed(2)}, y: ${p.y.toFixed(2)} → class ${p.label}`}</title>
        </circle>
      ))}

      {selectedPoint && (
        <circle cx={sx(selectedPoint.x)} cy={sy(selectedPoint.y)} r={8} fill="none" stroke="#fbbf24" strokeWidth={2} />
      )}
    </svg>
  );
}
