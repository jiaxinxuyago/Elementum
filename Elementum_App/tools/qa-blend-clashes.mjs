// QA (owner M4, 2026-10-17): run with node tools/qa-blend-clashes.mjs from Elementum_App.
// Every blend a chart can produce: no keyword beside its opposite, row counts intact, and every clash word real.
import { K2_CELLS } from '../src/content/k2.js';
import { pickBlendRows, clashes, BLEND_CLASHES } from '../src/components/journey/journeyData.js';
const P = [['比肩', '劫财'], ['食神', '伤官'], ['偏财', '正财'], ['七杀', '正官'], ['偏印', '正印']];
const words = new Set(); let bad = 0, n = 0, changed = 0;
for (const e of ['木', '火', '土', '金', '水']) for (const pr of P) for (const pole of ['catalyst', 'friction']) for (const [a, b] of [pr, [...pr].reverse()]) for (const nm of [1, 2]) {
  const L = K2_CELLS[`${e}_${a}`].fnReading[pole].ledger, M = K2_CELLS[`${e}_${b}`].fnReading[pole].ledger; L.concat(M).forEach((r) => words.add(r.word));
  const rows = pickBlendRows(L, M, nm, a, b); n++;
  const naive = [...L.slice(0, 2), ...M.slice(0, nm)].map((r) => r.word).join('/'); const got = rows.map((r) => r.word).join('/');
  if (naive !== got) { changed++; console.log(`${e} ${pole} ${a}+${b} 2+${nm}: ${naive}  →  ${got}`); }
  const nL = rows.filter((r) => r.god === a).length, nM = rows.length - nL; if (!((nL === 2 && nM === nm) || (nm === 2 && nL === 2 && nM === 1) || (nL === 3 && nM === 0))) { bad++; console.log('  ✗ split', nL, '+', nM); } if (nm === 2 && nM === 1) console.log('  (no clean 2+2: shows 2+1)'); if (nL === 3) console.log('  (no clean blend: lead alone)');
  for (let i = 0; i < rows.length; i++) for (let j = i + 1; j < rows.length; j++) if (clashes(rows[i].word, rows[j].word)) { bad++; console.log('  ✗ clash left', rows[i].word, rows[j].word); }
}
for (const [x, y] of BLEND_CLASHES) for (const w of [x, y]) if (!words.has(w)) { bad++; console.log('  ✗ not a keyword:', w); }
console.log(`${n} blends checked, ${changed} changed, ${bad} failures`); process.exit(bad ? 1 : 0);
