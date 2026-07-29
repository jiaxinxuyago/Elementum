#!/usr/bin/env node
// ===================================================================
// embed-html-images.mjs — inline <img src> assets as base64 data URIs.
//
// Design-library rule: Library_*.html files must be single-file and
// self-contained (owner directive 2026-07-28). Author pages with
// ordinary src paths, then run this to bake the images in.
//
// Usage:
//   node tools/embed-html-images.mjs <file.html> --root <asset-root> [--out <out.html>]
//
//   src="/concept-arts/x.png"  → resolved against --root
//   src="relative/x.png"       → resolved against the HTML file's folder
//   src="data:..." / http(s)   → left untouched (idempotent)
//
// Exits non-zero if any referenced image is missing, and lists them.
// ===================================================================
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname, extname } from 'node:path';

const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml' };

const args = process.argv.slice(2);
const htmlPath = args.find(a => !a.startsWith('--'));
const rootIdx = args.indexOf('--root');
const outIdx = args.indexOf('--out');
if (!htmlPath || rootIdx === -1) {
  console.error('Usage: node tools/embed-html-images.mjs <file.html> --root <asset-root> [--out <out.html>]');
  process.exit(2);
}
const root = resolve(args[rootIdx + 1]);
const outPath = outIdx !== -1 ? resolve(args[outIdx + 1]) : resolve(htmlPath);
const htmlDir = dirname(resolve(htmlPath));

const html = readFileSync(resolve(htmlPath), 'utf8');
const missing = [];
let embedded = 0, bytes = 0;

const toDataUri = (src) => {
  if (/^(data:|https?:|#|%23)/i.test(src)) return null;
  const clean = src.split(/[?#]/)[0];
  const abs = clean.startsWith('/') ? resolve(root, clean.slice(1)) : resolve(htmlDir, clean);
  const mime = MIME[extname(abs).toLowerCase()];
  if (!mime || !existsSync(abs)) { missing.push(`${src} → ${abs}`); return null; }
  const b64 = readFileSync(abs).toString('base64');
  embedded++; bytes += b64.length;
  return `data:${mime};base64,${b64}`;
};

// <img src="..."> attributes
let result = html.replace(/(<img\b[^>]*?\bsrc=")([^"]+)(")/gi, (m, pre, src, post) => {
  const uri = toDataUri(src);
  return uri ? `${pre}${uri}${post}` : m;
});
// CSS url(...) references — inline styles and <style> blocks alike
result = result.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi, (m, q, src) => {
  const uri = toDataUri(src);
  return uri ? `url(${q}${uri}${q})` : m;
});

if (missing.length) {
  console.error(`MISSING ${missing.length} image(s):\n  ` + missing.join('\n  '));
  process.exit(1);
}
writeFileSync(outPath, result);
console.log(`Embedded ${embedded} image(s), ~${Math.round(bytes / 1024)} KB base64 → ${outPath}`);
