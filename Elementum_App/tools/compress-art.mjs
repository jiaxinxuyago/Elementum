// ===================================================================
// ELEMENTUM · Painted-art PNG compressor (dev tooling, not shipped)
// ===================================================================
// Palette-quantizes painterly PNGs in place (shuǐmò art survives
// quantization essentially untouched — the 2026-06 84% pass precedent).
// Keeps a file only when the recompressed version is smaller.
//
//   node tools/compress-art.mjs <dir> [quality 1-100, default 80]
//   e.g. node tools/compress-art.mjs public/concept-arts/library
//
// Prints per-file + total savings. Budget check: DEV_03_Code_Review_Standards
// §5-P6 caps shipped assets at 300 KB each — rerun with lower quality
// for files still over.
// ===================================================================
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const dir = process.argv[2];
const quality = Number(process.argv[3]) || 80;
if (!dir || !fs.existsSync(dir)) { console.error('usage: node tools/compress-art.mjs <dir> [quality]'); process.exit(2); }

const files = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.png'));
let before = 0; let after = 0; let over = 0;
for (const f of files) {
  const p = path.join(dir, f);
  const orig = fs.statSync(p).size;
  const buf = await sharp(p).png({ palette: true, quality, effort: 8 }).toBuffer();
  const kept = buf.length < orig;
  if (kept) fs.writeFileSync(p, buf);
  const size = kept ? buf.length : orig;
  before += orig; after += size;
  if (size > 300 * 1024) over += 1;
  console.log(`${kept ? '✓' : '·'} ${f}  ${(orig / 1024).toFixed(0)}→${(size / 1024).toFixed(0)} KB`);
}
console.log(`\nTOTAL ${(before / 1048576).toFixed(1)} → ${(after / 1048576).toFixed(1)} MB (−${(100 - (after / before) * 100).toFixed(0)}%) · ${over} file(s) still over the 300 KB budget`);
