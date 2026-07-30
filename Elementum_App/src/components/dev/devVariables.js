// ===================================================================
// ELEMENTUM · DevBar variable registry (development only)
// ===================================================================
// The Schema tab's data: the REA_03 reading data variables (A + T classes,
// plus the derived engine selection), grouped by journey surface and
// resolved LIVE against the active chart's journey model. Mirrors
// Reading/Documents/REA_03_Reading_Generation_Schema.md §3–§6 — when that
// registry changes, update this mirror.
// ===================================================================

import { STEM_CARD_DATA, TG_PERSONA } from '../../content/index.js';
import { FACE_CARD } from '../../content/reading/index.js';

const join = (xs) => xs.filter(Boolean).join(' · ');

// model = buildJourneyModel output for the active chart (null-safe).
export function buildVariableGroups(model) {
  const m = model;
  const stem = m?.stem;
  const card = stem ? STEM_CARD_DATA[stem] : null;
  const towers = m ? [...m.els].sort((a, b) => b.presence - a.presence) : [];
  const perEl = (f) => join(towers.map((r) => `${r.name}:${f(r) ?? '—'}`));

  return [
    {
      surface: 'Identity · Reveal + Hero + Share card',
      vars: [
        { name: 'archetype_name', axis: 'STEM×10', status: 'LIVE', value: m?.archetype },
        { name: 'manifesto', axis: 'STEM×10', status: 'LIVE', value: m?.manifesto },
        { name: 'inscription', axis: 'STEM×10', status: 'LIVE', value: m?.inscription },
        { name: 'pinyin_display', axis: 'STEM×10', status: 'LIVE', value: m?.pinyin },
        { name: 'top3_keyword_selection', axis: 'DERIVED', status: 'LIVE', value: m?.chips?.join(' · ') },
        { name: 'tpl_cast_line', axis: 'T · derived slots', status: 'LIVE ⚠R1', value: m?.cast },
      ],
    },
    {
      surface: 'Catalogue · Folio + Panels + Pills',
      vars: [
        { name: 'condition / approach', axis: 'DERIVED→V', status: 'LIVE', value: m ? `${m.condition}${m.approach ? ` → ${m.approach}` : ''}` : null },
        { name: 'fold_verdict (V)', axis: 'CONDITION×3', status: 'LIVE', value: m?.foldVerdict },
        { name: 'lead_god_per_element', axis: 'DERIVED', status: 'LIVE', value: perEl((r) => r.god) },
        { name: 'keyword (V, per lead god)', axis: 'GOD×10', status: 'LIVE', value: perEl((r) => r.keyword) },
        { name: 'relation_noun (V)', axis: 'FAMILY×5', status: 'LIVE', value: perEl((r) => r.relation) },
        { name: 'roles (+excess/major/missing)', axis: 'DERIVED', status: 'LIVE', value: perEl((r) => `${r.isCore ? 'core' : r.role}${r.coreExcess ? '+excess' : ''}${r.major ? '+major' : ''}${r.missing ? '+missing' : ''}`) },
        { name: 'tpl_dx_line', axis: 'T · role-driven', status: 'LIVE', value: m?.core ? `Your ${m.core.name} is ${m.core.dx?.condition ?? m.condition} — ${m.core.dx?.remedy ?? m.approach ?? 'keep the mix'}${m.core.dx?.remedy ? ' it.' : ''}` : null },
        { name: 'tpl_verdict_line', axis: 'T · pole+verb', status: 'LIVE', value: m?.core?.verdict ? `${m.core.verdict.connector} ${m.core.verdict.pole} · ${m.core.verdict.verb}` : null },
        { name: 'adj chips (V, role-pole)', axis: 'GOD×10 ×2', status: 'LIVE', value: m?.core?.adj?.join(' · ') },
        { name: 'glossary_body (V)', axis: 'CONST+COND', status: 'LIVE', value: 'composed at runtime (defline + remedy — R3 resolved)' },
      ],
    },
    {
      surface: 'Day-Master screen',
      vars: [
        { name: 'yourNature_desc', axis: 'STEM×10', status: 'LIVE ⚠R4 not surfacing', value: card?.yourNature?.desc },
        { name: 'dm_claims', axis: 'STEM×10', status: 'PLANNED', value: null },
        { name: 'dm_mechanism', axis: 'STEM×10', status: 'PLANNED', value: null },
        { name: 'self_card (K1b)', axis: 'STEM·BAND×30', status: 'PLANNED', value: null },
        { name: 'tpl_dm_prescription', axis: 'T · interim', status: 'INTERIM', value: 'element-generic pending K2' },
      ],
    },
    {
      surface: 'Element screens (interim → K2)',
      vars: [
        { name: 'persona_name (V)', axis: 'GOD×10', status: 'LIVE', value: perEl((r) => TG_PERSONA[r.god]) },
        { name: 'face_kw', axis: 'GOD×10', status: 'LIVE', value: m?.core?.god ? (FACE_CARD[m.core.god]?.kw || []).join(' · ') : null },
        { name: 'face_teaser', axis: 'GOD×10', status: 'LIVE ⚠R5 scope', value: m?.core?.god ? FACE_CARD[m.core.god]?.teaser : null },
        { name: 'energy_tile_hook / tag', axis: '→ EL·GOD×50', status: 'INTERIM 庚-gated', value: perEl((r) => r.hook || '(fallback)') },
        { name: 'mean_line', axis: 'ELEMENT×5 interim', status: 'INTERIM', value: 'element-generic pending 50-cell pass' },
      ],
    },
    {
      surface: 'Deep pages (PLANNED — the K2 corpus)',
      vars: [
        { name: 'k2_energy_card ×50', axis: 'ELEMENT·GOD ×registers', status: 'PLANNED 0/50', value: 'face · persona · chips · rulingDomain · registers{dominant,absent}' },
        { name: 'palace_frames ×7', axis: 'POSITION', status: 'PLANNED', value: null },
        { name: 'tpl_presence_frames / cycle_line / rx_ribbon / pattern_conclusion', axis: 'T', status: 'PLANNED', value: null },
      ],
    },
  ];
}

export const VARIABLE_REGISTRY_NOTE =
  'Data station: Reading/Database/templates/json (source) + /md (review twins) · registry: REA_03 · vocabulary: REA_02';
