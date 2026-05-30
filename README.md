# Interactive Machine Learning Playground

A portfolio-focused web application for learning machine learning algorithms through interactive browser-based visualizations.

## Overview

Interactive ML Playground is a browser-based learning lab that visualizes how machine learning algorithms learn, update their parameters, and make predictions. Instead of reading formulas, you generate data, adjust parameters with live controls, and watch models train in real time.

It is designed as a personal portfolio project for an Informatics Engineering student focused on machine learning and deep learning — demonstrating both ML understanding and frontend engineering ability. All computation runs client-side in pure TypeScript, with no backend and no external ML libraries.

## Current Status

- **Phase 0:** Project scaffold — completed
- **Phase 1:** Shared ML infrastructure — completed
- **Phase 2:** Linear Regression Playground — completed
- **Phase 3:** K-Means Clustering — planned next

## Features

- Modern Next.js app shell
- Responsive portfolio homepage
- Playground algorithm index
- Reusable ML playground layout
- Shared ML types and math utilities
- Deterministic dataset generators
- Linear Regression demo using gradient descent
- Interactive parameter controls
- Metrics panel
- Explanation panel
- Dark AI/ML lab-style UI

## Algorithms

| Algorithm | Status | Description |
|---|---|---|
| Linear Regression | Available | Visualizes gradient descent, slope, intercept, and MSE |
| K-Means Clustering | Planned | Will visualize centroid movement and clustering |
| Decision Tree | Planned | Will visualize splits and decision boundaries |
| Neural Network | Planned | Will visualize simple feedforward learning |
| PCA | Planned | Will visualize dimensionality reduction |

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
├── components/               # UI and layout components
│   ├── playground/           # Reusable playground shell, panels, controls
│   └── visualizations/       # Algorithm-specific charts (SVG)
├── content/                  # Algorithm metadata
├── lib/
│   ├── algorithms/           # ML algorithm logic (pure functions)
│   ├── data/                 # Deterministic dataset generators
│   └── math/                 # Shared math/statistics utilities
└── types/                    # Shared ML and app types
.kiro/steering/               # Kiro steering documentation
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

## Portfolio Purpose

This project demonstrates:

- Machine learning fundamentals
- Browser-based ML implementation
- Data visualization
- Frontend engineering
- TypeScript architecture
- Interactive educational UI design

## Roadmap

1. Linear Regression
2. K-Means Clustering
3. Decision Tree
4. Neural Network
5. PCA
6. Portfolio case study page
7. Deployment to Vercel or Netlify
