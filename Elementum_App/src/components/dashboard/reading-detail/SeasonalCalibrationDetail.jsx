import { ELEMENT_TO_PIGMENT } from '../../../styles/elementPigments.js';
// ===================================================================
// ELEMENTUM · SeasonalCalibrationDetail  (DES_04 §11 Seasonal Calibration)
// ===================================================================
// Conditional reading (only when chart.missingElements is non-empty).
// For each absent element, a prescription: what that element would bring
// to the Day Master, derived from the five-element relationship (no
// authored per-chart content exists). Mirrors the §11 "corrective for the
// absent element" intent.
// ===================================================================

import DetailShell from './DetailShell.jsx';
import { useChart } from '../../../store/chartContext.jsx';
import { ElementMark } from '../../shared/icons';
import { elementArt } from '../../../styles/backgrounds.js';
import { ink, inkSoft, paperHair, cardstockBg, pigments, withAlpha } from '../../../styles/tokens';

const GEN = { Wood: 'Fire', Fire: 'Earth', Earth: 'Metal', Metal: 'Water', Water: 'Wood' };
const CTL = { Wood: 'Earth', Fire: 'Metal', Earth: 'Water', Metal: 'Wood', Water: 'Fire' };

// What a missing element X would bring to a Day Master of element D.
function prescription(missing, dm) {
  if (GEN[missing] === dm)
    return { role: 'Resource', text: `${missing} is the element that feeds your ${dm} nature. Its absence means support and grounding don't arrive on their own — you carry yourself further than most before the ground appears. Cultivate ${missing.toLowerCase()} environments (study, mentorship, rest, structure) deliberately; what others receive by default, you build.` };
  if (GEN[dm] === missing)
    return { role: 'Output', text: `${missing} is what your ${dm} nature naturally produces. Its absence means the outlet for what you hold isn't built in — expression and creation need a chosen channel. Make ${missing.toLowerCase()} a practice (making, voicing, shipping); without it the energy pools rather than flows.` };
  if (CTL[dm] === missing)
    return { role: 'Wealth', text: `${missing} is the territory your ${dm} nature acts on. Its absence means opportunity and reward don't fall into your lap — you reach for them. Seek ${missing.toLowerCase()} contexts (markets, action, the concrete) on purpose; the reaching is the practice.` };
  if (CTL[missing] === dm)
    return { role: 'Authority', text: `${missing} is the force that shapes and disciplines your ${dm} nature. Its absence means structure must be self-imposed — no external standard arrives to hold you. Welcome ${missing.toLowerCase()} pressure (deadlines, institutions, a worthy standard); it sharpens rather than constrains you.` };
  return { role: 'Companion', text: `More ${missing} would echo your own ${dm} nature.` };
}

// ── Complete-chart reading ─────────────────────────────────────────
// When no element is missing, the page would otherwise be a single line.
// This fills it with a genuine reading on the meaning, difficulty and
// practice of completeness — parameterized by the Day Master element so
// it reads naturally for every balanced chart.
const ELEMENT_VERB = {
  Wood:  'growth and reach', Fire: 'warmth and expression',
  Earth: 'grounding and patience', Metal: 'precision and resolve',
  Water: 'depth and adaptability',
};
function CompleteReading({ element, pig, pigKey }) {
  const others = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'].filter((e) => e !== element);
  const sections = [
    {
      eyebrow: 'The Reading',
      title: 'A complete chart',
      body: `All five elements are present in your chart — a rare completeness. Where most charts lean, missing something and spending a lifetime reaching for it, yours does not. You hold every register of energy at once: ${others.map((e) => ELEMENT_VERB[e]).join(', ')}, and the ${ELEMENT_VERB[element]} that is your own ${element} nature. The work of your chart is not supply. It is balance.`,
    },
    {
      eyebrow: 'The Gift',
      title: 'Versatility is native',
      body: `Because nothing is absent, you can draw on whichever energy the moment asks for — the patience of Earth when a thing needs to settle, the edge of Metal when it needs deciding, the flow of Water when it needs to move. Others borrow these modes with effort; you switch between them as a matter of temperament. People often experience you as someone who "contains multitudes" — capable in registers that rarely sit in one person.`,
    },
    {
      eyebrow: 'The Difficulty',
      title: 'The discipline of balance',
      body: `Completeness carries its own danger. When every element is available, nothing forces a choice — and the failure mode is diffusion: a little of everything, mastery of nothing. The reaching that drives a lopsided chart toward focus is absent in yours. So your discipline is the opposite one: not to acquire what you lack, but to govern what you hold. Choose where to concentrate. Let the other registers recede until they're called for.`,
    },
    {
      eyebrow: 'The Practice',
      title: 'Read the season, not the chart',
      body: `Because you carry all five elements internally, you are unusually sensitive to the external cycle. The day, the month, the year and the decade each tilt your balance from outside — amplifying one element, muting another. This is where your Today reading and Energy Map earn their place: they show which element the current season is raising in you, so you can lean with it or steady against it on purpose. For a complete chart, timing is the real instrument.`,
    },
  ];
  return (
    <>
      {sections.map((s, i) => (
        <section key={i} style={{
          background: cardstockBg, border: `1px solid ${paperHair}`,
          borderRadius: 16, padding: '18px', marginBottom: 14,
        }}>
          <div style={{
            fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10,
            letterSpacing: 2, textTransform: 'uppercase',
            color: withAlpha(pig || pigments[pigKey].deep, 'CC'), fontWeight: 500,
            marginBottom: 4,
          }}>{s.eyebrow}</div>
          <div style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 21, fontWeight: 500, color: ink, lineHeight: 1.15,
            marginBottom: 10,
          }}>{s.title}</div>
          <p style={{
            fontFamily: "'EB Garamond', Georgia, serif", fontSize: 15,
            lineHeight: 1.75, color: inkSoft, margin: 0,
          }}>{s.body}</p>
        </section>
      ))}
    </>
  );
}

export default function SeasonalCalibrationDetail({ onBack }) {
  const { chart } = useChart();
  const element = chart?.dayMaster?.element || 'Metal';
  const pig = pigments[ELEMENT_TO_PIGMENT[element]]?.deep;
  const missing = chart?.missingElements || [];

  return (
    <DetailShell
      onBack={onBack}
      pigment={pig}
      sectionKey="read-seasonal"
      hero={{
        element,
        artSrc: elementArt(element),
        eyebrow: 'Seasonal Calibration · 调 候',
        title: 'What your chart is missing',
        subtitle: missing.length
          ? `${missing.join(' · ')} — the element${missing.length > 1 ? 's' : ''} you cultivate rather than carry`
          : 'Your chart holds all five elements',
      }}
    >
      {missing.length === 0 && (
        <CompleteReading element={element} pig={pig} pigKey={ELEMENT_TO_PIGMENT[element] || 'metal'} />
      )}

      {missing.map((m) => {
        const mpKey = ELEMENT_TO_PIGMENT[m] || 'metal';
        const mpig = pigments[mpKey].deep;
        const rx = prescription(m, element);
        return (
          <section key={m} style={{
            background: cardstockBg, border: `1px solid ${paperHair}`,
            borderRadius: 16, padding: '18px', marginBottom: 14,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div aria-hidden="true" style={{
                width: 40, height: 40, borderRadius: 12,
                background: withAlpha(pigments[mpKey].base, '1A'),
                border: `1px dashed ${withAlpha(pigments[mpKey].base, '40')}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: mpig, flexShrink: 0,
              }}>
                <ElementMark element={mpKey} size={22} />
              </div>
              <div>
                <div style={{
                  fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10,
                  letterSpacing: 2, textTransform: 'uppercase',
                  color: withAlpha(mpig, 'CC'), fontWeight: 500,
                }}>Absent · {rx.role}</div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 21, fontWeight: 500, color: ink, lineHeight: 1.1,
                }}>{m}</div>
              </div>
            </div>
            <p style={{
              fontFamily: "'EB Garamond', Georgia, serif", fontSize: 15,
              lineHeight: 1.75, color: inkSoft, margin: 0,
            }}>{rx.text}</p>
          </section>
        );
      })}
    </DetailShell>
  );
}
