// ─────────────────────────────────────────────────────────────────────────────
// LIB · card image export
// ─────────────────────────────────────────────────────────────────────────────
// Reusable client-side rasteriser for the shareable cards (identity card #1 and
// the compatibility card #2 both consume this — rule 4, no per-feature copies).
// Renders a live DOM node to a retina PNG, then either hands it to the native
// share sheet (mobile) or falls back to a download. Pure browser APIs; no server.
// ─────────────────────────────────────────────────────────────────────────────

import { toPng, toBlob } from 'html-to-image';
import { getCardFontEmbedCSS } from './fontEmbed.js';

// 2× so a 540×960 logical card exports at 1080×1920 — the native story canvas.
const PIXEL_RATIO = 2;
// The card paints its own silk background; this is only the safety fill behind
// any transparent edge pixels.
const BG = '#F1E9D6';

// Wait for the seal PNG + web fonts so the raster never captures a fallback
// glyph or a blank image (html-to-image snapshots synchronously).
async function ready() {
  if (document.fonts && document.fonts.ready) {
    try { await document.fonts.ready; } catch { /* fonts API absent — continue */ }
  }
}

// Scoped font embed (Latin display families only). Passing fontEmbedCSS stops
// html-to-image from walking every @font-face in the doc — including the CJK
// families — which otherwise stalls the raster. '' → let it skip fonts.
async function opts() {
  const fontEmbedCSS = await getCardFontEmbedCSS();
  return {
    pixelRatio: PIXEL_RATIO,
    cacheBust: true,
    backgroundColor: BG,
    ...(fontEmbedCSS ? { fontEmbedCSS } : { skipFonts: true }),
  };
}

// Trigger a browser download for a blob/data-url.
function saveObject(href, filename, revoke) {
  const a = document.createElement('a');
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  if (revoke) URL.revokeObjectURL(href);
}

// PNG download. Returns true on success.
export async function downloadCardPng(node, filename = 'elementum-card.png') {
  if (!node) return false;
  await ready();
  const dataUrl = await toPng(node, await opts());
  if (!dataUrl) return false;
  saveObject(dataUrl, filename, false);
  return true;
}

// Native share with the image file where supported (mobile share sheet), else a
// download. Returns 'shared' | 'cancelled' | 'downloaded' | 'error'.
export async function shareCard(node, { filename = 'elementum-card.png', title, text } = {}) {
  if (!node) return 'error';
  await ready();
  const blob = await toBlob(node, await opts());
  if (!blob) return 'error';
  const file = new File([blob], filename, { type: 'image/png' });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title, text });
      return 'shared';
    } catch (e) {
      if (e && e.name === 'AbortError') return 'cancelled';
      // fall through to download on any non-abort share failure
    }
  }
  saveObject(URL.createObjectURL(blob), filename, true);
  return 'downloaded';
}

// Copy a string (invite link / app URL) to the clipboard. Returns true on success.
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
