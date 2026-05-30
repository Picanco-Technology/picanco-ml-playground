# Deployment Steering

## Deployment Goal
The app must deploy easily to Vercel or Netlify.

## Preferred Deployment
Use Vercel for Next.js.

Expected workflow:

1. Push project to GitHub.
2. Import repository in Vercel.
3. Use default Next.js settings.
4. Deploy.
5. Add live demo link to portfolio and README.

## Alternative Deployment
Use Netlify if preferred.

Make sure build command and output settings are correct for the chosen Next.js setup.

## Environment Variables
MVP should not require environment variables.

Avoid paid APIs or backend dependencies in MVP.

## Pre-Deployment Checklist
Before deployment:

- Run `npm run build`.
- Fix TypeScript errors.
- Test all pages.
- Check responsive layout.
- Check console errors.
- Remove unused code.
- Update README.
- Add screenshots if possible.

## Hosting Constraints
The app should be browser-side and lightweight.

Avoid:

- Heavy serverless inference.
- Large model files.
- Python server requirement.
- Database requirement.
- GPU requirement.

## Portfolio Deployment Notes
After deployment, add:

- Live demo URL.
- GitHub URL.
- Short case study.
- Screenshots or GIFs.
- Tech stack badges.

## Future Deployment Option
If future deep learning demos become heavy, host those separately on Hugging Face Spaces and link/embed them from the portfolio.
