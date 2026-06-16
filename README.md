# Jetendra Laha — 3D Portfolio

A fast, responsive **3D portfolio website** built with Vite + React + TypeScript,
featuring an animated particle-network hero (react-three-fiber), Tailwind CSS
styling, and Framer Motion animations. Deploys automatically to GitHub Pages.

> DevOps | Cloud | Kubernetes | DevSecOps | AI/ML | Automation
> [LinkedIn](https://www.linkedin.com/in/jetendra-laha-406186195/) ·
> [GitHub](https://github.com/jetendralaha?tab=repositories)

## Tech stack

- **Vite** + **React 18** + **TypeScript**
- **@react-three/fiber** + **three.js** — 3D particle network
- **Tailwind CSS** — dark theme, cyan accent
- **Framer Motion** — scroll/entrance animations

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build & preview

```bash
npm run build      # outputs to dist/
npm run preview
```

## Editing content

All text (profile, skills, experience, projects, education, contact) lives in a
single file:

```
src/data/portfolio.ts
```

Edit it and the whole site updates — no component changes needed.

## Add your resume (Download CV button)

Drop your CV at `public/resume.pdf`. The "Download CV" button links to
`/resume.pdf` automatically. To use a different filename, update
`personal.resumeUrl` in `src/data/portfolio.ts`.

## Deploying to GitHub Pages

This repo is configured as a **project site** (repo `jetendra`),
served from `https://jetendralaha.github.io/jetendra/` with base path
`/jetendra/` (see `vite.config.ts`).

1. Push this code to the `main` branch of the **`jetendra`** repo.
2. In **Settings → Pages → Build and deployment**, set **Source** to
   **GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml`, which builds and
   publishes the site to `https://jetendralaha.github.io/jetendra/`.

> Renaming the repo? Update `base` in `vite.config.ts` to match
> (`/<repo-name>/`), or set it to `/` if you rename the repo to
> `jetendralaha.github.io`.

## Accessibility & performance

- 3D scene is lazy-loaded and disabled when `prefers-reduced-motion` is set.
- Semantic sections, keyboard-focusable links, SEO/Open Graph meta tags.
