// ===================================================================
// ELEMENTUM · LifeChaptersDetail  (DOC5 §11 Life Chapters / 大运)
// ===================================================================
// Decade luck-cycle timeline. Renders chart.luckPillars as a horizontal
// strip of decade cards (current / past / future-locked states), plus a
// reading for the current decade. Decade reading is generated
// deterministically from the decade element's relation to the Day Master
// (no authored per-decade content exists yet).
//
// Tier (DOC5 §11): Free → current decade name + element; Seeker → full
// current decade + full timeline; we render the current-decade reading
// for all and mark future decades Seeker-locked at Free tier.
// ===================================================================

import DetailShell from './DetailShell.jsx';
import { useChart } from '../../../store/chartContext.jsx';
import { energyContext } from '../../../engine/index.js';
import { Icon } from '../../shared/icons';
import { elementArt } from '../../../styles/backgrounds.js';
import { tgPersona } from '../../../content/index.js';
import { ink, inkSoft, inkLight, gold, paperHair, cardstockBg, quietBg, quietBorder, pigments, withAlpha } from '../../../styles/tokens';

const ELEMENT_TO_PIGMENT = {
  Metal: 'metal', Wood: 'wood', Fire: 'fire', Earth: 'earth', Water: 'water',
};

// Templated chapter reading from the chapter element's relation to the DM.
function decadeReading(decade, ctx) {
  const el = decade.element;
  const tg = tgPersona(decade.stemTenGod?.zh);
  let body;
  if (el === ctx.catalyst)
    body = `This chapter carries ${el} — the energy that most lifts your ${ctx.dmElement} nature. These are the years the current runs with you: the ambitions you commit to now tend to compound. Push, build, and commit while the window is open.`;
  else if (el === ctx.resistance)
    body = `This chapter carries ${el}, the energy that tests your ${ctx.dmElement} nature. Not a chapter to force — one to refine and consolidate. What you protect and deepen now holds; what you over-extend tends to scatter.`;
  else
    body = `This chapter carries ${el} — neither strongly with nor against your ${ctx.dmElement} nature. A steadying span: the foundations you lay quietly here become the ground the next chapter builds on.`;
  if (tg) body += ` Its dominant register is ${tg} — the lens through which this chapter's pressure arrives.`;
  return body;
}

export default function LifeChaptersDetail({ onBack }) {
  const { chart, tier } = useChart();
  const element = chart?.dayMaster?.element || 'Metal';
  const pigKey = ELEMENT_TO_PIGMENT[element] || 'metal';
  const pig = pigments[pigKey].deep;
  const ctx = energyContext(chart);
  const decades = chart?.luckPillars || [];
  const current = decades.find((d) => d.isCurrent);
  const isFree = tier === 'free';

  return (
    <DetailShell
      onBack={onBack}
      pigment={pig}
      sectionKey="read-chapters"
      hero={{
        element,
        artSrc: elementArt(element),
        eyebrow: 'Life Chapters · 大 运',
        title: 'Your decades',
        subtitle: 'How the pressure shifts every ten years',
      }}
    >
      {/* Decade timeline strip — horizontal scroll */}
      <div style={{
        display: 'flex', gap: 8, overflowX: 'auto', padding: '2px 0 12px',
        WebkitOverflowScrolling: 'touch', marginBottom: 6,
      }}>
        {decades.map((d) => {
          const dpKey = ELEMENT_TO_PIGMENT[d.element] || 'metal';
          const dpig = pigments[dpKey].deep;
          const futureLocked = isFree && !d.isCurrent && !d.isPast;
          return (
            <div key={d.order} style={{
              flexShrink: 0, width: 84, minHeight: 96,
              borderRadius: 12, padding: '10px 8px',
              background: d.isCurrent ? withAlpha(dpig, '1A') : cardstockBg,
              border: d.isCurrent
                ? `1.5px solid ${withAlpha(gold, '40')}`
                : `1px solid ${paperHair}`,
              opacity: d.isPast ? 0.6 : futureLocked ? 0.45 : 1,
              filter: d.isPast ? 'grayscale(0.4)' : 'none',
              transform: d.isCurrent ? 'scale(1.03)' : 'none',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 4, textAlign: 'center', position: 'relative',
            }}>
              <span style={{
                fontFamily: "'EB Garamond', Georgia, serif", fontSize: 9.5,
                letterSpacing: 1, color: inkLight,
              }}>
                {d.startAge}–{d.endAge}
              </span>
              <span style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 18, color: dpig, lineHeight: 1 }}>
                {d.stem}{d.branch}
              </span>
              <span style={{
                fontFamily: "'EB Garamond', Georgia, serif", fontSize: 11,
                color: d.isCurrent ? ink : inkSoft,
              }}>
                {d.element}
              </span>
              {futureLocked && (
                <span aria-hidden="true" style={{ position: 'absolute', top: 6, right: 6, color: '#8a6d20' }}>
                  <Icon id="ico-lock" size={12} />
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Current decade reading */}
      {current && (
        <section style={{
          background: cardstockBg, border: `1px solid ${paperHair}`,
          borderRadius: 16, padding: '18px', marginBottom: 14,
        }}>
          <div style={{
            fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10,
            letterSpacing: 2.5, textTransform: 'uppercase',
            color: withAlpha(pig, 'CC'), fontWeight: 500, marginBottom: 8,
          }}>
            Current chapter · Age {current.startAge}–{current.endAge} · {current.startYear}–{current.endYear}
          </div>
          <div style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24,
            fontWeight: 500, color: ink, marginBottom: 12,
          }}>
            The {current.element} Decade
          </div>
          <p style={{
            fontFamily: "'EB Garamond', Georgia, serif", fontSize: 15,
            lineHeight: 1.75, color: inkSoft, margin: 0,
          }}>
            {decadeReading(current, ctx)}
          </p>
        </section>
      )}

      {/* Free-tier upsell for future decades */}
      {isFree && (
        <section style={{
          background: quietBg, border: `1px solid ${quietBorder}`,
          borderRadius: 16, padding: '16px 18px',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span aria-hidden="true" style={{ color: '#8a6d20' }}><Icon id="ico-lock" size={20} /></span>
          <div style={{
            fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13.5,
            color: inkSoft, lineHeight: 1.5,
          }}>
            Unlock every decade's full reading — past and future — with Seeker.
          </div>
        </section>
      )}
    </DetailShell>
  );
}
