import { ELEMENT_TO_PIGMENT } from '../../../styles/elementPigments.js';
// ===================================================================
// ELEMENTUM · ForcesInMotionDetail  (DES_04 §11 Catalyst + Resistance)
// ===================================================================
// The "Forces in Motion" reading — what lifts you (Catalyst, ↑) and what
// wears you down (Resistance, ↓). Composes:
//   · Catalyst element   = chart.catalyst  · reading = manual.catalyst
//   · Resistance element = energyContext(chart).resistance · reading = manual.resistance
// (manual.* paragraphs are authored per stem, in the Day Master's register.)
// ===================================================================

import DetailShell from './DetailShell.jsx';
import { useChart } from '../../../store/chartContext.jsx';
import { STEM_CARD_DATA } from '../../../content/index.js';
import { energyContext } from '../../../engine/index.js';
import { ElementMark } from '../../shared/icons';
import { elementArt } from '../../../styles/backgrounds.js';
import { ink, inkSoft, paperHair, cardstockBg, pigments, withAlpha } from '../../../styles/tokens';


export default function ForcesInMotionDetail({ onBack }) {
  const { chart } = useChart();
  const stem = chart?.dayMaster?.stem || '庚';
  const element = chart?.dayMaster?.element || 'Metal';
  const data = STEM_CARD_DATA[stem] || STEM_CARD_DATA['庚'];
  const manual = data.manual || {};

  const ctx = energyContext(chart);
  const catalystEl = ctx.catalyst || chart?.catalyst || 'Fire';
  const resistanceEl = ctx.resistance || 'Earth';

  return (
    <DetailShell
      onBack={onBack}
      pigment={pigments[ELEMENT_TO_PIGMENT[element]]?.deep}
      sectionKey="read-forces"
      hero={{
        element,
        artSrc: elementArt(element),
        eyebrow: 'Forces in Motion · 动 力',
        title: 'What moves you',
        subtitle: 'The energies that lift you, and the ones that wear you down',
      }}
    >
      {manual.catalyst && (
        <ForceCard
          direction="up"
          label="What lifts you · Catalyst"
          element={catalystEl}
          reading={manual.catalyst}
        />
      )}
      {manual.resistance && (
        <ForceCard
          direction="down"
          label="What depletes you · Resistance"
          element={resistanceEl}
          reading={manual.resistance}
        />
      )}
      {!manual.catalyst && !manual.resistance && (
        <p style={{
          fontFamily: "'EB Garamond', Georgia, serif", fontSize: 15,
          lineHeight: 1.7, color: inkSoft, padding: '8px 2px',
        }}>
          Your catalyst is {catalystEl} and your resistance is {resistanceEl}.
          Full force readings for this stem are being prepared.
        </p>
      )}
    </DetailShell>
  );
}

function ForceCard({ direction, label, element, reading }) {
  const pigKey = ELEMENT_TO_PIGMENT[element] || 'metal';
  const pig = pigments[pigKey].deep;
  const up = direction === 'up';
  return (
    <section style={{
      background: cardstockBg,
      border: `1px solid ${paperHair}`,
      borderRadius: 16,
      padding: '18px',
      marginBottom: 14,
    }}>
      {/* Header: direction arrow + element badge + label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div aria-hidden="true" style={{
          width: 40, height: 40, borderRadius: 12,
          background: withAlpha(pigments[pigKey].base, '1A'),
          border: `1px solid ${withAlpha(pigments[pigKey].base, '40')}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: pig, flexShrink: 0, position: 'relative',
        }}>
          <ElementMark element={pigKey} size={22} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10,
            letterSpacing: 2, textTransform: 'uppercase',
            color: withAlpha(pig, 'CC'), fontWeight: 500,
          }}>
            {label}
          </div>
          <div style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 21, fontWeight: 500, color: ink, lineHeight: 1.1,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span aria-hidden="true" style={{ color: pig, fontSize: 17 }}>{up ? '↑' : '↓'}</span>
            {element}
          </div>
        </div>
      </div>
      <p style={{
        fontFamily: "'EB Garamond', Georgia, serif", fontSize: 15,
        lineHeight: 1.75, color: inkSoft, margin: 0,
      }}>
        {reading}
      </p>
    </section>
  );
}
