// ===================================================================
// ELEMENTUM · voice audit v2 (REA_16 mechanical enforcement, registry-driven)
// ===================================================================
// Parses the AUDIT REGISTRY (REA_16 §2c) live — the doc is the law — and
// enforces each row's register rules over the surface it names:
//   station:<AXIS>.<field> · station:<AXIS>.* · code:dailyGuidance#…
// Row status governs severity: locked/live rows FAIL the run (`VOICE`),
// pending rows report informationally (`PEND`) so unauthored/undecided
// corpus (the ~80% still in design) is visible but never blocking.
// EXPANSION CONTRACT: an authored station field with NO registry row is
// itself a violation — new variables register in §2c first, and the
// audit follows with zero tool edits.
// The human half (swap test, angle fidelity, read-aloud) stays human.
//   node tools/voice-audit.mjs
// ===================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATION = path.resolve(__dirname, '../../Reading/Database/templates/by_axis/json');
const REA16 = path.resolve(__dirname, '../../Reading/Documents/REA_16_The_Voice.md');

// ── the law (parsed, never copied) ─────────────────────────────────
const md = fs.readFileSync(REA16, 'utf8');
const regSection = md.split('## §2c')[1]?.split(/\n## /)[0];
if (!regSection) { console.error('✗ REA_16 §2c audit registry not found — the law is missing; refusing to run.'); process.exit(2); }
const registry = [];
for (const m of regSection.matchAll(/^\| `([^`]+)` \| (\w+) \| ([^|]*) \| (\w+) \| ([^|]*)\|$/gm)) {
  registry.push({ key: m[1].trim(), register: m[2].trim(), budget: m[3].trim(), status: m[4].trim(), notes: m[5].trim() });
}
if (!registry.length) { console.error('✗ REA_16 §2c parsed to zero rows — registry format drifted; refusing to run.'); process.exit(2); }

const ruleFor = (axis, field) =>
  registry.find((r) => r.key === `station:${axis}.${field}`) ||
  registry.find((r) => r.key === `station:${axis}.*`);

// ── shared vocab/pattern law (mirrors humanized-prose SKILL.md) ────
const BANNED_WORDS = [
  'delve', 'tapestry', 'testament', 'pivotal', 'crucial', 'intricate', 'robust',
  'seamless', 'foster', 'fostering', 'underscore', 'underscores', 'showcase',
  'showcasing', 'leverage', 'leveraged', 'boasts', 'vibrant', 'nestled',
  'profound', 'realm', 'unlock', 'elevate', 'resonate', 'resonance',
  // courtroom/institutional register (owner 2026-08-05 — everyday words only)
  'verdict', 'verdicts', 'legitimate', 'legitimacy', 'institutional',
];
const PARALLELISM = [
  /\bnot (?:just |only )?[\w' ]{1,30}?\bbut\b/i,
  /\bit'?s not\b[^.]{1,40},\s*it'?s\b/i,
  /\bno \w+, no \w+/i,
];
const words = (s) => s.split(/\s+/).filter((w) => /[a-zA-Z']/.test(w));

let fail = 0, pend = 0;
const pendByKey = new Map(); // registry key -> { n, examples }
function flag(rule, where, msg) {
  const blocking = rule.status === 'locked' || rule.status === 'live';
  if (blocking) { console.log(`VOICE  ${where} :: ${msg}`); fail++; return; }
  pend++;
  if (!pendByKey.has(rule.key)) pendByKey.set(rule.key, { n: 0, examples: [] });
  const e = pendByKey.get(rule.key);
  e.n++;
  if (e.examples.length < 2) e.examples.push(`${where} :: ${msg}`);
}

// budget forms: "≤17w ≤85c" · "30-55w" · "≤14w" · "—"
function checkBudget(rule, where, text) {
  const b = rule.budget;
  if (!b || b === '—') return;
  const w = words(text).length;
  const maxW = b.match(/≤(\d+)w/); if (maxW && w > +maxW[1]) flag(rule, where, `over budget: ${w}w > ${maxW[1]}w`);
  const band = b.match(/(\d+)-(\d+)w/); if (band && (w < +band[1] || w > +band[2])) flag(rule, where, `outside band: ${w}w (${band[1]}–${band[2]}w)`);
  const maxC = b.match(/≤(\d+)c/); if (maxC && text.length > +maxC[1]) flag(rule, where, `over budget: ${text.length}c > ${maxC[1]}c`);
}

function checkText(rule, where, text) {
  const notes = rule.notes;
  const prose = rule.register !== 'functional';
  for (const w of BANNED_WORDS) if (new RegExp(`\\b${w}\\b`, 'i').test(text)) flag(rule, where, `banned word "${w}"`);
  if (prose) {
    if (/[▸→•]/.test(text)) flag(rule, where, 'glyph structure in prose');
    if (!notes.includes('punct-exempt')) {
      if (text.includes('—')) flag(rule, where, 'em-dash (reading content targets zero)');
      if (text.includes(';')) flag(rule, where, 'semicolon');
    }
    for (const re of PARALLELISM) if (re.test(text)) flag(rule, where, 'negative parallelism');
    if (/\broom(s)?\b/i.test(text)) flag(rule, where, '"room" (rationed corpus-wide)');
  }
  if (notes.includes('you-open3') && !words(text).slice(0, 3).some((x) => /^you/i.test(x))) flag(rule, where, '"you" missing from first 3 words');
  else if (notes.includes('you-open') && !notes.includes('you-open3') && !/^You(\b|')/i.test(text.trim())) flag(rule, where, 'must open on "You"');
  if (notes.includes('the-open') && !/^The /.test(text.trim())) flag(rule, where, 'must open with the archetype name ("The …")');
  checkBudget(rule, where, text);
}

// ── station sweep (every axis, every authored field) ───────────────
const flatStrings = (v, prefix = '') => {
  if (typeof v === 'string') return [[prefix, v]];
  if (Array.isArray(v)) return v.flatMap((x, i) => flatStrings(x, `${prefix}[${i}]`));
  if (v && typeof v === 'object') return Object.entries(v).flatMap(([k, x]) => flatStrings(x, prefix ? `${prefix}.${k}` : k));
  return [];
};

const gramSeen = new Map(); // `${key}|${gram}` -> Set(file)
for (const axis of fs.readdirSync(STATION)) {
  const dir = path.join(STATION, axis);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.json'))) {
    const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    const { __ore, ...vars } = data.candidates || {};
    for (const [field, value] of Object.entries(vars)) {
      if (value == null) continue;
      const rule = ruleFor(axis, field);
      const where = `${axis}/${f} :: ${field}`;
      if (!rule) { console.log(`VOICE  ${where} :: UNREGISTERED — authored field has no REA_16 §2c row (register it before authoring)`); fail++; continue; }
      for (const [sub, text] of flatStrings(value)) {
        if (!text.trim()) continue;
        checkText(rule, sub ? `${where}.${sub}` : where, text);
        if (rule.notes.includes('swap-gram')) {
          const w = words(text.toLowerCase().replace(/[^a-z' ]/g, ' '));
          for (let i = 0; i + 4 <= w.length; i++) {
            const id = `${axis}.${field}|${w.slice(i, i + 4).join(' ')}`;
            if (!gramSeen.has(id)) gramSeen.set(id, new Set());
            gramSeen.get(id).add(f);
          }
        }
      }
    }
  }
}
for (const [id, files] of gramSeen) {
  if (files.size > 1) {
    const [key, gram] = id.split('|');
    console.log(`VOICE  scaffold repeat across stems (${key}): "${gram}" in ${[...files].join(' + ')}`); fail++;
  }
}

// ── consultant charter canon-sync (the runtime-generation guarantee) ──
// The charter can't be audited after the fact (it GENERATES language live),
// so the guarantee is prompt-side: verify the worker's VOICE_CHARTER still
// carries the canon — the HOW YOU WRITE block, every banned word named in
// its ban list, angle fidelity, and exemplars that neither dash nor
// demonstrate a banned word.
const charterRow = registry.find((r) => r.key === 'code:workers/llm#VOICE_CHARTER');
if (charterRow) {
  const where = 'workers/llm/index.js :: VOICE_CHARTER';
  const src = fs.readFileSync(path.resolve(__dirname, '../workers/llm/index.js'), 'utf8');
  const cm = src.match(/const VOICE_CHARTER = `([\s\S]*?)`;/);
  if (!cm) flag(charterRow, where, 'VOICE_CHARTER block not found');
  else {
    const c = cm[1];
    if (!c.includes('HOW YOU WRITE')) flag(charterRow, where, 'HOW YOU WRITE humanization block missing (canon drift)');
    if (!/REA_16/.test(c)) flag(charterRow, where, 'canon marker "REA_16" missing');
    if (!c.includes('ANGLE FIDELITY')) flag(charterRow, where, 'ANGLE FIDELITY instruction missing');
    if (!/em-dash/i.test(c)) flag(charterRow, where, 'em-dash rule missing');
    const cl = c.toLowerCase();
    const BANNED = ['delve', 'tapestry', 'testament', 'pivotal', 'crucial', 'intricate', 'robust', 'seamless', 'foster', 'underscore', 'showcase', 'leverage', 'boasts', 'vibrant', 'nestled', 'profound', 'realm', 'unlock', 'elevate', 'resonate', 'verdict', 'legitimate', 'institutional'];
    for (const w of BANNED) {
      if (!cl.includes(w)) flag(charterRow, where, `banned word "${w}" not named in the charter's ban list`);
    }
    const exemplars = c.split('EXEMPLARS')[1] || '';
    if (exemplars.includes('—')) flag(charterRow, where, 'em-dash inside an exemplar (the charter teaches the tell it bans)');
    // Naming a word in the ban list is not enough: an exemplar that USES it
    // teaches the register by demonstration, and few-shot form outweighs an
    // instruction line (precedent: "verdict" survived the 08-11 courtroom
    // purge inside the quit-your-job exemplar).
    const usedBanned = BANNED.filter((w) => new RegExp(`\\b${w}`, 'i').test(exemplars));
    if (usedBanned.length) flag(charterRow, where, `banned word(s) "${usedBanned.join('", "')}" USED inside an exemplar (the charter demonstrates the register it bans)`);
  }
}

// ── code-resident content (declared via code: keys) ────────────────
const { RELATIONS } = await import('../src/content/dailyGuidance.js');
for (const row of registry.filter((r) => r.key.startsWith('code:dailyGuidance#RELATIONS.'))) {
  const part = row.key.split('RELATIONS.')[1];
  for (const [rel, def] of Object.entries(RELATIONS)) {
    const v = def[part];
    if (v == null) continue;
    const texts = typeof v === 'function' ? [v('{dm}', '{today}')] : Array.isArray(v) ? v : [v];
    texts.forEach((t, i) => checkText(row, `dailyGuidance:${rel}.${part}${texts.length > 1 ? `[${i}]` : ''}`, t));
  }
}

// Full live-module coverage (owner 2026-08-05: "every word in the app").
// Each module is a pending-tier registry row until its content is ruled;
// flatStrings walks every string it exports (functions skipped).
const CODE_SOURCES = {
  'code:archetypeSource#STEM_CARD_DATA': async () => (await import('../src/content/archetypeSource.js')).STEM_CARD_DATA,
  'code:archetypeSource#TG_CARD_DATA': async () => (await import('../src/content/archetypeSource.js')).TG_CARD_DATA,
  'code:stemVariants#STEM_VARIANTS': async () => (await import('../src/content/stemVariants.js')).STEM_VARIANTS,
  'code:readingContent#DM_READING': async () => (await import('../src/content/reading/readingContent.js')).DM_READING,
  'code:reading#FACE_CARD': async () => (await import('../src/content/reading/index.js')).FACE_CARD,
  'code:reading#ENERGY_TILE': async () => (await import('../src/content/reading/index.js')).ENERGY_TILE,
  'code:readingResolve#PERSONA_COPY': async () => (await import('../src/components/reading/readingResolve.js')).PERSONA_COPY,
};
for (const row of registry) {
  const load = CODE_SOURCES[row.key];
  if (!load) continue;
  const obj = await load().catch(() => null);
  if (!obj) { flag(row, row.key, 'module import failed'); continue; }
  for (const [sub, text] of flatStrings(obj)) {
    if (typeof text === 'string' && text.trim()) checkText(row, `${row.key.split('#')[1]}.${sub}`, text);
  }
}

if (pend) {
  console.log('— pending-tier inventory (unruled corpus, non-blocking; the remediation map) —');
  for (const [k, e] of [...pendByKey].sort((a, b) => b[1].n - a[1].n)) {
    console.log(`PEND   ${k} :: ${e.n} finding(s)   e.g. ${e.examples[0]}`);
  }
}
if (fail) { console.log(`✗ ${fail} blocking voice violation(s)${pend ? ` (+${pend} pending findings across ${pendByKey.size} unruled surfaces)` : ''} — REA_16 §2c`); process.exit(1); }
console.log(`✓ voice audit clean: ${registry.length} registry rows enforced${pend ? ` · ${pend} pending findings across ${pendByKey.size} unruled surfaces (non-blocking inventory above)` : ''}`);
