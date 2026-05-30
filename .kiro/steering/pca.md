# Module Steering — PCA Visualization Playground

## 1. Module Purpose
The PCA module is a future feature. It teaches dimensionality reduction by showing how data can be projected onto directions that capture the most variance.

## 2. Learning Objectives
Users should understand:

1. What dimensionality reduction means.
2. What variance means.
3. What principal components are.
4. Why normalization matters.
5. How projection works.
6. How explained variance ratio is interpreted.

## 3. MVP Status
This module is not part of the first MVP.

Build it after the first three modules are complete.

## 4. Required UI Controls Later
Include:

- Dataset type.
- Number of points.
- Number of components.
- Normalize toggle.
- Compute PCA button.
- Reset button.

Dataset types:

- Correlated 2D data.
- 3D synthetic data.
- Iris-like data if included manually.

## 5. Required Visualization Later
Show:

- Original data.
- Principal component direction.
- Projected data.
- Explained variance ratio.

## 6. Algorithm Logic
Implement PCA manually if manageable.

Core steps:

1. Normalize data.
2. Compute mean.
3. Center data.
4. Compute covariance matrix.
5. Find principal directions.
6. Project data.

For 2D PCA, the math can be simplified.

## 7. Demo Flow Later
The user flow should be:

1. User selects dataset.
2. User toggles normalization.
3. User computes PCA.
4. Principal component arrows appear.
5. Projected data appears.
6. Explained variance is shown.

## 8. Parameter Explanation
Components:
- Number of new dimensions to keep.

Normalize:
- Makes features comparable by scale.

Variance:
- Amount of information/spread captured by a component.

## 9. Suggested Experiments Later
Kiro should suggest:

1. Turn normalization on and off.
2. Use highly correlated data.
3. Compare one component vs two components.
4. Observe explained variance.
5. Use noisy data and observe component direction.

## 10. Metrics
Show:

- Explained variance ratio.
- Total variance retained.

Optional:
- Reconstruction error.

## 11. Explanation Panel Content
The panel should explain:

PCA finds new axes for the data. The first axis captures the largest amount of variation. By keeping only the most important axes, data can be simplified while preserving most of its structure.

## 12. Edge Cases
Handle:

- Too few points.
- Zero variance feature.
- Non-numeric data.
- Same points repeated.

## 13. Common Mistakes to Explain
Users may think:

- PCA chooses original features.
- PCA is supervised learning.
- PCA always improves classification.
- PCA keeps meaning of original axes unchanged.

Kiro should explain that PCA creates new directions.

## 14. Portfolio Highlight
Mention that this module demonstrates:

- Dimensionality reduction.
- Linear algebra understanding.
- Data visualization.
- Variance interpretation.

## 15. Technical Notes
Use:

- TypeScript math utilities.
- SVG/Recharts for plots.
- Optional small matrix helper functions.

Avoid large linear algebra libraries unless needed.

## 16. Future Improvement
Add:

- PCA + K-Means pipeline.
- PCA before classification.
- 3D visualization.
- Real dataset demo.

## 17. Definition of Done Later
This module is done when:

- User can compute PCA.
- Principal direction appears.
- Projection appears.
- Explained variance updates.
- Explanation panel is clear.
