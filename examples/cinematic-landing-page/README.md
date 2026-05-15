# Aurora — Cinematic Landing Page

A modern, motion-first landing page starter built with **React 18**, **TypeScript**, **Tailwind CSS** and **Framer Motion**. Designed for product launches that need a polished, immersive first impression — without sacrificing performance or accessibility.

![Hero preview](./docs/hero-preview.png)

## Highlights

- **Cinematic animations** powered by Framer Motion (scroll progress, parallax hero, stagger reveals, animated counters, layout pill transitions).
- **Glassmorphism design system** with reusable `GlassCard`, `Button`, `SectionHeader`, and `Icon` primitives.
- **Animated particle field** rendered on a single canvas with mouse interaction, connection lines, IntersectionObserver-based pausing, and `visibilitychange` gating.
- **Aurora gradient blobs** with reduced-motion fallbacks.
- **Dark / light mode** with `localStorage` persistence and class-based Tailwind theming.
- **Responsive & mobile-first** layout, animated hamburger menu, fluid type.
- **Accessible by default**: keyboard navigation, `aria-expanded`/`aria-controls`, skip link, focus-visible ring, full `prefers-reduced-motion` support.
- **Performance optimized**: route-level code splitting via `React.lazy`, GPU-accelerated transforms, mobile-aware particle budget, manual rollup chunks for `react` & `motion`.

## Sections

1. **Hero** — animated heading with gradient text, scroll-driven parallax, CTAs.
2. **Features** — six glassmorphism cards with hover glow.
3. **Stats** — in-view animated counters.
4. **Testimonials** — three customer quotes with gradient avatar badges.
5. **Pricing** — three plans with monthly/yearly toggle (animated `layoutId` pill).
6. **FAQ** — accessible accordion with smooth height animation.
7. **Footer** — link groups, social icons, brand line.

## Stack

| Concern         | Tool                 |
| --------------- | -------------------- |
| Framework       | React 18 + Vite 5    |
| Language        | TypeScript           |
| Styling         | Tailwind CSS 3       |
| Animation       | Framer Motion 11     |
| Smoke tests     | Playwright           |

## Getting started

```bash
npm install
npm run dev        # http://127.0.0.1:5173
```

### Available scripts

| Script           | Purpose                                                      |
| ---------------- | ------------------------------------------------------------ |
| `npm run dev`    | Start Vite dev server on `127.0.0.1:5173`.                   |
| `npm run build`  | Type-check (`tsc -b`) and produce a production bundle.       |
| `npm run preview`| Preview the production build locally.                        |

### Run the Playwright smoke tests

The included `scripts/smoke-test.mjs` exercises the full page end-to-end: rendering, accessibility, FAQ + pricing interactions, theme toggle, mobile menu, reduced-motion variant, and console-error monitoring.

```bash
# Make sure the dev server is running in another terminal first.
node scripts/smoke-test.mjs
```

A performance probe is also available:

```bash
node scripts/perf-check.mjs
```

## Folder structure

```
src/
├── App.tsx                   # Page composition + lazy section boundaries
├── main.tsx                  # React entry
├── styles/
│   └── index.css             # Tailwind layers, custom utilities (glass, gradient, shimmer)
├── lib/
│   ├── cn.ts                 # className helper
│   └── motion.ts             # shared Framer Motion variants
├── hooks/
│   ├── useReducedMotion.ts   # OS-level motion preference
│   ├── useScrollProgress.ts  # raw scroll progress (0–1)
│   └── useTheme.ts           # dark/light toggle w/ persistence
└── components/
    ├── effects/
    │   ├── AuroraBlobs.tsx        # gradient blobs (motion)
    │   ├── LoadingScreen.tsx      # initial loader
    │   ├── ParticlesBackground.tsx# canvas particle field
    │   └── ScrollProgress.tsx     # top bar progress indicator
    ├── layout/
    │   ├── Footer.tsx
    │   └── Navbar.tsx             # animated, glass-on-scroll, mobile menu
    ├── sections/
    │   ├── Hero.tsx
    │   ├── Features.tsx
    │   ├── Stats.tsx
    │   ├── Testimonials.tsx
    │   ├── Pricing.tsx
    │   └── FAQ.tsx
    └── ui/
        ├── Button.tsx             # primary + ghost variants
        ├── GlassCard.tsx          # glassmorphism container with glow
        ├── SectionHeader.tsx      # eyebrow + title + description
        └── Icon.tsx               # inline SVG icon set
```

## Accessibility

- **Skip link** to main content, surfaced on first Tab.
- **Reduced motion**: respected by the OS preference — parallax, blobs, particles, and Framer Motion durations are short-circuited.
- **Focus styles** are visible (`:focus-visible` outline ring).
- **ARIA**: navbar exposes `aria-expanded` for the mobile menu, FAQ uses `aria-controls`/`aria-labelledby`, the pricing toggle uses `aria-pressed`, and counters are wrapped in `aria-live="polite"` regions where appropriate.
- **Color contrast** of primary copy meets WCAG AA on the cinematic background.

## Performance notes

- Heavy sections are loaded with `React.lazy` + `Suspense` so the initial JS payload includes only Hero + chrome. Per-route gzip sizes after `npm run build`:

  | Chunk           | Gzip     |
  | --------------- | -------- |
  | `react` vendor  | ~43 KB   |
  | `motion` vendor | ~43 KB   |
  | app entry       | ~8 KB    |
  | each section    | 1–2 KB   |

- The particle canvas caps DPR at 1.5 and tunes the particle count for mobile.
- The canvas pauses via `IntersectionObserver` when scrolled out and via `visibilitychange` when the tab is hidden.
- `will-change: transform` is set only on the long-lived aurora blob layers.
- Fonts load non-blocking with a `<link rel="preload" as="style" onload>` swap and a `<noscript>` fallback.

## License

MIT — use it, fork it, ship something beautiful.
