// ===================================================================
// ELEMENTUM · positionsResolve — the chart's named positions (P5)
// ===================================================================
// Resolves which of the 70 POSITION configurations (REA_02 §5e) a chart
// actually holds: for each of the seven slots (day stem excluded — it IS
// the Day Master), the slot's stem (branches via their 藏干 main qi)
// takes its ten-god against the DM, and the god × slot names the event:
// "The Alchemist inside the Career Gate · 偏印在月支".
//
// hourUnknown suppresses both hour slots: when the birth time is unknown
// or approximate, chartContext.resolveHourForCalc() DEFAULTS the hour (12,
// or the window midpoint), so an hour pillar exists but is not a chart
// fact. buildPillars() already hides the hour column for this reason
// (DES_04 §22, 3-pillar path); positions follow the same rule rather than
// naming seats the chart does not hold.
// ===================================================================

import { getTenGod, HIDDEN_STEMS, STEM_ELEM } from '../../engine/index.js';
import { ELEMENT_TO_PIGMENT } from '../../styles/elementPigments.js';
import { TG_PERSONA } from '../../content/index.js';
import { SLOTS, GATES, CHAPTERS, positionTerm, positionZh, POSITION_READINGS } from '../../content/positions.js';
import { TG_PATTERNS } from '../../content/tgPatterns.js';

const GOD_ID = {
  '比肩': 'bijian', '劫财': 'jiecai', '食神': 'shishen', '伤官': 'shangguan',
  '偏财': 'piancai', '正财': 'zhengcai', '七杀': 'qisha', '正官': 'zhengguan',
  '偏印': 'pianyin', '正印': 'zhengyin',
};

export function resolvePositions(chart, hourUnknown = false) {
  const p = chart?.pillars || {};
  const dm = p.day?.stem;
  if (!dm) return [];
  const out = [];
  for (const slot of SLOTS) {
    if (hourUnknown && slot.gate === 'hour') continue;
    const pi = p[slot.gate];
    if (!pi) continue;
    let stem;
    if (slot.kind === 'stem') stem = pi.stem || null;
    else {
      const hs = HIDDEN_STEMS[pi.branch];
      stem = hs && hs[0] ? hs[0].s : null;   // 藏干 main qi carries the branch
    }
    if (!stem) continue;
    const god = getTenGod(dm, stem)?.zh;
    const id = GOD_ID[god] ? `${GOD_ID[god]}_${slot.id}` : null;
    const r = id ? POSITION_READINGS[id] : null;
    if (!r) continue;
    const persona = TG_PERSONA[god] || god;
    out.push({
      id, god, persona,
      slot: slot.id, slotZh: slot.zh, kind: slot.kind,
      gate: GATES[slot.gate], gateKey: slot.gate,
      // the occupying energy — lets the element pages echo their own seats
      el: ELEMENT_TO_PIGMENT[STEM_ELEM[stem]] || null,
      term: positionTerm(persona, slot),
      termZh: positionZh(god, slot),
      domains: r.domains, defline: r.defline, reading: r.reading, teaser: r.teaser || null,
      domainReadings: r.domain_readings || null,
      lifeChapter: r.life_chapter || null, relations: r.relations || null,
      turnCatalyst: r.turn_catalyst || null, turnFriction: r.turn_friction || null,
      shadowLine: r.shadow_line || null, healthLine: r.health_line || null,
      chapter: CHAPTERS[slot.gate],
    });
  }
  // Ten-god relation patterns (TG_PATTERN axis, owner 2026-08-19 — the
  // 精华): when both sides of a named pattern sit among the chart's
  // positions, each involved seat carries the pattern (first match wins,
  // classical priority = TG_PATTERNS order). FUSED tier: both sides
  // sharing one pillar (the strongest classical trigger — 偏印+食神 in
  // one pillar MUST reveal 印枭夺食) appends the fused line.
  const present = new Set(out.map((x) => x.god));
  for (const tp of TG_PATTERNS) {
    const [a, b] = tp.gods;
    if (a.some((g) => present.has(g)) && b.some((g) => present.has(g))) {
      const fused = ['year', 'month', 'hour'].some((gk) => {
        const atGate = out.filter((x) => x.gateKey === gk);
        return atGate.some((x) => a.includes(x.god)) && atGate.some((x) => b.includes(x.god));
      });
      for (const x of out) {
        if (!x.pattern && (a.includes(x.god) || b.includes(x.god))) {
          // invisible machinery (owner 2026-08-19): no names/mechanics reach
          // the view — just the you-language analysis + its target domains
          x.pattern = { targets: tp.targets || [], reading: tp.reading, fusedLine: fused ? tp.fused_line : null };
        }
      }
    }
  }
  return out;
}
