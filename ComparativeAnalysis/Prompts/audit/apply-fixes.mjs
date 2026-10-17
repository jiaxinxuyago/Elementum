// THE FIX APPLIER (REA_20 §4 step 5): write approved fixes, keyed by station address, into the station
// with provenance, and transcribe them into the live content modules. Each fix is checked first against
// the house limits for its field; a fix that fails is skipped and reported, never forced.
//
//   node audit/apply-fixes.mjs <fixes.json> --by "<adopted_from>" --ruling "<owner's words>" [--dry]
//   fixes.json: [{ "key": "K2 金_七杀 · fn_reading.friction.ledger[0].angles.drive", "text": "…", "id": "W-012" }, …]
//   key forms: K2 <cell> · <path under candidates> (ELEMENT_GOD, k2.js) · PAIR <cell> · <path> (ELEMENT_PAIR, pairs.js)
import fs from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../..') + '/';
const argv = process.argv.slice(2); const opt = (n) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : undefined; };
const file = argv[0]; const BY = opt('by'); const RULING = opt('ruling'); const dry = argv.includes('--dry');
if (!file || !BY || !RULING) { console.log('usage: node audit/apply-fixes.mjs <fixes.json> --by <adopted_from> --ruling "<words>" [--dry]'); process.exit(2); }
const AXIS = { K2: ['ELEMENT_GOD', 'Elementum_App/src/content/k2.js'], PAIR: ['ELEMENT_PAIR', 'Elementum_App/src/content/pairs.js'] };
const wc = (s) => String(s).trim().split(/\s+/).length; const sents = (s) => String(s).trim().split(/(?<=[.!?])\s+/).filter(Boolean);
// the house limits per field family (REA_20 §5); a family not listed is checked for the universal rules only
const LIMITS = [[/fn_reading\..*angles\./, { min: 30, max: 45, sMin: 2, sMax: 3 }], [/function\.definition_/, { min: 30, max: 50, sMin: 3, sMax: 4 }], [/function\.advise_/, { min: 30, max: 70, sMin: 3, sMax: 7 }], [/edge\.lead/, { min: 30, max: 45, sMin: 2, sMax: 2 }]];
function check(p, t) {
  const errs = []; const lim = (LIMITS.find(([re]) => re.test(p)) || [null, null])[1];
  if (lim) { const w = wc(t), s = sents(t).length; if (w < lim.min || w > lim.max) errs.push(`${w} words (${lim.min} to ${lim.max})`); if (s < lim.sMin || s > lim.sMax) errs.push(`${s} sentences (${lim.sMin} to ${lim.sMax})`); }
  const last = sents(t).slice(-1)[0] || ''; if (/\byou (can|could)\b/i.test(last)) errs.push('capacity close');
  if (/[—–;]/.test(t)) errs.push('dash or semicolon'); if (/[一-鿿]/.test(t)) errs.push('Chinese character');
  for (const s of sents(t)) if ((s.match(/,/g) || []).length > 2) errs.push('a sentence with more than two commas');
  return errs;
}
const get = (o, p) => p.replace(/\[(\d+)\]/g, '.$1').split('.').reduce((v, k) => v?.[k], o);
const set = (o, p, v) => { const ks = p.replace(/\[(\d+)\]/g, '.$1').split('.'); let c = o; ks.slice(0, -1).forEach((k) => (c = c[k])); c[ks[ks.length - 1]] = v; };
const js = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const code = {}; const fixes = JSON.parse(fs.readFileSync(file, 'utf8')); const done = []; const skipped = [];
for (const f of fixes) {
  const m = String(f.key).match(/^(K2|PAIR) (\S+) · (.+)$/); if (!m) { skipped.push([f.id, 'bad key ' + f.key]); continue; }
  const [, ax, cell, p] = m; const [axis, mod] = AXIS[ax]; const sf = `${ROOT}Reading/Database/templates/by_axis/json/${axis}/${cell}.json`;
  if (!fs.existsSync(sf)) { skipped.push([f.id, 'no station file ' + cell]); continue; }
  const st = JSON.parse(fs.readFileSync(sf, 'utf8')); const before = get(st.candidates, p);
  if (typeof before !== 'string') { skipped.push([f.id, 'no text at ' + p]); continue; }
  if (before === f.text) { skipped.push([f.id, 'already applied']); continue; }
  const errs = check(p, f.text); if (errs.length) { skipped.push([f.id, errs.join(', ')]); continue; }
  code[mod] = code[mod] ?? fs.readFileSync(ROOT + mod, 'utf8'); let c = code[mod];
  const start = c.indexOf(`'${cell}': {`); const next = c.slice(start + 1).search(/\n  '[^']+': \{/); const end = next < 0 ? c.length : start + 1 + next; let span = c.slice(start, end);
  const forms = [[`'${js(before)}'`, `'${js(f.text)}'`], ['`' + before + '`', '`' + f.text + '`']]; const hit = forms.find(([a]) => span.includes(a));
  if (start < 0 || !hit) { skipped.push([f.id, 'not found in ' + mod]); continue; }
  if (span.split(hit[0]).length > 2) { skipped.push([f.id, 'text shared by two fields in the cell, apply by hand']); continue; }
  code[mod] = c.slice(0, start) + span.replace(hit[0], hit[1]) + c.slice(end);
  if (!dry) { set(st.candidates, p, f.text); (st.$provenance = st.$provenance || []).push({ field: p, adopted_from: BY, date: new Date().toISOString().slice(0, 10), ruling: RULING, finding: f.id || null, replaced: before }); fs.writeFileSync(sf, JSON.stringify(st, null, 2) + '\n'); }
  done.push([f.id, f.key]);
}
if (!dry) for (const [mod, c] of Object.entries(code)) fs.writeFileSync(ROOT + mod, c);
console.log(`${dry ? 'DRY ' : ''}applied ${done.length}, skipped ${skipped.length}`); for (const [id, why] of skipped) console.log(`  skipped ${id}: ${why}`);
console.log('next: node Elementum_App/tools/export-reading-templates.mjs --check · build-template-twins · voice-audit · qa-selection-fixtures · npm run build');
