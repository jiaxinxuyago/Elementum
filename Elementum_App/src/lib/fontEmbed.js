// ─────────────────────────────────────────────────────────────────────────────
// LIB · scoped font embed for card export
// ─────────────────────────────────────────────────────────────────────────────
// html-to-image's default embedder walks EVERY @font-face in the document —
// which here includes the multi-megabyte CJK families (Noto Serif SC, Ma Shan
// Zheng) loaded for the app UI. Inlining those stalls the raster for tens of
// seconds. The shareable cards are Latin-only, so we embed just the three
// display families as data URLs and hand html-to-image a ready `fontEmbedCSS`
// string, which makes it skip its own slow walk entirely.
//
// Result is cached module-wide (the woff2 bytes never change within a session).
// On any failure we return '' so the caller falls back to skipFonts (system
// serif) rather than hanging.
// ─────────────────────────────────────────────────────────────────────────────

// Only the families the cards actually render, at the weights they use.
const SCOPED_CSS_URL =
  'https://fonts.googleapis.com/css2' +
  '?family=Cinzel:wght@500;600' +
  '&family=Cormorant+Garamond:wght@500' +
  '&family=EB+Garamond:wght@400;500' +
  '&display=swap';

const WOFF2_URL = /url\((https:\/\/[^)]+\.woff2)\)/g;
// css2 emits each @font-face preceded by a `/* subset */` comment. The card is
// Latin-only, so we keep just the latin + latin-ext blocks and drop cyrillic /
// greek / vietnamese — cutting ~30 woff2 fetches (913KB) to ~6 (~120KB).
const FACE_BLOCK = /\/\*\s*([\w-]+)\s*\*\/\s*(@font-face\s*\{[^}]*\})/g;
const KEEP_SUBSET = /^latin(-ext)?$/;

let cached = null;

async function toDataUrl(url) {
  const res = await fetch(url);
  const bytes = new Uint8Array(await res.arrayBuffer());
  let bin = '';
  for (let i = 0; i < bytes.length; i += 1) bin += String.fromCharCode(bytes[i]);
  return `data:font/woff2;base64,${btoa(bin)}`;
}

// Returns a self-contained @font-face CSS string (Latin subsets only, fonts
// inlined as data URLs), or '' if the scoped fonts could not be fetched.
export async function getCardFontEmbedCSS() {
  if (cached !== null) return cached;
  try {
    const raw = await (await fetch(SCOPED_CSS_URL)).text();
    // Keep only the Latin @font-face blocks.
    const latinCss = [...raw.matchAll(FACE_BLOCK)]
      .filter((m) => KEEP_SUBSET.test(m[1]))
      .map((m) => m[2])
      .join('\n');
    const urls = [...latinCss.matchAll(WOFF2_URL)].map((m) => m[1]);
    const map = new Map();
    await Promise.all(urls.map(async (u) => { map.set(u, await toDataUrl(u)); }));
    cached = latinCss.replace(WOFF2_URL, (_m, u) => `url(${map.get(u) || u})`);
  } catch {
    cached = '';
  }
  return cached;
}
