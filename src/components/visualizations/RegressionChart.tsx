import type { Point2D, RegressionPoint } from "@/types/ml";
import { predictLinear } from "@/lib/algorithms/linearRegression";

type RegressionChartProps = {
  points: RegressionPoint[];
  slope: number;
  intercept: number;
  selectedPoint?: Point2D | null;
  predictedPoint?: Point2D | null;
  className?: string;
};

// Internal coordinate system; the SVG scales responsively via viewBox.
const VW = 600;
const VH = 420;
const M = { top: 16, right: 16, bottom: 32, left: 44 };
const PW = VW - M.left - M.right;
const PH = VH - M.top - M.bottom;
const TICKS = 4;

/** Lightweight, dependency-free scatter + regression line chart. */
export function RegressionChart({
  points,
  slope,
  intercept,
  selectedPoint,
  predictedPoint,
  className,
}: RegressionChartProps) {
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  let xMin = xs.length ? Math.min(...xs) : 0;
  let xMax = xs.length ? Math.max(...xs) : 1;
  // Include the line endpoints so the line is always visible.
  const lineLeft = predictLinear(xMin, slope, intercept);
  const lineRight = predictLinear(xMax, slope, intercept);
  let yMin = Math.min(...(ys.length ? ys : [0]), lineLeft, lineRight);
  let yMax = Math.max(...(ys.length ? ys : [1]), lineLeft, lineRight);

  const padX = (xMax - xMin) * 0.08 || 0.5;
  const padY = (yMax - yMin) * 0.12 || 0.5;
  xMin -= padX;
  xMax += padX;
  yMin -= padY;
  yMax += padY;

  const sx = (x: number) => M.left + ((x - xMin) / (xMax - xMin)) * PW;
  const sy = (y: number) => M.top + (1 - (y - yMin) / (yMax - yMin)) * PH;

  const xTicks = Array.from({ length: TICKS + 1 }, (_, i) => xMin + ((xMax - xMin) * i) / TICKS);
  const yTicks = Array.from({ length: TICKS + 1 }, (_, i) => yMin + ((yMax - yMin) * i) / TICKS);

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      className={className ?? "h-auto w-full"}
      role="img"
      aria-label="Scatter plot with regression line"
    >
      <defs>
        <clipPath id="lr-plot">
          <rect x={M.left} y={M.top} width={PW} height={PH} />
        </clipPath>
      </defs>

      {/* grid + ticks */}
      {xTicks.map((t, i) => (
        <g key={`x${i}`}>
          <line x1={sx(t)} y1={M.top} x2={sx(t)} y2={M.top + PH} stroke="rgba(148,163,184,0.12)" />
          <text x={sx(t)} y={VH - 10} textAnchor="middle" fill="#64748b" fontSize={11}>
            {t.toFixed(1)}
          </text>
        </g>
      ))}
      {yTicks.map((t, i) => (
        <g key={`y${i}`}>
          <line x1={M.left} y1={sy(t)} x2={M.left + PW} y2={sy(t)} stroke="rgba(148,163,184,0.12)" />
          <text x={M.left - 8} y={sy(t) + 4} textAnchor="end" fill="#64748b" fontSize={11}>
            {t.toFixed(1)}
          </text>
        </g>
      ))}

      {/* regression line */}
      {points.length > 0 && (
        <line
          x1={sx(xMin)}
          y1={sy(predictLinear(xMin, slope, intercept))}
          x2={sx(xMax)}
          y2={sy(predictLinear(xMax, slope, intercept))}
          stroke="#818cf8"
          strokeWidth={2.5}
          clipPath="url(#lr-plot)"
        />
      )}

      {/* data points */}
      {points.map((p, i) => (
        <circle key={i} cx={sx(p.x)} cy={sy(p.y)} r={4} fill="#38bdf8" fillOpacity={0.75} stroke="#0ea5e9">
          <title>{`x: ${p.x.toFixed(2)}, y: ${p.y.toFixed(2)}`}</title>
        </circle>
      ))}

      {/* optional predicted point on the line */}
      {predictedPoint && <circle cx={sx(predictedPoint.x)} cy={sy(predictedPoint.y)} r={5} fill="#fbbf24" />}

      {/* optional selected point highlight */}
      {selectedPoint && (
        <circle cx={sx(selectedPoint.x)} cy={sy(selectedPoint.y)} r={7} fill="none" stroke="#fbbf24" strokeWidth={2} />
      )}
    </svg>
  );
}
