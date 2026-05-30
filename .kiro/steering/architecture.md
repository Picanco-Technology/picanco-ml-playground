# Architecture Steering

## Architecture Goal
Keep the project modular so each algorithm can be developed independently.

## Recommended Folder Structure

```text
src/
├── app/
│   ├── page.tsx
│   ├── playground/
│   │   ├── page.tsx
│   │   ├── linear-regression/page.tsx
│   │   ├── kmeans/page.tsx
│   │   ├── decision-tree/page.tsx
│   │   ├── neural-network/page.tsx
│   │   └── pca/page.tsx
├── components/
│   ├── layout/
│   ├── playground/
│   ├── charts/
│   └── ui/
├── lib/
│   ├── algorithms/
│   ├── data/
│   ├── metrics/
│   ├── math/
│   └── utils/
├── types/
└── content/
```

## Component Rules
Create reusable components:

- `AlgorithmCard`
- `ParameterPanel`
- `MetricPanel`
- `ExplanationPanel`
- `PlaygroundLayout`
- `ChartContainer`
- `ControlSlider`
- `RunControls`

## Algorithm Folder Rule
Each algorithm should have separate logic files.

Example:

```text
lib/algorithms/linear-regression.ts
lib/algorithms/kmeans.ts
lib/algorithms/decision-tree.ts
```

Do not mix visualization code with algorithm logic.

## Data Generator Rule
Synthetic data generators should be separated:

```text
lib/data/regression-data.ts
lib/data/cluster-data.ts
lib/data/classification-data.ts
```

## State Management Rule
Use React state for MVP.

Use Zustand only if state becomes complex.

Do not add Redux.

## Rendering Rule
Keep calculations small enough to run in the browser.

If animation becomes slow:

- Reduce point count.
- Reduce grid resolution.
- Use memoization.
- Use Canvas instead of SVG for dense visuals.

## Code Quality Rule
Each algorithm should expose pure functions.

Example:

```ts
trainStep(points, state, learningRate)
assignClusters(points, centroids)
updateCentroids(points, k)
predictDecisionTree(tree, point)
```

Pure functions make the code easier to test and explain.
