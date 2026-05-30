import type { Point2D } from "@/types/ml";

type KMeansChartProps = {
  points: Point2D[];
  /** Cluster index per point; undefined or -1 renders as neutral. */
  assignments?: number[];
  centroids: Point2D[];
  showAssignmentLines?: boolean;
  selectedCentroid?: number | null;
  className?: string;
};

// Data is generated in the [0, 1] unit square, so the domain is fixed.
const VW = 600;
const VH = 440;
const M = 16;
const PW = VW - M * 2;
const PH = VH - M * 2;

export const CLUSTER_COLORS = [
  "#818cf8",
  "#22d3ee",
  "#f472b6",
  "#34d399",
  "#fbbf24",
  "#fb7185",
  "#a78bfa",
  "#4ade80",
];

const colorFor = (c: number | undefined) =>
  c === undefined || c < 0 ? "#64748b" : CLUSTER_COLORS[c % CLUSTER_COLORS.length];

/** Lightweight, dependency-free cluster scatter with centroid markers. */
export function KMeansChart({
  points,
  assignments,
  centroids,
  showAssignmentLines,
  selectedCentroid,
  className,
}: KMeansChartProps) {
  const sx = (x: number) => M + x * PW;
  const sy = (y: number) => M + (1 - y) * PH;

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      className={className ?? "h-auto w-full"}
      role="img"
      aria-label="K-Means cluster plot"
    >
      <rect x={M} y={M} width={PW} height={PH} fill="rgba(148,163,184,0.04)" rx={10} />

      {/* faint lines from each point to its centroid */}
      {showAssignmentLines &&
        assignments &&
        centroids.length > 0 &&
        points.map((p, i) => {
          const c = assignments[i];
          if (c < 0 || c >= centroids.length) return null;
          return (
            <line
              key={`l${i}`}
              x1={sx(p.x)}
              y1={sy(p.y)}
              x2={sx(centroids[c].x)}
              y2={sy(centroids[c].y)}
              stroke={colorFor(c)}
              strokeOpacity={0.18}
              strokeWidth={1}
            />
          );
        })}

      {/* data points colored by cluster */}
      {points.map((p, i) => (
        <circle
          key={i}
          cx={sx(p.x)}
          cy={sy(p.y)}
          r={4}
          fill={colorFor(assignments?.[i])}
          fillOpacity={0.8}
          style={{ transition: "fill 0.3s ease" }}
        />
      ))}

      {/* centroids: larger ringed markers that animate as they move */}
      {centroids.map((c, i) => (
        <g key={`c${i}`} style={{ transition: "transform 0.35s ease" }}>
          <circle
            cx={sx(c.x)}
            cy={sy(c.y)}
            r={selectedCentroid === i ? 12 : 10}
            fill={CLUSTER_COLORS[i % CLUSTER_COLORS.length]}
            stroke="#0f172a"
            strokeWidth={3}
            style={{ transition: "cx 0.35s ease, cy 0.35s ease" }}
          />
          <circle cx={sx(c.x)} cy={sy(c.y)} r={3} fill="#0f172a" style={{ transition: "cx 0.35s ease, cy 0.35s ease" }} />
        </g>
      ))}
    </svg>
  );
}
