# Module Steering — K-Means Clustering Playground

## 1. Module Purpose
The K-Means module teaches unsupervised learning by showing how points are grouped into clusters based on distance to centroids.

## 2. Learning Objectives
Users should understand:

1. What clustering means.
2. What centroids are.
3. How assignment works.
4. How centroid updates work.
5. What convergence means.
6. Why choosing K matters.

## 3. Core Concept
K-Means repeats two steps:

1. Assign each point to the nearest centroid.
2. Move each centroid to the average position of its assigned points.

Repeat until the centroids stop moving or max iterations is reached.

## 4. Required UI Controls
Include:

- Number of clusters K.
- Number of points.
- Dataset shape.
- Initialize centroids button.
- Step button.
- Auto-run button.
- Reset button.

Dataset shapes:

- Blob.
- Random.
- Circle or ring if implemented.

## 5. Required Visualization
Show:

- Points colored by cluster.
- Centroids as larger markers.
- Current iteration.
- Inertia or SSE.
- Optional lines from points to assigned centroid.

## 6. Algorithm Logic
Implement manually in TypeScript.

Core functions:

```ts
distance(a, b)
initializeCentroids(points, k)
assignClusters(points, centroids)
updateCentroids(points, k)
calculateInertia(points, centroids)
```

## 7. Demo Flow
The user flow should be:

1. User opens K-Means page.
2. User chooses K.
3. User generates dataset.
4. User initializes centroids.
5. User clicks Step.
6. Points are assigned to nearest centroids.
7. User clicks Step again.
8. Centroids move.
9. Process repeats until stable.

## 8. Parameter Explanation
K:
- Number of clusters the algorithm tries to find.

Number of points:
- More points make clustering more detailed but may slow visualization.

Dataset shape:
- Different shapes show different strengths and weaknesses of K-Means.

Iterations:
- More iterations allow centroids to stabilize.

## 9. Suggested Experiments
Kiro should suggest:

1. Try K = 2, 3, 4 on the same dataset.
2. Use random initialization multiple times.
3. Observe how centroids move.
4. Use a circular dataset and explain why K-Means may struggle.
5. Increase point count and observe stability.

## 10. Metrics
Show:

- Inertia/SSE.
- Current iteration.
- Number of changed assignments.

Optional:
- Elbow chart for different K values.

## 11. Explanation Panel Content
The panel should explain:

K-Means tries to minimize the distance between points and their cluster center. It does not know the correct labels. It only groups points based on similarity in position.

## 12. Edge Cases
Handle:

- K greater than number of points.
- Empty cluster.
- Random centroids far from data.
- No centroids initialized.

If an empty cluster happens, reinitialize that centroid.

## 13. Common Mistakes to Explain
Users may think:

- K-Means automatically knows the best K.
- Cluster colors represent true labels.
- K-Means works well for all shapes.
- One run is always enough.

Kiro should explain that initialization and K choice matter.

## 14. Portfolio Highlight
Mention that this module demonstrates:

- Unsupervised learning.
- Distance-based optimization.
- Step-by-step algorithm animation.
- Interactive clustering visualization.

## 15. Technical Notes
Use:

- TypeScript for clustering logic.
- SVG or Canvas for moving centroids.
- Recharts for inertia chart if needed.
- React state for iteration state.

No backend is required.

## 16. Future Improvement
Add:

- Elbow method.
- K-Means++ initialization.
- DBSCAN comparison.
- Silhouette score.

## 17. Definition of Done
This module is done when:

- User can generate cluster data.
- User can choose K.
- Centroids initialize.
- Step mode works.
- Auto-run works.
- Inertia updates.
- Explanation panel is clear.
