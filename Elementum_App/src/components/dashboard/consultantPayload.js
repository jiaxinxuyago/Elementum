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

import { resolveElementFaces, yearEnergy } from '../../engine/index.js';
import { STEM_CARD_DATA, TG_PERSONA, getDailyGuidance, composeSelfReport } from '../../content/index.js';
import { PERSONA_READING, DM_READING } from '../../content/reading/index.js';

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

    // ── The temporal layer (owner-reported gap 2026-07: the consultant must
    // see the same year/day readings the Today tab composes) ────────────────
    today: (() => {
      const d = new Date();
      return { date: d.toISOString().slice(0, 10), weekday: d.toLocaleDateString('en-US', { weekday: 'long' }) };
    })(),
    // Today's composed guidance — the same narrative/do/avoid the app shows.
    dailyGuidance: (() => {
      try {
        const g = getDailyGuidance(chart);
        return g ? {
          todayStem: g.todayStem, todayElement: g.todayElement,
          relationToThem: g.label, tone: g.tone, narrative: g.narrative,
          doThis: g.doThis, avoid: g.avoid, bestHours: g.bestHours,
        } : null;
      } catch { return null; }
    })(),
    currents: {
      day: chart.currentFlowDay ? { stem: chart.currentFlowDay.stem, branch: chart.currentFlowDay.branch, element: chart.currentFlowDay.stemElement, tenGod: chart.currentFlowDay.stemTenGod?.en || null } : null,
      month: chart.currentFlowMonth ? { stem: chart.currentFlowMonth.stem, branch: chart.currentFlowMonth.branch, element: chart.currentFlowMonth.stemElement, tenGod: chart.currentFlowMonth.stemTenGod?.en || null } : null,
      year: chart.currentFlowYear ? { year: chart.currentFlowYear.year, stem: chart.currentFlowYear.stem, branch: chart.currentFlowYear.branch, element: chart.currentFlowYear.stemElement, tenGod: chart.currentFlowYear.stemTenGod?.en || null } : null,
    },
    // This year's month-by-month flow (the Year page's map), compact.
    yearFlow: (() => {
      try { return yearEnergy(chart).map((m) => ({ m: m.label, el: m.element, level: m.level })); }
      catch { return null; }
    })(),
    // Decade chapters (luck pillars): where they ARE, plus the one behind and ahead.
    decade: (() => {
      const lps = chart.luckPillars || [];
      const i = lps.findIndex((p) => p.isCurrent);
      if (i < 0) return null;
      const slim = (p) => p && {
        ages: `${p.startAge}–${p.endAge}`, years: `${p.startYear}–${p.endYear}`,
        stem: p.stem, branch: p.branch, element: p.element,
        tenGod: p.stemTenGod?.en || null, current: !!p.isCurrent,
      };
      return { previous: slim(lps[i - 1]), current: slim(lps[i]), next: slim(lps[i + 1]) };
    })(),
    selfReport: selfReport ? {
      lifeChapter: selfReport.chapter || null,
      liveDomains: selfReport.domains || [],
      inTheirWords: selfReport.context || null,
      updated: selfReport.at || null,
    } : null,

    // ── The authored voice (owner directive 2026-07: the consultant digests the
    // LATEST reading content and speaks in its fashion). Composed at message time
    // from the same content modules the reading screens render — polishing copy
    // and shipping the app updates the consultant with no worker change. ────────
    authoredVoice: {
      manifesto: identity.manifesto || null,
      elementIntro: identity.elementIntro || null,
      dayMasterReading: DM_READING[dm.stem] || null,
      // Their cast: the authored reading of each element's lead persona.
      personaReadings: (() => {
        const out = {};
        for (const el of ELEMENTS) {
          const god = faces[el]?.leadGod?.god;
          if (god && PERSONA_READING[god]) out[el] = { persona: TG_PERSONA[god] || god, ...PERSONA_READING[god] };
        }
        return out;
      })(),
      // The composed Self-Report — the app's own current-voice reading of them.
      composedReport: (() => {
        try {
          const rep = composeSelfReport(chart, selfReport);
          const sections = rep?.sections || (Array.isArray(rep) ? rep : null);
          return sections ? sections.map((s) => ({ title: s.title, quote: s.quote || undefined, body: s.body })) : null;
        } catch { return null; }
      })(),
    },
  };

  return JSON.stringify(payload);
}
