# Testing and Quality Steering

## Quality Goal
The project must feel reliable and polished. Demos should not break when users change parameters quickly.

## Manual Testing Checklist
Test every module with:

- Default settings.
- Minimum parameter values.
- Maximum reasonable parameter values.
- Reset button.
- Generate new dataset multiple times.
- Run and step modes.
- Mobile width.
- Dark/light mode if implemented.

## Algorithm Testing
For Linear Regression:

- MSE should usually decrease with reasonable learning rate.
- Slope/intercept should update.
- Reset should restore initial state.

For K-Means:

- Points should receive cluster labels.
- Centroids should move.
- Inertia should generally decrease.
- Empty clusters should not crash the app.

For Decision Tree:

- Prediction should return a class.
- Accuracy should calculate correctly.
- Max depth should change boundary complexity.

## Code Quality Rules
Use:

- Clear function names.
- TypeScript types.
- Small reusable components.
- Pure algorithm functions.
- Comments only where useful.

Avoid:

- Huge components.
- Magic numbers without explanation.
- Algorithm logic inside JSX.
- Unnecessary dependencies.

## Performance Rules
Keep browser performance good:

- Limit points by default.
- Debounce expensive slider updates.
- Avoid huge decision boundary grids.
- Use memoization for computed data.
- Prefer Canvas for dense rendering.

## Error Handling
Show friendly messages for:

- No data generated.
- Invalid parameter combination.
- Training divergence.
- Too many clusters.
- Too few data points.

## Documentation Rule
Every module should have:

- Short explanation in UI.
- Code comments for algorithm logic.
- README section explaining implementation.
