// THE REWRITES STATION FILER: takes a model's filled skeletons and files them
// as a station under Reading/Database/Rewrites/<model>/, by axis and by
// variable, in the same shape as the final template station, with the model's
// name in every folder, file name and header, and the gate result beside every
// value. Nothing here touches Reading/Database/templates/ (adopt.mjs does that,
// one field at a time, on the owner's ruling).
//   node file-rewrites.mjs <dir-of-filled-skeletons> --model <name> [--handoff <handoff dir>]
// Reads "_generated_by" from the files when --model is omitted.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, J, STEMS, GOD_FILE, get as getDot } from './lib.mjs';
const get = (o, p) => getDot(o, String(p).replace(/\[(\d+)\]/g, '.$1'));
import { validateTemplate } from './validate-template.mjs';
const argv = process.argv.slice(2); const opt = (n, d) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : d; };
const dir = argv.filter((a) => !a.startsWith('--'))[0]; if (!dir) { console.log('usage: node file-rewrites.mjs <dir> --model <name>'); process.exit(2); }
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json') && !f.endsWith('.gate.json'));
const first = JSON.parse(fs.readFileSync(path.join(dir, files[0]), 'utf8'));
const model = (opt('model') || first._generated_by || '').replace(/[^A-Za-z0-9._-]+/g, '-'); if (!model) { console.error('no --model and no _generated_by in the files'); process.exit(2); }
const handoffTag = first._handoff || path.basename(dir);
const REW = `${ROOT}Reading/Database/Rewrites/${model}/`; const today = new Date().toISOString().slice(0, 10);
const GOD_OF = Object.fromEntries(Object.entries(GOD_FILE).map(([k, v]) => [v, k]));
// map a skeleton field to its station address {axis, cell, path}
function address(sk, fp, spec) {
  const stemFile = (sk.cell.match(/STEM\/(\w+)/) || [])[1]; const band = (sk.cell.match(/STEM_BAND\/\w+?_(\w+)/) || [])[1]; const pair = (sk.cell.match(/ELEMENT_PAIR\/(\S+?)(\s|$)/) || [])[1];
  if (fp === 'manifesto' || fp === 'dm_overview') return { axis: 'STEM', cell: stemFile, path: fp };
  if (fp.startsWith('band.')) return { axis: 'STEM_BAND', cell: `${stemFile}_${band}`, path: fp.slice(5) };
  const pool = fp.match(/^(gifts|shadows)\[(\d+)\]$/); if (pool) return { axis: 'STEM', cell: stemFile, path: `${pool[1]}[${pool[2]}]`, index: +pool[2], side: pool[1] };
  const led = fp.match(/^ledger\[(\d+)\]$/); if (led) return { axis: 'ELEMENT_GOD', cell: spec.cell, path: `fn_reading.${spec.pole}.ledger[${spec.row}]`, row: spec.row, pole: spec.pole, door: spec.door };
  return { axis: 'ELEMENT_PAIR', cell: pair, path: fp };
}
const setPath = (o, p, v) => { const parts = p.replace(/\[(\d+)\]/g, '.$1').split('.'); let cur = o; parts.forEach((k, i) => { if (i === parts.length - 1) cur[k] = v; else { if (cur[k] == null) cur[k] = /^\d+$/.test(parts[i + 1]) ? [] : {}; cur = cur[k]; } }); };
const byAxis = {}; const byVar = {}; const shown = {}; let n = 0;
for (const f of files) {
  const sk = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); const R = validateTemplate(path.join(dir, f));
  for (const [fp, fld] of Object.entries(sk.fields)) {
    const a = address(sk, fp, fld.spec); const key = `${a.axis}/${a.cell}`; const gate = R.fields[fp] || { pass: false, findings: ['not gated'] };
    if (!byAxis[key]) { const orig = J(`${a.axis}/${a.cell}.json`); byAxis[key] = { $archetype: a.cell, axis: a.axis, key: orig.key || a.cell, $generated_by: model, $handoff: handoffTag, $filed: today, $gate: 'validate-template.mjs (both ends of the range, mechanical law, cut law, four-gram, reader zone)', $note: 'A REWRITE STATION: the same shape as Reading/Database/templates/by_axis/json, sparse (only the fields this model wrote), never the truth. Adopt a field into the final template station with adopt.mjs on the owner\'s ruling.', candidates: {}, $original: {}, $gate_findings: {} }; }
    const c = byAxis[key]; const val = fld.value; const v = typeof val === 'object' && val ? Object.fromEntries(Object.entries(val).filter(([k]) => k !== '_trace')) : val;
    if (a.side) { const orig = J(`STEM/${a.cell}.json`)[a.side][a.index]; setPath(c.candidates, a.path, { ...orig, phrase: v.phrase, dim: v.dim, desc: v.desc }); setPath(c.$original, a.path, orig); }
    else if (a.row != null) { const orig = J(`ELEMENT_GOD/${a.cell}.json`); setPath(c.candidates, `adj_chips.${a.pole}[${a.row}]`, v.word); setPath(c.candidates, `${a.path}.word`, v.word); setPath(c.candidates, `${a.path}.doors.${a.door}`, v.text); setPath(c.$original, `${a.path}.word`, get(orig, a.path)?.word); setPath(c.$original, `adj_chips.${a.pole}[${a.row}]`, orig.adj_chips?.[a.pole]?.[a.row]); setPath(c.$original, `${a.path}.doors.${a.door}`, get(orig, a.path)?.doors?.[a.door]); }
    else { setPath(c.candidates, a.path, v); setPath(c.$original, a.path, get(J(`${a.axis}/${a.cell}.json`), a.path) ?? null); }
    (shown[key] = shown[key] || {})[fp] = { original: a.side ? J(`STEM/${a.cell}.json`)[a.side][a.index] : a.row != null ? (() => { const r = get(J(`ELEMENT_GOD/${a.cell}.json`), a.path); return { word: r?.word, text: r?.doors?.[a.door] }; })() : get(J(`${a.axis}/${a.cell}.json`), a.path), candidate: v };
    c.$gate_findings[fp] = gate.pass ? 'pass' : gate.findings; if (fld._trace || val?._trace) setPath(c, `$trace.${fp}`, fld._trace || val._trace);
    const varKey = `${a.axis}.${a.path.replace(/\[\d+\]/g, '[]').replace(/\.doors\..*$/, '')}`; (byVar[varKey] = byVar[varKey] || []).push({ cell: a.cell, field: fp, candidate: v, original: a.side ? J(`STEM/${a.cell}.json`)[a.side][a.index] : a.row != null ? get(J(`ELEMENT_GOD/${a.cell}.json`), a.path) : get(J(`${a.axis}/${a.cell}.json`), a.path), gate: gate.pass ? 'pass' : gate.findings }); n++;
  }
}
const esc = (v) => String(v ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const flatRows = (obj, prefix = '') => Object.entries(obj || {}).flatMap(([k, v]) => { const p = prefix ? `${prefix}.${k}` : k; if (Array.isArray(v)) return v.every((x) => typeof x !== 'object') ? [[p, v.join(' · ')]] : v.flatMap((x, i) => flatRows(x, `${p}[${i}]`)); if (v && typeof v === 'object') return flatRows(v, p); return [[p, v]]; });
for (const [key, c] of Object.entries(byAxis)) {
  const [axis, cell] = key.split('/'); const st = JSON.parse(fs.readFileSync(`${ROOT}Reading/Database/templates/by_axis/json/${axis}/${cell}.json`, 'utf8'));
  const d = `${REW}by_axis/json/${axis}/`; fs.mkdirSync(d, { recursive: true }); fs.writeFileSync(`${d}${cell}.${model}.json`, JSON.stringify(c, null, 2));
  const mdDir = `${REW}by_axis/md/${axis}/`; fs.mkdirSync(mdDir, { recursive: true });
  const cand = Object.fromEntries(flatRows(c.candidates)); const orig = Object.fromEntries(flatRows(c.$original));
  const gateOf = (path) => { const fp = Object.keys(c.$gate_findings).find((k) => path === k || path.startsWith(k.replace(/\[\d+\]$/, '')) || (k.startsWith('ledger') && /fn_reading|adj_chips/.test(path))) ; const g = fp ? c.$gate_findings[fp] : null; return g == null ? '' : g === 'pass' ? 'pass' : 'FAIL: ' + g.join('; '); };
  const rows = Object.keys(cand).map((path) => `| \`${path}\` | ${esc(orig[path] ?? '')} | ${esc(cand[path])} | ${esc(gateOf(path))} |`).join('\n');
  fs.writeFileSync(`${mdDir}${cell}.${model}.md`, `# ${cell} — ${st.canonical_name || ''}  ·  ${axis} archetype  ·  REWRITE by ${model}\n\n> **GENERATED from the rewrite station JSON — do not hand-edit.** A candidate, never the truth: the truth is \`Reading/Database/templates/by_axis/json/${axis}/${cell}.json\`. Re-run \`node ComparativeAnalysis/Prompts/file-rewrites.mjs\` to rebuild.\n>\n> Generated by **${model}** · handoff ${handoffTag} · filed ${today} · gate: validate-template.mjs (both ends of the range, mechanical law, cut law, four-gram, reader zone).\n\n| | |\n|---|---|\n| **axis** | ${axis} |\n| **key** | ${st.key || cell} |\n| **canonical name** | ${esc(st.canonical_name || '')} |\n| **generated by** | ${model} |\n| **fields rewritten** | ${Object.keys(c.$gate_findings).length} (sparse: only what this model wrote on this chart) |\n| **gate** | ${Object.values(c.$gate_findings).every((g) => g === 'pass') ? 'every field passes' : Object.entries(c.$gate_findings).filter(([, g]) => g !== 'pass').map(([k]) => k).join(', ') + ' fail'} |\n\n## Candidate variables\n\n| Variable | Original (shipping) | ${model} | Gate |\n|---|---|---|---|\n${rows}\n`);
}for (const [varKey, rows] of Object.entries(byVar)) { const d = `${REW}by_variable/json/`; fs.mkdirSync(d, { recursive: true }); fs.writeFileSync(`${d}${varKey}.${model}.json`, JSON.stringify({ $variable: varKey, $generated_by: model, $handoff: handoffTag, $filed: today, $note: 'A REWRITE pivot: this model\'s candidates for one variable across the cells it wrote, each beside the original and its gate result. Truth is Reading/Database/templates/by_variable (generated from by_axis).', variants: rows }, null, 2)); }
fs.writeFileSync(`${REW}README.md`, `# Rewrites by ${model}\n\nFiled ${today} from ${handoffTag} by \`ComparativeAnalysis/Prompts/file-rewrites.mjs\`. \`by_axis/json/<AXIS>/<cell>.${model}.json\` mirrors the final template station's shape (sparse: only the fields this model wrote; \`candidates\` = the rewrite, \`$original\` = the shipping text, \`$gate_findings\` per field). \`by_variable/json/<var>.${model}.json\` is the pivot per variable. \`by_axis/md/\` is the readable twin. Nothing here is truth: adopt a field with \`node adopt.mjs ${model} <AXIS>/<cell> <field path>\` on the owner's ruling.\n`);
console.log(`${n} fields from ${files.length} pages filed → ${REW} (by_axis: ${Object.keys(byAxis).length} cells · by_variable: ${Object.keys(byVar).length} variables)`);
