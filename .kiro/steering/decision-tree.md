# Module Steering — Decision Tree Playground

## 1. Module Purpose
The Decision Tree module teaches classification by showing how data is split into rule-based regions.

## 2. Learning Objectives
Users should understand:

1. What classification means.
2. How decision trees split data.
3. What max depth means.
4. What Gini impurity or entropy means conceptually.
5. What decision boundaries look like.
6. How overfitting and underfitting happen.

## 3. Core Concept
A decision tree asks a sequence of questions.

Example:

```text
If x < 0.5:
  predict Class A
Else:
  predict Class B
```

More depth means more complex rules.

## 4. Required UI Controls
Include:

- Dataset type.
- Number of points.
- Max depth.
- Min samples split.
- Criterion: Gini or Entropy if implemented.
- Train tree button.
- Reset button.

Dataset types:

- Linear.
- Circle.
- Moon or XOR if implemented.

## 5. Required Visualization
Show:

- Classification points.
- Decision boundary regions.
- Tree rules.
- Accuracy.
- Optional confusion matrix.

## 6. Algorithm Logic
For MVP, implement a simple 2D decision tree or use a lightweight custom classifier.

Core functions:

```ts
calculateGini(groups)
findBestSplit(points)
buildTree(points, maxDepth, minSamples)
predictTree(tree, point)
```

If full tree implementation is too heavy, implement a simplified version first and clearly document the limitation.

## 7. Demo Flow
The user flow should be:

1. User opens Decision Tree page.
2. User chooses dataset type.
3. User sets max depth.
4. User generates data.
5. User trains tree.
6. Decision regions appear.
7. User increases max depth.
8. Boundary becomes more complex.
9. User compares accuracy and overfitting.

## 8. Parameter Explanation
Max depth:
- Controls tree complexity.
- Low depth may underfit.
- Very high depth may overfit.

Min samples split:
- Controls when a node can split.
- Higher value makes tree simpler.

Criterion:
- Measures how good a split is.

## 9. Suggested Experiments
Kiro should suggest:

1. Try max depth = 1 and observe underfitting.
2. Try max depth = 3 and observe balanced boundaries.
3. Try max depth = 10 and observe overfitting.
4. Change dataset type.
5. Compare accuracy with boundary shape.

## 10. Metrics
Show:

- Accuracy.
- Correct predictions.
- Wrong predictions.

Optional:
- Confusion matrix.
- Tree depth.
- Number of leaves.

## 11. Explanation Panel Content
The panel should explain:

A decision tree splits data into smaller regions using rules. Each split tries to make the resulting groups more pure, meaning most points in a region belong to the same class.

## 12. Edge Cases
Handle:

- Too few points.
- One class only.
- Max depth too high.
- Empty split.

Show friendly warnings instead of breaking the app.

## 13. Common Mistakes to Explain
Users may think:

- Higher accuracy always means better model.
- More depth is always better.
- Decision trees create smooth boundaries.
- The tree understands meaning; actually it uses feature thresholds.

Kiro should explain these clearly.

## 14. Portfolio Highlight
Mention that this module demonstrates:

- Classification.
- Rule-based ML.
- Model interpretability.
- Decision boundary visualization.
- Underfitting and overfitting.

## 15. Technical Notes
Use:

- TypeScript for tree logic.
- Canvas/SVG for boundary grid.
- React state for parameters.
- Tailwind CSS for controls and cards.

Keep grid resolution moderate for performance.

## 16. Future Improvement
Add:

- Feature importance.
- Random Forest comparison.
- Pruning.
- Train/test split.
- More datasets.

## 17. Definition of Done
This module is done when:

- User can generate classification data.
- User can train tree.
- Decision boundary appears.
- Max depth affects boundary.
- Accuracy updates.
- Rules are shown in readable form.
