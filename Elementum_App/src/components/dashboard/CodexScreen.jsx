// ===================================================================
// ELEMENTUM · CodexScreen  (DES_04 §12 Card 5 — BaZi Codex)
// ===================================================================
// The educational layer. Accordion of concept entries, each:
//   · Definition          — 1–2 sentences (always shown)
//   · Explanation         — 2 paragraphs (Free for basics; Seeker-gated
//                           for advanced — blurred + unlock at Free tier)
//   · Your Chart Reference — personalised to the user's actual chart
//
// Free basics (3): Four Pillars · Day Master · Five Elements.
// Seeker advanced (5): Ten Gods · Luck Cycles · Clashes & Combinations ·
//   Void & Empty Branch · Yin/Yang Polarity.
// ===================================================================

import { useState } from 'react';
import { useChart } from '../../store/chartContext.jsx';
import { useUpgrade } from './UpgradeModal.jsx';
import { Icon } from '../shared/icons';
import HorizonHeader from '../guidance/HorizonHeader.jsx';
import { tgPersona } from '../../content/index.js';
import {
  ink, inkSoft, inkLight, bronzeDark, gold,
  paperHair, cardstockBg, withAlpha,
} from '../../styles/tokens';

const ELEMENT_ORDER = ['Metal', 'Wood', 'Water', 'Fire', 'Earth'];

// Each entry: { key, title, hanzi, tier, def, body[], ref(chart) }
const ENTRIES = [
  {
    key: 'fourpillars', title: 'What is BaZi?', hanzi: '四 柱', tier: 'free',
    def: 'BaZi (八字, “eight characters”) reads the four pillars of your birth — year, month, day, and hour — each a pairing of a Heavenly Stem and an Earthly Branch.',
    body: [
      'Two characters per pillar, four pillars: eight characters in total. Together they map the elemental weather present at the moment you were born.',
      'The system is not prediction — it is a portrait of tendencies. It describes the forces you move with and against, so you can work with your nature rather than around it.',
    ],
    ref: (c) => {
      const p = c?.pillars; if (!p) return null;
      return `Your four pillars: ${p.year.stem}${p.year.branch} · ${p.month.stem}${p.month.branch} · ${p.day.stem}${p.day.branch} · ${p.hour.stem}${p.hour.branch}.`;
    },
  },
  {
    key: 'daymaster', title: 'Day Master', hanzi: '日 主', tier: 'free',
    def: 'Your Day Master is the Heavenly Stem of your day pillar — the single character that stands for you, and the lens through which the rest of the chart is read.',
    body: [
      'Every other element in the chart is interpreted by its relationship to the Day Master: what supports it, what drains it, what it controls, what controls it.',
      'A Day Master can be strong or weak depending on how much the surrounding chart feeds or spends it. Neither is “better” — each asks for a different way of moving through the world.',
    ],
    ref: (c) => {
      const dm = c?.dayMaster; if (!dm) return null;
      const band = (dm.strength || '').replace(/_/g, ' ');
      return `Yours is ${dm.stem} — ${dm.polarity === 'yin' ? 'Yin' : 'Yang'} ${dm.element}${band ? `, ${band}` : ''}.`;
    },
  },
  {
    key: 'fiveelements', title: 'The Five Elements', hanzi: '五 行', tier: 'free',
    def: 'Wood, Fire, Earth, Metal, and Water — the five forces that generate and control one another in an endless cycle.',
    body: [
      'Generating: Wood feeds Fire, Fire makes Earth, Earth bears Metal, Metal carries Water, Water grows Wood. Controlling: Wood parts Earth, Earth dams Water, Water quenches Fire, Fire melts Metal, Metal cuts Wood.',
      'A balanced chart holds all five; most lean toward one or two. The shape of that lean is much of what makes you you.',
    ],
    ref: (c) => {
      const e = c?.elements; if (!e) return null;
      const counts = ELEMENT_ORDER.filter((k) => e[k]).map((k) => `${k} ${e[k].count}`).join(' · ');
      const dom = ELEMENT_ORDER.find((k) => e[k]?.dominant);
      return `Your distribution: ${counts}${dom ? ` — ${dom} dominant.` : '.'}`;
    },
  },
  {
    key: 'tengods', title: 'The Council', hanzi: '十 神', tier: 'seeker',
    def: 'Your council (十神) is the ten relational roles every other stem can play toward your Day Master — companion, output, wealth, authority, resource, each in a yin and yang register.',
    body: [
      'They translate raw elements into life meaning: the same Metal that is “Metal” in the abstract becomes Wealth, Authority, or Resource depending on what your Day Master is.',
      'Your dominant council figures describe how your energy actually deploys — whether you lead with output, accumulate wealth, answer to authority, or draw on resource.',
    ],
    ref: (c) => {
      const tg = c?.tenGods; if (!tg) return null;
      const names = [...new Set(['yearStem', 'monthStem', 'hourStem'].map((k) => tgPersona(tg[k]?.zh)).filter(Boolean))];
      return names.length ? `Active in your chart: ${names.join(', ')}.` : null;
    },
  },
  {
    key: 'luckcycles', title: 'Life Chapters', hanzi: '大 运', tier: 'seeker',
    def: 'Your Life Chapters (大运) are ten-year periods, each a stem-and-branch that overlays your chart and shifts which energies are emphasised.',
    body: [
      'The birth chart is fixed; the chapters move. A chapter can amplify a strength, supply a missing element, or press on a weakness.',
      'Reading your chapters is how the chart becomes a timeline rather than a static portrait.',
    ],
    ref: (c) => {
      const d = (c?.luckPillars || []).find((x) => x.isCurrent);
      return d ? `Your current chapter: ${d.element} — age ${d.startAge}–${d.endAge}.` : null;
    },
  },
  {
    key: 'clashescombos', title: 'Clashes & Combinations', hanzi: '冲 合', tier: 'seeker',
    def: 'Earthly Branches relate to one another — combining (合), clashing (冲), penalising (刑), or harming (害) — creating internal weather within the chart.',
    body: [
      'Combinations bind energies together; clashes set them in motion; penalties build friction through repetition; harms erode quietly.',
      'These patterns explain why two people with similar elements can feel so different inside — the relationships between the pieces matter as much as the pieces.',
    ],
    ref: (c) => {
      const n = (c?.patterns || []).length;
      return `Your chart has ${n} active ${n === 1 ? 'pattern' : 'patterns'} between its branches.`;
    },
  },
  {
    key: 'voidbranch', title: 'Void & Empty Branch', hanzi: '空 亡', tier: 'seeker',
    def: 'The Void (空亡) marks branches that fall “empty” relative to your day pillar — positions where energy is present but ungrounded.',
    body: [
      'A void branch doesn’t disappear; it reads as latent, half-real, often felt as a domain that never quite lands the way the chart suggests it should.',
      'Classical readers use it to explain the gap between what a chart promises and what a life delivers in one specific area.',
    ],
    ref: () => null,  // void/empty-branch calc isn't surfaced yet — render no personalized line rather than a dev placeholder
  },
  {
    key: 'yinyang', title: 'Yin / Yang Polarity', hanzi: '阴 阳', tier: 'seeker',
    def: 'Every stem and branch carries a polarity — Yang (active, outward) or Yin (receptive, inward). Your Day Master’s polarity colours how its element expresses.',
    body: [
      'Yang Metal (庚) is the blade; Yin Metal (辛) is the jewel — same element, opposite temperament. The polarity is the difference between force and finesse.',
      'Polarity also governs how the council splits into direct and indirect forms, doubling five relationships into ten.',
    ],
    ref: (c) => {
      const dm = c?.dayMaster; if (!dm) return null;
      return `Your Day Master is ${dm.polarity === 'yin' ? 'Yin' : 'Yang'} ${dm.element}.`;
    },
  },
];

export default function CodexScreen({ onBack }) {
  const { chart, tier } = useChart();
  const { openUpgrade } = useUpgrade();
  const [open, setOpen] = useState(() => new Set(['fourpillars']));
  const isFree = tier === 'free';

  const toggle = (k) => setOpen((s) => {
    const next = new Set(s);
    next.has(k) ? next.delete(k) : next.add(k);
    return next;
  });

  return (
    <main style={{ minHeight: '100%', padding: '54px 20px 24px' }}>
      <HorizonHeader
        art="/art/fhdr-codex.png"
        bgPosition="50% 16%"
        tint="139,163,184"
        ruleColor="rgb(110,134,156)"
        eyebrow="The Reference"
        title="The Codex"
        subtitle="The eight characters, explained plainly"
        onBack={onBack}
      />
      <div style={{ height: 14 }} />

      {ENTRIES.map((e) => {
        const isOpen = open.has(e.key);
        const locked = isFree && e.tier === 'seeker';
        const chartRef = e.ref(chart);
        return (
          <div key={e.key} style={{
            background: cardstockBg, border: `1px solid ${paperHair}`,
            borderRadius: 14, marginBottom: 10, overflow: 'hidden',
          }}>
            {/* Header row (tap to expand) */}
            <button type="button" onClick={() => toggle(e.key)} style={{
              appearance: 'none', width: '100%', background: 'transparent', border: 'none',
              padding: '14px 16px', cursor: 'pointer', display: 'flex',
              alignItems: 'center', gap: 12, textAlign: 'left',
            }}>
              <span style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 18, color: bronzeDark, lineHeight: 1, flexShrink: 0 }}>
                {e.hanzi.replace(/ /g, '')}
              </span>
              <span style={{
                flex: 1, fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 19, fontWeight: 500, color: ink, lineHeight: 1.1,
              }}>{e.title}</span>
              {e.tier === 'seeker' && (
                <span style={{
                  fontFamily: "'EB Garamond', Georgia, serif", fontSize: 9,
                  letterSpacing: 1.4, textTransform: 'uppercase', color: bronzeDark,
                }}>◆ Seeker</span>
              )}
              <span aria-hidden="true" style={{
                color: inkLight, transform: isOpen ? 'rotate(90deg)' : 'none',
                transition: 'transform 180ms ease', display: 'inline-flex',
              }}>
                <Icon id="ico-chev-r" size={15} />
              </span>
            </button>

            {/* Expanded body */}
            {isOpen && (
              <div style={{ padding: '0 16px 16px' }}>
                {/* Definition — always shown */}
                <p style={{
                  fontFamily: "'EB Garamond', Georgia, serif", fontSize: 15,
                  lineHeight: 1.7, color: ink, margin: '0 0 12px',
                }}>{e.def}</p>

                {/* Explanation — gated for Seeker entries at Free tier */}
                {locked ? (
                  <div style={{ position: 'relative', marginBottom: 12 }}>
                    <div style={{ filter: 'blur(4px)', userSelect: 'none', opacity: 0.55 }}>
                      {e.body.map((para, i) => (
                        <p key={i} style={{
                          fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14,
                          lineHeight: 1.65, color: inkSoft, margin: i ? '8px 0 0' : 0,
                        }}>{para}</p>
                      ))}
                    </div>
                    <button type="button" onClick={() => openUpgrade('the BaZi Codex')} style={{
                      marginTop: 10, padding: '8px 14px', borderRadius: 999,
                      border: `1px solid ${withAlpha(gold, '40')}`, background: withAlpha(gold, '10'),
                      color: bronzeDark, cursor: 'pointer', fontFamily: "'EB Garamond', Georgia, serif",
                      fontSize: 12.5, display: 'inline-flex', alignItems: 'center', gap: 5,
                    }}>
                      <Icon id="ico-lock" size={12} color={bronzeDark} /> Unlock with Seeker
                    </button>
                  </div>
                ) : (
                  e.body.map((para, i) => (
                    <p key={i} style={{
                      fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14,
                      lineHeight: 1.7, color: inkSoft, margin: i ? '8px 0 0' : 0,
                    }}>{para}</p>
                  ))
                )}

                {/* Your Chart Reference — always personalised */}
                {chartRef && (
                  <div style={{
                    marginTop: 14, padding: '12px 14px', borderRadius: 10,
                    background: withAlpha(bronzeDark, '10'),
                    borderLeft: `2px solid ${bronzeDark}`,
                  }}>
                    <div style={{
                      fontFamily: "'EB Garamond', Georgia, serif", fontSize: 9.5,
                      letterSpacing: 2, textTransform: 'uppercase', color: bronzeDark,
                      fontWeight: 500, marginBottom: 4,
                    }}>In your chart</div>
                    <div style={{
                      fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14,
                      lineHeight: 1.6, color: inkSoft,
                    }}>{chartRef}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </main>
  );
}
