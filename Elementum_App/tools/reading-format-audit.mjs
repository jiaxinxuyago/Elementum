// ===================================================================
// ELEMENTUM · Reading-format audit (input to the reading-schema redesign)
// ===================================================================
// Read-only. For every schema leaf, reports the authored word-count
// distribution across all 10 stems against the field's budget, so the
// redesign sets budgets from evidence instead of fixing copy to fit
// budgets that are about to change.
// Run: node tools/reading-format-audit.mjs   (from Elementum_App/)
// Output: Documents/Reading/REA_09_Reading_Format_Audit.md
import fs from 'node:fs';
import path from 'node:path';
import { ARCHETYPE_SCHEMA } from '../src/content/archetypeSchema.js';
import { walkSchema } from '../src/content/archetypeCoverage.js';
import { STEM_CARD_DATA } from '../src/content/archetypeSource.js';

const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const OUT = path.resolve(import.meta.dirname, '../../Documents/Reading/REA_09_Reading_Format_Audit.md');

const words = (s) => typeof s === 'string' ? s.trim().split(/\s+/).filter(Boolean).length : 0;

// Map leaf path -> budget descriptor straight from the schema.
function collectBudgets(schema, pathParts = [], out = new Map()) {
  for (const [key, node] of Object.entries(schema)) {
    if (key === '_meta') continue;
    const here = [...pathParts, key];
    if (node && typeof node === 'object' && typeof node.type === 'string') {
      out.set(here.join('.'), node);
    } else if (node && typeof node === 'object') {
      if (node._meta?.status === 'deprecated' || node._meta?.status === 'internal') continue;
      collectBudgets(node, here, out);
    }
  }
  return out;
}

const budgets = collectBudgets(ARCHETYPE_SCHEMA);

// Gather actuals per leaf path across stems.
const fields = new Map(); // path -> { perStem: {stem: {w, status, items}}, }
for (const stem of STEMS) {
  const rows = walkSchema(ARCHETYPE_SCHEMA, STEM_CARD_DATA[stem] || {});
  for (const r of rows) {
    if (r.kind !== 'leaf') continue;
    if (!fields.has(r.path)) fields.set(r.path, { perStem: {} });
    const v = r.value;
    const entry = { status: r.status };
    if (typeof v === 'string') entry.w = words(v);
    if (Array.isArray(v)) {
      entry.len = v.length;
      entry.itemW = v.filter(x => typeof x === 'string').map(words);
    }
    fields.get(r.path).perStem[stem] = entry;
  }
}

const fmtBudget = (b) => {
  const bits = [];
  if (b.wordMin != null || b.wordMax != null) bits.push(`${b.wordMin ?? '·'}–${b.wordMax ?? '·'}w`);
  if (b.wordCap != null) bits.push(`≤${b.wordCap}w`);
  if (b.arrayLen != null) bits.push(`len=${b.arrayLen}`);
  if (b.arrayMin != null || b.arrayMax != null) bits.push(`len ${b.arrayMin ?? '·'}–${b.arrayMax ?? '·'}`);
  if (b.itemWordCap != null) bits.push(`item≤${b.itemWordCap}w`);
  if (b.sentenceMin != null) bits.push(`≥${b.sentenceMin} sent`);
  if (b.splitOn) bits.push(`split "${b.splitOn}"`);
  return bits.join(' · ') || '—';
};

const stats = (ns) => {
  if (!ns.length) return null;
  const sorted = [...ns].sort((a, b) => a - b);
  const mid = sorted[Math.floor(sorted.length / 2)];
  return { min: sorted[0], med: mid, max: sorted[sorted.length - 1] };
};

let md = `# Reading-Format Audit — evidence base for the reading-schema redesign

Generated ${new Date().toISOString().slice(0, 10)} by \`Elementum_App/tools/reading-format-audit.mjs\` (read-only).
Source: \`STEM_CARD_DATA\` (all 10 stems) walked against \`ARCHETYPE_SCHEMA\`.

Read **OVER/UNDER** rows as "the authored voice disagrees with the budget" — input for setting
the NEW budgets, not as defects to trim.

| Field | Budget (current schema) | Actual words min/med/max | Stems over | Stems under | Notes |
|---|---|---|---|---|---|
`;

let violationCount = 0;
for (const [p, { perStem }] of [...fields.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  const b = budgets.get(p) || {};
  const entries = Object.entries(perStem);
  const present = entries.filter(([, e]) => e.status !== 'missing' && e.status !== 'optional-missing');
  if (!present.length) continue;

  const isArray = present.some(([, e]) => e.len != null);
  let actualCol = '—', over = [], under = [], notes = [];

  if (isArray) {
    const itemWs = present.flatMap(([, e]) => e.itemW || []);
    const st = stats(itemWs);
    if (st) actualCol = `items: ${st.min}/${st.med}/${st.max}`;
    if (b.itemWordCap != null) {
      over = present.filter(([, e]) => (e.itemW || []).some(w => w > b.itemWordCap)).map(([s]) => s);
    }
    const lens = new Set(present.map(([, e]) => e.len));
    notes.push(`len ${[...lens].join('/')}`);
  } else {
    const ws = present.map(([, e]) => e.w).filter(w => w != null);
    const st = stats(ws);
    if (st) actualCol = `${st.min}/${st.med}/${st.max}`;
    const cap = b.wordMax ?? b.wordCap;
    if (cap != null) over = present.filter(([, e]) => e.w > cap).map(([s]) => s);
    if (b.wordMin != null) under = present.filter(([, e]) => e.w < b.wordMin).map(([s]) => s);
  }

  const violators = present.filter(([, e]) => String(e.status).startsWith('violates'));
  violationCount += violators.length;
  for (const [s, e] of violators) {
    const detail = String(e.status).replace('violates:', '');
    if (!detail.startsWith('words') && !detail.includes('item(s)')) notes.push(`${s}: ${detail}`);
  }

  if (!over.length && !under.length && !violators.length) continue; // only report fields with tension

  md += `| \`${p}\` | ${fmtBudget(b)} | ${actualCol} | ${over.join(' ') || '—'} | ${under.join(' ') || '—'} | ${notes.join('; ') || '—'} |\n`;
}

md += `\nTotal walker violations across 10 stems: **${violationCount}**\n`;

// Also append a full field inventory (budgets only) as redesign reference.
md += `\n## Full field inventory (current budgets)\n\n| Field | Type | Required | Budget |\n|---|---|---|---|\n`;
for (const [p, b] of [...budgets.entries()].sort((a, c) => a[0].localeCompare(c[0]))) {
  md += `| \`${p}\` | ${b.type} | ${b.required ? '✓' : '—'} | ${fmtBudget(b)} |\n`;
}

fs.writeFileSync(OUT, md);
console.log(`Audit written -> ${OUT}`);
console.log(`Walker violations: ${violationCount}`);
