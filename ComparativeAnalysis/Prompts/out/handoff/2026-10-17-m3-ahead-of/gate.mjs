// M3 gate: the new text equals the old with each "ahead of" either kept (time sense, "before") or swapped for one
// allowed phrase; nothing else may change. node gate.mjs out.json
import fs from 'node:fs'; import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname);
const work = new Map(JSON.parse(fs.readFileSync(`${HERE}/worklist.json`, 'utf8')).map((x) => [x.key, x.text]));
const out = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const ALLOWED = ['ahead of', 'before', 'over', 'above', 'more than', 'instead of', 'rather than', 'in place of', 'sooner than', 'first, before'];
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const fails = []; let swaps = 0; const used = {};
for (const o of out) {
  const old = work.get(o.key); if (!old) { fails.push(`${o.key}: not in the worklist`); continue; }
  const parts = old.split(/\bahead of\b/i);
  const re = new RegExp('^' + parts.map(esc).join(`(${ALLOWED.map(esc).join('|')})`) + '$');
  const m = o.text.match(re); if (!m) { fails.push(`${o.key}: only "ahead of" may change:\n      old: ${old}\n      new: ${o.text}`); continue; }
  for (const g of m.slice(1)) { used[g] = (used[g] || 0) + 1; if (g !== 'ahead of') swaps++; }
}
for (const k of work.keys()) if (!out.find((o) => o.key === k)) fails.push(`${k}: missing (return it unchanged if every use is the time sense)`);
console.log(`${out.length} texts, ${swaps} swaps, phrases used: ${JSON.stringify(used)}, ${fails.length} failures`); for (const f of fails) console.log('  ✗ ' + f);
process.exit(fails.length ? 1 : 0);
