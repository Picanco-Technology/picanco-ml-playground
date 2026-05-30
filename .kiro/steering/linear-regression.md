# Module Steering — Linear Regression Playground

## 1. Module Purpose
The Linear Regression module teaches users how a model learns a straight-line relationship between input `x` and target `y`.

It should show that the model starts with a poor line and improves by reducing error.

## 2. Learning Objectives
Users should understand:

1. What regression means.
2. What slope and intercept represent.
3. How prediction works.
4. What loss/MSE means.
5. How learning rate affects training.
6. How noise affects model fit.

## 3. Formula
Use the formula:

```text
y = mx + b
```

Explain:

- `x`: input value.
- `y`: predicted output.
- `m`: slope or weight.
- `b`: intercept or bias.

## 4. Required UI Controls
Include:

- Number of points.
- Noise level.
- Learning rate.
- Epochs or training steps.
- Generate dataset button.
- Run training button.
- Step training button.
- Reset model button.

Optional:

- Add point by clicking on chart.
- Show residual lines.

## 5. Required Visualization
Show:

- Scatter plot of generated points.
- Regression line.
- MSE value.
- Slope and intercept values.
- Loss curve.

## 6. Algorithm Logic
Implement gradient descent manually in TypeScript.

Core functions:

```ts
predict(x, slope, intercept)
meanSquaredError(points, slope, intercept)
trainStep(points, state, learningRate)
```

## 7. Demo Flow
The user flow should be:

1. User opens Linear Regression page.
2. User clicks Generate Dataset.
3. Scatter points appear.
4. User changes noise or point count.
5. User clicks Run Training.
6. Regression line moves gradually.
7. MSE decreases.
8. User reads explanation panel.

## 8. Parameter Explanation
Number of points:
- More points make the data pattern clearer.

Noise:
- Higher noise makes the relationship harder to fit.

Learning rate:
- Small value means slow training.
- Large value may overshoot and make loss unstable.

Epochs:
- More epochs give more training time.

## 9. Suggested Experiments
Kiro should suggest:

1. Set noise low and observe a clean line.
2. Set noise high and observe less accurate fit.
3. Use very small learning rate and observe slow convergence.
4. Use very high learning rate and observe instability.
5. Add an outlier and observe how the line changes.

## 10. Metrics
Show:

- MSE.
- Current epoch.
- Slope.
- Intercept.

Optional:
- R-squared.

## 11. Explanation Panel Content
The explanation panel should say:

Linear regression tries to find the line that minimizes the average squared distance between the predicted values and the real values. The model updates the slope and intercept during training to reduce the error.

## 12. Edge Cases
Handle:

- Empty dataset.
- Only one point.
- Extremely high learning rate.
- Very high noise.

If training diverges, show a friendly warning.

## 13. Common Mistakes to Explain
Users may think:

- A lower line always means worse prediction.
- More epochs always improve the model.
- High learning rate always trains faster.
- Noise is model error, not data variation.

Kiro should correct these gently.

## 14. Portfolio Highlight
Mention that this module demonstrates:

- Manual ML implementation.
- Gradient descent.
- Real-time visualization.
- Interactive data generation.
- Metric interpretation.

## 15. Technical Notes
Use:

- TypeScript for algorithm logic.
- Recharts or SVG for scatter/loss chart.
- Tailwind CSS for controls.
- React state for model state.

No backend is required.

## 16. Future Improvement
Add:

- Polynomial regression.
- Multiple linear regression.
- Residual visualization.
- Compare closed-form solution vs gradient descent.

## 17. Definition of Done
This module is done when:

- User can generate points.
- User can train line animation.
- MSE updates.
- Slope/intercept update.
- Controls work.
- Explanation panel is clear.
