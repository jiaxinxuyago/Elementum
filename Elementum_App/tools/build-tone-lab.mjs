// ===================================================================
// ELEMENTUM · tone-lab sheet generator (disposable workshop tooling)
// ===================================================================
// Renders the tone-lab comparison views from tone_lab/*.json:
//   tone_lab/md/<stem>.md   — versioned comparison sheet per stem
//   tone_lab/review.html    — one silk-styled side-by-side page
// The lab is a WORKSHOP (BIZ_03 §8 fine-tune): not part of by_axis
// truth, never audited, nothing ships from here. Re-run after editing
// any lab JSON:  node tools/build-tone-lab.mjs
// ===================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LAB = path.resolve(__dirname, '../../Reading/Database/templates/tone_lab');
const MD = path.join(LAB, 'md');

const VAR_LABEL = {
  manifesto_l1: 'Manifesto L1 · the carved law',
  manifesto_l2: 'Manifesto L2 · the poetic edge',
  inscription: 'Inscription · the recognition engine',
  dm_overview: 'dm_overview · the analyst’s ledger (P4 — NEW variable, no live line)',
  yourNature_desc: 'yourNature_desc · the identity paragraph (J4/P4)',
  output_day_narrative: 'Output day · "a day to express" (template, {today}/{dm} slots)',
  officer_day_narrative: 'Officer day · "a day that presses" (template, {today}/{dm} slots)',
};
const KEYS = ['current', 'refined', 'A', 'B', 'C'];

const labs = fs.readdirSync(LAB).filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(fs.readFileSync(path.join(LAB, f), 'utf8')));

fs.rmSync(MD, { recursive: true, force: true });
fs.mkdirSync(MD, { recursive: true });

// ── md sheets ──────────────────────────────────────────────────────
for (const lab of labs) {
  const L = [];
  L.push(`# Tone Lab · ${lab.stem} ${lab.name}`);
  L.push('');
  L.push(`> **WORKSHOP — GENERATED from ${lab.$tone_lab}.json; re-run \`node tools/build-tone-lab.mjs\` after edits.** ${lab.workshop_note}`);
  L.push('>');
  L.push(`> Voice: ${lab.voice}`);
  L.push('');
  if (lab.angle) { L.push(`**Angle:** ${lab.angle}`); L.push(''); }
  if (lab.dials) {
    L.push('| Dial | Meaning |');
    L.push('|---|---|');
    for (const [k, v] of Object.entries(lab.dials)) L.push(`| **${k}** | ${v} |`);
    L.push('');
  }
  for (const [key, variants] of Object.entries(lab.variables)) {
    L.push(`## ${VAR_LABEL[key] || key}`);
    L.push('');
    for (const k of KEYS) {
      if (variants[k] == null) continue;
      L.push(`- **${k === 'current' ? 'CURRENT' : k === 'refined' ? 'REFINED (per the 2026-08-05 item-by-item ruling)' : `${k} · ${lab.dials?.[k]?.split(' — ')[0] ?? k}`}** — ${variants[k]}`);
    }
    L.push('');
  }
  fs.writeFileSync(path.join(MD, `${lab.$tone_lab}.md`), L.join('\n'), 'utf8');
}

// ── review.html (silk side-by-side) ────────────────────────────────
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const card = (tag, text, cls) => `<div class="tcard ${cls}"><span class="tag">${tag}</span><p>${esc(text)}</p></div>`;
const H = [];
H.push(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Elementum · Tone Lab</title><style>
  :root{--paper:#F7F1E3;--ink:#2C2825;--inkSoft:#5C554D;--inkLight:#8a8378;--hair:#CDBE9E;--bronze:#8b7355}
  body{margin:0;background:var(--paper);color:var(--ink);font-family:'EB Garamond',Georgia,serif}
  .wrap{max-width:1080px;margin:0 auto;padding:34px 22px 80px}
  h1{font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:30px;margin:0 0 4px}
  .sub{color:var(--inkLight);font-size:13px;letter-spacing:.4px;margin-bottom:8px}
  .banner{border:1px solid var(--hair);background:rgba(248,241,225,.9);padding:10px 14px;font-size:12.5px;color:var(--inkSoft);margin:14px 0 30px}
  h2{font-family:'Cormorant Garamond',Georgia,serif;font-size:24px;font-weight:600;border-bottom:1px solid var(--hair);padding-bottom:6px;margin:44px 0 4px}
  h3{font-family:Cinzel,Georgia,serif;font-size:11px;letter-spacing:2.2px;text-transform:uppercase;color:var(--bronze);margin:26px 0 10px}
  .row{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px}
  .tcard{border:1px solid var(--hair);background:rgba(255,252,244,.75);padding:12px 14px;display:flex;flex-direction:column;gap:8px}
  .tcard.cur{border-color:var(--bronze);background:rgba(139,115,85,.08)}
  .tcard.ref{border-color:#5C6E58;background:rgba(92,110,88,.08)}
  .tcard.ref .tag{color:#5C6E58}
  .tag{font-family:'JetBrains Mono',Consolas,monospace;font-size:9px;letter-spacing:1.6px;color:var(--inkLight)}
  .tcard.cur .tag{color:var(--bronze)}
  .tcard p{margin:0;font-size:15px;line-height:1.55;color:var(--inkSoft)}
  .dials{font-size:12px;color:var(--inkLight);margin:2px 0 0}
</style></head><body><div class="wrap">
<h1>Tone Lab · the fine-tune sheets</h1>
<div class="sub">THE VOICE v1.0 — “the engraving that reads you” · BIZ_03 §8 · testbeds 庚 · 丙 · 癸</div>
<div class="banner">WORKSHOP — generated from tone_lab/*.json. Nothing here ships; ruled winners land in by_axis → OWED → transcription. Dials: <b>A</b> cost+1 · <b>B</b> mechanism+1 · <b>C</b> image+1. Bronze card = current live line.</div>`);
for (const lab of labs) {
  H.push(`<h2>${lab.stem} ${esc(lab.name)}</h2>`);
  if (lab.angle) H.push(`<div class="dials">Angle: ${esc(lab.angle)}</div>`);
  for (const [key, variants] of Object.entries(lab.variables)) {
    H.push(`<h3>${esc(VAR_LABEL[key] || key)}</h3><div class="row">`);
    for (const k of KEYS) {
      if (variants[k] == null) continue;
      H.push(card(k === 'current' ? 'CURRENT' : k === 'refined' ? 'REFINED' : `${k} · ${esc(lab.dials?.[k]?.split(' — ')[0] || k)}`, variants[k], k === 'current' ? 'cur' : k === 'refined' ? 'ref' : ''));
    }
    H.push('</div>');
  }
}
H.push('</div></body></html>');
fs.writeFileSync(path.join(LAB, 'review.html'), H.join('\n'), 'utf8');

console.log(`✓ tone lab: ${labs.length} stems → md/ sheets + review.html in ${LAB}`);
