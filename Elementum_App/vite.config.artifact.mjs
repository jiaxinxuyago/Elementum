// Artifact single-file build — react only, no PWA, no public prune, one chunk.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-artifact',
    copyPublicDir: false,
    cssCodeSplit: false,
    rollupOptions: { output: { inlineDynamicImports: true, manualChunks: undefined } },
  },
});
