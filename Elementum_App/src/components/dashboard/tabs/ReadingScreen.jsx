// ===================================================================
// ELEMENTUM · ReadingScreen — tiered pyramid · Inkstone art system
// ===================================================================
// Direction 2 layout (mosaic hub) × Thumbnail Card Moodboard recipes.
//
//   1. Day-master SCENE-HERO (264) — moodboard ink-wash treatment +
//      centered 庚 stem mark + eyebrow / archetype / polarity overlay.
//   2. "Readings" / "Energy Map →" header.
//   3. Featured Elemental Nature (104) — silk-paper footer recipe,
//      seal mark badge + hanzi watermark, per-stem painting.
//   4. Themed pair (140) — Dominant Energies + Forces in Motion,
//      footer recipe each, per-element painting.
//   5. Compact pair (84) — Life Chapters + Pillar Patterns, footer
//      recipe (compact), generic landscape for the pillar-patterns
//      tile (non-element-themed feature).
//
// Each tile picks its painting via stemArt(stem) or elementArt(element).
// ===================================================================

import React from 'react';
import { useChart } from '../../../store/chartContext.jsx';
import { Icon } from '../../shared/icons';
import { VisualTile, MoodboardArt } from '../VisualTile.jsx';
import {
  elementArt, stemArt, tileArt, genericCardArt, dedupeArt,
} from '../../../styles/backgrounds.js';
import { STEM_CARD_DATA } from '../../../content/archetypeSource.js';
import {
  bronzeDark, paperHair, pigments, withAlpha,
} from '../../../styles/tokens';

const ELEMENT_TO_PIGMENT = {
  Metal: 'metal', Wood: 'wood', Fire: 'fire', Earth: 'earth', Water: 'water',
};
const ELEMENT_HANZI = {
  Metal: '金', Wood: '木', Fire: '火', Earth: '土', Water: '水',
};
const HANZI_PINYIN = {
  '甲': 'Yang Wood',  '乙': 'Yin Wood',  '丙': 'Yang Fire', '丁': 'Yin Fire',
  '戊': 'Yang Earth', '己': 'Yin Earth', '庚': 'Yang Metal', '辛': 'Yin Metal',
  '壬': 'Yang Water', '癸': 'Yin Water',
};
// Yin counterpart of each Yang stem (for visual variety on the secondary tile).
const YIN_OF = {
  '甲': '乙', '丙': '丁', '戊': '己', '庚': '辛', '壬': '癸',
};
// Featured Elemental Nature subtitle — one motif per element family.
const ELEMENTAL_NATURE_SUB = {
  Metal: 'The forged edge — precise, exacting.',
  Wood:  'The growing tree — vital, upward.',
  Fire:  'The open blaze — radiant, expressive.',
  Earth: 'The standing mountain — stable, enduring.',
  Water: 'The flowing deep — wise, adaptive.',
};

export default function ReadingScreen({ onOpen, onOpenEnergyMap }) {
  const { chart } = useChart();

  const dmHanzi = chart?.dayMaster?.stem || '庚';
  const dmElement = chart?.dayMaster?.element || 'Metal';
  const dmHanziChar = ELEMENT_HANZI[dmElement] || '金';
  const pigmentKey = ELEMENT_TO_PIGMENT[dmElement] || 'metal';
  const pig = pigments[pigmentKey];
  const archetype = STEM_CARD_DATA[dmHanzi]?.identity?.archetypeName || `${dmElement} Day Master`;
  const polarityLabel = HANZI_PINYIN[dmHanzi] || dmElement;

  // Catalyst & decade — drive the Forces and Life Chapters tiles.
  const catalystEl = chart?.catalyst || 'Fire';
  const catalystKey = ELEMENT_TO_PIGMENT[catalystEl] || 'fire';
  const catalystHanzi = ELEMENT_HANZI[catalystEl] || '火';
  const decade = (chart?.luckPillars || []).find((p) => p.isCurrent);
  const decadeEl = decade?.element || dmElement;
  const decadeKey = ELEMENT_TO_PIGMENT[decadeEl] || pigmentKey;
  const decadeHanzi = ELEMENT_HANZI[decadeEl] || dmHanziChar;

  // Secondary stem (Yin counterpart) for the Dominant tile — gives
  // visual variety against the featured Elemental Nature painting.
  const yinStem = YIN_OF[dmHanzi] || dmHanzi;

  const go = (route) => () => onOpen?.(route);

  // ── Design rule: no two thumbnails on this page share the same painting.
  // We declare each tile's preferred art slot; dedupeArt walks the family
  // and bumps any collision to the next variant.
  const arts = React.useMemo(() => dedupeArt([
    { key: 'elemental', kind: 'tile', element: dmElement, n: 1 },
    { key: 'dominant',  kind: 'tile', element: dmElement, n: 3 },
    { key: 'forces',    kind: 'tile', element: catalystEl, n: 1 },
    { key: 'chapters',  kind: 'card', n: 20, range: [15, 20] },
    { key: 'patterns',  kind: 'card', n: 16, range: [15, 20] },
  ]), [dmElement, catalystEl]);

  return (
    <main style={{ minHeight: '100%', padding: '0 0 24px' }}>
      {/* ── 1. Day-master SCENE-HERO — full-bleed at top edge ───── */}
      <DayMasterHero
        stem={dmHanzi}
        archetype={archetype}
        polarityLabel={polarityLabel}
        dmElement={dmElement}
        pig={pig}
        onClick={go('read-daymaster')}
      />

      {/* ── 2. Page header ───────────────────────────────────────── */}
      <header style={{
        padding: '14px 18px 12px',
        borderBottom: `1px solid ${paperHair}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      }}>
        <span style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
          color: bronzeDark, fontWeight: 500,
        }}>
          Readings
        </span>
        <button
          type="button"
          onClick={onOpenEnergyMap}
          style={{
            appearance: 'none', background: 'transparent', border: 'none',
            padding: '2px 0', fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 13, fontStyle: 'italic', color: bronzeDark, cursor: 'pointer',
            borderBottom: `1px dashed ${paperHair}`,
            display: 'inline-flex', alignItems: 'center', gap: 4,
          }}
        >
          Energy Map
          <Icon id="ico-arrow-r" size={12} color={bronzeDark} />
        </button>
      </header>

      {/* ── 3. Tiered tile pyramid (Inkstone footer recipe) ──────── */}
      <div style={{
        padding: '11px 18px 0',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        {/* Featured Elemental Nature — themed catalogue tile (DM element, stem variant) */}
        <VisualTile
          variant="footer"
          pigment={pigmentKey}
          iconId="read-elemental"
          hanzi={dmHanziChar}
          eyebrow="Base Energy · Primary"
          title="Elemental Nature"
          subtitle={ELEMENTAL_NATURE_SUB[dmElement] || ELEMENTAL_NATURE_SUB.Metal}
          artSrc={arts.elemental}
          height={148}
          onClick={go('read-elemental')}
        />

        {/* Themed pair — frame ~108 + 2-line eyebrow + 2-line title */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <VisualTile
            variant="footer"
            pigment={pigmentKey}
            iconId="read-dominant"
            hanzi={dmHanziChar}
            eyebrow="Primary · Secondary"
            title={<>Dominant<br/>Energies</>}
            titleSize={17}
            artSrc={arts.dominant}
            height={188}
            ariaLabel="Dominant Energies"
            onClick={go('read-tengods')}
          />
          <VisualTile
            variant="footer"
            pigment={catalystKey}
            iconId="read-forces"
            hanzi={catalystHanzi}
            eyebrow="Catalyst · Resistance"
            title={<>Forces in<br/>Motion</>}
            titleSize={17}
            artSrc={arts.forces}
            height={188}
            ariaLabel="Forces in Motion"
            onClick={go('read-forces')}
          />
        </div>

        {/* Compact pair — generic wide cards (per library Screen→Card map) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <VisualTile
            variant="footer"
            pigment="wood"
            iconId="read-chapters"
            hanzi="木"
            eyebrow="Your Decades"
            title="Life Chapters"
            artSrc={arts.chapters}
            height={124}
            compact
            onClick={go('read-chapters')}
          />
          <VisualTile
            variant="footer"
            pigment="water"
            iconId="read-pillars"
            hanzi="水"
            eyebrow="Four Pillars"
            title="Pillar Patterns"
            artSrc={arts.patterns}
            height={124}
            compact
            onClick={go('read-patterns')}
          />
        </div>
      </div>
    </main>
  );
}

// ───────────────────────────────────────────────────────────────────
// DayMasterHero — 264-px hero with the moodboard ink-wash treatment.
// The day-master stem hanzi sits in a 92×92 frosted mark, centered,
// over eyebrow / archetype / polarity. Tap → Day Master detail.
// ───────────────────────────────────────────────────────────────────
function DayMasterHero({ stem, archetype, polarityLabel, dmElement, pig, onClick }) {
  const [pressed, setPressed] = React.useState(false);
  const artUrl = stemArt(stem) || elementArt(dmElement);
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Day Master ${stem} ${archetype} — open detail`}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        appearance: 'none', position: 'relative', display: 'block',
        width: '100%', height: 250,
        border: 'none', borderRadius: 0, overflow: 'hidden', padding: 0, cursor: 'pointer',
        background: `linear-gradient(135deg, ${withAlpha(pig.base, '10')}, ${withAlpha(pig.base, '40')})`,
        transform: pressed ? 'scale(0.997)' : 'none',
        transition: 'transform 140ms cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {/* Moodboard art stack + soft radial scrim (rendered-screens recipe) */}
      <MoodboardArt src={artUrl} pigBase={pig.base} scrim={false} />
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background:
          'linear-gradient(to top, rgba(20,17,13,.66), rgba(20,17,13,.14) 56%, transparent 78%), ' +
          'radial-gradient(58% 48% at 50% 44%, rgba(20,17,13,.30), transparent)',
      }} />

      {/* Centered stem mark + caption — 86×86 frosted mark per rendered spec */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 10, padding: 18, textAlign: 'center',
      }}>
        <div style={{
          width: 86, height: 86, borderRadius: 18,
          border: '1px solid rgba(248,244,236,0.4)',
          background: 'rgba(248,244,236,0.14)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#F3ECDD',
          fontFamily: "'Noto Serif SC', serif", fontSize: 40, lineHeight: 1,
        }}>
          {stem}
        </div>
        <div>
          <div style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
            color: '#E7D7B6', fontWeight: 500,
          }}>
            Your Day Master
          </div>
          <div style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 33, fontWeight: 500, color: '#F6F1E6', lineHeight: 1.02,
            marginTop: 4,
          }}>
            {archetype}
          </div>
          <div style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 13, color: '#DCCFB6', marginTop: 3,
          }}>
            {stem} · {polarityLabel}
          </div>
        </div>
      </div>
    </button>
  );
}
