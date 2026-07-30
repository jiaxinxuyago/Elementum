// ===================================================================
// ELEMENTUM · template MD-twin generator (axis station)
// ===================================================================
// Renders a review-grade Markdown twin (templates/md/<AXIS>/...) for
// every JSON in templates/json/<AXIS>/. Twins are GENERATED — never
// hand-edit them; edit the JSON (or request the change) and re-run:
//   node tools/build-template-twins.mjs
// Spec: REA_05 §1–§3.
// ===================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const JSON_DIR = path.resolve(__dirname, '../../Reading/Database/templates/json');
const MD_DIR = path.resolve(__dirname, '../../Reading/Database/templates/md');

const esc = (s) => String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ');
const cell = (v) => {
  if (v === null || v === undefined || v === '') return '*(unauthored)*';
  if (Array.isArray(v)) return v.every((x) => typeof x !== 'object') ? esc(v.join(' · ')) : null;
  if (typeof v === 'object') return null;
  return esc(v);
};
// flatten nested objects/arrays into dotted rows
const flat = (obj, prefix = '') => Object.entries(obj).flatMap(([k, v]) => {
  const key = `${prefix}${k}`;
  if (v && typeof v === 'object' && !Array.isArray(v)) return flat(v, `${key}.`);
  if (Array.isArray(v) && v.some((x) => x && typeof x === 'object')) {
    return v.flatMap((x, i) => (x && typeof x === 'object') ? flat(x, `${key}[${i}].`) : [[`${key}[${i}]`, x]]);
  }
  return [[key, v]];
});

fs.rmSync(MD_DIR, { recursive: true, force: true });
let n = 0;
for (const axis of fs.readdirSync(JSON_DIR)) {
  const src = path.join(JSON_DIR, axis);
  if (!fs.statSync(src).isDirectory()) continue;
  const dst = path.join(MD_DIR, axis);
  fs.mkdirSync(dst, { recursive: true });
  for (const f of fs.readdirSync(src)) {
    if (f === 'README.md') { fs.copyFileSync(path.join(src, f), path.join(dst, f)); continue; }
    if (!f.endsWith('.json')) continue;
    const t = JSON.parse(fs.readFileSync(path.join(src, f), 'utf8'));
    const L = [];
    L.push(`# ${t.key || t.$archetype}${t.canonical_name ? ` — ${t.canonical_name}` : ''}  ·  ${axis} archetype`);
    L.push('');
    L.push('> **GENERATED from the JSON — do not hand-edit.** Edit the JSON (or request the change), then re-run `node tools/build-template-twins.mjs`.');
    L.push('>');
    L.push(`> ${esc(t.candidate_note || '')}`);
    L.push('');
    L.push('| | |');
    L.push('|---|---|');
    L.push(`| **axis** | ${esc(t.axis)} |`);
    L.push(`| **key** | ${esc(t.key ?? '')} |`);
    if (t.canonical_name) L.push(`| **canonical name** | ${esc(t.canonical_name)} |`);
    L.push(`| **construct** | ${esc(t.construct)} |`);
    if (t.status_note) L.push(`| **status** | ${esc(t.status_note)} |`);
    if (t.budget) L.push(`| **budget** | ${esc(t.budget)} |`);
    if (t.sources?.length) L.push(`| **sources** | ${esc(t.sources.join(' · '))} |`);
    L.push('');
    const { __ore, ...vars } = t.candidates || {};
    if (Object.keys(vars).length) {
      L.push('## Candidate variables');
      L.push('');
      L.push('| Variable | Value |');
      L.push('|---|---|');
      for (const [k, v] of flat(vars)) L.push(`| \`${esc(k)}\` | ${cell(v) ?? esc(JSON.stringify(v))} |`);
      L.push('');
    } else if (!__ore) {
      L.push('*(no candidates — empty placeholder; construct TBD)*');
      L.push('');
    }
    if (__ore) {
      L.push('## Ore (legacy corpus — mining material, fate pending rulings)');
      L.push('');
      if (__ore.note) { L.push(`*${esc(__ore.note)}*`); L.push(''); }
      L.push('| Field | Value |');
      L.push('|---|---|');
      const { note, ...oreFields } = __ore;
      for (const [k, v] of flat(oreFields)) L.push(`| \`${esc(k)}\` | ${cell(v) ?? esc(JSON.stringify(v))} |`);
      L.push('');
    }
    fs.writeFileSync(path.join(dst, f.replace('.json', '.md')), L.join('\n'), 'utf8');
    n++;
  }
}
console.log(`✓ ${n} twins regenerated in ${MD_DIR}`);
