// THE ADOPTION STEP: land one ruled field from a rewrite station into the FINAL
// template station (Reading/Database/templates/by_axis/json), with provenance
// in the file header, then remind the operator of the pipeline (twins →
// deliberate transcription → transcription audit → voice audit).
//   node adopt.mjs <model> <AXIS>/<cell> <field path> [--ruling "owner 2026-09-24 Q3"] [--dry]
//   e.g. node adopt.mjs gpt-5 ELEMENT_PAIR/金_土 function.advise_friction
//        node adopt.mjs gpt-5 STEM/geng "gifts[2]"        (a whole pool item)
//        node adopt.mjs gpt-5 ELEMENT_GOD/土_偏印 "fn_reading.friction.ledger[1].doors.scene"
import fs from 'node:fs';
import { ROOT, S, get as getDot } from './lib.mjs';
const get = (o, p) => getDot(o, String(p).replace(/\[(\d+)\]/g, '.$1'));
const argv = process.argv.slice(2); const opt = (n, d) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : d; };
const [model, cellKey, fieldPath] = argv.filter((a) => !a.startsWith('--')); if (!fieldPath) { console.log('usage: node adopt.mjs <model> <AXIS>/<cell> <field path> [--ruling "…"] [--dry]'); process.exit(2); }
const [axis, cell] = cellKey.split('/');
const rewFile = `${ROOT}Reading/Database/Rewrites/${model}/by_axis/json/${axis}/${cell}.${model}.json`; if (!fs.existsSync(rewFile)) { console.error('no rewrite station file: ' + rewFile); process.exit(1); }
const rew = JSON.parse(fs.readFileSync(rewFile, 'utf8')); const value = get(rew.candidates, fieldPath); if (value == null) { console.error(`the ${model} station has no ${fieldPath} for ${cellKey}`); process.exit(1); }
const gate = rew.$gate_findings; const gateKey = Object.keys(gate).find((k) => k === fieldPath || fieldPath.startsWith(k.replace(/\]$/, ']')) || (k.startsWith('ledger') && fieldPath.includes('ledger')));
const stationFile = `${S}${axis}/${cell}.json`; const station = JSON.parse(fs.readFileSync(stationFile, 'utf8'));
const before = get(station.candidates, fieldPath);
const setPath = (o, p, v) => { const parts = p.replace(/\[(\d+)\]/g, '.$1').split('.'); let cur = o; parts.forEach((k, i) => { if (i === parts.length - 1) cur[k] = v; else cur = cur[k]; }); };
console.log(`${cellKey} · ${fieldPath}\n  before: ${JSON.stringify(before)}\n  after:  ${JSON.stringify(value)}\n  gate at filing: ${gateKey ? JSON.stringify(gate[gateKey]) : 'unknown'}`);
if (argv.includes('--dry')) process.exit(0);
setPath(station.candidates, fieldPath, value);
station.$provenance = station.$provenance || []; station.$provenance.push({ field: fieldPath, adopted_from: model, rewrite_station: rewFile.replace(ROOT, ''), date: new Date().toISOString().slice(0, 10), ruling: opt('ruling', 'owner ruling (record it in REA_16 §6)'), replaced: before });
fs.writeFileSync(stationFile, JSON.stringify(station, null, 2) + '\n');
console.log(`  → landed in ${stationFile.replace(ROOT, '')} with provenance.\n  Now the pipeline (REA_05 §1): cd Elementum_App && node tools/build-template-twins.mjs && (transcribe the value into src/content by verbatim replacement) && node tools/export-reading-templates.mjs && node tools/voice-audit.mjs && node tools/qa-selection-fixtures.mjs; then log the ruling in REA_16 §6.`);
