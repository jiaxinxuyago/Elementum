// Build the BLIND read sheet for a run: for every row, the gate runs on every
// candidate found in out/<id>.<model>.json plus the original; survivors are
// shuffled (seeded) and lettered A, B, C…; the key (letter → model) is written
// to a separate file the reader does not open. Gate failures are listed under
// the row with their reason and are not lettered (REA_17 §0 rule 4).
//   node read-sheet.mjs runs/<manifest>.json --out <sheet.md> [--seed 7] [--include-failed]
import fs from 'node:fs';
import path from 'node:path';
import { OUT, J, get, flat } from './lib.mjs';
import { validate } from './validate.mjs';
const argv = process.argv.slice(2); const opt = (n, d) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : d; };
const man = JSON.parse(fs.readFileSync(argv[0], 'utf8')); const rows = man.rows || man;
let seed = +opt('seed', 7); const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
const includeFailed = argv.includes('--include-failed');
export const candidatesFor = (id) => fs.readdirSync(OUT).filter((f) => f.startsWith(id + '.') && f.endsWith('.json') && !/\.(meta|gate|original)\.json$/.test(f)).map((f) => ({ model: f.slice(id.length + 1, -5), file: OUT + f }));
const pretty = (v) => typeof v === 'string' ? v : JSON.stringify(v, null, 1);
const md = [`# Blind read sheet · ${man.name}`, '', `Assembled ${new Date().toISOString().slice(0, 10)}. Every lettered candidate passed the gate (shape · mechanical · within-cell four-gram · reader zone). The shipping original is lettered like any other candidate. Score each letter on the four questions of the 2026-09-17 evaluation pack (meaning · reasoning · reading · scope, each pass / fail with one clause) and the three readers (screenshot · trust · heritage), then set a status: retain original · adopt · revise · unresolved. The key is in the companion file; do not open it before scoring.`, ''];
const key = {};
for (const r of rows) {
  const meta = JSON.parse(fs.readFileSync(OUT + r.id + '.meta.json', 'utf8'));
  const cands = [{ model: 'original', file: OUT + r.id + '.original.json' }, ...candidatesFor(r.id)].filter((c) => fs.existsSync(c.file));
  const scored = cands.map((c) => ({ ...c, R: validate(r.id, c.file, { quiet: true }) }));
  const pass = scored.filter((c) => c.R.pass || includeFailed), fail = scored.filter((c) => !c.R.pass);
  for (let i = pass.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [pass[i], pass[j]] = [pass[j], pass[i]]; }
  key[r.id] = Object.fromEntries(pass.map((c, i) => [String.fromCharCode(65 + i), c.model]));
  md.push(`## ${r.id} · ${meta.field} · ${meta.ctx.cell}${meta.ctx.pole ? ' · ' + meta.ctx.pole : ''}${meta.ctx.state && meta.ctx.state !== meta.ctx.pole ? ' · ' + meta.ctx.state : ''}${meta.ctx.row != null ? ' · row ' + meta.ctx.row : ''}${meta.ctx.chart ? ' · chart ' + meta.ctx.chart.id : ''}`, '');
  md.push(`Reasoning anchors (the source the candidate must trace to): ${anchors(meta)}`, '');
  pass.forEach((c, i) => { const body = pretty(JSON.parse(fs.readFileSync(c.file, 'utf8').trim().replace(/^```(json)?/, '').replace(/```$/, ''))).slice(0, 6000); const lines = [`### ${String.fromCharCode(65 + i)}`, '', '```json', body, '```', '', 'Read notes: meaning ☐ · reasoning ☐ · reading ☐ · scope ☐ · readers ☐☐☐ · status ☐']; if (c.R.readFlags.length) lines.push(`Read flags from the gate: ${c.R.readFlags.join('; ')}`); if (c.R.repInfo.length) lines.push(`Repetition inventory (not blocking): ${c.R.repInfo.slice(0, 3).join('; ')}`); if (c.R.zone && c.R.zone.outside.length) lines.push(`Outside the reader zone: ${c.R.zone.outside.join(', ')}`); md.push(...lines, ''); });
  if (fail.length && !includeFailed) { md.push('Not compared (failed the gate):', ''); for (const c of fail) md.push(`- ${c.model === 'original' ? 'the shipping original' : 'a candidate'}: ${c.R.blocking.join(' | ')}`); md.push(''); }
}
fs.writeFileSync(opt('out', OUT + man.name + '.read-sheet.md'), md.join('\n'));
fs.writeFileSync(opt('out', OUT + man.name + '.read-sheet.md').replace(/\.md$/, '') + '.key.json', JSON.stringify(key, null, 1));
console.log(`sheet → ${opt('out', OUT + man.name + '.read-sheet.md')} (key beside it)`);
function anchors(meta) {
  const c = meta.ctx; const out = [];
  if (meta.field.startsWith('STEM.gifts')) out.push('each item\'s echo_of field (definition_catalyst / definition_friction / carry.wide / carry.excess of the door\'s pair cell)');
  if (meta.field.startsWith('ELEMENT_PAIR')) { const cell = J(`ELEMENT_PAIR/${c.cell}.json`); out.push(`mechanism.base: "${cell.mechanism.base.slice(0, 160)}…"`); if (c.pole) out.push(`function.definition_${c.pole}: "${cell.function['definition_' + c.pole]}"`); }
  if (meta.field.startsWith('ELEMENT_GOD')) { const cell = J(`ELEMENT_GOD/${c.cell}.json`); out.push(`structural_interaction: "${cell.structural_interaction}"`, `adj_chips: ${JSON.stringify(cell.adj_chips)}`); }
  if (meta.field.startsWith('STEM_BAND') || meta.field === 'STEM.dm_overview') out.push(`the Angle Map row for ${c.stem} and the band ${c.band || ''}`.trim());
  if (meta.field.startsWith('POSITION')) { const p = J(`POSITION/${c.cell}.json`); out.push(`${p.term}: gate ${p.gate}, slot ${p.slot_kind}, domains ${p.domains.join(', ')}`); }
  return out.join(' · ') || 'the cell facts in the prompt';
}
