# Showcase frame renderer

Dev tooling (not shipped in the app) that composes the app's screen replicas
into branded, landscape **showcase frames** — phone mockups floating on the
silk / ink-wash brand background with caption text. Used to produce the
portfolio thumbnails/gallery for the Elementum project page on
`jiaxinxu.work`.

## Files

- `framer.html` — defines every frame (hero, 10 gallery frames, square thumb)
  and renders them as 1600×900 (or 1200×1200 square) compositions using the
  locked type system (Cormorant Garamond / EB Garamond / Cinzel / Noto Serif SC).
- `render.mjs` — drives headless Chromium (Playwright) to screenshot each
  `.frame` to a JPEG, writing straight into the portfolio repo's `src/assets/`.
- `src/` — **not committed** (see `.gitignore`). Source PNGs the framer embeds.

## Regenerating

1. Capture current app screens (from `Elementum_App/`, dev server on :5173):
   ```
   node capture-replicas.mjs
   ```
   → writes `Documents/Designengineering/app-replicas/screens/*.png`.

2. Copy the screens + concept art you want into `showcase/src/` with the clean
   names referenced in `framer.html` (e.g. `s03-reveal.png`, `art-landscape.png`).

3. Render the frames:
   ```
   node showcase/render.mjs
   ```
   Outputs `elementum-*.jpg` to `D:/Elementum/portfolio_site/src/assets/`
   (adjust the `OUT` path in `render.mjs` for your portfolio checkout).

Requires `playwright` (already a dev dependency of `Elementum_App`) with
Chromium installed.
