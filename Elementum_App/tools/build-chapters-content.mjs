// ===================================================================
// ELEMENTUM · build-chapters-content — Life Chapters, energy first
// ===================================================================
// Owner direction 2026-10-21 and rulings L1–L10, R1–R4 all A (record:
// ComparativeAnalysis/Handoffs/2026-10-19-life-chapters-content/03_RULINGS.md).
// The corpus lives in the station:
//   TEMPLATED/tpl_chapters.json   candidates.units { "<app key>": text }
// keyed as the app reads them (chaptersResolve.js):
//   ENERGY <fn> · chapter.<gate>.<grow|release>.<lived|now|coming>
//   ENERGY <fn> · chapter_domain.<Domain>.<grow|release>
//   ENERGY <fn> · chapter_manual.<grow|release>
//   ENERGY <fn> · decade.<dir>.<early|lived|coming>.<a|b> · decade.<dir>.now
//   ENERGY <fn> · favours.decade.<Domain>.<dir>          "Lean|over"
//   ENERGY <fn> · year.<state>[.b]                       shared with Your Almanac (L9 A); .b when a year repeats the energy of the year before
//   TEMPLATED tpl_almanac · land.year.<kind>.<gate>       shared with Your Almanac (L9 A)
//   TEMPLATED tpl_chapters · ground.<relation>.lived
// {el} {g} {e} are filled with element names by the resolver.
//   node tools/build-chapters-content.mjs --adopt <handoff dir>   gate, then write the station from the handoff
//   node tools/build-chapters-content.mjs                          station → src/content/depthChaptersEnergy.js
//   node tools/build-chapters-content.mjs --check                  exit 1 if the module is stale
//   node tools/build-chapters-content.mjs --fix <fixes.json> <handoff dir> [--why <ruling>]
//        apply [{ key, text, id }] to the handoff files, gate everything, adopt; the replaced texts go to
//        candidates.__ore.retired with the finding id (station law: retired text is never deleted)
// ===================================================================
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..') + '/';
const ST = ROOT + 'Reading/Database/templates/by_axis/json/TEMPLATED/tpl_chapters.json';
const OUT = ROOT + 'Elementum_App/src/content/depthChaptersEnergy.js';
const argv = process.argv.slice(2);

let retired = [];
if (argv[0] === '--fix') {
  const fixes = JSON.parse(fs.readFileSync(path.resolve(argv[1]), 'utf8')); const dir = path.resolve(argv[2]);
  const why = argv.includes('--why') ? argv[argv.indexOf('--why') + 1] : 'audit fix';
  const left = new Map(fixes.map((f) => [f.key, f]));
  for (const f of fs.readdirSync(dir).filter((x) => /^(approved|out-.+)\.json$/.test(x))) {
    const doc = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); let touched = false;
    for (const u of doc.units) { const fx = left.get(u.key); if (fx && fx.text !== u.text) { retired.push({ key: u.key, text: u.text, replaced_by: fx.id || '', why, date: new Date().toISOString().slice(0, 10) }); u.text = fx.text; touched = true; left.delete(u.key); } }
    if (touched) fs.writeFileSync(path.join(dir, f), JSON.stringify(doc, null, 1) + '\n');
  }
  if (left.size) { console.log('no unit for:', [...left.keys()].join(', ')); process.exit(1); }
  argv.splice(0, argv.length, '--adopt', dir);
}
if (argv[0] === '--adopt') {
  const dir = path.resolve(argv[1]);
  const files = ['approved.json', ...fs.readdirSync(dir).filter((f) => /^out-.+\.json$/.test(f)).sort()];
  execFileSync('node', [path.join(dir, 'gate.mjs'), ...files.map((f) => path.join(dir, f))], { stdio: 'inherit' });
  const units = {}; const from = {};
  for (const f of files) for (const u of JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')).units) { units[u.key] = u.text; from[u.key] = f; }
  const sorted = Object.fromEntries(Object.keys(units).sort().map((k) => [k, units[k]]));
  const prev = fs.existsSync(ST) ? JSON.parse(fs.readFileSync(ST, 'utf8')) : null;
  const rel = path.relative(ROOT, dir);
  const doc = {
    $archetype: 'tpl_chapters', axis: 'TEMPLATED', key: 'tpl_chapters',
    canonical_name: 'LIFE CHAPTERS, energy first: chapters, decades and years read by the energy they carry',
    construct: 'Station-only (owner 2026-10-21, L1–L10 A): every unit is keyed by the energy\'s function (Body, Mind, Expression, Action, Order) and whether the reader\'s chart grows or releases it, with {el}/{g}/{e} filled by the resolver; chapter lines also by gate and tense, decade lines by tense with a/b variants, domain lines and favours pairs by domain. Year lines and year landings carry Your Almanac\'s keys and serve both pages (L9 A).',
    candidate_note: 'Owner-ruled 2026-10-21 (round 2 L1–L10 A, R1–R4 A, S1–S2 A; round 1 Q1–Q11 A).',
    sources: ['ComparativeAnalysis/Handoffs/2026-10-19-life-chapters-content/03_RULINGS.md', rel + '/BRIEF.md'],
    candidates: { units: sorted, __ore: { ...(prev?.candidates?.__ore || {}), retired: [...(prev?.candidates?.__ore?.retired || []), ...retired] } },
    $provenance: [...(prev?.$provenance || []), { adopted_from: rel, files, count: Object.keys(sorted).length, date: new Date().toISOString().slice(0, 10), ruling: retired.length ? `section audit 2026-10-21: ${retired.length} fix(es)` : 'owner 2026-10-21 (L1–L10 A, S1–S2 A)', gate: rel + '/gate.mjs PASS' }],
  };
  fs.writeFileSync(ST, JSON.stringify(doc, null, 2) + '\n');
  console.log(`station: wrote ${Object.keys(sorted).length} units to TEMPLATED/tpl_chapters.json`);
}

const st = JSON.parse(fs.readFileSync(ST, 'utf8'));
const body = `// GENERATED by tools/build-chapters-content.mjs from the station (TEMPLATED/tpl_chapters.json) — do not edit by hand.
// Life Chapters, energy first (owner 2026-10-21, L1–L10 A). Read by components/reading/chaptersResolve.js.
export const ENERGY_CHAPTER_UNITS = ${JSON.stringify(st.candidates.units, null, 1)};
`;
if (argv.includes('--check')) {
  const cur = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
  if (cur !== body) { console.log('depthChaptersEnergy.js is stale: run node tools/build-chapters-content.mjs'); process.exit(1); }
  console.log(`depthChaptersEnergy.js in sync (${Object.keys(st.candidates.units).length} units)`);
} else {
  fs.writeFileSync(OUT, body);
  console.log(`wrote src/content/depthChaptersEnergy.js (${Object.keys(st.candidates.units).length} units)`);
}
