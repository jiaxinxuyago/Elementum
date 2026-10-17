// THE DOMAINS landing (main session only). node land.mjs <file.json> [<file.json> …] [--ruling "<text>"]
// Writes each gated content file into the station with provenance, then transcribes the seat defline/reading into
// src/content/positions.js (code-mapped fields) and rebuilds src/content/domains.js (station-only fields).
import fs from 'node:fs'; import path from 'node:path'; import { execFileSync } from 'node:child_process';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../../../..') + '/';
const ST = ROOT + 'Reading/Database/templates/by_axis/json/';
const args = process.argv.slice(2); const ri = args.indexOf('--ruling');
const RULING = ri >= 0 ? args.splice(ri, 2)[1] : 'owner 2026-10-17 (DOM-1 rulings Q1-Q15 A, T0-T10 A, P1 A)';
const DATE = new Date().toISOString().slice(0, 10);
const GOD_ID = { 比肩: 'bijian', 劫财: 'jiecai', 食神: 'shishen', 伤官: 'shangguan', 偏财: 'piancai', 正财: 'zhengcai', 七杀: 'qisha', 正官: 'zhengguan', 偏印: 'pianyin', 正印: 'zhengyin' };
const rd = (p) => JSON.parse(fs.readFileSync(p, 'utf8')); const wr = (p, o) => fs.writeFileSync(p, JSON.stringify(o, null, 2) + '\n');
const prov = (st, field, by, before) => { const P = (st.$provenance = st.$provenance || []); if (!P.some((x) => x.field === field && x.adopted_from === by)) P.push({ field, adopted_from: by, date: DATE, ruling: RULING, replaced: before ?? null }); };
const POSJS = ROOT + 'Elementum_App/src/content/positions.js'; let posjs = fs.readFileSync(POSJS, 'utf8');
const q = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
function transcribe(id, field, text) {
  const start = posjs.indexOf(`\n  ${id}: {\n`); if (start < 0) throw new Error(`positions.js: no block ${id}`);
  const end = posjs.indexOf('\n  },', start); const block = posjs.slice(start, end);
  const re = new RegExp(`(\\n    ${field}: )'(?:[^'\\\\]|\\\\.)*',`); if (!re.test(block)) throw new Error(`positions.js: ${id}.${field} not found`);
  posjs = posjs.slice(0, start) + block.replace(re, `$1${q(text)},`) + posjs.slice(end);
}
const TGJS = ROOT + 'Elementum_App/src/content/tgPatterns.js'; let tgjs = fs.readFileSync(TGJS, 'utf8');
function transcribeFused(key, text) {
  const start = tgjs.indexOf(`key: '${key}'`); if (start < 0) throw new Error(`tgPatterns.js: no ${key}`);
  const end = tgjs.indexOf('\n  },', start); const block = tgjs.slice(start, end); const re = /(\n    fused_line: )'(?:[^'\\]|\\.)*',/;
  if (!re.test(block)) throw new Error(`tgPatterns.js: ${key}.fused_line not found`);
  tgjs = tgjs.slice(0, start) + block.replace(re, `$1${q(text)},`) + tgjs.slice(end);
}
let n = 0; const tpl = ST + 'TEMPLATED/tpl_domains.json';
for (const f of args) {
  const C = rd(path.resolve(f)); const by = path.relative(ROOT, path.resolve(f));
  for (const [id, seat] of Object.entries(C.seats || {})) {
    const p = ST + `POSITION/${id}.json`; const st = rd(p); const c = st.candidates;
    for (const k of ['defline', 'reading']) if (seat[k] && seat[k] !== c[k]) { prov(st, k, by, c[k]); c[k] = seat[k]; transcribe(id, k, seat[k]); n++; }
    c.domain_climb = c.domain_climb || {};
    for (const [d, u] of Object.entries(seat.domains || {})) { c.domain_climb[d] = { ...(c.domain_climb[d] || {}), ...u }; prov(st, `domain_climb.${d}`, by); n += Object.keys(u).length; }
    wr(p, st);
  }
  for (const [god, ds] of Object.entries(C.decades || {})) {
    const p = ST + `GOD/${GOD_ID[god]}.json`; const st = rd(p); const c = st.candidates; c.decade_lines = c.decade_lines || {};
    for (const [d, poles] of Object.entries(ds)) { c.decade_lines[d] = c.decade_lines[d] || {}; for (const [pole, t] of Object.entries(poles)) { c.decade_lines[d][pole] = { ...(c.decade_lines[d][pole] || {}), ...t }; n += Object.keys(t).length; } prov(st, `decade_lines.${d}`, by); }
    wr(p, st);
  }
  for (const [key, pc] of Object.entries(C.patterns || {})) {
    const p = ST + `TG_PATTERN/${key}.json`; const st = rd(p); const c = st.candidates;
    if (pc.readings) { c.domain_lines = { ...(c.domain_lines || {}), ...pc.readings }; prov(st, 'domain_lines', by); n += Object.keys(pc.readings).length; }
    if (pc.fused_line) { if (pc.fused_line !== c.fused_line) { prov(st, 'fused_line', by, c.fused_line); c.fused_line = pc.fused_line; n++; } transcribeFused(key, pc.fused_line); }
    wr(p, st);
  }
  if (C.gaps || C.unruled || C.unruledHeadline) {
    const st = fs.existsSync(tpl) ? rd(tpl) : { $archetype: 'tpl_domains', axis: 'TEMPLATED', key: 'tpl_domains', canonical_name: 'THE DOMAINS: gap lines and no-seat domains',
      construct: 'Station-only (DOM-1, owner 2026-10-17): domain_gaps.<Domain>.<month|day|hour> follows the engine lead "No seat in your <Gate> rules <Domain>." · domain_unruled.<Domain> = step 1 for a domain no seat rules · domain_unruled_headline.<Domain> = its tile line. Built into src/content/domains.js by tools/build-domains-content.mjs.',
      candidate_note: 'Owner-ruled 2026-10-17 (Q4 A, T0-T10 A).', sources: ['ComparativeAnalysis/Handoffs/2026-10-17-domains/03_RULINGS.md'], candidates: {} };
    const c = st.candidates;
    for (const [d, gs] of Object.entries(C.gaps || {})) { c.domain_gaps = c.domain_gaps || {}; c.domain_gaps[d] = { ...(c.domain_gaps[d] || {}), ...gs }; n += Object.keys(gs).length; }
    if (C.unruled) { c.domain_unruled = { ...(c.domain_unruled || {}), ...C.unruled }; n += Object.keys(C.unruled).length; }
    if (C.unruledHeadline) { c.domain_unruled_headline = { ...(c.domain_unruled_headline || {}), ...C.unruledHeadline }; n += Object.keys(C.unruledHeadline).length; }
    prov(st, 'domain_gaps/domain_unruled', by); wr(tpl, st);
  }
}
fs.writeFileSync(POSJS, posjs); fs.writeFileSync(TGJS, tgjs);
console.log(`landed ${n} units`);
console.log(execFileSync('node', ['tools/build-domains-content.mjs'], { cwd: ROOT + 'Elementum_App', encoding: 'utf8' }).trim());
