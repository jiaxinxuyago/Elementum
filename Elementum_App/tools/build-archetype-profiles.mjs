// ===================================================================
// ELEMENTUM · archetype profile generator (the per-stem compiled view)
// ===================================================================
// Pivots the variable-major station (Reading/Database/templates/json/)
// into ARCHETYPE-MAJOR profiles: one file per stem resolving every data
// variable that archetype involves — K1 identity values, its band
// variants, its DM-relative K2 key pool (10 element_god keys), and the
// template patterns. Output:
//   Reading/Database/profiles/json/<pinyin>_<Name>.json
//   Reading/Database/profiles/md/<pinyin>_<Name>.md   (review view)
// GENERATED — never hand-edit; the variable JSONs are the source of
// truth. Re-run after any template change:
//   node tools/build-archetype-profiles.mjs
// Spec: REA_05 §1/§5 (compiled per-stem profiles).
// ===================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const JSON_DIR = path.resolve(__dirname, '../../Reading/Database/templates/json');
const OUT = path.resolve(__dirname, '../../Reading/Database/profiles');

const STEMS = [
  { hz: '甲', pinyin: 'jia', el: 'wood' }, { hz: '乙', pinyin: 'yi', el: 'wood' },
  { hz: '丙', pinyin: 'bing', el: 'fire' }, { hz: '丁', pinyin: 'ding', el: 'fire' },
  { hz: '戊', pinyin: 'wu', el: 'earth' }, { hz: '己', pinyin: 'ji', el: 'earth' },
  { hz: '庚', pinyin: 'geng', el: 'metal' }, { hz: '辛', pinyin: 'xin', el: 'metal' },
  { hz: '壬', pinyin: 'ren', el: 'water' }, { hz: '癸', pinyin: 'gui', el: 'water' },
];
const EL_HZ = { metal: '金', earth: '土', wood: '木', water: '水', fire: '火' };
const GEN = { wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood' };
const CTL = { wood: 'earth', fire: 'metal', earth: 'water', metal: 'wood', water: 'fire' };
const FAMILY_GODS = { self: ['比肩', '劫财'], resource: ['偏印', '正印'], output: ['食神', '伤官'], wealth: ['偏财', '正财'], officer: ['七杀', '正官'] };
const inv = (m) => Object.fromEntries(Object.entries(m).map(([a, b]) => [b, a]));
const GEN_INV = inv(GEN); const CTL_INV = inv(CTL);

// For a DM element, each element's ten-god family → its two K2 keys.
function k2PoolFor(dmEl) {
  const famOf = (el) =>
    el === dmEl ? 'self'
      : GEN[el] === dmEl ? 'resource'
      : GEN[dmEl] === el ? 'output'
      : CTL[dmEl] === el ? 'wealth'
      : 'officer';
  return Object.keys(EL_HZ).map((el) => ({
    element: el, family: famOf(el),
    keys: FAMILY_GODS[famOf(el)].map((g) => `${EL_HZ[el]}_${g}`),
  }));
}

// load the whole station
const templates = {};
for (const f of fs.readdirSync(JSON_DIR).filter((x) => x.endsWith('.json'))) {
  const t = JSON.parse(fs.readFileSync(path.join(JSON_DIR, f), 'utf8'));
  templates[t.$template] = t;
}

const pick = (name, key) => templates[name]?.values?.[key] ?? null;
const meta = (name) => templates[name] ? { axis: templates[name].axis, status: templates[name].status, budget: templates[name].budget } : {};

fs.mkdirSync(path.join(OUT, 'json'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'md'), { recursive: true });

const esc = (s) => String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ');
const cell = (v) => (v === null || v === undefined || v === '') ? '*(unauthored)*' : Array.isArray(v) ? esc(v.join(' · ')) : typeof v === 'object' ? '`' + esc(JSON.stringify(v)) + '`' : esc(v);

for (const s of STEMS) {
  const name = (pick('archetype_name', s.hz) || 'Unknown').replace(/\s+/g, '_');
  const pool = k2PoolFor(s.el);
  const gods = pool.flatMap((p) => p.keys.map((k) => k.split('_')[1]));

  const profile = {
    $profile: `${s.pinyin}_${name}`,
    stem: s.hz, element: s.el, generated_from: 'Reading/Database/templates/json (source of truth — do not hand-edit profiles)',
    identity: {
      archetype_name: pick('archetype_name', s.hz),
      manifesto: pick('manifesto', s.hz),
      inscription: pick('inscription', s.hz),
      pinyin_display: pick('pinyin_display', s.hz),
      dm_claims: pick('dm_claims', s.hz),
      dm_mechanism: pick('dm_mechanism', s.hz),
    },
    self_card: Object.fromEntries(['concentrated', 'balanced', 'open'].map((b) => [b, pick('self_card', `${s.hz}_${b}`)])),
    backlog_ore: { yourNature_desc: pick('yourNature_desc', s.hz) },
    k2_pool: pool.map((p) => ({
      element: p.element, family: p.family,
      faces: p.keys.map((k) => ({
        key: k, god: k.split('_')[1],
        face_kw: pick('face_kw', k.split('_')[1]),
        face_teaser: pick('face_teaser', k.split('_')[1]),
        k2_energy_card: pick('k2_energy_card', k),
      })),
    })),
    interim_element_copy: Object.fromEntries(Object.keys(EL_HZ).map((el) => [el, {
      energy_tile_hook: pick('energy_tile_hook', el),
      energy_tile_tag: pick('energy_tile_tag', el),
      mean_line: pick('mean_line', el),
    }])),
    template_patterns: Object.fromEntries(Object.keys(templates).filter((k) => k.startsWith('tpl_')).map((k) => [k, { pattern: templates[k].pattern ?? null, status: templates[k].status }])),
  };
  fs.writeFileSync(path.join(OUT, 'json', `${s.pinyin}_${name}.json`), JSON.stringify(profile, null, 2) + '\n', 'utf8');

  // ── the review MD ──
  const L = [];
  L.push(`# ${s.hz} ${profile.identity.archetype_name || ''} — archetype profile (compiled view)`);
  L.push('');
  L.push('> **GENERATED from the variable station — do not hand-edit.** One file per archetype, every involved data variable resolved. Source of truth: `Reading/Database/templates/json/`; regenerate: `node tools/build-archetype-profiles.mjs`.');
  L.push('');
  L.push('## Identity (K1 · STEM axis)');
  L.push('');
  L.push('| Variable | Value |');
  L.push('|---|---|');
  for (const [k, v] of Object.entries(profile.identity)) L.push(`| \`${k}\` | ${cell(v)} |`);
  L.push('');
  L.push('## Self-card (K1b · STEM·BAND — PLANNED)');
  L.push('');
  L.push('| Band | face · presence |');
  L.push('|---|---|');
  for (const [b, v] of Object.entries(profile.self_card)) L.push(`| ${b} | ${cell(v)} |`);
  L.push('');
  L.push(`## The K2 pool (ELEMENT·GOD — the 10 keys every ${profile.identity.archetype_name} reading draws from; shared with the other ${s.el}-DM stem)`);
  L.push('');
  for (const p of profile.k2_pool) {
    L.push(`### ${EL_HZ[p.element]} ${p.element} — ${p.family}`);
    L.push('');
    L.push('| Key | face_kw | face_teaser | k2_energy_card |');
    L.push('|---|---|---|---|');
    for (const f of p.faces) {
      const k2state = f.k2_energy_card && Object.values(f.k2_energy_card).some((x) => x !== null && typeof x !== 'object') ? 'partial' : f.k2_energy_card ? '*(unauthored)*' : '*(unauthored)*';
      L.push(`| \`${f.key}\` | ${cell(f.face_kw)} | ${cell(f.face_teaser).slice(0, 120)}${String(f.face_teaser || '').length > 120 ? '…' : ''} | ${k2state} |`);
    }
    L.push('');
  }
  L.push('## Interim element copy (pre-K2)');
  L.push('');
  L.push('| Element | hook | tag | mean |');
  L.push('|---|---|---|---|');
  for (const [el, v] of Object.entries(profile.interim_element_copy)) L.push(`| ${el} | ${cell(v.energy_tile_hook)} | ${cell(v.energy_tile_tag)} | ${cell(v.mean_line)} |`);
  L.push('');
  L.push('## Backlog ore (not surfacing — mining material)');
  L.push('');
  L.push(`- \`yourNature_desc\`: ${cell(profile.backlog_ore.yourNature_desc)}`);
  L.push('');
  L.push('## Template patterns (T — shared by all archetypes; slots fill per chart)');
  L.push('');
  L.push('| Pattern | Status | Text |');
  L.push('|---|---|---|');
  for (const [k, v] of Object.entries(profile.template_patterns)) L.push(`| \`${k}\` | ${v.status} | ${cell(v.pattern)} |`);
  L.push('');
  fs.writeFileSync(path.join(OUT, 'md', `${s.pinyin}_${name}.md`), L.join('\n'), 'utf8');
  console.log(`wrote ${s.pinyin}_${name} (json + md)`);
}
console.log(`✓ ${STEMS.length} archetype profiles in ${OUT}`);
