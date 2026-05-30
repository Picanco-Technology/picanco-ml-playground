"use client";

import { useState } from "react";
import { Play, RotateCcw, Sparkles, StepForward, FlaskConical } from "lucide-react";
import { PlaygroundShell } from "@/components/playground/PlaygroundShell";
import { ParameterPanel } from "@/components/playground/ParameterPanel";
import { MetricPanel } from "@/components/playground/MetricPanel";
import { ExplanationPanel } from "@/components/playground/ExplanationPanel";
import { EmptyVisualization } from "@/components/playground/EmptyVisualization";
import { SliderControl } from "@/components/playground/SliderControl";
import { SelectControl } from "@/components/playground/SelectControl";
import { ControlButton } from "@/components/playground/ControlButton";
import { StatusBadge } from "@/components/playground/StatusBadge";
import type { AlgorithmStatus, ModelMetric } from "@/types/ml";

export default function ComponentDemoPage() {
  const [points, setPoints] = useState(40);
  const [noise, setNoise] = useState(0.15);
  const [learningRate, setLearningRate] = useState(0.05);
  const [shape, setShape] = useState("blob");
  const [status, setStatus] = useState<AlgorithmStatus>("idle");
  const [hasData, setHasData] = useState(false);

  const metrics: ModelMetric[] = [
    { key: "points", label: "Data Points", value: points },
    { key: "noise", label: "Noise", value: noise.toFixed(2) },
    { key: "lr", label: "Learning Rate", value: learningRate.toFixed(3) },
    { key: "shape", label: "Dataset", value: shape },
  ];

  return (
    <PlaygroundShell
      title="Shared Component Demo"
      description="A sandbox that wires up the reusable playground UI. No real algorithm runs here — it only shows the shared shell, controls, metrics, and panels that every module will use."
      status={<StatusBadge status={status} />}
      controls={
        <ParameterPanel>
          <SliderControl
            label="Data points"
            value={points}
            min={10}
            max={200}
            step={5}
            onChange={setPoints}
            helperText="More points reveal the pattern more clearly."
          />
          <SliderControl
            label="Noise"
            value={noise}
            min={0}
            max={1}
            step={0.01}
            displayValue={noise.toFixed(2)}
            onChange={setNoise}
            helperText="Higher noise makes patterns harder to fit."
          />
          <SliderControl
            label="Learning rate"
            value={learningRate}
            min={0.001}
            max={0.5}
            step={0.001}
            displayValue={learningRate.toFixed(3)}
            onChange={setLearningRate}
            helperText="Controls how big each training update is."
          />
          <SelectControl
            label="Dataset shape"
            value={shape}
            onChange={setShape}
            options={[
              { label: "Blob", value: "blob" },
              { label: "Circle", value: "circle" },
              { label: "Moons", value: "moon" },
              { label: "XOR", value: "xor" },
            ]}
          />
          <div className="grid grid-cols-2 gap-2 pt-1">
            <ControlButton
              variant="primary"
              icon={<Sparkles className="h-4 w-4" />}
              onClick={() => {
                setHasData(true);
                setStatus("ready");
              }}
            >
              Generate
            </ControlButton>
            <ControlButton
              icon={<Play className="h-4 w-4" />}
              disabled={!hasData}
              onClick={() => setStatus("running")}
            >
              Run
            </ControlButton>
            <ControlButton
              icon={<StepForward className="h-4 w-4" />}
              disabled={!hasData}
              onClick={() => setStatus("converged")}
            >
              Step
            </ControlButton>
            <ControlButton
              variant="ghost"
              icon={<RotateCcw className="h-4 w-4" />}
              onClick={() => {
                setHasData(false);
                setStatus("idle");
              }}
            >
              Reset
            </ControlButton>
          </div>
        </ParameterPanel>
      }
      visualization={
        hasData ? (
          <div className="flex h-full min-h-[320px] items-center justify-center rounded-2xl border border-white/10 bg-slate-900/40 p-8 text-center text-slate-400">
            Visualization renders here once an algorithm module is implemented.
          </div>
        ) : (
          <EmptyVisualization hint="Click Generate to create a sample dataset." />
        )
      }
      info={
        <>
          <MetricPanel metrics={metrics} />
          <ExplanationPanel
            title="About this demo"
            sections={[
              {
                heading: "What this is",
                body: "A preview of the shared playground components that every algorithm module reuses.",
              },
              {
                heading: "What to try",
                body: "Move the sliders and switch datasets — the metric panel and status badge update live.",
              },
              {
                heading: "Limitation",
                body: "No model is trained here. Real training arrives with the Linear Regression, K-Means, and Decision Tree modules.",
              },
            ]}
          />
        </>
      }
      notes={
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-sm text-slate-400">
          <div className="flex items-center gap-2 text-slate-300">
            <FlaskConical className="h-4 w-4 text-indigo-400" />
            <span className="font-medium">Portfolio note</span>
          </div>
          <p className="mt-2">
            These reusable building blocks keep each algorithm page consistent and let the demos
            focus on their unique visualization and math.
          </p>
        </div>
      }
    />
  );
}
