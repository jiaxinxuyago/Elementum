// The rulings round landing (owner R1–R17, G1, MN all A, 2026-11-14). node land.mjs [--dry]
// Gates every out-*.json in this folder together, then writes each unit into its station file: new fields are
// created (lived_past, the waiting lines, missing.open, the state notes by structure, the dated bond versions), a
// replaced text goes to candidates.__ore[ORE][<path>], and every change gets a $provenance row. Then the content
// modules are rebuilt from the station (and a pairing's fused line is transcribed into tgPatterns.js).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const HERE = path.dirname(new URL(import.meta.url).pathname) + '/';
const ROOT = path.resolve(HERE, '../../../../..') + '/';
const ST = ROOT + 'Reading/Database/templates/by_axis/json/';
const ORE = 'retired_2026-11-14_rulings_round';
const BY = 'ComparativeAnalysis/Prompts/out/handoff/2026-11-14-domains-rulings';
const RULING = 'owner 2026-11-14: R1–R17, G1, MN all A (Domains + Blueprint section audit)';
const dry = process.argv.includes('--dry');
const outs = fs.readdirSync(HERE).filter((f) => /^out-.+\.json$/.test(f)).sort();
execFileSync('node', [HERE + 'gate.mjs', ...outs.map((f) => HERE + f)], { stdio: 'inherit' });

const rd = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const files = {}; const load = (f) => (files[f] ??= rd(ST + f));
const get = (o, ks) => ks.reduce((v, k) => v?.[k], o);
const set = (o, ks, v) => { let c = o; ks.slice(0, -1).forEach((k) => (c = c[k] ??= {})); c[ks[ks.length - 1]] = v; };
function route(key) {
  let m;
  if ((m = key.match(/^POSITION (\w+) · domain_climb\.(\w+)\.(\w+)$/))) return { file: `POSITION/${m[1]}.json`, path: ['domain_climb', m[2], m[3]] };
  if ((m = key.match(/^GOD (\w+) · decade_lines\.(\w+)\.(\w+)\.(\w+)$/))) return { file: `GOD/${m[1]}.json`, path: ['decade_lines', m[2], m[3], m[4]] };
  if ((m = key.match(/^TEMPLATED tpl_domains · (.+)$/))) return { file: 'TEMPLATED/tpl_domains.json', path: m[1].split('.') };
  if ((m = key.match(/^TG_PATTERN (\w+) · domain_lines\.(\w+)$/))) return { file: `TG_PATTERN/${m[1]}.json`, path: ['domain_lines', m[2]] };
  if ((m = key.match(/^TG_PATTERN (\w+) · fused_line$/))) return { file: `TG_PATTERN/${m[1]}.json`, path: ['fused_line'], fused: m[1] };
  return { file: 'TEMPLATED/tpl_depth.json', path: ['units', key] };
}
let changed = 0; let created = 0; let same = 0; const fused = [];
for (const f of outs) for (const u of rd(HERE + f).units) {
  const r = route(u.key); const st = load(r.file); const c = st.candidates; const before = get(c, r.path);
  if (before === u.text) { same++; continue; }
  if (typeof before === 'string' && before) { (c.__ore ??= {})[ORE] ??= {}; c.__ore[ORE][r.path.join('.')] = before; changed++; } else created++;
  set(c, r.path, u.text);
  (st.$provenance ??= []).push({ field: r.path.join('.'), adopted_from: `${BY}/${f}`, date: '2026-11-14', ruling: RULING });
  if (r.fused) fused.push([r.fused, u.text]);
}
console.log(`${changed} rewritten, ${created} new, ${same} kept, across ${outs.length} files`);
if (dry) process.exit(0);
for (const [f, st] of Object.entries(files)) fs.writeFileSync(ST + f, JSON.stringify(st, null, 2) + '\n');
const TGJS = ROOT + 'Elementum_App/src/content/tgPatterns.js'; let tgjs = fs.readFileSync(TGJS, 'utf8');
const q = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
for (const [k, t] of fused) {
  const start = tgjs.indexOf(`key: '${k}'`); const end = tgjs.indexOf('\n  },', start); const block = tgjs.slice(start, end);
  tgjs = tgjs.slice(0, start) + block.replace(/(\n    fused_line: )'(?:[^'\\]|\\.)*',/, `$1${q(t)},`) + tgjs.slice(end);
}
fs.writeFileSync(TGJS, tgjs);
for (const t of ['build-domains-content.mjs', 'build-depth-content.mjs']) console.log(execFileSync('node', ['tools/' + t], { cwd: ROOT + 'Elementum_App', encoding: 'utf8' }).trim());
