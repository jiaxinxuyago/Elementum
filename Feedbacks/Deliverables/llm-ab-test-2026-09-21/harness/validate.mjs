// The gate that runs before any read (REA_17 §0 rule 4): shape · mechanical ·
// within-cell four-gram · reader zone. Usage:
//   node validate.mjs <id> <output.json> [--json] [--quiet]
// <id> names out/<id>.meta.json written by assemble.mjs (T1..T6 included).
// Exit 1 on any blocking finding. --json also writes <output>.gate.json.
import fs from 'node:fs';
import path from 'node:path';
import { OUT, FIELDS, makeGate, fourGramCheck, swapGramCheck, zoneCheck, ZONE_BLOCK_PER100, flat, STEMS, wc, channel } from './lib.mjs';

export function validate(id, file, { quiet = false } = {}) {
  const metaPath = OUT + id + '.meta.json'; if (!fs.existsSync(metaPath)) throw new Error(`no meta for ${id}: run assemble.mjs first (out/${id}.meta.json)`);
  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8')); const spec = FIELDS[meta.field];
  const log = (s) => { if (!quiet) console.log(s); };
  const R = { id, file: path.basename(file), field: meta.field, cell: meta.ctx.cell, state: meta.ctx.state || meta.ctx.pole || meta.ctx.band || null, chart: meta.ctx.chart?.id || null, json: true, shape: [], notes: [], readFlags: [], gate: [], rep: [], repInfo: [], swap: [], zone: null, blocking: [] };
  log(`\n## ${id} · ${meta.field} · ${meta.ctx.cell}${R.state ? ' · ' + R.state : ''} · ${path.basename(file)}`);
  let raw = fs.readFileSync(file, 'utf8').trim().replace(/^```(json)?/, '').replace(/```$/, '').trim();
  let out; try { out = JSON.parse(raw); } catch (e) { R.json = false; R.blocking.push('not valid JSON: ' + e.message.slice(0, 80)); log('  ✗  not valid JSON: ' + e.message.slice(0, 80)); return R; }
  if (out && typeof out === 'object' && !Array.isArray(out)) delete out._trace;
  const F = (w, m) => R.gate.push(`${w} :: ${m}`);
  const stat = (label, ok) => { R.shape.push({ label, ok: !!ok }); log(`${ok ? '  ok ' : '  ✗  '} ${label}`); };
  const gate = makeGate(F);
  channel.note = (label, ok) => { R.notes.push({ label, ok: !!ok }); log(`  ${ok ? 'ok ' : '?  '} ${label}`); };
  channel.readFlag = (w, m) => { R.readFlags.push(`${w} :: ${m}`); };
  spec.validate(out, meta.ctx, F, stat, gate);
  // the within-cell four-gram check (REA_16 §7): candidate fields vs the cell's other fields
  const candidateFields = Object.fromEntries(flat(out).filter(([, t]) => typeof t === 'string' && wc(t) >= 4).map(([p, t]) => [candidatePath(meta, p), t]));
  const cellFields = {}, pageFields = {};
  for (const [k, v] of Object.entries(meta.repFields || {})) (k.includes('.function.') && meta.field.startsWith('ELEMENT_GOD') ? pageFields : cellFields)[k] = v;
  const hits = fourGramCheck(candidateFields, cellFields); const pageHits = fourGramCheck(candidateFields, pageFields, { self: false });
  for (const h of hits) (meta.repBlock ? R.rep : R.repInfo).push(`${h.candidate} ↔ ${h.other} :: "${h.gram}"${h.n > 1 ? ` (+${h.n - 1})` : ''}`);
  for (const h of pageHits) R.repInfo.push(`${h.candidate} ↔ ${h.other} (same page, other axis) :: "${h.gram}"`);
  // cross-stem four-gram uniqueness for swap-gram fields
  if (meta.swapGram && meta.ctx.stem) { const axis = meta.field.split('.')[0]; const own = meta.ctx.cell + '.json'; for (const [p, t] of flat(out)) if (p === meta.swapGram || p.startsWith(meta.swapGram)) for (const h of swapGramCheck(t, axis, meta.swapGram, own)) R.swap.push(`${p} ↔ ${axis}/${h.file} :: "${h.gram}"`); }
  // the reader zone
  if (meta.zone) { const texts = flat(out).filter(([, t]) => typeof t === 'string'); const z = { total: 0, outside: [], edge: [] }; for (const [p, t] of texts) { const r = zoneCheck(t); z.total += r.total; z.outside.push(...r.outside.map((w) => `${w} [${p}]`)); z.edge.push(...r.edge.map((w) => `${w} [${p}]`)); } z.per100 = z.total ? +(100 * z.outside.length / z.total).toFixed(2) : 0; R.zone = z; }
  // verdict
  for (const s of R.shape) if (!s.ok) R.blocking.push('shape: ' + s.label);
  for (const g of R.gate) R.blocking.push('gate: ' + g);
  for (const r of R.rep) R.blocking.push('repetition law: ' + r);
  for (const s of R.swap) R.blocking.push('cross-stem four-gram: ' + s);
  if (R.zone) { if (meta.zoneBlock && R.zone.outside.length) R.blocking.push('reader zone (chips): ' + R.zone.outside.join(', ')); else if (R.zone.per100 > ZONE_BLOCK_PER100) R.blocking.push(`reader zone: ${R.zone.per100} outside-zone words per 100 > ${ZONE_BLOCK_PER100}`); }
  R.pass = R.blocking.length === 0;
  log(R.gate.length ? `  gate findings (${R.gate.length}):\n   - ` + R.gate.join('\n   - ') : '  gate findings: none');
  if (R.readFlags.length) log(`  read flags (not blocking; for the reader):\n   - ` + R.readFlags.join('\n   - '));
  if (R.rep.length) log(`  repetition law (blocking on this cell): \n   - ` + R.rep.join('\n   - '));
  if (R.repInfo.length) log(`  repetition inventory (not blocking here):\n   - ` + R.repInfo.join('\n   - '));
  if (R.swap.length) log(`  cross-stem four-gram:\n   - ` + R.swap.join('\n   - '));
  if (R.zone) log(`  reader zone: ${R.zone.total} words, ${R.zone.outside.length} outside (${R.zone.per100}/100; ceiling ${ZONE_BLOCK_PER100})${R.zone.outside.length ? ': ' + R.zone.outside.join(', ') : ''}${R.zone.edge.length ? ' · edge: ' + R.zone.edge.join(', ') : ''}`);
  log(R.pass ? '  → PASS (may be read)' : `  → FAIL (${R.blocking.length} blocking): not compared`);
  return R;
}
// name a candidate sub-path the way the cell's fields are named, so lawful pairs line up
function candidatePath(meta, p) {
  const f = meta.field;
  if (f === 'ELEMENT_PAIR.mechanism.turn+carry' || f === 'ELEMENT_PAIR.mechanism.turn') return p.endsWith('_turn') ? `mechanism.${p}` : p;
  if (f === 'ELEMENT_PAIR.mechanism.base') return 'mechanism.base';
  if (f === 'ELEMENT_PAIR.function.definition' || f === 'ELEMENT_PAIR.function.advise') return `function.${p}`;
  if (f === 'ELEMENT_PAIR.carry.pole') return `carry.${p}`;
  if (f === 'ELEMENT_GOD.fn_reading.row') return `fn_reading.${meta.ctx.pole}.ledger[${meta.ctx.row}].${p}`;
  if (f === 'STEM.gifts+shadows') return `pool.${p}`;
  return p;
}
if (path.resolve(process.argv[1]) === new URL(import.meta.url).pathname) {
  const [id, file] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  if (!id || !file) { console.log('usage: node validate.mjs <id> <output.json> [--json] [--quiet]'); process.exit(2); }
  const R = validate(id, file, { quiet: process.argv.includes('--quiet') });
  if (process.argv.includes('--json')) fs.writeFileSync(file.replace(/\.json$/, '') + '.gate.json', JSON.stringify(R, null, 1));
  if (process.argv.includes('--quiet')) console.log(`${id} ${path.basename(file)}: ${R.pass ? 'PASS' : 'FAIL ' + R.blocking.join(' | ')}`);
  process.exit(R.pass ? 0 : 1);
}
