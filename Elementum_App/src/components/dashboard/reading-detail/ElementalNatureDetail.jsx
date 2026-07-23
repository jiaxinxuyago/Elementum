import { ELEMENT_TO_PIGMENT } from '../../../styles/elementPigments.js';
// ===================================================================
// ELEMENTUM · ElementalNatureDetail
// ===================================================================
// First built-out reading-detail page (Q2.b). Renders:
//   · Eyebrow + title (via DetailShell)
//   · "Your Nature" card — phrase + 2nd-person portrait
//   · "Gifts & Shadows" — paired phrase + 1-sentence desc
//   · "How you move in the world" — variant block resolved from chart
//     (uses the `default` variant — sufficient for all 10 stems)
//
// Data source: STEM_CARD_DATA[stem].yourNature / .gifts / .shadows / .blocks
// All 10 stems populate these fields (depth varies — 庚 is canonical).
// ===================================================================

import DetailShell from './DetailShell.jsx';
import { useChart } from '../../../store/chartContext.jsx';
import { STEM_CARD_DATA, resolveArchetype, resolveBlock } from '../../../content/index.js';
import { readingDetailBg, elementArt } from '../../../styles/backgrounds.js';
import {
  ink, inkSoft, inkLight, paperHair,
  pigments, cardstockBg, withAlpha,
} from '../../../styles/tokens';


export default function ElementalNatureDetail({ onBack }) {
  const { chart } = useChart();
  const stem = chart?.dayMaster?.stem || '庚';
  const element = chart?.dayMaster?.element || 'Metal';
  const baseline = STEM_CARD_DATA[stem] || STEM_CARD_DATA['庚'];
  // Generation layer (REA_03 §9): merge the band×pattern variant over the
  // stem baseline so yourNature/gifts/shadows match THIS chart, not the
  // generic default.
  const data = resolveArchetype(stem, baseline, chart);

  const pigmentKey = ELEMENT_TO_PIGMENT[element] || 'metal';
  const pigment = pigments[pigmentKey].deep;
  const pigmentBase = pigments[pigmentKey].base;

  // Resolve each block's text to the chart's band×pattern variant
  // (band_pattern → band → pattern → default).
  const blocks = (baseline.blocks || []).slice(0, 2).map((b) => resolveBlock(b, chart));

  const gifts = data.gifts || [];
  const shadows = data.shadows || [];

  const polarity = chart?.dayMaster?.polarity === 'yin' ? 'Yin' : 'Yang';

  return (
    <DetailShell
      onBack={onBack}
      pigment={pigment}
      bg={readingDetailBg(element)}
      sectionKey="read-elemental"
      hero={{
        element,
        artSrc: elementArt(element),
        eyebrow: 'Elemental Nature · 元素之性',
        title: 'Your elemental nature',
        subtitle: `${element} · ${polarity}`,
      }}
    >
      {/* ── YOUR NATURE — portrait card ─────────────────────────────── */}
      {data.yourNature && (
        <SectionCard pigment={pigment} eyebrow="YOUR NATURE">
          <p
            style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 16,
              lineHeight: 1.75,
              color: ink,
              margin: 0,
            }}
          >
            {data.yourNature.desc}
          </p>
        </SectionCard>
      )}

      {/* ── CHIPS — single row of stem keyword chips ────────────────── */}
      {Array.isArray(data.chips) && data.chips.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
            marginBottom: 18,
          }}
        >
          {data.chips.map((chip) => (
            <span
              key={chip}
              style={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontSize: 11.5,
                color: ink,
                background: withAlpha(pigmentBase, '10'),
                border: `1px solid ${withAlpha(pigmentBase, '40')}`,
                padding: '4px 10px',
                borderRadius: 999,
                letterSpacing: 0.2,
              }}
            >
              {chip}
            </span>
          ))}
        </div>
      )}

      {/* ── BLOCKS — variant readings ───────────────────────────────── */}
      {blocks.map((b, i) => (
        <SectionCard
          key={`block-${i}`}
          pigment={pigment}
          eyebrow={b.label.toUpperCase()}
        >
          {b.text.split('\n\n').map((para, pi) => (
            <p
              key={pi}
              style={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontSize: 15,
                lineHeight: 1.8,
                color: inkSoft,
                margin: pi === 0 ? 0 : '14px 0 0',
              }}
            >
              {para}
            </p>
          ))}
        </SectionCard>
      ))}

      {/* ── GIFTS & SHADOWS — paired list ──────────────────────────── */}
      {(gifts.length > 0 || shadows.length > 0) && (
        <div style={{ marginBottom: 12 }}>
          {gifts.length > 0 && (
            <SectionCard pigment={pigment} eyebrow="GIFTS">
              <PhraseList items={gifts} pigment={pigment} />
            </SectionCard>
          )}
          {shadows.length > 0 && (
            <SectionCard pigment={pigment} eyebrow="SHADOWS">
              <PhraseList items={shadows} pigment={pigment} />
            </SectionCard>
          )}
        </div>
      )}
    </DetailShell>
  );
}

// ───────────────────────────────────────────────────────────────────
// SectionCard — cardstock surface + eyebrow + body slot.
// Stays within the alpha ladder (CC for eyebrow, 10/40 for borders if
// pigment-tinted would be used — here we keep neutral paperHair).
// ───────────────────────────────────────────────────────────────────
function SectionCard({ pigment, eyebrow, children }) {
  return (
    <section
      style={{
        background: cardstockBg,
        border: `1px solid ${paperHair}`,
        borderRadius: 16,
        padding: '18px 18px 20px',
        marginBottom: 14,
      }}
    >
      {eyebrow && (
        <div
          style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 10,
            letterSpacing: 2.5,
            textTransform: 'uppercase',
            color: pigment ? withAlpha(pigment, 'CC') : inkLight,
            fontWeight: 500,
            marginBottom: 14,
          }}
        >
          {eyebrow}
        </div>
      )}
      {children}
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
// PhraseList — renders [{phrase, desc}, ...] as a stacked list with
// a leading bullet in the element pigment.
// ───────────────────────────────────────────────────────────────────
function PhraseList({ items, pigment }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {items.map((it, i) => (
        <li
          key={i}
          style={{
            display: 'flex',
            gap: 12,
            paddingTop: i === 0 ? 0 : 14,
            marginTop: i === 0 ? 0 : 12,
            borderTop: i === 0 ? 'none' : `1px solid ${paperHair}`,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              flexShrink: 0,
              width: 6, height: 6,
              borderRadius: 999,
              background: pigment,
              marginTop: 8,
            }}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 17,
                fontWeight: 500,
                color: ink,
                lineHeight: 1.25,
                marginBottom: 4,
              }}
            >
              {it.phrase}
            </div>
            <div
              style={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontSize: 14,
                lineHeight: 1.6,
                color: inkSoft,
              }}
            >
              {it.desc}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
