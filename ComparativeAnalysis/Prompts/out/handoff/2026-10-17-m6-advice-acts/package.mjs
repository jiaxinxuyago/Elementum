import fs from 'node:fs'; import path from 'node:path';
import { actSentences, familiesOf, sents } from './acts.mjs';
const HERE = path.dirname(new URL(import.meta.url).pathname); const ROOT = path.resolve(HERE, '../../../../..') + '/';
const { PAIR_CELLS } = await import(ROOT + 'Elementum_App/src/content/pairs.js');
const { K2_CELLS } = await import(ROOT + 'Elementum_App/src/content/k2.js');
const GEN = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' }; const CTRL = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };
const godsOf = (c, e) => c === e ? ['比肩', '劫财'] : GEN[c] === e ? ['食神', '伤官'] : CTRL[c] === e ? ['偏财', '正财'] : CTRL[e] === c ? ['七杀', '正官'] : ['偏印', '正印'];
const EN = { 木: 'Wood', 火: 'Fire', 土: 'Earth', 金: 'Metal', 水: 'Water' }; const EL = { 木: 'wood', 火: 'fire', 土: 'earth', 金: 'metal', 水: 'water' };
const IMAGE = { Wood: 'starts, grows, plants, reaches, builds up', Fire: 'shows, shares, warms, lights, speaks up, gathers people', Earth: 'keeps, holds, settles, finishes, stays, tends', Metal: 'cuts, decides, sorts, finishes, sets a line, clears out', Water: 'takes in, rests, listens, lets flow, goes deep, waits' };
for (const core of Object.keys(EL)) {
  const cells = [];
  for (const e of Object.keys(EL)) {
    const key = `${core}_${e}`; const f = PAIR_CELLS[key].function; const sought = (f.advise_friction.match(/^Seek (\w+)/) || [])[1];
    const pole = (k, remedy) => { const ss = sents(f[k]); const acts = actSentences(f[k], remedy); return { text: f[k], fixed: ss.filter((s) => !acts.includes(s)), acts, act_families: acts.map(familiesOf), words: f[k].split(/\s+/).length }; };
    cells.push({ pair_cell: key, function: f.primary, energy: EN[e], catalyst_acts_draw_on: `${EN[e]}: ${IMAGE[EN[e]]}`, remedy_seeks: sought, remedy_acts_draw_on: `${sought}: ${IMAGE[sought]}`,
      advise_catalyst: pole('advise_catalyst', false), advise_friction: pole('advise_friction', true),
      personas: godsOf(core, e).map((g) => ({ k2_cell: `${e}_${g}`, catalyst_keywords: K2_CELLS[`${e}_${g}`].fnReading.catalyst.ledger.map((r) => r.word), friction_keywords: K2_CELLS[`${e}_${g}`].fnReading.friction.ledger.map((r) => r.word) })) });
  }
  fs.writeFileSync(`${HERE}/worklist-${EL[core]}.json`, JSON.stringify({ core: EL[core], cells }, null, 1));
  const c = {}; for (const x of cells) for (const p of ['advise_catalyst', 'advise_friction']) for (const fs2 of x[p].act_families) for (const fam of fs2) c[fam] = (c[fam] || 0) + 1;
  console.log(EL[core], JSON.stringify(c));
}
