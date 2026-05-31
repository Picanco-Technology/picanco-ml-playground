import type { DecisionTreeNode } from "@/lib/algorithms/decisionTree";
import { CLASS_COLORS } from "./DecisionTreeChart";

function NodeView({ node, branch }: { node: DecisionTreeNode; branch?: "True" | "False" }) {
  const isLeaf = node.feature === undefined;
  return (
    <div className="text-sm">
      <div className="flex items-center gap-2">
        {branch ? (
          <span
            className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
              branch === "True" ? "bg-emerald-500/15 text-emerald-300" : "bg-rose-500/15 text-rose-300"
            }`}
          >
            {branch}
          </span>
        ) : null}
        {isLeaf ? (
          <span className="flex items-center gap-1.5 text-slate-200">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ background: CLASS_COLORS[(node.prediction ?? 0) % CLASS_COLORS.length] }}
            />
            Predict class {node.prediction}
            <span className="text-slate-500">· {node.samples} samples</span>
          </span>
        ) : (
          <span className="font-mono text-indigo-300">
            {node.feature} ≤ {node.threshold?.toFixed(2)}
            <span className="ml-1 font-sans text-slate-500">· {node.samples} samples</span>
          </span>
        )}
      </div>
      {!isLeaf && (
        <div className="ml-2 mt-1.5 space-y-1.5 border-l border-white/10 pl-3">
          {node.left ? <NodeView node={node.left} branch="True" /> : null}
          {node.right ? <NodeView node={node.right} branch="False" /> : null}
        </div>
      )}
    </div>
  );
}

/** Renders the learned tree as readable nested split rules. */
export function TreeStructure({ tree }: { tree: DecisionTreeNode | null }) {
  if (!tree) return <p className="text-sm text-slate-500">Train the tree to see its learned rules.</p>;
  return (
    <div className="overflow-x-auto">
      <NodeView node={tree} />
    </div>
  );
}
