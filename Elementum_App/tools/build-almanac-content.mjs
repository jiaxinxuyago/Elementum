// ===================================================================
// ELEMENTUM · build-almanac-content — Your Almanac's units → content/almanac.js
// ===================================================================
// Reads the gated template (and, once written, the batch outputs) from the
// handoff folder and writes src/content/almanac.js. Every unit must pass
// the folder's gate.mjs first. The dev build only shows this surface
// (ALMANAC_V1 = IS_DEV_TOOLS) until the owner rules it live.
//   node tools/build-almanac-content.mjs
// ===================================================================
import fs from 'fs';
import { execFileSync } from 'child_process';

const DIR = new URL('../../ComparativeAnalysis/Prompts/out/handoff/2026-10-21-almanac-template/', import.meta.url);
const files = fs.readdirSync(DIR).filter((f) => f === 'template.json' || /^out-\d+\.json$/.test(f)).sort();
const units = {};
for (const f of files) {
  execFileSync(process.execPath, [new URL('gate.mjs', DIR).pathname, new URL(f, DIR).pathname], { stdio: 'inherit' });
  for (const u of JSON.parse(fs.readFileSync(new URL(f, DIR), 'utf8')).units) units[u.key] = u.text;
}
const head = fs.readFileSync(new URL('../src/content/almanac.js', import.meta.url), 'utf8').split('export const ALMANAC_UNITS')[0];
const body = Object.keys(units).sort().map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(units[k])},`).join('\n');
fs.writeFileSync(new URL('../src/content/almanac.js', import.meta.url), `${head}export const ALMANAC_UNITS = {\n${body}\n};\n`);
console.log(`wrote ${Object.keys(units).length} units from ${files.join(', ')}`);
