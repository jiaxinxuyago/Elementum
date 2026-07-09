import { ELEMENT_TO_PIGMENT } from '../../../styles/elementPigments.js';
// ===================================================================
// ELEMENTUM · TenGodsDetail (Dominant Energies)
// ===================================================================
// Third built-out reading-detail page (Q2.b). Surfaces the chart's
// Ten Gods (十神) — the relational forces that shape how the
// day-master deploys.
//
// Layout:
//   · Pillar grid — all 7 visible TGs (year/month/day/hour × stem/branch
//     minus the day-stem itself, which is the DM and thus "self")
//   · Primary TG card — full TG_CARD_DATA reading for the month-stem TG
//     (orthodox "primary force" per BaZi tradition).
//
// Data source: chart.tenGods + TG_CARD_DATA[tgZh].
// ===================================================================

import DetailShell from './DetailShell.jsx';
import { useChart } from '../../../store/chartContext.jsx';
import { TG_CARD_DATA, tgPersona } from '../../../content/index.js';
import TGRing from '../TGRing.jsx';
import { readingDetailBg, elementArt } from '../../../styles/backgrounds.js';
import {
  ink, inkSoft, inkLight, bronzeDark,
  paperHair, cardstockBg,
  pigments, withAlpha,
} from '../../../styles/tokens';

// Ten God family → element role color (per DES_04 §11 dialect)
const TG_FAMILY_PIGMENT = {
  self:      'metal',  // 比肩/劫财 — companion energy
  output:    'water',  // 食神/伤官 — expression
  wealth:    'wood',   // 偏财/正财 — wealth
  authority: 'fire',   // 七杀/正官 — authority
  resource:  'earth',  // 偏印/正印 — resource
};

export default function TenGodsDetail({ onBack }) {
  const { chart } = useChart();
  const element = chart?.dayMaster?.element || 'Metal';
  const pigmentKey = ELEMENT_TO_PIGMENT[element] || 'metal';
  const pigment = pigments[pigmentKey].deep;

  const tg = chart?.tenGods || {};

  // 7 visible TGs (everything except dayStem, which is the DM itself).
  // Ordered so the month pair sits centrally (orthodox "primary").
  const pillars = [
    { key: 'yearStem',   pillar: 'YEAR',  position: 'stem',   tg: tg.yearStem   },
    { key: 'yearBranch', pillar: 'YEAR',  position: 'branch', tg: tg.yearBranch },
    { key: 'monthStem',  pillar: 'MONTH', position: 'stem',   tg: tg.monthStem  },
    { key: 'monthBranch',pillar: 'MONTH', position: 'branch', tg: tg.monthBranch},
    { key: 'dayBranch',  pillar: 'DAY',   position: 'branch', tg: tg.dayBranch  },
    { key: 'hourStem',   pillar: 'HOUR',  position: 'stem',   tg: tg.hourStem   },
    { key: 'hourBranch', pillar: 'HOUR',  position: 'branch', tg: tg.hourBranch },
  ].filter(p => p.tg && p.tg.zh);

  // "Primary force" — month stem TG (BaZi orthodox). Falls back to first
  // non-self TG if month stem is somehow itself (rare).
  const primaryEntry = tg.monthStem && tg.monthStem.family !== 'self'
    ? tg.monthStem
    : pillars.find(p => p.tg.family !== 'self')?.tg
      || pillars[0]?.tg;

  const primaryCard = primaryEntry ? TG_CARD_DATA[primaryEntry.zh] : null;

  return (
    <DetailShell
      onBack={onBack}
      pigment={pigment}
      bg={readingDetailBg(element)}
      sectionKey="read-tengods"
      hero={{
        element,
        artSrc: elementArt(element),
        eyebrow: 'Dominant Energies · 十 神',
        title: 'The council in your chart',
        subtitle: primaryEntry ? `Primary force · ${tgPersona(primaryEntry.zh)} ${primaryEntry.zh}` : undefined,
      }}
    >
      {/* ── TG RING — weighted role donut (DES_04 §11 identity visual) ── */}
      <section style={{
        background: cardstockBg, border: `1px solid ${paperHair}`,
        borderRadius: 16, padding: '20px 16px 18px', marginBottom: 14,
      }}>
        <TGRing
          tenGods={tg}
          dmElement={element}
          polarity={chart?.dayMaster?.polarity}
        />
      </section>

      {/* ── INTRO — short orientation line ───────────────────────── */}
      <p style={{
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 14,
        lineHeight: 1.65,
        color: inkSoft,
        margin: '4px 0 18px',
      }}>
        Your council (十神) — the relational forces visible in every
        pillar, each one a way the rest of your chart relates to your
        Day Master. The ring above weighs them by role; the pattern
        below is yours.
      </p>

      {/* ── PILLAR GRID — all visible TGs ───────────────────────── */}
      <section style={{
        background: cardstockBg,
        border: `1px solid ${paperHair}`,
        borderRadius: 16,
        padding: '16px 14px',
        marginBottom: 14,
      }}>
        <div style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
          color: withAlpha(pigment, 'CC'), fontWeight: 500,
          marginBottom: 12, padding: '0 4px',
        }}>
          Across your chart
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
        }}>
          {pillars.map((p) => (
            <TGCell
              key={p.key}
              pillar={p.pillar}
              position={p.position}
              tg={p.tg}
              isPrimary={primaryEntry && p.tg.zh === primaryEntry.zh && p.key === 'monthStem'}
            />
          ))}
        </div>
      </section>

      {/* ── PRIMARY FORCE — full TG card content ────────────────── */}
      {primaryCard && (
        <PrimaryForceCard
          tgZh={primaryEntry.zh}
          tgEn={tgPersona(primaryEntry.zh)}
          card={primaryCard}
          pigment={pigment}
        />
      )}
    </DetailShell>
  );
}

// ───────────────────────────────────────────────────────────────────
// TGCell — one chip showing a single ten-god in one pillar/position.
// ───────────────────────────────────────────────────────────────────
function TGCell({ pillar, position, tg, isPrimary }) {
  const familyPigKey = TG_FAMILY_PIGMENT[tg.family] || 'metal';
  const fpig = pigments[familyPigKey].deep;
  return (
    <div style={{
      background: withAlpha(fpig, '10'),
      border: isPrimary
        ? `1px solid ${fpig}`
        : `1px solid ${withAlpha(fpig, '40')}`,
      borderRadius: 12,
      padding: '8px 10px',
      display: 'flex', flexDirection: 'column', gap: 2,
    }}>
      <div style={{
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 9, letterSpacing: 1.6, textTransform: 'uppercase',
        color: withAlpha(fpig, 'CC'), fontWeight: 500,
      }}>
        {pillar} {position}
      </div>
      <div style={{
        fontFamily: "'Noto Serif SC', serif",
        fontSize: 16,
        color: fpig,
        lineHeight: 1.1,
      }}>
        {tg.zh}
      </div>
      <div style={{
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 11.5,
        color: inkSoft,
        lineHeight: 1.25,
      }}>
        {tgPersona(tg.zh) || tg.en}
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────
// PrimaryForceCard — the full archetype reading for the dominant TG.
// ───────────────────────────────────────────────────────────────────
function PrimaryForceCard({ tgZh, tgEn, card, pigment }) {
  // Prefer the structured outputs/frictions {phrase,desc}; fall back to the
  // legacy flat gifts/shadows strings. Normalize both to {phrase,desc} and
  // drop any [TODO] placeholders.
  const normTG = (arr) => (arr || [])
    .map((x) => (typeof x === 'string' ? { phrase: null, desc: x } : { phrase: x?.phrase || null, desc: x?.desc || '' }))
    .filter((x) => x.desc && !/^\[TODO\]/.test(x.desc) && !/^\[TODO\]/.test(x.phrase || ''))
    .slice(0, 3);
  const cleanGifts = normTG(card.outputs?.length ? card.outputs : card.gifts);
  const cleanShadows = normTG(card.frictions?.length ? card.frictions : card.shadows);

  return (
    <section style={{
      background: cardstockBg,
      border: `1px solid ${paperHair}`,
      borderRadius: 16,
      padding: '20px 18px',
      marginBottom: 14,
    }}>
      {/* Header — name + sub */}
      <div style={{
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
        color: withAlpha(pigment, 'CC'), fontWeight: 500,
        marginBottom: 8,
      }}>
        Primary Force · {tgZh} {tgEn}
      </div>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 24, fontWeight: 500, lineHeight: 1.2,
        color: ink, margin: '0 0 4px',
      }}>
        {card.name}
      </h2>
      {card.sub && (
        <div style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 13.5, color: inkLight, lineHeight: 1.5,
          marginBottom: 16,
        }}>
          {card.sub}
        </div>
      )}

      {/* Ruling realm */}
      {card.rulingRealm && (
        <div style={{ marginBottom: 16 }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 17, fontWeight: 500, color: ink,
            marginBottom: 6,
          }}>
            {card.rulingRealm.phrase}
          </div>
          <p style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 14, lineHeight: 1.7, color: inkSoft,
            margin: 0,
          }}>
            {card.rulingRealm.desc}
          </p>
        </div>
      )}

      {/* Personality chips */}
      {Array.isArray(card.chips) && card.chips.length > 0 && (
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 6,
          marginBottom: 18,
        }}>
          {card.chips.map((c) => (
            <span key={c} style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 11.5,
              color: ink,
              background: withAlpha(pigment, '10'),
              border: `1px solid ${withAlpha(pigment, '40')}`,
              padding: '3px 10px',
              borderRadius: 999,
            }}>
              {c}
            </span>
          ))}
        </div>
      )}

      {/* Gifts */}
      {cleanGifts.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
            color: withAlpha(pigment, 'CC'), fontWeight: 500,
            marginBottom: 8,
          }}>
            Gifts
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {cleanGifts.map((g, i) => (
              <li key={i} style={{
                padding: '7px 0 7px 14px',
                position: 'relative',
              }}>
                <span aria-hidden="true" style={{
                  position: 'absolute', left: 0, top: 13,
                  width: 4, height: 4, borderRadius: 999,
                  background: pigment,
                }} />
                {g.phrase && (
                  <span style={{
                    display: 'block',
                    fontFamily: "'EB Garamond', Georgia, serif",
                    fontSize: 14, fontWeight: 600, color: ink,
                    marginBottom: 1,
                  }}>{g.phrase}</span>
                )}
                <span style={{
                  display: 'block',
                  fontFamily: "'EB Garamond', Georgia, serif",
                  fontSize: 14, lineHeight: 1.6, color: inkSoft,
                }}>{g.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Shadows */}
      {cleanShadows.length > 0 && (
        <div>
          <div style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
            color: withAlpha(pigment, 'CC'), fontWeight: 500,
            marginBottom: 8,
          }}>
            Shadows
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {cleanShadows.map((s, i) => (
              <li key={i} style={{
                padding: '7px 0 7px 14px',
                position: 'relative',
              }}>
                <span aria-hidden="true" style={{
                  position: 'absolute', left: 0, top: 13,
                  width: 4, height: 4, borderRadius: 999,
                  background: pigment, opacity: 0.55,
                }} />
                {s.phrase && (
                  <span style={{
                    display: 'block',
                    fontFamily: "'EB Garamond', Georgia, serif",
                    fontSize: 14, fontWeight: 600, color: ink,
                    marginBottom: 1,
                  }}>{s.phrase}</span>
                )}
                <span style={{
                  display: 'block',
                  fontFamily: "'EB Garamond', Georgia, serif",
                  fontSize: 14, lineHeight: 1.6, color: inkSoft,
                }}>{s.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Hidden dynamic — the deeper read */}
      {card.hiddenDynamic && (
        <div style={{
          marginTop: 16,
          paddingTop: 14,
          borderTop: `1px dashed ${paperHair}`,
        }}>
          <div style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
            color: bronzeDark, fontWeight: 500,
            marginBottom: 8,
          }}>
            The Hidden Dynamic
          </div>
          <p style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 14, lineHeight: 1.7, color: inkSoft,
            margin: 0, fontStyle: 'normal',
          }}>
            {card.hiddenDynamic}
          </p>
        </div>
      )}
    </section>
  );
}
