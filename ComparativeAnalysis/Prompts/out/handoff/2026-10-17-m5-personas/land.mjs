// Land M5 (owner 2026-10-17, "M5 approved, apply the fix across all content"): keyword renames (the ledger row's word
// and angles, plus the cell's adj chip) and passage texts, into the station with provenance and into k2.js.
import fs from 'node:fs'; import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname); const ROOT = path.resolve(HERE, '../../../../..') + '/';
const dry = process.argv.includes('--dry'); const BY = 'm5-personas'; const today = new Date().toISOString().slice(0, 10);
const RULING = 'Owner 2026-10-17: M5 narrowed after the first samples were rejected ("the sage is the one who looks for shelters … The original wins"); "M5 approved, apply the fix across all content."';
const js = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const out = JSON.parse(fs.readFileSync(`${HERE}/out.json`, 'utf8')); const extra = JSON.parse(fs.readFileSync(`${HERE}/approved-texts.json`, 'utf8'));
let k2 = fs.readFileSync(ROOT + 'Elementum_App/src/content/k2.js', 'utf8');
const span = (cell) => { const a = k2.indexOf(`'${cell}': {`); const n = k2.slice(a + 1).search(/\n  '[^']+': \{/); return [a, n < 0 ? k2.length : a + 1 + n]; };
const swap = (cell, from, to, what) => { const [a, b] = span(cell); const s = k2.slice(a, b); const hits = s.split(from).length - 1; if (hits !== 1) throw new Error(`${cell} ${what}: ${hits} matches`); k2 = k2.slice(0, a) + s.replace(from, to) + k2.slice(b); };
const stFile = (cell) => `${ROOT}Reading/Database/templates/by_axis/json/ELEMENT_GOD/${cell}.json`;
let n = 0;
for (const r of out.renames) {
  const st = JSON.parse(fs.readFileSync(stFile(r.cell), 'utf8')); const row = st.candidates.fn_reading[r.pole].ledger[r.i]; const old = { word: row.word, angles: { ...row.angles } };
  for (const a of ['drive', 'cost_self', 'cost_others']) { swap(r.cell, `'${js(old.angles[a])}'`, `'${js(r.angles[a])}'`, a); row.angles[a] = r.angles[a]; }
  swap(r.cell, `word: '${js(old.word)}'`, `word: '${js(r.word)}'`, 'word'); row.word = r.word;
  const adj = st.candidates.adj_chips?.[r.pole]; if (adj) { const j = adj.indexOf(old.word); if (j >= 0) adj[j] = r.word; }
  { const [a, b] = span(r.cell); const s = k2.slice(a, b); const m = s.match(new RegExp(`adj: \\{[^}]*\\}`)); if (m && m[0].includes(`'${js(old.word)}'`)) { k2 = k2.slice(0, a) + s.replace(m[0], m[0].replace(`'${js(old.word)}'`, `'${js(r.word)}'`)) + k2.slice(b); } }
  (st.$provenance = st.$provenance || []).push({ field: `fn_reading.${r.pole}.ledger[${r.i}]`, adopted_from: BY, date: today, ruling: RULING, finding: 'M5 rename', replaced: old });
  if (!dry) fs.writeFileSync(stFile(r.cell), JSON.stringify(st, null, 2) + '\n'); n++;
}
for (const t of [...out.texts, ...extra]) {
  const m = t.key.match(/^K2 (\S+) · fn_reading\.(\w+)\.ledger\[(\d)\]\.angles\.(\w+)$/); const [, cell, pole, i, a] = m;
  const st = JSON.parse(fs.readFileSync(stFile(cell), 'utf8')); const row = st.candidates.fn_reading[pole].ledger[+i]; const before = row.angles[a];
  if (before === t.text) continue; swap(cell, `'${js(before)}'`, `'${js(t.text)}'`, a); row.angles[a] = t.text;
  (st.$provenance = st.$provenance || []).push({ field: `fn_reading.${pole}.ledger[${i}].angles.${a}`, adopted_from: BY, date: today, ruling: RULING, finding: 'M5', replaced: before });
  if (!dry) fs.writeFileSync(stFile(cell), JSON.stringify(st, null, 2) + '\n'); n++;
}
if (!dry) fs.writeFileSync(ROOT + 'Elementum_App/src/content/k2.js', k2);
console.log(`${dry ? 'DRY ' : ''}${n} changes`);
