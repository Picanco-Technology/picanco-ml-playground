# Interactive Machine Learning Playground

A portfolio-focused web application for learning machine learning algorithms through interactive, browser-based visualizations.

## Overview

Interactive ML Playground is a browser-based learning lab that visualizes how machine learning algorithms learn, update their parameters, and make predictions. Instead of reading formulas, you generate data, adjust parameters with live controls, and watch models train in real time.

It is designed as a personal portfolio project for an Informatics Engineering student focused on machine learning and deep learning — demonstrating both ML understanding and frontend engineering ability. All computation runs client-side in pure TypeScript, with no backend and no external ML libraries.

> **Live demo:** deployment to Vercel is planned (Phase 7).

## Current Status

The three-algorithm MVP is complete.

- **Phase 0:** Project scaffold — completed
- **Phase 1:** Shared ML infrastructure — completed
- **Phase 2:** Linear Regression Playground — completed
- **Phase 3:** K-Means Clustering Playground — completed
- **Phase 4:** Decision Tree Playground — completed
- **Phase 5:** UI polish — completed
- **Phase 6:** Documentation — in progress
- **Phase 7:** Deployment to Vercel — planned

## Features

- Modern Next.js app shell with a responsive portfolio homepage
- Playground algorithm index with status badges
- Reusable three-zone playground layout (controls / visualization / explanation)
- Shared ML types, math utilities, and deterministic dataset generators
- Linear Regression demo using manual gradient descent (animated training, loss tracking, divergence guard)
- K-Means demo with step/auto-run iterations, moving centroids, and inertia
- Decision Tree demo with decision-boundary heatmap, readable tree rules, accuracy, and confusion matrix
- Interactive parameter controls, metrics panels, and explanation panels on every demo
- Custom SVG visualizations (no charting library)
- Dark AI/ML lab-style UI with accessible focus states

## Algorithms

| Algorithm | Status | Description |
|---|---|---|
| Linear Regression | Available | Visualizes gradient descent, slope, intercept, and MSE |
| K-Means Clustering | Available | Visualizes centroid movement, cluster assignment, and inertia |
| Decision Tree | Available | Visualizes splits, decision boundaries, tree rules, and accuracy |
| Neural Network | Planned | Will visualize simple feedforward learning |
| PCA | Planned | Will visualize dimensionality reduction |

## How Each Algorithm Works

All algorithms are implemented from scratch in TypeScript as pure functions under `src/lib/algorithms`.

- **Linear Regression** — Fits `y = mx + b` with batch gradient descent. Each step computes the MSE gradients for slope and intercept and nudges them downhill. Training is animated frame-by-frame, and a guard detects divergence when the learning rate is too high.
- **K-Means Clustering** — Unsupervised. Centroids are seeded with Forgy initialization, then each iteration (1) assigns every point to its nearest centroid and (2) moves each centroid to the mean of its points. Inertia (sum of squared distances) is tracked, and convergence stops the loop. Empty clusters are handled safely.
- **Decision Tree** — Recursively splits the 2D feature space on the `x`/`y` threshold with the highest information gain, measured by Gini impurity or entropy. Max depth and minimum samples per split control complexity (underfitting vs overfitting). A grid of predictions renders the blocky, axis-aligned decision boundary.

## Tech Stack

- Next.js 15
- React 19
- TypeScript 5
- Tailwind CSS v4
- lucide-react
- Custom TypeScript ML logic
- Vercel or Netlify deployment target

## Project Structure

```text
src/
├── app/                      # Routes (App Router)
│   └── playground/           # Algorithm index + per-algorithm demo pages
├── components/
│   ├── layout/               # Navbar, Footer
│   ├── playground/           # Reusable shell, panels, controls
│   ├── ui/                   # AlgorithmCard
│   └── visualizations/       # Custom SVG charts per algorithm
├── content/                  # Algorithm metadata
├── lib/
│   ├── algorithms/           # ML algorithm logic (pure functions)
│   ├── data/                 # Deterministic dataset generators
│   └── math/                 # Shared math/statistics utilities
└── types/                    # Shared ML and app types
```

## Getting Started

```bash
npm install
npm run dev
```

The app runs locally at:

```text
http://localhost:3000
```

## Build

```bash
npm run build
```

## Routes

- `/` — Homepage
- `/playground` — Algorithm index
- `/playground/demo` — Shared component sandbox
- `/playground/linear-regression` — Linear Regression demo
- `/playground/kmeans` — K-Means Clustering demo
- `/playground/decision-tree` — Decision Tree demo

## Limitations

- Uses small, synthetic datasets generated in the browser.
- Algorithms are simplified for educational visualization, not production accuracy.
- Decision boundaries use a fixed-resolution grid to stay responsive.
- Designed for desktop and tablet widths; very small screens stack vertically.

## Case Study

**Problem.** Many beginners learn ML only through formulas and code, which makes it hard to picture how algorithms actually behave while training, clustering, or classifying.

**Solution.** A visual, interactive playground where users generate data, adjust parameters, watch the model react in real time, and read plain-language explanations — all in the browser.

**Outcome.** A deployable portfolio project that implements core ML algorithms from scratch in TypeScript, pairs each with a custom real-time visualization and metrics, and presents them in a polished, responsive UI.

## Portfolio Purpose

This project demonstrates:

- Machine learning fundamentals
- Browser-based ML implementation
- Data visualization
- Frontend engineering
- TypeScript architecture
- Interactive educational UI design

## Roadmap

- [x] Linear Regression
- [x] K-Means Clustering
- [x] Decision Tree
- [x] UI polish
- [ ] Neural Network playground
- [ ] PCA visualization
- [ ] Deployment to Vercel or Netlify
