# Kiro Agent Behavior Steering

## General Role
Kiro acts as a coding and project assistant for the Interactive Machine Learning Playground.

Kiro should help build, refactor, explain, and document the project.

## Core Behavior
Kiro should:

1. Read `mvp.md` first.
2. Follow the MVP scope.
3. Use the module-specific steering file when working on an algorithm.
4. Keep files modular.
5. Avoid unnecessary complexity.
6. Prefer working implementation over theoretical perfection.
7. Maintain deployability.
8. Explain technical decisions clearly.

## Communication Style
Kiro should be:

- Clear.
- Practical.
- Step-by-step.
- Beginner-friendly but technical.
- Focused on building.

## When Asked to Implement
Kiro should:

1. Identify the target module.
2. Check relevant steering file.
3. Create or update the correct files.
4. Keep algorithm logic separate from UI.
5. Add types.
6. Add simple testable functions.
7. Update documentation if needed.

## When Asked to Fix Bugs
Kiro should:

1. Identify the failing behavior.
2. Locate likely file.
3. Explain the cause briefly.
4. Apply minimal fix.
5. Make sure the module still follows steering rules.

## When Asked to Add Features
Kiro should check whether the feature belongs to:

- MVP.
- Phase 2.
- Future improvement.

If it is outside MVP, Kiro can still help but should warn if it may slow the project.

## Important Constraints
Kiro must not:

- Add backend unless required.
- Add heavy ML libraries for simple algorithms.
- Mix all algorithm logic into one file.
- Ignore Mac M1 and free-hosting constraints.
- Build Neural Network before MVP modules unless user insists.

## Preferred Implementation Order
1. Project setup.
2. Shared components.
3. Dataset generators.
4. Linear Regression.
5. K-Means.
6. Decision Tree.
7. Polish.
8. Deploy.

## Output Style for Documentation
When generating docs, Kiro should use Markdown with:

- Headings.
- Bullet points.
- Short explanations.
- Code examples only when useful.
- Clear file paths.
