# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Build to dist/
npm run preview   # Preview production build locally
```

No lint or test scripts are configured.

## Architecture

**HDR Events** is a React 19 + Vite SPA for teacher recruitment — connecting educators with international schools in the Middle East.

### Routing

React Router v7 (`BrowserRouter`) with three routes in [App.tsx](App.tsx):
- `/` → [pages/Home.tsx](pages/Home.tsx)
- `/services` → [pages/Services.tsx](pages/Services.tsx)
- `/contact` → [pages/Contact.tsx](pages/Contact.tsx)

A `ScrollToTop` component (also in `App.tsx`) resets scroll position on each route change. Netlify is configured to redirect all paths to `/index.html` for SPA routing.

### Component Layers

- **[components/UI.tsx](components/UI.tsx)** — primitives used everywhere: `SEO`, `Button`, `Section`, `Card`, `SectionHeading`. Read this file before adding new shared UI.
- **[components/ApplicationForm.tsx](components/ApplicationForm.tsx)** — the main teacher application form. Encodes file attachments as base64 and POSTs to the Google Apps Script endpoint.
- **[components/Navbar.tsx](components/Navbar.tsx)** / **[components/Footer.tsx](components/Footer.tsx)** — site chrome, always rendered.
- **Page components** in `pages/` compose the above primitives and section-specific UI.

### Styling

Tailwind CSS is loaded via CDN in [index.html](index.html) with an inline `tailwind.config` block — **there is no separate CSS file or PostCSS pipeline**. Custom tokens defined there:

| Token | Value |
|---|---|
| `navy` | `#0A2A43` |
| `navyLight` | `#153E5C` |
| `gold` | `#CDA349` |
| `goldHover` | `#B88F35` |
| `lightGrey` | `#F2F4F7` |
| `charcoal` | `#333333` |

Custom animations (`fade-in-up`, `float`, `shimmer`, `pulse-slow`, `spin-slower`) are also defined in that inline config.

### Form Submission

`ApplicationForm.tsx` submits to `VITE_GOOGLE_APPS_SCRIPT_URL` (set in `.env`). Files (CV, passport, medical, additional) are converted to base64 strings before submission — no separate file upload service.

### Environment Variables

| Variable | Purpose |
|---|---|
| `VITE_GOOGLE_APPS_SCRIPT_URL` | Google Apps Script endpoint for form submissions |

`vite.config.ts` also exposes `GEMINI_API_KEY` / `API_KEY` as `process.env.*` globals, though no Gemini integration is currently wired into components.

### TypeScript

Key shared interfaces live in [types.ts](types.ts). `tsconfig.json` uses `noEmit: true` — type checking only, Vite handles transpilation. Path alias `@/*` maps to the repo root.
