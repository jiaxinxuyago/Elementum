// ===================================================================
// ELEMENTUM · DevBar variable registry (development only)
// ===================================================================
// The Schema tab's data: the REA_03 reading data variables (A + T classes,
// plus the derived engine selection), grouped by journey surface and
// resolved LIVE against the active chart's journey model. Mirrors
// Reading/Documents/REA_03_Reading_Generation_Schema.md §3–§6 — when that
// registry changes, update this mirror.
// ===================================================================

import { STEM_CARD_DATA, TG_PERSONA, resolveArchetype, selfCardFor } from '../../content/index.js';
import { FACE_CARD } from '../../content/reading/index.js';

const join = (xs) => xs.filter(Boolean).join(' · ');

// Archetype file ids — mirror the station folder names (json/<AXIS>/<id>.json).
const STEM_ID = { 甲: 'jia', 乙: 'yi', 丙: 'bing', 丁: 'ding', 戊: 'wu', 己: 'ji', 庚: 'geng', 辛: 'xin', 壬: 'ren', 癸: 'gui' };
const GOD_ID = { 比肩: 'bijian', 劫财: 'jiecai', 食神: 'shishen', 伤官: 'shangguan', 偏财: 'piancai', 正财: 'zhengcai', 七杀: 'qisha', 正官: 'zhengguan', 偏印: 'pianyin', 正印: 'zhengyin' };
const EL_HZ = { Metal: '金', Wood: '木', Water: '水', Fire: '火', Earth: '土' };

// model = buildJourneyModel output for the active chart (null-safe).
// activeEl = the element in focus (journey element sub-screen / app-energy
// page) — element-scoped rows resolve for it instead of the core.
// chart = the active chart (null-safe: pre-onboarding there is none). Card
// rows resolve through resolveArchetype exactly as the app's P4 does, so the
// band variant (yourNature) and the band-selected ×3 (gifts/shadows) print
// what is on screen; without a chart the raw stem baseline is the fallback.
export function buildVariableGroups(model, activeEl, chart) {
  const m = model;
  const stem = m?.stem;
  const baseline = stem ? STEM_CARD_DATA[stem] : null;
  const card = baseline && chart ? resolveArchetype(stem, baseline, chart) : baseline;
  const towers = m ? [...m.els].sort((a, b) => b.presence - a.presence) : [];
  const perEl = (f) => join(towers.map((r) => `${r.name}:${f(r) ?? '—'}`));

  // arch = which archetype of the row's axis this chart resolved (its station file).
  const stemArch = stem ? `${stem} ${STEM_ID[stem] ?? ''}`.trim() : null;
  const condArch = m?.condition ? m.condition.toLowerCase() : null;
  const condRemedyArch = m ? join([condArch, m.approach?.toLowerCase()]) : null;
  const bandArch = stem && m?.band ? `${STEM_ID[stem]}_${m.band}` : null;
  const selfCard = selfCardFor(stem, m?.band);
  const godsArch = m ? join(towers.map((r) => r.god)) : null;
  const coreGodArch = m?.core?.god ? `${m.core.god} ${GOD_ID[m.core.god] ?? ''}`.trim() : null;
  const elGodArch = m ? join(towers.map((r) => `${EL_HZ[r.name] ?? r.name}_${r.god}`)) : null;

  // Focused element (element sub-screen / app-energy): face rows resolve for
  // the element on screen; without focus they fall back to the core.
  const focus = (activeEl && m?.byEl?.[activeEl]) || null;
  const focusGod = focus?.god ?? m?.core?.god ?? null;
  const focusGodArch = focusGod ? `${focusGod} ${GOD_ID[focusGod] ?? ''}`.trim() : null;
  const focusElGodArch = focus ? `${EL_HZ[focus.name] ?? focus.name}_${focus.god}` : elGodArch;

  return [
    {
      surface: 'Identity · Reveal plate + Share card',
      vars: [
        { name: 'archetype_name', axis: 'STEM×10', arch: stemArch, status: 'LIVE', value: m?.archetype },
        { name: 'manifesto', axis: 'STEM×10', arch: stemArch, status: 'LIVE', value: m?.manifesto },
        { name: 'stem_keywords', axis: 'STEM×10', arch: stemArch, status: 'LIVE', value: m?.stemKeywords?.join(' · ') },
        { name: 'tpl_cast_line', axis: 'T · derived slots', arch: 'tpl_cast_line', status: 'LIVE', value: m?.cast },
      ],
    },
    {
      surface: 'Catalogue · Folio + Panels + Pills',
      vars: [
        { name: 'condition / approach', axis: 'DERIVED→V', arch: condRemedyArch, status: 'LIVE', value: m ? `${m.condition}${m.approach ? ` → ${m.approach}` : ''}` : null },
        { name: 'fold_verdict (V)', axis: 'CONDITION×3', arch: condArch, status: 'LIVE', value: m?.foldVerdict },
        { name: 'lead_god_per_element', axis: 'DERIVED', status: 'LIVE', value: perEl((r) => r.god) },
        { name: 'keyword (V, per lead god)', axis: 'GOD×10', arch: godsArch, status: 'LIVE', value: perEl((r) => r.keyword) },
        { name: 'relation_noun (V)', axis: 'FAMILY×5', arch: 'all ×5', status: 'LIVE', value: perEl((r) => r.relation) },
        { name: 'roles (+excess/major/missing)', axis: 'DERIVED', status: 'LIVE', value: perEl((r) => `${r.isCore ? 'core' : r.role}${r.coreExcess ? '+excess' : ''}${r.major ? '+major' : ''}${r.missing ? '+missing' : ''}`) },
        { name: 'tpl_dx_line', axis: 'T · role-driven', arch: 'tpl_dx_line', status: 'LIVE', value: m?.core ? `Your ${m.core.name} is ${m.core.dx?.condition ?? m.condition} — ${m.core.dx?.remedy ?? m.approach ?? 'keep the mix'}${m.core.dx?.remedy ? ' it.' : ''}` : null },
        { name: 'tpl_verdict_line', axis: 'T · pole+verb', arch: 'tpl_verdict_line', status: 'LIVE', value: m?.core?.verdict ? `${m.core.verdict.connector} ${m.core.verdict.pole} · ${m.core.verdict.verb}` : null },
        { name: 'adj chips (V, role-pole)', axis: 'GOD×10 ×2', arch: coreGodArch, status: 'LIVE', value: m?.core?.adj?.join(' · ') },
        { name: 'glossary_body (V)', axis: 'CONST+COND', arch: condRemedyArch, status: 'LIVE', value: 'composed at runtime (defline + remedy — R3 resolved)' },
      ],
    },
    {
      surface: 'Day-Master screen',
      vars: [
        { name: 'pinyin_display (dm-hero + share card)', axis: 'STEM×10', arch: stemArch, status: 'LIVE', value: m?.pinyin },
        { name: 'inscription (locked corpus — home RULED 2026-08-13: dm_claims claim 1; surfaces when dm_claims ships)', axis: 'STEM×10', arch: stemArch, status: 'LOCKED · awaiting dm_claims', value: m?.inscription },
        { name: 'gifts + shadows (band-tagged pools ×5 → chart ×3; owner-locked 2026-08-13)', axis: 'STEM×10 · band-selected', arch: stemArch, status: 'LIVE', value: card?.gifts?.map((g) => g.phrase).join(' · ') },
        { name: 'dm_overview (P4 opening section)', axis: 'STEM×10', arch: stemArch, status: 'LIVE', value: card?.identity?.overview },
        { name: 'yourNature_desc (P4 "Your nature" — band variant ×30, BAND-A 2026-08-13; baseline = fallback)', axis: 'STEM·BAND×30', arch: bandArch, status: 'LIVE', value: card?.yourNature?.desc },
        { name: 'dm_claims', axis: 'STEM×10', arch: stemArch, status: 'PLANNED', value: null },
        { name: 'dm_mechanism', axis: 'STEM×10', arch: stemArch, status: 'PLANNED', value: null },
        { name: 'tpl_dm_prescription', axis: 'T · interim', arch: 'tpl_dm_prescription', status: 'INTERIM', value: 'element-generic pending K2' },
      ],
    },
    {
      surface: 'Element screens (interim → K2)',
      vars: [
        { name: 'self_card (face+presence — CORE element only, band mirror; BAND-C 2026-08-14)', axis: 'STEM·BAND×30', arch: bandArch, status: 'LIVE', value: join([selfCard?.face, selfCard?.presence]) || null },
        { name: 'persona_name (V)', axis: 'GOD×10', arch: focus ? focusGodArch : godsArch, status: 'LIVE', value: focus ? TG_PERSONA[focus.god] : perEl((r) => TG_PERSONA[r.god]) },
        { name: 'face_kw', axis: 'GOD×10', arch: focusGodArch, status: 'LIVE', value: focusGod ? (FACE_CARD[focusGod]?.kw || []).join(' · ') : null },
        { name: 'face_teaser', axis: 'GOD×10', arch: focusGodArch, status: 'LIVE ⚠R5 scope', value: focusGod ? FACE_CARD[focusGod]?.teaser : null },
        { name: 'energy_tile_hook / tag', axis: '→ EL·GOD×50', arch: focusElGodArch, status: 'INTERIM 庚-gated', value: focus ? (focus.hook || '(fallback)') : perEl((r) => r.hook || '(fallback)') },
        { name: 'mean_line', axis: 'ELEMENT×5 interim', arch: 'all ×5', status: 'INTERIM', value: 'element-generic pending 50-cell pass' },
      ],
    },
    {
      surface: 'Deep pages (PLANNED — the K2 corpus)',
      vars: [
        { name: 'k2_energy_card ×50', axis: 'ELEMENT·GOD ×registers', arch: focusElGodArch, status: 'PLANNED 0/50', value: 'face · persona · chips · rulingDomain · registers{dominant,absent}' },
        { name: 'palace_frames ×7', axis: 'POSITION', arch: 'all ×7', status: 'PLANNED', value: null },
        { name: 'tpl_presence_frames / cycle_line / rx_ribbon / pattern_conclusion', axis: 'T', status: 'PLANNED', value: null },
      ],
    },
  ];
}

export const VARIABLE_REGISTRY_NOTE =
  'Data station: Reading/Database/templates/by_axis/json (source) + /md (twins) + by_variable (pivot) · registry: REA_03 · vocabulary: REA_02';
