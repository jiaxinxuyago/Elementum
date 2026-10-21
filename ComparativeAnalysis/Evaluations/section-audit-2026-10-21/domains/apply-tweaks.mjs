// The Domains + Blueprint section audit: land the TWEAKs through the station (2026-10-21).
//   node ComparativeAnalysis/Evaluations/section-audit-2026-10-21/domains/apply-tweaks.mjs tweaks.json [--dry]
//   tweaks.json: [{ "id": "DA-012", "key": "<station key as the pages print it>", "text": "<the whole new unit>" }]
// Each fix is gated first (the Domains gate for domain units, the depth gate for Blueprint and By-year units). A fix
// that fails is skipped and reported, never forced. The replaced text goes to candidates.__ore[ORE][<path>] in its
// station file, with a $provenance row; then the content modules are rebuilt from the station.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../../..') + '/';
const ST = ROOT + 'Reading/Database/templates/by_axis/json/';
const HO = ROOT + 'ComparativeAnalysis/Prompts/out/handoff/';
const ORE = 'retired_2026-10-21_section_audit';
const BY = 'ComparativeAnalysis/Evaluations/section-audit-2026-10-21/domains (section audit TWEAKs)';
const RULING = 'owner 2026-10-21, section audit R2 A: TWEAKs land, gated';
const GOD_ZH = { bijian: '比肩', jiecai: '劫财', shishen: '食神', shangguan: '伤官', piancai: '偏财', zhengcai: '正财', qisha: '七杀', zhengguan: '正官', pianyin: '偏印', zhengyin: '正印' };
const argv = process.argv.slice(2); const dry = argv.includes('--dry');
const fixes = JSON.parse(fs.readFileSync(path.resolve(argv[0]), 'utf8'));
const rd = (p) => JSON.parse(fs.readFileSync(p, 'utf8')); const wr = (p, o) => fs.writeFileSync(p, JSON.stringify(o, null, 2) + '\n');
const get = (o, p) => p.split('.').reduce((v, k) => v?.[k], o);
const set = (o, p, v) => { const ks = p.split('.'); let c = o; ks.slice(0, -1).forEach((k) => (c = c[k] ??= {})); c[ks[ks.length - 1]] = v; };

// where a key lives: { file, path (under candidates), gate: 'domains' | 'depth', kind }
function route(key) {
  let m;
  if ((m = key.match(/^POSITION (\w+) · domain_climb\.(\w+)\.(headline|recognition|lived|ahead)$/))) return { file: `POSITION/${m[1]}.json`, path: `domain_climb.${m[2]}.${m[3]}`, gate: 'domains', seat: m[1], domain: m[2] };
  if ((m = key.match(/^POSITION (\w+) · (reading|defline)$/))) return { file: `POSITION/${m[1]}.json`, path: m[2], gate: 'domains', seat: m[1], code: 'positions' };
  if ((m = key.match(/^GOD (\w+) · decade_lines\.(\w+)\.(helping|heavy)\.(lived|ahead)$/))) return { file: `GOD/${m[1]}.json`, path: `decade_lines.${m[2]}.${m[3]}.${m[4]}`, gate: 'domains', god: m[1] };
  if ((m = key.match(/^TG_PATTERN (\w+) · domain_lines\.(\w+)$/))) return { file: `TG_PATTERN/${m[1]}.json`, path: `domain_lines.${m[2]}`, gate: 'domains', pattern: m[1] };
  if ((m = key.match(/^TG_PATTERN (\w+) · fused_line$/))) return { file: `TG_PATTERN/${m[1]}.json`, path: 'fused_line', gate: 'domains', pattern: m[1], code: 'tgPatterns' };
  if ((m = key.match(/^TEMPLATED tpl_domains · (domain_gaps\.\w+\.\w+|domain_unruled\.\w+|domain_unruled_headline\.\w+)$/))) return { file: 'TEMPLATED/tpl_domains.json', path: m[1], gate: 'domains' };
  if (/^(GOD \w+ · (year_domain|missing|seen|season_need)|STRUCTURE |SEASON |TG_PATTERN \w+ · blueprint_line|TEMPLATED tpl_depth · )/.test(key)) return { file: 'TEMPLATED/tpl_depth.json', unit: key, gate: 'depth' };
  return null;
}
const depthKind = (k) => /year_domain/.test(k) ? 'year_domain' : /· missing$/.test(k) ? 'missing' : /seen\.close/.test(k) ? 'seen_close' : /seen\./.test(k) ? 'seen' : /season_need/.test(k) ? 'season_need'
  : /^STRUCTURE \w+_ge · reading/.test(k) ? 'structure' : /^STRUCTURE /.test(k) ? 'status' : /^SEASON /.test(k) ? 'season' : /blueprint_line/.test(k) ? 'pattern_bp'
    : /bond\.none_hard/.test(k) ? 'bond_none' : /bond\./.test(k) ? 'bond' : /structure_rule/.test(k) ? 'structure_rule' : /rescue/.test(k) ? 'rescue' : /strongest/.test(k) ? 'strongest' : null;
// a slot template is gated on a filled sample
const SAMPLE = { element: 'Wood', count: 'two', god: 'General', holder: 'Sage', when: 'later', a: 'Water', b: 'Wood', share: 'three quarters', a_noun: 'what you answer to', b_noun: 'what you think', breakers: 'Twin', stand: 'stands', gods: 'Steward' };
const filled = (t) => t.replace(/\{(\w+)\}/g, (x, k) => SAMPLE[k] ?? x);

const files = {}; const load = (f) => (files[f] ??= rd(ST + f));
const done = []; const skipped = [];
const domFile = { seats: {}, decades: {}, patterns: {}, gaps: {}, unruled: {} }; const depthUnits = [];
const plan = [];
for (const f of fixes) {
  const r = route(f.key); if (!r) { skipped.push([f.id, 'no route for ' + f.key]); continue; }
  const st = load(r.file); const before = r.unit ? st.candidates.units[r.unit] : get(st.candidates, r.path);
  if (typeof before !== 'string') { skipped.push([f.id, 'no text at ' + f.key]); continue; }
  if (before === f.text) { skipped.push([f.id, 'already applied']); continue; }
  plan.push({ ...f, r, before });
}
// gate: the whole affected record with the fix overlaid, so the gate sees the unit in its context
for (const p of plan) {
  const { r } = p;
  if (r.gate === 'depth') { depthUnits.push({ key: r.unit, kind: depthKind(r.unit), page: 'tweak-' + p.id, text: filled(p.text) }); continue; }
  const c = files[r.file].candidates;
  if (r.seat) {
    const s = (domFile.seats[r.seat] ??= {});
    if (r.code) s[r.path] = p.text;
    else { s.domains ??= {}; s.domains[r.domain] = { ...(s.domains[r.domain] || c.domain_climb[r.domain]), [r.path.split('.').pop()]: p.text }; }
  } else if (r.god) { const [, d, pole, tense] = r.path.split('.'); const g = (domFile.decades[GOD_ZH[r.god]] ??= {}); g[d] ??= {}; g[d][pole] = { ...(g[d][pole] || c.decade_lines[d][pole]), [tense]: p.text }; }
  else if (r.pattern) { const P = (domFile.patterns[r.pattern] ??= { readings: { ...c.domain_lines }, fused_line: c.fused_line }); if (r.path === 'fused_line') P.fused_line = p.text; else P.readings[r.path.split('.')[1]] = p.text; }
  else if (/^domain_gaps/.test(r.path)) { const [, d, g] = r.path.split('.'); (domFile.gaps[d] ??= {})[g] = p.text; }
  else if (/^domain_unruled\./.test(r.path)) domFile.unruled[r.path.split('.')[1]] = p.text;
}
const tmp = path.join(path.dirname(new URL(import.meta.url).pathname), 'qa');
const gateRun = (gate, file) => { try { execFileSync('node', [gate, file], { encoding: 'utf8' }); return []; } catch (e) { return String(e.stdout || '').split('\n').filter((l) => /\S/.test(l) && !/^(PASS|FAIL|\d+ (unit|failure))/i.test(l)); } };
const fails = [];
if (Object.values(domFile).some((o) => Object.keys(o).length)) { fs.writeFileSync(tmp + '/gate-domains.json', JSON.stringify(domFile, null, 1)); fails.push(...gateRun(HO + '2026-10-17-domains-template/gate.mjs', tmp + '/gate-domains.json')); }
if (depthUnits.length) { fs.writeFileSync(tmp + '/gate-depth.json', JSON.stringify({ units: depthUnits }, null, 1)); fails.push(...gateRun(HO + '2026-10-21-domains-blueprint/gate.mjs', tmp + '/gate-depth.json')); }
const failedId = (p) => fails.find((l) => l.includes('tweak-' + p.id) || l.includes(p.key) || (p.r.seat && l.includes(p.r.seat + '.' + (p.r.domain || ''))) || (p.r.pattern && l.includes('pattern ' + p.r.pattern)) || (p.r.god && l.includes(GOD_ZH[p.r.god] + '.' + p.r.path.split('.')[1])));
for (const p of plan) {
  const why = failedId(p); if (why) { skipped.push([p.id, 'gate: ' + why]); continue; }
  const st = files[p.r.file]; const c = st.candidates; const at = p.r.unit || p.r.path;
  (c.__ore ??= {})[ORE] ??= {}; c.__ore[ORE][at] = p.before;
  if (p.r.unit) c.units[p.r.unit] = p.text; else set(c, p.r.path, p.text);
  (st.$provenance ??= []).push({ field: at, adopted_from: BY, finding: p.id, date: '2026-10-21', ruling: RULING });
  done.push(p);
}
console.log(`${done.length} applied, ${skipped.length} skipped`); for (const s of skipped) console.log('  skipped', s[0], s[1]);
if (fails.length) console.log('gate output:\n  ' + fails.join('\n  '));
if (dry || !done.length) process.exit(0);
for (const [f, st] of Object.entries(files)) wr(ST + f, st);
// the code-mapped seat fields are transcribed into positions.js, as the domains landing does
const POSJS = ROOT + 'Elementum_App/src/content/positions.js'; let posjs = fs.readFileSync(POSJS, 'utf8');
const q = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
for (const p of done.filter((x) => x.r.code === 'positions')) {
  const start = posjs.indexOf(`\n  ${p.r.seat}: {\n`); const end = posjs.indexOf('\n  },', start); const block = posjs.slice(start, end);
  const re = new RegExp(`(\\n    ${p.r.path}: )'(?:[^'\\\\]|\\\\.)*',`); posjs = posjs.slice(0, start) + block.replace(re, `$1${q(p.text)},`) + posjs.slice(end);
}
fs.writeFileSync(POSJS, posjs);
// a pairing's fused line is code-mapped too (tgPatterns.js), as the domains landing transcribes it
const TGJS = ROOT + 'Elementum_App/src/content/tgPatterns.js'; let tgjs = fs.readFileSync(TGJS, 'utf8');
for (const p of done.filter((x) => x.r.code === 'tgPatterns')) {
  const start = tgjs.indexOf(`key: '${p.r.pattern}'`); const end = tgjs.indexOf('\n  },', start); const block = tgjs.slice(start, end);
  tgjs = tgjs.slice(0, start) + block.replace(/(\n    fused_line: )'(?:[^'\\]|\\.)*',/, `$1${q(p.text)},`) + tgjs.slice(end);
}
fs.writeFileSync(TGJS, tgjs);
fs.writeFileSync(path.join(path.dirname(new URL(import.meta.url).pathname), 'tweaks-applied.json'), JSON.stringify(done.map((p) => ({ id: p.id, key: p.key, before: p.before, after: p.text })), null, 1) + '\n');
for (const t of ['build-domains-content.mjs', 'build-depth-content.mjs']) console.log(execFileSync('node', ['tools/' + t], { cwd: ROOT + 'Elementum_App', encoding: 'utf8' }).trim());
