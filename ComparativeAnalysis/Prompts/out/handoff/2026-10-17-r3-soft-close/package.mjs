// Round 3 (F3-01): the owner's 2026-10-16 rule "no shown page of only losses" assumed five shown passages. A single-face
// friction page shows ledger[0].drive, ledger[1].cost_self and ledger[2].cost_others, so one of the first two must close on
// the want underneath or a permission. Every friction cell, for the writer to judge.
import fs from 'node:fs'; import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname); const ROOT = path.resolve(HERE, '../../../../..') + '/';
const { K2_CELLS } = await import(ROOT + 'Elementum_App/src/content/k2.js');
const P = { 比肩: 'the Twin', 劫财: 'the Rival', 食神: 'the Artisan', 伤官: 'the Virtuoso', 偏财: 'the Horizon', 正财: 'the Steward', 七杀: 'the General', 正官: 'the Magistrate', 偏印: 'the Alchemist', 正印: 'the Sage' };
const sents = (t) => t.match(/[^.!?]+[.!?]+/g).map((s) => s.trim());
const cells = Object.entries(K2_CELLS).map(([cell, c]) => { const L = c.fnReading.friction.ledger; const row = (i, a) => { const t = L[i].angles[a]; const ss = sents(t); return { key: `K2 ${cell} · fn_reading.friction.ledger[${i}].angles.${a}`, word: L[i].word, angle: a, keep_as_is: ss.slice(0, -1).join(' '), close: ss[ss.length - 1] }; };
  return { cell, persona: P[cell.split('_')[1]], define: c.fnReading.friction.define, shown: [row(0, 'drive'), row(1, 'cost_self'), row(2, 'cost_others')] }; });
fs.writeFileSync(`${HERE}/worklist.json`, JSON.stringify(cells, null, 1)); console.log(cells.length, 'cells');
