# Data Visualization Standards

## Visualization Goal
Visualizations must make ML behavior understandable.

Do not create charts only for decoration. Every visualization must explain a model behavior, data pattern, metric, or algorithm step.

## General Rules
1. Label axes when meaningful.
2. Show current parameter values.
3. Show metric values near the visualization.
4. Keep animation smooth but not distracting.
5. Use legends when there are multiple classes or clusters.
6. Use tooltips only when useful.

## Linear Regression Visualization
Must show:

- Data points.
- Regression line.
- MSE value.
- Loss curve over epochs.
- Optional residual lines.

Good interaction:
- Add or regenerate data points.
- Animate line updates.
- Show how learning rate affects convergence.

## K-Means Visualization
Must show:

- Points colored by assigned cluster.
- Centroids.
- Centroid movement over iterations.
- Inertia/SSE metric.
- Current iteration.

Good interaction:
- Step mode.
- Auto-run mode.
- Change K.
- Regenerate dataset.

## Decision Tree Visualization
Must show:

- 2D classification points.
- Decision boundary/background regions.
- Tree rules or simple tree diagram.
- Accuracy.
- Confusion matrix if implemented.

Good interaction:
- Adjust max depth.
- Compare underfitting and overfitting.
- Change dataset shape.

## Neural Network Visualization
Must show later:

- Dataset points.
- Decision boundary.
- Loss curve.
- Accuracy curve.
- Basic network structure.

## PCA Visualization
Must show later:

- Original data.
- Principal component direction.
- Projected data.
- Explained variance ratio.

## Performance Rule
If visualization becomes slow:

- Reduce number of points.
- Use lower resolution grids.
- Use Canvas for dense rendering.
- Debounce slider changes.
- Memoize expensive calculations.
