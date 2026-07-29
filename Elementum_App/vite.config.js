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
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons.svg', 'icons/apple-touch-icon.png'],
      manifest: {
        name: 'Elementum',
        short_name: 'Elementum',
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
