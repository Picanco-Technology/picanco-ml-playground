# Tech Stack Steering

## Main Stack
Use the following technology stack for the MVP:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts
- D3.js, SVG, or Canvas when needed
- Custom TypeScript math/ML utilities
- Vercel or Netlify deployment

## Why Next.js
Next.js is suitable because:

- It is portfolio-friendly.
- It works well with Vercel.
- It supports routing easily.
- It works well for static and interactive pages.
- It can be extended later with API routes if needed.

## Why TypeScript
TypeScript should be used because:

- Algorithm data types become clearer.
- Bugs are easier to catch.
- It makes the project look more professional.
- It helps define points, clusters, metrics, and model state.

Suggested types:

```ts
export type Point2D = {
  x: number;
  y: number;
  label?: number;
};

export type RegressionState = {
  slope: number;
  intercept: number;
  mse: number;
  epoch: number;
};

export type ClusterPoint = Point2D & {
  cluster?: number;
};
```

## Why Tailwind CSS
Tailwind CSS should be used for:

- Fast UI styling.
- Responsive design.
- Consistent spacing.
- Card-based layout.
- Dark mode support.

## Visualization Libraries
Use Recharts for:

- Loss curves.
- MSE charts.
- Inertia charts.
- Accuracy charts.
- Simple scatter/line charts if enough.

Use D3.js, SVG, or Canvas for:

- Draggable points.
- K-Means centroid movement.
- Decision boundaries.
- Custom animated diagrams.
- Dense classification grids.

## ML Logic Rule
For simple algorithms, write custom TypeScript logic.

Use custom implementation for:

- Linear Regression gradient descent.
- K-Means assignment/update loop.
- Simple Decision Tree for 2D classification.
- PCA math later if manageable.

Avoid heavy ML packages in the MVP.

## Dependency Rule
Keep dependencies minimal.

Recommended dependencies:

```bash
npm install recharts lucide-react clsx tailwind-merge
```

Optional:

```bash
npm install d3
```

Avoid heavy dependencies unless they provide clear benefit.

## Hosting Rule
The project must run as a browser-side app and deploy easily.

Preferred:

- Vercel for Next.js.

Alternative:

- Netlify for static/React deployment.

Do not require GPU, Docker, database, or paid API for MVP.
