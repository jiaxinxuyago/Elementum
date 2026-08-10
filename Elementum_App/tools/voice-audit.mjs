// ===================================================================
// ELEMENTUM · voice audit (REA_16 mechanical enforcement)
// ===================================================================
// Greps the station's STEM content fields (inscription, yourNature_desc,
// dm_overview) for every MECHANICALLY checkable rule of REA_16 + the
// humanized-prose skill. The human half of the review (swap test, angle
// fidelity, read-aloud) stays human — this tool catches the rest.
// Prints `VOICE <file> :: <field> :: <rule>` per violation, exit 1 on any.
//   node tools/voice-audit.mjs
// Scope note: the manifesto is carved corpus (its dashes stand until
// re-ruled) and the dm_overview opener formula ("The X is <element>, …")
// is a DESIGNED template — so the cross-stem n-gram check applies only
// to the emotional fields (inscription, yourNature_desc).
// ===================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STEM_DIR = path.resolve(__dirname, '../../Reading/Database/templates/by_axis/json/STEM');

const FIELDS = ['inscription', 'yourNature_desc', 'dm_overview'];
const BANNED_WORDS = [
  'delve', 'tapestry', 'testament', 'pivotal', 'crucial', 'intricate', 'robust',
  'seamless', 'foster', 'fostering', 'underscore', 'underscores', 'showcase',
  'showcasing', 'leverage', 'leveraged', 'boasts', 'vibrant', 'nestled',
  'profound', 'realm', 'unlock', 'elevate', 'resonate', 'resonance',
];
const PARALLELISM = [
  /\bnot (?:just |only )?[\w' ]{1,30}?\bbut\b/i,   // not X but Y
  /\bit'?s not\b[^.]{1,40},\s*it'?s\b/i,           // it's not X, it's Y
  /\bno \w+, no \w+/i,                              // no X, no Y
];
const words = (s) => s.split(/\s+/).filter((w) => /[a-zA-Z']/.test(w));

const files = fs.readdirSync(STEM_DIR).filter((f) => f.endsWith('.json'));
const corpus = files.map((f) => ({ file: f, data: JSON.parse(fs.readFileSync(path.join(STEM_DIR, f), 'utf8')) }));

let bad = 0;
const flag = (file, field, rule) => { console.log(`VOICE  STEM/${file} :: ${field} :: ${rule}`); bad++; };

for (const { file, data } of corpus) {
  for (const field of FIELDS) {
    const text = data.candidates?.[field];
    if (!text) continue;
    if (text.includes('—')) flag(file, field, 'em-dash (reading content targets zero)');
    if (text.includes(';')) flag(file, field, 'semicolon');
    if (/[▸→·•]/.test(text)) flag(file, field, 'glyph structure in prose');
    for (const re of PARALLELISM) if (re.test(text)) flag(file, field, `negative parallelism (${re})`);
    for (const w of BANNED_WORDS) if (new RegExp(`\\b${w}\\b`, 'i').test(text)) flag(file, field, `banned word "${w}"`);
    if (/\broom(s)?\b/i.test(text)) flag(file, field, '"room" (rationed corpus-wide — no stem owns it)');

    if (field === 'inscription') {
      const w = words(text);
      if (w.length > 17) flag(file, field, `over budget: ${w.length}w > 17w`);
      if (text.length > 85) flag(file, field, `over budget: ${text.length}c > 85c`);
      if (!w.slice(0, 3).some((x) => /^you/i.test(x))) flag(file, field, '"you" missing from first 3 words');
    }
    if (field === 'yourNature_desc' && !/^You(\b|')/i.test(text.trim())) flag(file, field, 'must open on "You" (owner law 2026-08-05)');
    if (field === 'dm_overview') {
      if (!/^The /.test(text.trim())) flag(file, field, 'must open with the archetype name ("The …")');
      const n = words(text).length;
      if (n < 55 || n > 85) flag(file, field, `outside budget band: ${n}w (target 60–80)`);
    }
  }
}

// Cross-stem scaffold repeats — 4-grams shared between different stems,
// emotional fields only (see scope note).
const seen = new Map(); // gram -> Set(file)
for (const { file, data } of corpus) {
  for (const field of ['inscription', 'yourNature_desc']) {
    const text = data.candidates?.[field];
    if (!text) continue;
    const w = words(text.toLowerCase().replace(/[^a-z' ]/g, ' '));
    for (let i = 0; i + 4 <= w.length; i++) {
      const gram = w.slice(i, i + 4).join(' ');
      if (!seen.has(gram)) seen.set(gram, new Set());
      seen.get(gram).add(`${file}::${field}`);
    }
  }
}
for (const [gram, where] of seen) {
  const stems = new Set([...where].map((x) => x.split('::')[0]));
  if (stems.size > 1) { console.log(`VOICE  scaffold repeat across stems: "${gram}" in ${[...where].join(' + ')}`); bad++; }
}

if (bad) { console.log(`✗ ${bad} voice violation(s) — REA_16 / humanized-prose (mechanical checks only; the swap test stays human)`); process.exit(1); }
console.log(`✓ voice audit clean: ${corpus.length} STEM files × ${FIELDS.length} fields pass every mechanical REA_16 check`);
