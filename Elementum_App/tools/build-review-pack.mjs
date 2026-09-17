// ===================================================================
// ELEMENTUM · build-review-pack.mjs — the cross-LLM review pack
// ===================================================================
// Consolidates the reading templates (Day Master, five-energy pair cells,
// ten-god cells) with every variable into Markdown files an external
// evaluator (ChatGPT, Gemini, Claude, a human reviewer) can read, plus the
// context file that explains how a reading is assembled. Station JSON is
// the only input; run after any station change:
//   node tools/build-review-pack.mjs
// Output: Reading/Database/templates/review-pack/*.md
// The evaluation prompt (EVALUATION_PROMPT.md) is hand-authored and kept
// beside the generated files; this tool never overwrites it.
// ===================================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const ST = path.join(ROOT, 'Reading', 'Database', 'templates', 'by_axis', 'json');
const OUT = path.join(ROOT, 'Reading', 'Database', 'templates', 'review-pack');
const J = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const cell = (axis, key) => J(path.join(ST, axis, `${key}.json`)).candidates;
const list = (axis) => fs.readdirSync(path.join(ST, axis)).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5));

const STEMS = [
  ['jia', '甲', 'Yang Wood'], ['yi', '乙', 'Yin Wood'], ['bing', '丙', 'Yang Fire'], ['ding', '丁', 'Yin Fire'],
  ['wu', '戊', 'Yang Earth'], ['ji', '己', 'Yin Earth'], ['geng', '庚', 'Yang Metal'], ['xin', '辛', 'Yin Metal'],
  ['ren', '壬', 'Yang Water'], ['gui', '癸', 'Yin Water'],
];
const HZ = { Wood: '木', Fire: '火', Earth: '土', Metal: '金', Water: '水' };
const EN = { 木: 'Wood', 火: 'Fire', 土: 'Earth', 金: 'Metal', 水: 'Water' };
const FN = { body: 'Body', mind: 'Mind', expression: 'Expression', action: 'Action', order: 'Order' };
const FAMILY_OF_FN = { body: '比劫 (self / peers)', mind: '印 (resource)', expression: '食伤 (output)', action: '财 (wealth)', order: '官杀 (officer)' };
const GOD_KEYS = { bijian: '比肩', jiecai: '劫财', shishen: '食神', shangguan: '伤官', piancai: '偏财', zhengcai: '正财', qisha: '七杀', zhengguan: '正官', pianyin: '偏印', zhengyin: '正印' };

const esc = (s) => String(s ?? '').replace(/\r/g, '');
const today = new Date().toISOString().slice(0, 10);
const head = (title, blurb) => `# ${title}\n\n_Elementum reading templates · review pack · generated ${today} from the station (Reading/Database/templates/by_axis/json). Read 00_READ_FIRST first._\n\n${blurb}\n\n`;

// ── 01 · Day Master templates ×10 ─────────────────────────────────────
function dayMaster() {
  let md = head('01 · Day Master templates (the ten stems)', 'One section per day master. Everything the app can show on the Day Master page for that stem is here: the carved lines (manifesto, inscription, keywords), the two portrait paragraphs (The Sign, Your nature) with the three strength variants of Your nature, and the fourteen gifts and shadows with the door each is exercised through, its face, and the five-energy field it was cut from.');
  for (const [key, zh, pol] of STEMS) {
    const c = cell('STEM', key);
    md += `\n---\n\n## ${zh} · ${c.archetype_name} · ${pol}\n\n`;
    md += `- **Manifesto (carved couplet):** ${esc(c.manifesto)}\n- **Inscription:** ${esc(c.inscription)}\n- **Stem keywords (identity chips):** ${(c.stem_keywords || []).join(' · ')}\n`;
    if (c.door_note) md += `- **Doors for this stem:** ${Object.entries(c.door_note).map(([f, el]) => `${FN[f]} = ${el}`).join(' · ')}\n`;
    md += `\n### The Sign (dm_overview, the myth decoder: the sign is the subject, never the reader)\n\n${esc(c.dm_overview)}\n\n`;
    md += `### Your nature (yourNature_desc, baseline; always opens on "You")\n\n${esc(c.yourNature_desc)}\n\n`;
    for (const band of ['concentrated', 'balanced', 'open']) {
      try {
        const b = cell('STEM_BAND', `${key}_${band}`);
        const lab = { concentrated: 'Overfueled (strong core)', balanced: 'Balanced (moderate core)', open: 'Underfueled (weak core)' }[band];
        if (b.yourNature_desc) md += `**Your nature · ${lab} variant:** ${esc(b.yourNature_desc)}\n\n`;
        if (b.self_card) md += `**Self card · ${lab}:** ${typeof b.self_card === 'string' ? esc(b.self_card) : `${esc(b.self_card.face)}. ${esc(b.self_card.presence)}`}\n\n`;
      } catch { /* no variant */ }
    }
    if (c.dm_mechanism) md += `### Day-master mechanism line (dm_mechanism)\n\n${typeof c.dm_mechanism === 'string' ? esc(c.dm_mechanism) : esc(JSON.stringify(c.dm_mechanism))}\n\n`;
    if (c.dm_claims) md += `### Day-master claims (dm_claims)\n\n${(Array.isArray(c.dm_claims) ? c.dm_claims : [c.dm_claims]).map((x) => `- ${esc(typeof x === 'string' ? x : JSON.stringify(x))}`).join('\n')}\n\n`;
    for (const pool of ['gifts', 'shadows']) {
      md += `### ${pool === 'gifts' ? 'Gifts (the function running right)' : 'Shadows (the function overgrown)'}\n\n| Phrase | Face | Door → energy | Angle | Description | Cut from |\n|---|---|---|---|---|---|\n`;
      for (const it of c[pool]) {
        const el = c.door_note?.[it.door] || '';
        md += `| **${esc(it.phrase)}** | ${it.face || ''} | ${FN[it.door]} → ${el} (${FAMILY_OF_FN[it.door]}) | ${esc(it.dim)} | ${esc(it.desc)} | \`${esc(it.echo_of || '')}\` |\n`;
      }
      md += '\n';
    }
  }
  return md;
}

// ── 02 · Five-energy pair cells ×25 ───────────────────────────────────
function pairs() {
  let md = head('02 · Five-energy templates (the 25 core × energy pair cells)', 'One section per core element, five cells each: how that energy meets the core. Each cell carries the classical epigraph, the opening story, the two turns (the energy running thin / running heavy), the yin sibling\'s versions where the shared line names the yang archetype, the function definitions and advice, the dot-card verdict, and the carry-card micro-lines by state (wanted or unwanted × absent, thin, present, abundant, dominant).');
  const cores = ['木', '火', '土', '金', '水'];
  for (const core of cores) {
    const yang = STEMS.find((s) => s[2] === `Yang ${EN[core]}`); const yin = STEMS.find((s) => s[2] === `Yin ${EN[core]}`);
    md += `\n---\n\n## ${EN[core]} core (${core}) · ${cell('STEM', yang[0]).archetype_name} (yang) and ${cell('STEM', yin[0]).archetype_name} (yin)\n\n`;
    for (const en of cores) {
      const key = `${core}_${en}`; const c = cell('ELEMENT_PAIR', key);
      const fn = c.function?.primary;
      md += `### ${key} · ${EN[en]} as the ${FN[fn] || fn} door (${FAMILY_OF_FN[fn] || ''})\n\n`;
      md += `- **Classical epigraph:** ${esc(c.mechanism.classic)}\n`;
      md += `- **Opening story (mechanism.base, shared):** ${esc(c.mechanism.base)}\n`;
      if (c.mechanism_yin?.base) md += `- **Opening story, yin sibling:** ${esc(c.mechanism_yin.base)}\n`;
      md += `- **Turn when this energy runs thin (catalyst_turn):** ${esc(c.mechanism.catalyst_turn)}\n`;
      if (c.mechanism_yin?.catalyst_turn) md += `- **Same turn, yin sibling:** ${esc(c.mechanism_yin.catalyst_turn)}\n`;
      md += `- **Turn when this energy runs heavy (friction_turn):** ${esc(c.mechanism.friction_turn)}\n`;
      if (c.mechanism_yin?.friction_turn) md += `- **Same turn, yin sibling:** ${esc(c.mechanism_yin.friction_turn)}\n`;
      md += `- **Function definition, as a catalyst (wanted):** ${esc(c.function.definition_catalyst)}\n`;
      md += `- **Function definition, as a friction (unwanted):** ${esc(c.function.definition_friction)}\n`;
      md += `- **Advice, catalyst:** ${esc(c.function.advise_catalyst)}\n`;
      md += `- **Advice, friction:** ${esc(c.function.advise_friction)}\n`;
      md += `- **Dot-card verdict (cta_verdict):** ${esc(c.cta_verdict)}\n`;
      md += `- **Carry-card lines by state:**\n`;
      const lab = { catalyst: 'wanted, present (the thin turn)', friction: 'unwanted, present (the heavy turn)', wide: 'wanted and abundant (the widest door)', missing: 'wanted but absent (borrow it)', spared: 'unwanted and absent (absent, and better so)', thin: 'unwanted and thin (kept small)', excess: 'dominant (too much; the valence flips)', unrooted: 'the core at 0% (no roots)' };
      for (const [k, v] of Object.entries(c.carry || {})) {
        md += `  - *${lab[k] || k}:* ${esc(v.clause)}${v.remedy ? ` → ${esc(v.remedy)}` : ''}\n`;
        if (c.carry_yin?.[k]) md += `    - yin sibling: ${esc(c.carry_yin[k].clause || v.clause)}${c.carry_yin[k].remedy || v.remedy ? ` → ${esc(c.carry_yin[k].remedy || v.remedy)}` : ''}\n`;
      }
      md += '\n';
    }
  }
  return md;
}

// ── 03 · Ten gods and the element × god cells ×50 ─────────────────────
function gods() {
  let md = head('03 · Ten-god templates (the ten personas and the 50 element × god cells)', 'Part A is the ten gods as the app names them (personas, one per god). Part B is the 50 cells where a god meets an element: the overview and functional line, the adjective chips, the three ruling-domain readings, and the keyword ledger (three keywords per pole, each with three "doors" the app rotates through). The app shows the reader only the cells for the gods actually present in their chart.');
  md += `## Part A · The ten gods as personas\n\n| God | Persona | Definition line | Keyword | Catalyst pole | Friction pole | Catalyst adjectives | Friction adjectives | Domains | Face teaser |\n|---|---|---|---|---|---|---|---|---|---|\n`;
  for (const [key, zh] of Object.entries(GOD_KEYS)) {
    let g; try { g = cell('GOD', key); } catch { continue; }
    const arr = (v) => Array.isArray(v) ? v.join(' · ') : String(v ?? '');
    md += `| ${zh} | ${esc(g.persona_name)} | ${esc(g.definition_line)} | ${esc(g.keyword)} | ${esc(g.pole_catalyst)} | ${esc(g.pole_friction)} | ${arr(g.adj_catalyst)} | ${arr(g.adj_friction)} | ${arr(g.domains)} | ${esc(g.face_teaser)} |\n`;
  }
  md += `\n## Part B · The 50 element × god cells\n`;
  const order = ['木', '火', '土', '金', '水'];
  const keys = list('ELEMENT_GOD').sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]) || a.localeCompare(b));
  for (const key of keys) {
    const c = cell('ELEMENT_GOD', key); const [el, god] = key.split('_');
    md += `\n---\n\n### ${key} · ${EN[el]} × ${god}\n\n`;
    md += `- **Structural interaction:** ${esc(c.structural_interaction)}\n- **Overview (k2_overview):** ${esc(c.k2_overview)}\n- **Functional line (k2_functional):** ${esc(c.k2_functional)}\n`;
    if (c.adj_chips) md += `- **Adjective chips:** catalyst ${(c.adj_chips.catalyst || []).join(' · ')} | friction ${(c.adj_chips.friction || []).join(' · ')}\n`;
    if (c.k2_domain_readings) for (const [d, t] of Object.entries(c.k2_domain_readings)) md += `- **Ruling domain · ${d}:** ${esc(t)}\n`;
    if (c.fn_reading) for (const pole of ['catalyst', 'friction']) {
      const led = c.fn_reading[pole]?.ledger || [];
      if (!led.length) continue;
      md += `- **Keyword ledger, ${pole}:**\n`;
      for (const k of led) {
        md += `  - **${esc(k.word)}**\n`;
        for (const [door, text] of Object.entries(k.doors || {})) md += `    - ${door}: ${esc(text)}\n`;
      }
    }
  }
  return md;
}

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, '01_day_master_templates.md'), dayMaster());
fs.writeFileSync(path.join(OUT, '02_five_energy_pair_templates.md'), pairs());
fs.writeFileSync(path.join(OUT, '03_ten_god_element_templates.md'), gods());
for (const f of fs.readdirSync(OUT)) console.log(`${f}\t${(fs.statSync(path.join(OUT, f)).size / 1024).toFixed(0)} KB`);
