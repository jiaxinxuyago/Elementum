import fs from 'node:fs'; import path from 'node:path';
import { actSentences, sents } from './acts.mjs';
const HERE = path.dirname(new URL(import.meta.url).pathname); const ROOT = path.resolve(HERE, '../../../../..') + '/';
const R2 = ROOT + 'ComparativeAnalysis/Evaluations/final-audit-2026-10-17/round-2/';
const { PAIR_CELLS } = await import(ROOT + 'Elementum_App/src/content/pairs.js'); const { K2_CELLS } = await import(ROOT + 'Elementum_App/src/content/k2.js');
const { findings } = JSON.parse(fs.readFileSync(R2 + 'findings.json', 'utf8'));
const raw = fs.readdirSync(R2 + 'audit').flatMap((f) => fs.readFileSync(`${R2}audit/${f}`, 'utf8').split('\n').map((l) => ({ src: f.replace('.md', ''), l })));
const GEN = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' }; const CTRL = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };
const godsOf = (c, e) => c === e ? ['比肩', '劫财'] : GEN[c] === e ? ['食神', '伤官'] : CTRL[c] === e ? ['偏财', '正财'] : CTRL[e] === c ? ['七杀', '正官'] : ['偏印', '正印'];
const P = { 比肩: 'the Twin', 劫财: 'the Rival', 食神: 'the Artisan', 伤官: 'the Virtuoso', 偏财: 'the Horizon', 正财: 'the Steward', 七杀: 'the General', 正官: 'the Magistrate', 偏印: 'the Alchemist', 正印: 'the Sage' };
const EN = { 木: 'Wood', 火: 'Fire', 土: 'Earth', 金: 'Metal', 水: 'Water' }; const EL = { 木: 'wood', 火: 'fire', 土: 'earth', 金: 'metal', 水: 'water' };
const SUPPORT = new Set(['body', 'mind']); // weak chart: these two are catalysts, the other three frictions; strong chart: the reverse
const PEOPLE = /\b(partner|child|children|kids?|boss|promotions?|raises?|colleagues?|under you|above you|household|students?)\b/i;
const SETTLED = /comparative (frame|middle|joint)|Intuition|Instinct|bar label/i;
const notes = {};
for (const f of findings.filter((x) => x.severity === 'MINOR' || x.severity === 'MAJOR')) {
  const crit = (f.criterion.replace(/\*/g, '').match(/\b(A\d|B|C|D\d+)\b/g) || []); if (f.severity === 'MINOR' && crit.length && crit.every((c) => c === 'A3')) continue; if (SETTLED.test(f.issue)) continue;
  const row = raw.find((r) => r.src === f.source && r.l.includes(`| ${f.id} |`))?.l || '';
  for (const m of row.matchAll(/PAIR (\S+) · function\.(\w+)/g)) { if (/\(sentences 1-2\)/.test(row) && /definition_/.test(m[2])) continue; (notes[`${m[1]}.${m[2]}`] = notes[`${m[1]}.${m[2]}`] || []).push(`${f.severity} ${f.source}:${f.id} [${f.criterion}]: ${f.issue}${f.fix ? ' | auditor: ' + f.fix.slice(0, 500) : ''}`); }
}
for (const core of Object.keys(EL)) {
  const cells = [];
  for (const e of Object.keys(EL)) {
    const key = `${core}_${e}`; const f = PAIR_CELLS[key].function; const sought = f.advise_friction.match(/^Seek (\w+)/)[1];
    const fixed = (t) => { const a = actSentences(t); return sents(t).filter((s) => !a.includes(s)); };
    const fld = (k) => ({ text: f[k], fixed: fixed(f[k]), acts: actSentences(f[k]), notes: [...(notes[`${key}.${k}`] || []), ...(PEOPLE.test(f[k]) ? [`R2-4 (owner approved): "${f[k].match(PEOPLE)[0]}" may assume a person the reader may not have; use neutral words if it does.`] : [])] });
    cells.push({ pair_cell: key, function: f.primary, energy: EN[e], sets: SUPPORT.has(f.primary) ? { weak: 'advise_catalyst', strong: 'advise_friction', balanced: 'advise_balanced' } : { weak: 'advise_friction', strong: 'advise_catalyst', balanced: 'advise_balanced' },
      catalyst_and_balanced_acts_draw_on: EN[e], remedy_acts_draw_on: sought,
      advise_catalyst: fld('advise_catalyst'), advise_friction: fld('advise_friction'),
      definition_catalyst: { text: f.definition_catalyst, notes: notes[`${key}.definition_catalyst`] || [] }, definition_friction: { text: f.definition_friction, notes: notes[`${key}.definition_friction`] || [] },
      definition_balanced: { text: f.definition_balanced, head: sents(f.definition_catalyst).slice(0, 2).join(' '), tail: sents(f.definition_balanced).slice(2).join(' '), notes: notes[`${key}.definition_balanced`] || [] },
      personas: godsOf(core, e).map((g) => ({ persona: P[g], catalyst_keywords: K2_CELLS[`${e}_${g}`].fnReading.catalyst.ledger.map((r) => `${r.word}: ${r.angles.drive}`) })) });
  }
  fs.writeFileSync(`${HERE}/worklist-${EL[core]}.json`, JSON.stringify({ core: EL[core], cells }, null, 1));
  console.log(EL[core], cells.reduce((n, c) => n + c.advise_catalyst.notes.length + c.advise_friction.notes.length + c.definition_balanced.notes.length + c.definition_catalyst.notes.length + c.definition_friction.notes.length, 0), 'notes');
}
