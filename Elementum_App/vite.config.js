import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// ── Deploy-only prune ───────────────────────────────────────────────
// public/ carries the mirrored design system (Design/Library previews,
// brush samples, reference art) for the dev preview — none of it is
// referenced by the app at runtime (see src/styles/backgrounds.js for
// the runtime set). Strip it from dist/ so the deployable build ships
// only live assets. (Legend/moodboard mirrors retired 2026-07-29 —
// design cleanup Phase 2; the Library/ entry covers the new mirrors.)
const DEV_ONLY_PUBLIC = [
  'tokens.css',
  'brush-samples',
  'ChatGPT_Backgrounds_v1',
  'Library',
  'atmospheric-depth',
  'Stem Thumbnail',
  'concept-arts/five-elements',
  'concept-arts/scenes',
  // Guard entries: UNTRACKED local artifacts some machines carry in public/
  // (never committed, so absent from fresh clones/worktrees — keep pruning
  // them or the 20MB preview bundle breaks the PWA precache; 2026-07-29).
  '_d13-preview.html',
];

function pruneDevAssets() {
  let outDir = 'dist';
  return {
    name: 'elementum-prune-dev-assets',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      for (const rel of DEV_ONLY_PUBLIC) {
        const target = path.join(outDir, rel);
        if (fs.existsSync(target)) fs.rmSync(target, { recursive: true });
      }
      console.log(`\n[prune] removed ${DEV_ONLY_PUBLIC.length} dev-only public entries from ${outDir}`);
    },
  };
}

// ── Dev-tools build (the elementum-dev Worker) ──────────────────────
// VITE_DEVTOOLS=1 turns on IS_DEV_TOOLS (src/devtools.js) in a production
// build. The build is marked noindex and ships a disallow-all robots.txt so
// the staging site never gets indexed; the PWA manifest is renamed so an
// installed dev app is never mistaken for the real one.
const DEVTOOLS = process.env.VITE_DEVTOOLS === '1';

function devToolsBuild() {
  let outDir = 'dist';
  return {
    name: 'elementum-devtools-build',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    transformIndexHtml(html) {
      if (!DEVTOOLS) return html;
      return html.replace('<meta charset="UTF-8" />', '<meta charset="UTF-8" />\n    <meta name="robots" content="noindex, nofollow" />');
    },
    closeBundle() {
      if (!DEVTOOLS) return;
      fs.writeFileSync(path.join(outDir, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
      console.log('\n[devtools] VITE_DEVTOOLS=1 build: noindex meta + robots.txt disallow-all written');
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  // Override for subpath hosting (e.g. GitHub Pages): ELEMENTUM_BASE=/Elementum/
  base: process.env.ELEMENTUM_BASE || '/',
  // Honor a harness-assigned dev port (launch.json autoPort sets PORT); Vite
  // ignores the PORT env var by default. No PORT → Vite's usual 5173+.
  server: { port: Number(process.env.PORT) || undefined },
  plugins: [
    react(),
    pruneDevAssets(),
    devToolsBuild(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons.svg', 'icons/apple-touch-icon.png'],
      manifest: {
        name: DEVTOOLS ? 'Elementum Dev' : 'Elementum',
        short_name: DEVTOOLS ? 'Elementum Dev' : 'Elementum',
        description: 'Your elemental energy, read from the moment you were born.',
        theme_color: '#F1E9D6',      // silk — matches the app ground
        background_color: '#F1E9D6',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Web Push handlers (INF_01 §4.4) ride into the generated SW.
        importScripts: ['push-sw.js'],
        // Precache the app shell only (code + vector assets). The painted
        // art library is far too large to precache — it runtime-caches below.
        globPatterns: ['**/*.{js,css,html,svg}'],
        navigateFallback: undefined, // single index.html, no client-side routes
        runtimeCaching: [
          {
            // Painted art (plates, library tiles, seals) — immutable PNGs.
            urlPattern: /\/(assets|backgrounds|concept-arts|icons)\/.*\.png$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'elementum-art',
              expiration: { maxEntries: 300, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-css' },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-files',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
});
