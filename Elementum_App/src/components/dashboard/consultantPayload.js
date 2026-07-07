// ===================================================================
// ELEMENTUM · consultantPayload — the chart context sent to the LLM
// ===================================================================
// Serializes the chart + Self-Report into the payload the consultant
// proxy injects into the system prompt. Shape follows the v2.1-locked
// spec (DOC10 reconciliation note): per-element polarity resolution
// ({presentFaces, absentGod}) + the positional tenGods axis — so the
// consultant sees the same faces the readings surface.
//
// Deterministic for a given chart (stable string ⇒ prompt-cache hits
// across a conversation). Persona names ride along so the model can
// honor the "persona vocabulary, never raw jargon" rule.
// ===================================================================

import { resolveElementFaces } from '../../engine/index.js';
import { STEM_CARD_DATA, TG_PERSONA } from '../../content/index.js';

const ELEMENTS = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];

const persona = (god) => (god ? { god, persona: TG_PERSONA[god] || null } : null);

export function buildConsultantPayload(chart, selfReport) {
  if (!chart?.dayMaster) return '';
  const dm = chart.dayMaster;
  const identity = STEM_CARD_DATA[dm.stem]?.identity || {};

  const faces = {};
  for (const el of ELEMENTS) {
    try {
      const f = resolveElementFaces(el, dm.stem, chart.pillars);
      faces[el] = {
        presentFaces: (f.presentFaces || []).map((x) => ({ ...persona(x.god), weight: x.weight, polarity: x.polarity })),
        absentGod: persona(f.absentGod),
        leadGod: persona(f.leadGod),
      };
    } catch { /* element unresolvable — omit rather than fail the payload */ }
  }

  const tg = chart.tenGods || {};
  const positional = Object.fromEntries(
    Object.entries(tg).map(([pos, g]) => [pos, g ? { zh: g.zh, en: g.en, family: g.family } : null])
  );

  const payload = {
    identity: {
      stem: dm.stem,
      element: dm.element,
      polarity: dm.polarity,
      strength: dm.strength,
      archetype: identity.archetypeName || null,
      archetypeLabel: identity.archetypeLabel || null,
      archetypeKey: chart.archetypeKey || null,
      pattern: chart.tgPattern || null,
      catalyst: chart.catalyst || null,
      missingElements: chart.missingElements || [],
    },
    pillars: chart.pillars ? Object.fromEntries(
      Object.entries(chart.pillars).map(([k, p]) => [k, {
        stem: p.stem, branch: p.branch, stemElement: p.stemElement, branchElement: p.branchElement,
      }])
    ) : null,
    positionalTenGods: positional,          // the 宫位 axis (v2.1 requirement)
    elementFaces: faces,                     // per-element polarity resolution (v2.1 requirement)
    composition: chart.elements || null,
    currents: {
      day: chart.currentFlowDay ? { stem: chart.currentFlowDay.stem, element: chart.currentFlowDay.stemElement, tenGod: chart.currentFlowDay.stemTenGod?.en || null } : null,
      month: chart.currentFlowMonth ? { stem: chart.currentFlowMonth.stem, element: chart.currentFlowMonth.stemElement } : null,
      year: chart.currentFlowYear ? { stem: chart.currentFlowYear.stem, element: chart.currentFlowYear.stemElement } : null,
    },
    selfReport: selfReport ? {
      lifeChapter: selfReport.chapter || null,
      liveDomains: selfReport.domains || [],
      inTheirWords: selfReport.context || null,
      updated: selfReport.at || null,
    } : null,
  };

  return JSON.stringify(payload);
}
