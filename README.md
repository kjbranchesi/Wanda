# One Eyed Wanda

Loud, art-pop landing site for **One Eyed Wanda** — a small-batch coffee roaster
in Wilbraham, Massachusetts, fronted by a chibi one-eyed cat mascot named Wanda.

Built from a [Claude Design](https://claude.ai/design) handoff as a real
**Vite + React + TypeScript** app.

## Pages

- **`/` — Landing page.** Sticky nav, haloed "patron saint" hero (Wanda blinks),
  scrolling marquees, brand mood board, four-roast coffee menu, "Wanda's Cult"
  subscription, a draggable sticker wall, wholesale, an Instagram feed, and a
  giant-wordmark footer. A floating **Tweaks** panel lets you swap between 12
  palettes, a Loud↔Zine vibe, marquee speed, and the hero tagline live.
- **`/brand-system.html` — Brand system.** A pannable/zoomable canvas of
  artboards (identity, palette, typography, voice, packaging, and applied
  templates). Scroll/drag to pan, wheel/pinch or the controls to zoom, **Fit**
  for an overview, and click any artboard for a fullscreen focus view
  (←/→ between artboards, ↑/↓ between sections, Esc to exit).

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # type-checks, then bundles to dist/
npm run preview    # serve the production build locally
```

## Project structure

```
index.html                  landing entry
brand-system.html           brand-system entry
src/
  App.tsx                   landing composition + Tweaks wiring
  styles.css                landing brand stylesheet
  components/               Wanda mascot, coffee icons, and every section
  tweaks/                   useTweaks hook + the live Tweaks panel
  brand/                    DesignCanvas (pan/zoom/focus) + brand artboards
  brand-system.css          brand-system stylesheet
```

`Wanda.tsx` is the single source of truth for the mascot — swap the SVG paths
there when the real illustration is commissioned and it cascades everywhere
(landing page and brand system both consume it).

## Deploy

It's a static multi-page site (`dist/`), so it runs on any static host.

- **Netlify** — connect the repo (config in [`netlify.toml`](netlify.toml)) or
  `npx netlify deploy --build --prod`.
- **Vercel** — import the repo; the Vite preset is auto-detected
  (build `npm run build`, output `dist`).
- **GitHub Pages** — push to `main`; the workflow in
  [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and
  deploys automatically. Enable it once under **Settings → Pages → Source:
  GitHub Actions**. It sets the base path to `/<repo>/` for you.
- **Anywhere else** — `npm run build` and upload `dist/`.

For a subpath deploy outside the GitHub workflow, set `VITE_BASE` (e.g.
`VITE_BASE=/wanda/ npm run build`). The default base is `/`.

## Notes

- **Wanda is a geometric placeholder.** When the real illustration lands, replace
  the SVG in `src/components/Wanda.tsx`.
- Roast names ("Suspicious Light," "Decaf? In This House?") and photo blocks are
  seed content, ready to swap for real copy and imagery.
- The prototype's hand-drawn cat variant was retired during design — geometric is
  the only canonical mark.
