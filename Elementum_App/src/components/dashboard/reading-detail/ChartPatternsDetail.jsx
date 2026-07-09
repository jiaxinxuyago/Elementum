import { ELEMENT_TO_PIGMENT } from '../../../styles/elementPigments.js';
// ===================================================================
// ELEMENTUM · ChartPatternsDetail  (DES_04 §11 Chart Patterns / 合冲刑害)
// ===================================================================
// Renders chart.patterns (detected by calculator.detectPatterns) as
// pattern cards. Each pattern type carries a pigment + templated reading.
// Tier (DES_04 §11): Free → count badge + names, readings locked; Seeker →
// full readings.
// ===================================================================

import DetailShell from './DetailShell.jsx';
import { useChart } from '../../../store/chartContext.jsx';
import { useUpgrade } from '../UpgradeModal.jsx';
import { Icon } from '../../shared/icons';
import { elementArt } from '../../../styles/backgrounds.js';
import { ink, inkSoft, inkLight, bronzeDark, gold, paperHair, cardstockBg, pigments, withAlpha } from '../../../styles/tokens';


// Pattern type → pigment + name + templated meaning (DES_04 §11 styling:
// Combination 合=Wood, Clash 冲=Fire, Penalty 刑=Metal, Harm 害=Water).
const PATTERN_META = {
  combination: {
    pig: 'wood', name: 'Combination',
    gloss: (els) => `${els[0]} and ${els[1]} bind together — a place in your chart where two forces merge into something steadier than either alone. Bonds form easily here; the risk is that the merge dulls the edge of what each brought separately.`,
  },
  clash: {
    pig: 'fire', name: 'Clash',
    gloss: (els) => `${els[0]} meets ${els[1]} head-on — a fault line of movement and tension. Things rarely sit still here. Handled well it is the engine of change; handled poorly it is where the same conflict keeps recurring.`,
  },
  penalty: {
    pig: 'metal', name: 'Penalty',
    gloss: (els) => `A friction pattern among ${els.join(', ')} — the classical 刑, where pressure builds through repetition rather than collision. It asks for honesty about a recurring cost you may have normalized.`,
  },
  harm: {
    pig: 'water', name: 'Harm',
    gloss: (els) => `${els[0]} quietly erodes ${els[1]} — the subtlest of the relationships. Nothing dramatic; just a slow drain in one corner of life that is easy to miss until you name it.`,
  },
};

export default function ChartPatternsDetail({ onBack }) {
  const { chart, tier } = useChart();
  const { openUpgrade } = useUpgrade();
  const element = chart?.dayMaster?.element || 'Metal';
  const pig = pigments[ELEMENT_TO_PIGMENT[element]]?.deep;
  const patterns = chart?.patterns || [];
  const isFree = tier === 'free';

  return (
    <DetailShell
      onBack={onBack}
      pigment={pig}
      sectionKey="read-patterns"
      hero={{
        element,
        artSrc: elementArt(element),
        eyebrow: 'Pillar Patterns · 合 冲 刑 害',
        title: 'Patterns in your chart',
        subtitle: `${patterns.length} active ${patterns.length === 1 ? 'pattern' : 'patterns'} across your four pillars`,
      }}
    >
      {patterns.length === 0 && (
        <p style={{
          fontFamily: "'EB Garamond', Georgia, serif", fontSize: 15,
          lineHeight: 1.7, color: inkSoft, padding: '8px 2px',
        }}>
          Your four pillars sit in quiet relation — no major combinations,
          clashes, penalties, or harms between the branches. A chart without
          strong patterns runs with less internal weather than most.
        </p>
      )}

      {patterns.map((p, i) => {
        const meta = PATTERN_META[p.type] || PATTERN_META.combination;
        const ppig = pigments[meta.pig].deep;
        return (
          <section key={i} style={{
            background: cardstockBg, border: `1px solid ${paperHair}`,
            borderRadius: 16, padding: '18px', marginBottom: 14,
          }}>
            {/* Pattern badge + name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{
                fontFamily: "'Noto Serif SC', serif", fontSize: 22, color: ppig,
                lineHeight: 1,
              }}>{p.zh}</span>
              <div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 19, fontWeight: 500, color: ink, lineHeight: 1.1,
                }}>{meta.name}</div>
                <div style={{
                  fontFamily: "'EB Garamond', Georgia, serif", fontSize: 12,
                  color: inkLight, letterSpacing: 0.3,
                }}>
                  {p.branches.join(' · ')} — {p.elements.join(' / ')}
                </div>
              </div>
            </div>
            {/* Reading — gated at Free */}
            {isFree ? (
              <div style={{
                position: 'relative',
                fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14.5,
                lineHeight: 1.7, color: inkSoft,
              }}>
                <span style={{ filter: 'blur(4px)', userSelect: 'none', opacity: 0.6 }}>
                  {meta.gloss(p.elements)}
                </span>
              </div>
            ) : (
              <p style={{
                fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14.5,
                lineHeight: 1.7, color: inkSoft, margin: 0,
              }}>
                {meta.gloss(p.elements)}
              </p>
            )}
          </section>
        );
      })}

      {/* Free-tier unlock */}
      {isFree && patterns.length > 0 && (
        <button
          type="button"
          onClick={() => openUpgrade('Pillar Patterns')}
          style={{
            width: '100%', padding: '14px', borderRadius: 999,
            border: `1px solid ${withAlpha(gold, '40')}`,
            background: withAlpha(gold, '10'), color: bronzeDark, cursor: 'pointer',
            fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}
        >
          <Icon id="ico-lock" size={14} color={bronzeDark} />
          Unlock all pattern readings with Seeker
        </button>
      )}
    </DetailShell>
  );
}
