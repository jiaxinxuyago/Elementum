// Round 5 chip rename (X5-02, owner "X5-02 B"): the ledger row's word and the cell's adj chip, into the station with
// provenance and into k2.js. The passages are fitted to the new word by the writers and landed by apply-fixes.
import fs from 'node:fs'; import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname); const ROOT = path.resolve(HERE, '../../../..') + '/';
const dry = process.argv.includes('--dry'); const today = new Date().toISOString().slice(0, 10);
const RULING = 'Owner 2026-10-17: "X5-02 B" (rename the older chip; the passages stay)';
const RENAMES = [
  { cell: '木_七杀', pole: 'friction', from: 'Never switches off', to: 'Always on call', finding: 'R5 cross:X5-02' },
];
let k2 = fs.readFileSync(ROOT + 'Elementum_App/src/content/k2.js', 'utf8');
const span = (cell) => { const a = k2.indexOf(`'${cell}': {`); const n = k2.slice(a + 1).search(/\n  '[^']+': \{/); return [a, n < 0 ? k2.length : a + 1 + n]; };
const swap = (cell, from, to, what) => { const [a, b] = span(cell); const s = k2.slice(a, b); const hits = s.split(from).length - 1; if (hits !== 1) throw new Error(`${cell} ${what}: ${hits} matches`); k2 = k2.slice(0, a) + s.replace(from, to) + k2.slice(b); };
for (const r of RENAMES) {
  const f = `${ROOT}Reading/Database/templates/by_axis/json/ELEMENT_GOD/${r.cell}.json`; const st = JSON.parse(fs.readFileSync(f, 'utf8'));
  const ledger = st.candidates.fn_reading[r.pole].ledger; const i = ledger.findIndex((x) => x.word === r.from); if (i < 0) throw new Error(`${r.cell}: no ${r.from}`);
  ledger[i].word = r.to; swap(r.cell, `word: '${r.from}'`, `word: '${r.to}'`, 'word');
  const adj = st.candidates.adj_chips?.[r.pole]; if (adj) { const j = adj.indexOf(r.from); if (j >= 0) adj[j] = r.to; }
  { const [a, b] = span(r.cell); const seg = k2.slice(a, b); const m = seg.match(/adj: \{[^}]*\}/); if (!m || !m[0].includes(`'${r.from}'`)) throw new Error(`${r.cell} adj: no ${r.from}`); k2 = k2.slice(0, a) + seg.replace(m[0], m[0].replace(`'${r.from}'`, `'${r.to}'`)) + k2.slice(b); }
  (st.$provenance = st.$provenance || []).push({ field: `fn_reading.${r.pole}.ledger[${i}].word`, adopted_from: 'final-audit-r5-owner', date: today, ruling: RULING, finding: r.finding, replaced: r.from });
  if (!dry) fs.writeFileSync(f, JSON.stringify(st, null, 2) + '\n');
}
if (!dry) fs.writeFileSync(ROOT + 'Elementum_App/src/content/k2.js', k2);
console.log(`${dry ? 'DRY ' : ''}${RENAMES.length} renames`);
