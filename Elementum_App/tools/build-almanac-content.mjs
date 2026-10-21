// ===================================================================
// ELEMENTUM · build-almanac-content — Your Almanac's units, station first
// ===================================================================
// The pipeline (as the other sections): sealed writers → the gated handoff
// folder → the station → src/content → the export check.
//   node tools/build-almanac-content.mjs --adopt   gate every handoff file
//       (template.json, out-N.json) and adopt the units, with provenance,
//       into the station: Reading/Database/templates/by_axis/json/
//       TEMPLATED/tpl_almanac.json
//   node tools/build-almanac-content.mjs           transcribe the station
//       into src/content/almanac.js and the push worker's copy
//   node tools/build-almanac-content.mjs --check   exit 1 if almanac.js is stale
// The station is the editing surface: later edits go there, then transcribe.
// ===================================================================
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';

const APP = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = path.resolve(APP, '../ComparativeAnalysis/Prompts/out/handoff/2026-10-21-almanac-template');
const STATION = path.resolve(APP, '../Reading/Database/templates/by_axis/json/TEMPLATED/tpl_almanac.json');
const OUT = path.join(APP, 'src/content/almanac.js');
const sortObj = (o) => Object.fromEntries(Object.keys(o).sort().map((k) => [k, o[k]]));

if (process.argv.includes('--adopt')) {
  const files = fs.readdirSync(DIR).filter((f) => f === 'template.json' || /^out-\d+\.json$/.test(f)).sort();
  const units = {}; const provenance = {};
  for (const f of files) {
    execFileSync(process.execPath, [path.join(DIR, 'gate.mjs'), path.join(DIR, f)], { stdio: 'inherit' });
    for (const u of JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')).units) {
      units[u.key] = u.text;
      provenance[u.key] = f === 'template.json' ? 'golden template, owner K1–K13 A (2026-10-21)' : `sealed writer ${f}, gated${u.edited ? `; edited by the ${u.edited}` : ''}; batch in the approved voice (K1–K13 A)`;
    }
  }
  const station = {
    $archetype: 'tpl_almanac', axis: 'TEMPLATED', key: 'tpl_almanac', canonical_name: null,
    construct: 'Your Almanac (EVT-1): the Today tab read energy first. Keys: ENERGY <function> · <day|month|year>.<state>[.a|.b] · TEMPLATED tpl_almanac · head.energy|head.land|head.<mark|return|turned|void|star>|ground|land|echo|pillar|mark|favours_land … · GOD <id> · favours.<day|month>.<Domain>.<helping|heavy> · STAR <id> · day · PUSH · <lead>. {el}, {g}, {e} are filled by the engine.',
    candidate_note: 'Station-first since adoption: edit here, then transcribe (node tools/build-almanac-content.mjs).',
    sources: ['ComparativeAnalysis/Handoffs/2026-10-19-event-signature/03_RULINGS.md (rounds 1–4)', 'ComparativeAnalysis/Prompts/out/handoff/2026-10-21-almanac-template/ (BRIEF, gate, template, out-1..5)'],
    status_note: 'DEV 2026-10-21 · Your Almanac, dev site only (ALMANAC_LIVE false, owner L1 A)',
    budget: 'per kind: see the handoff folder BRIEF.md',
    provenance: sortObj(provenance),
    candidates: { units: sortObj(units) },
  };
  fs.writeFileSync(STATION, JSON.stringify(station, null, 2) + '\n');
  console.log(`adopted ${Object.keys(units).length} units into the station from ${files.join(', ')}`);
  process.exit(0);
}

const { candidates } = JSON.parse(fs.readFileSync(STATION, 'utf8'));
const units = sortObj(candidates.units || {});
const head = fs.readFileSync(OUT, 'utf8').split('export const ALMANAC_UNITS')[0];
const body = `${head}export const ALMANAC_UNITS = {\n${Object.keys(units).map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(units[k])},`).join('\n')}\n};\n`;
if (process.argv.includes('--check')) {
  if (fs.readFileSync(OUT, 'utf8') !== body) { console.log('almanac.js is stale: run node tools/build-almanac-content.mjs'); process.exit(1); }
  console.log(`almanac.js is current (${Object.keys(units).length} units).`); process.exit(0);
}
fs.writeFileSync(OUT, body);
console.log(`transcribed ${Object.keys(units).length} units from the station into src/content/almanac.js`);
execFileSync(process.execPath, [path.join(APP, 'tools/build-push-copy.mjs')], { stdio: 'inherit' });
