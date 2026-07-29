// ===================================================================
// ELEMENTUM · template MD-twin generator
// ===================================================================
// Renders a review-grade Markdown twin beside every JSON in
// Reading/Database/templates/. Twins are GENERATED — never hand-edit
// them; edit the JSON (or request the change) and re-run:
//   node tools/build-template-twins.mjs
// Spec: REA_05 §1–§3.
// ===================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.resolve(__dirname, '../../Reading/Database/templates');

const esc = (s) => String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ');
const cell = (v) => {
  if (v === null || v === undefined) return '*(unauthored)*';
  if (Array.isArray(v)) return esc(v.join(' · '));
  if (typeof v === 'object') return null; // handled as sub-block
  return esc(v);
};

const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.json'));
for (const f of files) {
  const t = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
  const L = [];
  L.push(`# ${t.$template} — template twin`);
  L.push('');
  L.push('> **GENERATED from the JSON — do not hand-edit.** Mark up or request changes; the JSON updates; twins regenerate (`node tools/build-template-twins.mjs`).');
  L.push('');
  L.push('| | |');
  L.push('|---|---|');
  for (const k of ['class', 'axis', 'status', 'budget', 'source_of_truth']) if (t[k]) L.push(`| **${k}** | ${esc(t[k])} |`);
  L.push('');
  if (t.pattern !== undefined) {
    L.push('## Pattern');
    L.push('');
    L.push(t.pattern === null ? '*(unauthored)*' : '```\n' + t.pattern + '\n```');
    L.push('');
  }
  if (t.clauses) {
    L.push('## Clauses');
    L.push('');
    const flat = (obj, prefix = '') => Object.entries(obj).flatMap(([k, v]) =>
      v && typeof v === 'object' && !Array.isArray(v) ? flat(v, `${prefix}${k}.`) : [[`${prefix}${k}`, v]]);
    L.push('| Clause | Text |');
    L.push('|---|---|');
    for (const [k, v] of flat(t.clauses)) L.push(`| ${esc(k)} | ${cell(v) ?? esc(JSON.stringify(v))} |`);
    L.push('');
  }
  if (t.open_ruling) { L.push(`**⚠ Open ruling:** ${esc(t.open_ruling)}`); L.push(''); }
  if (t.values) {
    L.push('## Values');
    L.push('');
    const entries = Object.entries(t.values);
    const nested = entries.some(([, v]) => v && typeof v === 'object' && !Array.isArray(v));
    if (!nested) {
      L.push('| Key | Value |');
      L.push('|---|---|');
      for (const [k, v] of entries) L.push(`| **${esc(k)}** | ${cell(v)} |`);
    } else {
      for (const [k, v] of entries) {
        L.push(`### ${k}`);
        L.push('');
        if (v === null) { L.push('*(unauthored)*'); L.push(''); continue; }
        const flat = (obj, prefix = '') => Object.entries(obj).flatMap(([kk, vv]) =>
          vv && typeof vv === 'object' && !Array.isArray(vv) ? flat(vv, `${prefix}${kk}.`) : [[`${prefix}${kk}`, vv]]);
        L.push('| Field | Value |');
        L.push('|---|---|');
        for (const [kk, vv] of flat(v)) L.push(`| ${esc(kk)} | ${cell(vv)} |`);
        L.push('');
      }
    }
    L.push('');
  }
  fs.writeFileSync(path.join(DIR, f.replace('.json', '.md')), L.join('\n'), 'utf8');
}
console.log(`✓ ${files.length} twins regenerated in ${DIR}`);
