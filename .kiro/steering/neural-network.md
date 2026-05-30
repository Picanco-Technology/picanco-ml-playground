# Module Steering — Neural Network Playground

## 1. Module Purpose
The Neural Network module is a future advanced feature. It teaches how a small feedforward neural network learns nonlinear classification boundaries.

## 2. Learning Objectives
Users should understand:

1. What input, hidden, and output layers are.
2. What weights and biases are.
3. What activation functions do.
4. What forward propagation means.
5. What backpropagation means at a high level.
6. How decision boundaries change during training.

## 3. MVP Status
This module is not part of the first MVP.

Do not build it before Linear Regression, K-Means, and Decision Tree are stable.

## 4. Required UI Controls Later
Include:

- Dataset type.
- Hidden layers.
- Neurons per layer.
- Activation function.
- Learning rate.
- Epochs.
- Train button.
- Reset button.

Datasets:

- XOR.
- Circle.
- Moon.
- Spiral if performance allows.

## 5. Required Visualization Later
Show:

- 2D points.
- Decision boundary.
- Loss curve.
- Accuracy curve.
- Simple network diagram.

## 6. Implementation Direction
For portfolio value, implement a very small neural network manually in TypeScript if possible.

Core concepts:

- Forward pass.
- Activation.
- Loss calculation.
- Basic gradient descent/backprop.

If manual implementation becomes too complex, use TensorFlow.js only for this module and explain the reason.

## 7. Demo Flow Later
The user flow should be:

1. User selects dataset.
2. User chooses number of hidden neurons.
3. User selects activation.
4. User runs training.
5. Loss curve changes.
6. Decision boundary becomes better.
7. User compares different activations.

## 8. Parameter Explanation
Hidden layers:
- More layers can learn more complex patterns.

Neurons:
- More neurons increase capacity.

Activation:
- Adds nonlinearity.

Learning rate:
- Controls update size.

Epochs:
- Number of training passes.

## 9. Suggested Experiments Later
Kiro should suggest:

1. Try XOR with no hidden layer and observe failure.
2. Add hidden neurons and observe improvement.
3. Compare ReLU, sigmoid, and tanh.
4. Use high learning rate and observe instability.
5. Use too few neurons and observe underfitting.

## 10. Metrics
Show:

- Loss.
- Accuracy.
- Epoch.

Optional:
- Decision boundary confidence.

## 11. Explanation Panel Content
The panel should explain:

A neural network combines many small mathematical transformations. Hidden layers help the model learn nonlinear patterns that simple linear models cannot handle.

## 12. Edge Cases
Handle:

- Unstable training.
- NaN values.
- Too many epochs.
- Too many points.
- Too many neurons for browser performance.

## 13. Common Mistakes to Explain
Users may think:

- Deep learning is always better.
- More layers always improve results.
- Accuracy is the only metric.
- Neural networks understand data like humans.

Kiro should explain limitations.

## 14. Portfolio Highlight
Mention that this module demonstrates:

- Deep learning fundamentals.
- Nonlinear classification.
- Training dynamics.
- Loss and accuracy visualization.
- Advanced interactive ML.

## 15. Technical Notes
Use:

- TypeScript manual implementation if possible.
- TensorFlow.js only if needed.
- Canvas for decision boundary.
- Recharts for loss/accuracy.

## 16. Future Improvement
Add:

- Weight visualization.
- Batch size control.
- Optimizer comparison.
- Dropout demonstration.
- Export trained tiny model state.

## 17. Definition of Done Later
This module is done when:

- User can train a small model.
- Decision boundary updates.
- Loss and accuracy update.
- Parameters affect learning visibly.
- Explanation panel is clear.
