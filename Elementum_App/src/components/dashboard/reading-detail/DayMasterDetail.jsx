// ===================================================================
// ELEMENTUM · DayMasterDetail
// ===================================================================
// Second built-out reading-detail page (Q2.b). The "who you are as a
// day-master stem" page. Pulls from STEM_CARD_DATA[stem].identity:
//   · archetypeName (e.g. "The Blade")
//   · archetypeLabel ("Yang Metal — The Blade")
//   · manifesto ("Precision before intention · An edge is never given…")
//   · elementIntro.expand (codex-register description)
//   · subtitle (impulse line)
//   · CLASSICAL_STEM_ANCHORS[stem] (classical principle + translation)
//     when available — surfaces the source-grounding for the curious.
// ===================================================================

import React from 'react';
import DetailShell from './DetailShell.jsx';
import { useChart } from '../../../store/chartContext.jsx';
import { STEM_CARD_DATA, CLASSICAL_STEM_ANCHORS } from '../../../content/archetypeSource.js';
import { readingDetailBg, elementArt } from '../../../styles/backgrounds.js';
import {
  ink, inkSoft, inkLight, bronzeDark,
  paperHair, cardstockBg, silk,
  pigments, withAlpha,
} from '../../../styles/tokens';

const HANZI_TO_STEM = {
  '甲': 'jia',  '乙': 'yi',   '丙': 'bing', '丁': 'ding',
  '戊': 'wu',   '己': 'ji',   '庚': 'geng', '辛': 'xin',
  '壬': 'ren',  '癸': 'gui',
};
const HANZI_TO_PINYIN = {
  '甲': 'Jiǎ',  '乙': 'Yǐ',   '丙': 'Bǐng', '丁': 'Dīng',
  '戊': 'Wù',   '己': 'Jǐ',   '庚': 'Gēng', '辛': 'Xīn',
  '壬': 'Rén',  '癸': 'Guǐ',
};
const ELEMENT_TO_PIGMENT = {
  Metal: 'metal', Wood: 'wood', Fire: 'fire',
  Earth: 'earth', Water: 'water',
};

export default function DayMasterDetail({ onBack }) {
  const { chart } = useChart();
  const stem = chart?.dayMaster?.stem || '庚';
  const element = chart?.dayMaster?.element || 'Metal';
  const polarity = chart?.dayMaster?.polarity || 'yang';
  const data = STEM_CARD_DATA[stem] || STEM_CARD_DATA['庚'];

  const stemKey = HANZI_TO_STEM[stem] || 'geng';
  const pinyin = HANZI_TO_PINYIN[stem] || stem;
  const pigmentKey = ELEMENT_TO_PIGMENT[element] || 'metal';
  const pigment = pigments[pigmentKey].deep;
  const pigmentBase = pigments[pigmentKey].base;

  const identity = data.identity || {};
  const anchor = CLASSICAL_STEM_ANCHORS[stem];

  // Manifesto splits on ` · ` into [thesis, poetic edge] per the
  // STEM_CARD_DATA comments.
  const [manifestoThesis, manifestoPoem] = (identity.manifesto || '').split(' · ');

  return (
    <DetailShell
      onBack={onBack}
      pigment={pigment}
      bg={readingDetailBg(element)}
      sectionKey="read-daymaster"
      sealStem={stem}
      hero={{
        element,
        artSrc: elementArt(element),
        eyebrow: 'Day Master · 日 主',
        title: identity.archetypeName || `${element} (${polarity})`,
        subtitle: `${stem} · ${pinyin} · ${identity.archetypeLabel || `${polarity} ${element}`}`,
      }}
    >
      {/* ── MANIFESTO — italic sub-headline (§AM.10), centered ─────── */}
      {manifestoThesis && (
        <div style={{
          textAlign: 'center',
          padding: '6px 8px 4px',
          marginBottom: 16,
        }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 21, fontStyle: 'italic', fontWeight: 500,
            color: inkSoft, lineHeight: 1.4, maxWidth: 300, margin: '0 auto',
          }}>
            {manifestoThesis}
            {manifestoPoem && (
              <span style={{ display: 'block', marginTop: 4, color: inkLight, fontSize: 18 }}>
                {manifestoPoem}
              </span>
            )}
          </div>
        </div>
      )}

      {/* ── SUBTITLE / IMPULSE LINE ─────────────────────────────── */}
      {data.subtitle && (
        <p style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 14,
          color: inkSoft,
          lineHeight: 1.65,
          margin: '0 0 14px',
          padding: '0 4px',
        }}>
          {data.subtitle}
        </p>
      )}

      {/* ── ELEMENT INTRO — codex register ──────────────────────── */}
      {identity.elementIntro?.expand && (
        <Card pigment={pigment} eyebrow="THE ELEMENT">
          <p style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 15,
            lineHeight: 1.75,
            color: ink,
            margin: 0,
          }}>
            {identity.elementIntro.punch && (
              <span style={{ display: 'block', fontWeight: 500, marginBottom: 8 }}>
                {identity.elementIntro.punch}
              </span>
            )}
            {identity.elementIntro.expand}
          </p>
        </Card>
      )}

      {/* ── CLASSICAL ANCHOR — source-grounding for power users ─── */}
      {anchor && (
        <Card pigment={pigment} eyebrow="CLASSICAL SOURCE">
          <div style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 17,
            color: ink,
            letterSpacing: 0.5,
            marginBottom: 8,
          }}>
            {anchor.principle}
          </div>
          <p style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 14,
            lineHeight: 1.7,
            color: inkSoft,
            margin: '0 0 8px',
          }}>
            {anchor.translation}
          </p>
          <div style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 11.5,
            color: inkLight,
            letterSpacing: 0.4,
            fontStyle: 'italic',
          }}>
            — {anchor.source}
          </div>
        </Card>
      )}

      {/* ── WHAT THE DAY MASTER IS — universal grounding so every stem's
            page reads in full, not just the ones with a classical anchor ── */}
      <Card pigment={pigment} eyebrow="WHAT THIS IS">
        <p style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 15, lineHeight: 1.75, color: ink, margin: 0,
        }}>
          Of the eight characters in your chart, one is you: the{' '}
          <span style={{ fontFamily: "'Noto Serif SC', serif", color: pigment }}>{stem}</span>{' '}
          stem of the day pillar — your <b>Day Master</b>. Everything else is
          read in relation to it. The Day Master is not a trait among traits;
          it is the lens. Where the other pillars describe the forces, seasons
          and people around you, the Day Master is the standpoint from which all
          of it is met. To know your {element} Day Master is to know the
          temperament that arrives at every circumstance first.
        </p>
      </Card>

      {/* ── POLARITY READING — Yang/Yin face of the element ─────────── */}
      <Card pigment={pigment} eyebrow={`${polarity === 'yin' ? 'Yin' : 'Yang'} ${element}`}>
        <p style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 15, lineHeight: 1.75, color: inkSoft, margin: 0,
        }}>
          {polarity === 'yin' ? (
            <>
              <span style={{ fontFamily: "'Noto Serif SC', serif", color: pigment }}>{stem}</span>{' '}
              is the <b>Yin face of {element}</b> — {element.toLowerCase()} turned
              inward. Where Yang {element.toLowerCase()} extends and declares, your
              nature refines, conserves and perfects. You shape by attention rather
              than force, working beneath the surface where the result shows but the
              labour does not. The cost is that your effort is easy to miss; the gift
              is a precision louder natures rarely reach.
            </>
          ) : (
            <>
              <span style={{ fontFamily: "'Noto Serif SC', serif", color: pigment }}>{stem}</span>{' '}
              is the <b>Yang face of {element}</b> — {element.toLowerCase()} turned
              outward. Where Yin {element.toLowerCase()} refines and conserves, your
              nature extends, structures and declares. You do not wait to be drawn
              out; you arrive. The cost of that directness is subtlety — what is
              obvious to you often needs translating for those who move more quietly.
              The gift is that people always know exactly where you stand.
            </>
          )}
        </p>
      </Card>

      {/* Quiet link to the raw four-pillar chart (DOC5 §11) */}
      <button
        type="button"
        onClick={() => { if (typeof window !== 'undefined') window.location.hash = '#/chart-reveal'; }}
        style={{
          appearance: 'none', background: 'transparent', border: 'none',
          margin: '2px auto 8px', display: 'inline-flex', alignItems: 'center', gap: 6,
          color: inkLight, cursor: 'pointer',
          fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13, letterSpacing: 0.4,
          borderBottom: `1px dashed ${paperHair}`, paddingBottom: 2,
        }}
      >
        ◦ View your birth chart →
      </button>
    </DetailShell>
  );
}

function Card({ pigment, eyebrow, children }) {
  return (
    <section style={{
      background: cardstockBg,
      border: `1px solid ${paperHair}`,
      borderRadius: 16,
      padding: '18px 18px 20px',
      marginBottom: 14,
    }}>
      {eyebrow && (
        <div style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 10,
          letterSpacing: 2.5,
          textTransform: 'uppercase',
          color: pigment ? withAlpha(pigment, 'CC') : bronzeDark,
          fontWeight: 500,
          marginBottom: 14,
        }}>
          {eyebrow}
        </div>
      )}
      {children}
    </section>
  );
}
