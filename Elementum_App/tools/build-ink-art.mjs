// ===================================================================
// ELEMENTUM · ink painting app copies from the masters (dev tooling, not shipped)
// ===================================================================
// The painted masters live in Design/Assets (DayMaster/, Pairs/, Energy/); the
// app reads small copies under public/concept-arts. This rebuilds the copies at
// each slot's size, palette-compressed under the 300 KB budget
// (DEV_03 §5-P6), stepping quality down until a file fits. Never edit an app
// copy by hand: change the master and rerun. The slots and the style law are
// in Design/Library/Design_Pass_2026-10/Ink_Painting_System.md.
//
//   node tools/build-ink-art.mjs            every slot with a master
//   node tools/build-ink-art.mjs strip_     only masters whose name has this text
// ===================================================================
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', '..');
const A = (p) => path.join(ROOT, 'Design/Assets', p);
const P = (p) => path.join(ROOT, 'Elementum_App/public/concept-arts', p);
const BUDGET = 300 * 1024;

// master name pattern → [app path, width, height, centre-crop fraction or null]
const SLOTS = [
  [/^dm-(\w+)-d1\.jpg$/, (m) => `stems/dm/${m[1]}-d1.png`, 1280, 720, null],
  [/^dm-(\w+)-d2\.jpg$/, (m) => `stems/dm/${m[1]}-d2.png`, 880, 1100, null],
  [/^dm-(\w+)-d3\.jpg$/, (m) => `stems/dm/${m[1]}-d3.png`, 1000, 1000, null],
  [/^dm-(\w+)-stage\.jpg$/, (m) => `stems/dm/${m[1]}-stage.png`, 880, 1100, null],
  [/^strip_(\w+)_(\w+)\.jpg$/, (m) => `pairs/strip_${m[1]}_${m[2]}.png`, 432, 768, null],
  [/^pair_(\w+)_(\w+)\.jpg$/, (m) => `pairs/pair_${m[1]}_${m[2]}.png`, 1100, 733, null],
  [/^fan_(\w+)_(\w+)\.jpg$/, (m) => `pairs/fan_${m[1]}_${m[2]}.png`, 480, 480, 0.62],
  [/^hero_(\w+)_(yang|yin)\.jpg$/, (m) => `energy/hero_${m[1]}_${m[2]}.png`, 1100, 733, null],
];
const DIRS = ['DayMaster', 'Pairs', 'Energy'];
const only = process.argv[2] || '';

let n = 0; let over = 0;
for (const d of DIRS) {
  const dir = A(d);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).sort()) {
    if (only && !f.includes(only)) continue;
    const slot = SLOTS.find(([re]) => re.test(f));
    if (!slot) continue;
    const [re, to, w, h, crop] = slot;
    const out = P(to(f.match(re)));
    let img = sharp(path.join(dir, f));
    if (crop) {
      const meta = await img.metadata();
      const c = Math.round(Math.min(meta.width, meta.height) * crop);
      img = img.extract({ left: Math.round((meta.width - c) / 2), top: Math.round((meta.height - c) / 2), width: c, height: c });
    }
    const base = await img.resize(w, h, { fit: 'cover' }).toBuffer();
    let buf = null; let q = 90;
    for (; q >= 40; q -= 10) {
      buf = await sharp(base).png({ palette: true, quality: q, colours: 256, dither: 0.8, effort: 10, compressionLevel: 9 }).toBuffer();
      if (buf.length < BUDGET) break;
    }
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, buf);
    n += 1; if (buf.length >= BUDGET) over += 1;
    console.log(`${buf.length >= BUDGET ? '✗' : '✓'} ${to(f.match(re))}  q${Math.max(q, 40)} ${Math.round(buf.length / 1024)} KB`);
  }
}
console.log(`${n} file(s) built${over ? `, ${over} still over 300 KB` : ''}`);
