# Grudged Portfolio

Personal portfolio website built with Angular 20 + TypeScript, deployed to Netlify.

## Repo Structure
The Angular project lives in `Grudged-Portfolio/` (nested directory). The root `package.json` is a wrapper that `cd`s into that directory for build/start.

## Development Commands
- `cd Grudged-Portfolio && npm install` — install dependencies
- `cd Grudged-Portfolio && npm start` — dev server
- `cd Grudged-Portfolio && npm run build:prod` — production build
- `cd Grudged-Portfolio && npm test` — run Karma/Jasmine tests

## Build Output
Production build outputs to `Grudged-Portfolio/dist/Grudged-Portfolio/browser`

## Architecture
- Standalone Angular components (no NgModules)
- 4 routes: / (hero), /about, /projects, /contact
- CSS custom properties for light/dark theming (styles.css :root / .dark-theme)
- EmailJS for contact form (config in src/app/config/email.config.ts)
- Konami code easter egg unlocks dev-console component

## TypeScript
- Strict mode enabled
- Target: ES2022, module: preserve
- Angular strict templates enabled

## Deployment
- Netlify auto-deploys; config in netlify.toml at repo root
- Node 20.19.0 required
- SPA redirect rule: /* -> /index.html

## Things to Watch
- Google Analytics placeholder `GA_MEASUREMENT_ID` in index.html is not replaced
- No linter configured
