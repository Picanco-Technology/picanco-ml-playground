# MVP Steering — Interactive Machine Learning Playground

## 1. Project Identity
Project name: **Interactive Machine Learning Playground**.

This project is a portfolio-ready web application for an Informatics Engineering final-year student with a strong interest in machine learning, deep learning, and educational AI tools. The application helps users understand machine learning visually through interactive demos, parameter controls, animated model behavior, and simple explanations.

The project should not feel like a normal CRUD website. It should feel like an **AI/ML learning lab** where users can experiment with algorithms directly in the browser.

## 2. Core Goal
Build a web-based ML playground that lets users:

1. Generate simple synthetic datasets.
2. Change algorithm parameters with sliders and controls.
3. See visual model behavior in real time.
4. Understand what each algorithm is doing through explanation panels.
5. View metrics such as loss, accuracy, MSE, inertia, and confusion matrix.
6. Explore ML concepts without needing to write code.

The project must be suitable for a personal portfolio website and should demonstrate both **machine learning understanding** and **frontend engineering ability**.

## 3. User Background and Constraints
The project owner is an Informatics Engineering student in semester 8. The owner likes machine learning and deep learning projects and wants to show strong ML ability through a personal website portfolio.

Development device: **MacBook with Apple M1**.

Important constraint:
- Avoid heavy local deep learning training.
- Avoid backend-heavy inference for the MVP.
- Prefer browser-side computation using lightweight JavaScript or TypeScript math logic.
- Use Google Colab or Kaggle Notebook only if heavier training is needed later.

Hosting plan:
- Primary: **Vercel**.
- Alternative: **Netlify**.
- The app should work as a mostly frontend/static interactive website.

## 4. MVP Scope
The MVP must focus on quality, not too many features.

MVP modules:
1. **Linear Regression Playground**
2. **K-Means Clustering Playground**
3. **Decision Tree Playground**

Future modules after MVP:
1. **Neural Network Playground**
2. **PCA Visualization Playground**

The MVP is successful when a visitor can open the website, choose one of the three algorithms, interact with controls, see the visualization update, and understand the concept from the explanation panel.

## 5. Recommended Tech Stack
Use this stack unless the user explicitly changes it:

- **Next.js**: main React framework.
- **TypeScript**: type safety and cleaner code.
- **Tailwind CSS**: styling, responsive UI, and fast design iteration.
- **Recharts**: simple charts such as loss curves and metric charts.
- **D3.js or SVG/Canvas**: custom visualizations such as draggable points, centroids, decision boundaries, and animation.
- **Custom TypeScript ML logic**: implement basic ML algorithms directly in the browser.
- **Vercel**: preferred deployment platform.
- **Netlify**: acceptable alternative deployment platform.

Avoid using Python backend for the MVP unless strictly necessary.

## 6. Product Positioning
This project should be presented as:

> A visual and interactive web-based learning platform that helps beginners understand how machine learning algorithms learn, classify, cluster, and optimize.

The portfolio message should be:

> I do not only train models; I understand how algorithms work and can build interactive tools to explain them.

## 7. Required Pages
The app should include:

1. **Landing Page**
   - Hero section.
   - Short project explanation.
   - Algorithm cards.
   - Call-to-action buttons to start demos.

2. **Playground Index Page**
   - List all available algorithms.
   - Show status: MVP, coming soon, advanced.

3. **Linear Regression Page**
   - Scatter plot.
   - Regression line.
   - Parameter panel.
   - Loss/MSE panel.
   - Explanation panel.

4. **K-Means Page**
   - Cluster points.
   - Centroid animation.
   - K parameter control.
   - Step-by-step iteration.
   - Inertia/SSE metric.

5. **Decision Tree Page**
   - Classification points.
   - Decision boundary.
   - Tree rule display.
   - Max depth control.
   - Accuracy/confusion matrix.

6. **About / Case Study Section**
   - Problem.
   - Solution.
   - Tech stack.
   - Algorithms implemented.
   - Results and limitations.

## 8. Standard Module Layout
Each algorithm page should follow this layout:

Left panel:
- Dataset settings.
- Algorithm parameters.
- Buttons: Generate, Run, Step, Reset.

Center panel:
- Main visualization.
- Chart/canvas/SVG area.

Right panel:
- Concept explanation.
- Formula or algorithm steps.
- Metrics.
- Suggested experiments.

Bottom section:
- Notes.
- Limitations.
- Portfolio explanation.

## 9. Design Direction
The visual style should be modern, clean, and professional.

Recommended style:
- Dark mode or light/dark toggle.
- Card-based layout.
- Rounded corners.
- Soft shadows.
- Clear typography.
- Responsive grid layout.
- Smooth but not excessive animations.

The app should feel like a technical product, not a school assignment.

## 10. Algorithm Implementation Rule
For the MVP, implement ML logic manually in TypeScript where possible.

Reason:
- It demonstrates understanding.
- It avoids heavy dependencies.
- It runs well on Vercel/Netlify.
- It is easier to explain in the portfolio.

Do not rely only on external ML libraries if the algorithm is simple enough to implement manually.

## 11. Educational Explanation Rule
Every module should explain:

1. What the algorithm does.
2. What problem it solves.
3. What each parameter means.
4. What the user should observe visually.
5. What metrics mean.
6. What common mistakes happen.
7. What limitation the algorithm has.

Use beginner-friendly language but include technical depth.

## 12. Portfolio Requirements
Each module should generate material that can be shown on a portfolio:

- Project screenshot.
- Short explanation.
- Tech stack.
- Algorithm summary.
- Key features.
- Metrics shown.
- Limitations.
- Future improvement.

The final portfolio page should include links to:
- Live demo.
- GitHub repository.
- Case study.

## 13. AI Agent Behavior
When Kiro works on this project, it should:

1. Read `mvp.md` first.
2. Use module-specific steering files when working on a module.
3. Keep the code modular.
4. Avoid overengineering the MVP.
5. Prioritize working demos over perfect theory.
6. Explain implementation choices clearly.
7. Keep the app deployable on Vercel/Netlify.
8. Use TypeScript types for data points, model state, and metrics.
9. Build reusable components.
10. Preserve a clean folder structure.

## 14. Definition of Done for MVP
The MVP is done when:

- Landing page works.
- Three algorithm cards are visible.
- Linear Regression demo works.
- K-Means demo works.
- Decision Tree demo works at a basic level.
- All demos have parameter controls.
- All demos have explanation panels.
- All demos have at least one metric.
- Website is responsive enough for laptop and tablet.
- Project can deploy to Vercel or Netlify.
- README explains setup, features, stack, and roadmap.

## 15. Build Priority
Build in this order:

1. Project setup.
2. Shared layout and UI components.
3. Dataset generator utilities.
4. Linear Regression module.
5. K-Means module.
6. Decision Tree module.
7. Metrics and explanation panels.
8. Landing page polish.
9. Portfolio case study section.
10. Deployment cleanup.

## 16. Avoid These Mistakes
Do not:

- Build too many algorithms before polishing the first three.
- Add a heavy backend for the MVP.
- Use Python server inference for simple algorithms.
- Hide theory completely.
- Make visualizations static.
- Ignore responsive design.
- Add features that cannot be explained in the portfolio.
- Build code that only works locally.

## 17. Final Direction
This project should prove that the owner can combine:

- Machine learning theory.
- Interactive frontend development.
- Data visualization.
- Product thinking.
- Portfolio storytelling.
- Deployment skill.

The final result should be a strong portfolio project for internships, junior ML engineer roles, junior data roles, or frontend roles with AI/ML focus.
