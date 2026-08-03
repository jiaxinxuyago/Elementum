// ===================================================================
// ELEMENTUM · station view generator (axis twins + by_variable pivot)
// ===================================================================
// The axis station's SOURCE OF TRUTH is templates/by_axis/json/<AXIS>/.
// This tool renders every GENERATED view of it:
//   1. templates/by_axis/md/<AXIS>/*.md — review-grade twin per JSON.
//   2. templates/by_variable/{json,md}/<variable>.* — the comparative
//      pivot (owner-ruled 2026-08-03): one file per registry variable
//      holding ALL archetype variants in taxonomy order (_ORDER.json),
//      for line-by-line comparison across archetypes. Registry fields
//      only — __ore never pivots. TEMPLATED is excluded: each of its
//      by_axis files already IS a single-variable view.
// Views are GENERATED — never hand-edit; edit the by_axis JSON (or
// request the change) and re-run:
//   node tools/build-template-twins.mjs
// Spec: REA_05 §1–§3.
// ===================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATION = path.resolve(__dirname, '../../Reading/Database/templates');
const JSON_DIR = path.join(STATION, 'by_axis', 'json');
const MD_DIR = path.join(STATION, 'by_axis', 'md');
const VAR_JSON_DIR = path.join(STATION, 'by_variable', 'json');
const VAR_MD_DIR = path.join(STATION, 'by_variable', 'md');

const GENERATED_BANNER = '> **GENERATED from the by_axis JSON — do not hand-edit.** Edit the JSON (or request the change), then re-run `node tools/build-template-twins.mjs`.';

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

// ── 1 · axis md twins ──────────────────────────────────────────────
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
    L.push(GENERATED_BANNER);
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

// ── 2 · by_variable pivot (comparative view) ───────────────────────
// _ORDER.json (written by the seeder) fixes the taxonomy order of the
// archetypes inside every axis; without it we refuse to guess.
const order = JSON.parse(fs.readFileSync(path.join(JSON_DIR, '_ORDER.json'), 'utf8'));
const PIVOT_SKIP = new Set(['TEMPLATED']);

const pivot = {}; // varName -> { axes: { AXIS: [ {id, key, canonical_name, value} ] } }
for (const [axis, names] of Object.entries(order)) {
  if (PIVOT_SKIP.has(axis)) continue;
  for (const name of names) {
    const fp = path.join(JSON_DIR, axis, `${name}.json`);
    if (!fs.existsSync(fp)) continue;
    const t = JSON.parse(fs.readFileSync(fp, 'utf8'));
    const { __ore, ...vars } = t.candidates || {};
    for (const [varName, value] of Object.entries(vars)) {
      const p = (pivot[varName] ||= { axes: {} });
      (p.axes[axis] ||= []).push({ id: name, key: t.key ?? null, canonical_name: t.canonical_name ?? null, value });
    }
  }
}

fs.rmSync(VAR_JSON_DIR, { recursive: true, force: true });
fs.rmSync(VAR_MD_DIR, { recursive: true, force: true });
fs.mkdirSync(VAR_JSON_DIR, { recursive: true });
fs.mkdirSync(VAR_MD_DIR, { recursive: true });

const PIVOT_NOTE = 'GENERATED comparative pivot of the by_axis station (registry fields only; __ore and TEMPLATED excluded). Truth = by_axis/json — edit there, then re-run node tools/build-template-twins.mjs.';
let m = 0;
for (const [varName, p] of Object.entries(pivot)) {
  fs.writeFileSync(path.join(VAR_JSON_DIR, `${varName}.json`),
    JSON.stringify({ $variable: varName, generated_note: PIVOT_NOTE, axes: p.axes }, null, 2) + '\n', 'utf8');

  const L = [];
  const axesNames = Object.keys(p.axes);
  L.push(`# \`${varName}\`  ·  by-variable comparison`);
  L.push('');
  L.push(GENERATED_BANNER);
  L.push('>');
  L.push(`> ${PIVOT_NOTE}`);
  L.push('');
  for (const axis of axesNames) {
    const variants = p.axes[axis];
    L.push(`## ${axis} (×${variants.length})`);
    L.push('');
    const simple = variants.every((v) => cell(v.value) !== null);
    if (simple) {
      L.push('| Archetype | Key | Value |');
      L.push('|---|---|---|');
      for (const v of variants) L.push(`| **${esc(v.canonical_name || v.id)}** | ${esc(v.key ?? v.id)} | ${cell(v.value)} |`);
      L.push('');
    } else {
      for (const v of variants) {
        L.push(`### ${esc(v.canonical_name || v.id)} · ${esc(v.key ?? v.id)}`);
        L.push('');
        L.push('| Field | Value |');
        L.push('|---|---|');
        const rows = (v.value && typeof v.value === 'object') ? flat(v.value) : [['value', v.value]];
        for (const [k, val] of rows) L.push(`| \`${esc(k)}\` | ${cell(val) ?? esc(JSON.stringify(val))} |`);
        L.push('');
      }
    }
  }
  fs.writeFileSync(path.join(VAR_MD_DIR, `${varName}.md`), L.join('\n'), 'utf8');
  m++;
}

console.log(`✓ ${n} axis twins in ${MD_DIR}`);
console.log(`✓ ${m} variable pivots (json + md) in ${path.join(STATION, 'by_variable')}`);
