// ===================================================================
// ELEMENTUM · ReadingScreen (Reading-tab catalogue) — visual mosaic
// ===================================================================
// The Reading tab home. DOC5 §AM.1 + legend-screens-amendment §A2,
// upgraded from flat list-rows to a picture-rich mosaic (P2):
//
//   1. Day-master SceneHero  — painterly element art + archetype overlay;
//      taps into the Day Master detail page.
//   2. Page header           — "Readings" eyebrow + "Energy Map →" link.
//   3. VisualTile grid (2-col) — each reading section as an element-tinted
//      thumbnail with ink mark + label + title. Locked sections carry the
//      tier chip and (Phase 5) route to the upgrade modal.
//
// Per-section pigments give the grid visual variety (sanctioned by §A2,
// which already mixed pigments across catalogue cards).
// ===================================================================

import React from 'react';
import { useChart } from '../../../store/chartContext.jsx';
import { useUpgrade } from '../UpgradeModal.jsx';
import { Icon } from '../../shared/icons';
import { VisualTile, SceneHero } from '../VisualTile.jsx';
import { elementArt } from '../../../styles/backgrounds.js';
import { STEM_CARD_DATA } from '../../../content/archetypeSource.js';
import {
  ink, inkLight, bronzeDark, paperHair,
} from '../../../styles/tokens';

const ELEMENT_TO_PIGMENT = {
  Metal: 'metal', Wood: 'wood', Fire: 'fire', Earth: 'earth', Water: 'water',
};
const HANZI_PINYIN = {
  '甲': 'Yang Wood',  '乙': 'Yin Wood',  '丙': 'Yang Fire', '丁': 'Yin Fire',
  '戊': 'Yang Earth', '己': 'Yin Earth', '庚': 'Yang Metal', '辛': 'Yin Metal',
  '壬': 'Yang Water', '癸': 'Yin Water',
};

export default function ReadingScreen({ onOpen, onOpenEnergyMap }) {
  const { chart, tier } = useChart();
  const { openUpgrade } = useUpgrade();

  const dmHanzi = chart?.dayMaster?.stem || '庚';
  const dmElement = chart?.dayMaster?.element || 'Metal';
  const pigmentKey = ELEMENT_TO_PIGMENT[dmElement] || 'metal';
  // Archetype name lives in the content layer, not the calculated chart.
  const archetype = STEM_CARD_DATA[dmHanzi]?.identity?.archetypeName || `${dmElement} Day Master`;
  const polarityLabel = HANZI_PINYIN[dmHanzi] || dmElement;

  const isFree = tier === 'free';
  const go = (route) => () => onOpen?.(route);

  return (
    <main style={{ minHeight: '100%', padding: '54px 0 24px' }}>
      {/* ── 1. Day-master scene hero ───────────────────────────────── */}
      <div style={{ padding: '0 22px 6px' }}>
        <SceneHero
          element={dmElement}
          artSrc={elementArt(dmElement)}
          eyebrow="Your Day Master"
          title={archetype}
          subtitle={`${dmHanzi} · ${polarityLabel}`}
          height={208}
          onClick={go('read-daymaster')}
          ariaLabel={`Day Master ${dmHanzi} ${archetype} — open detail`}
        />
      </div>

      {/* ── 2. Page header ─────────────────────────────────────────── */}
      <header style={{
        padding: '16px 22px 14px',
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

      {/* ── 3. Reading-section tile grid ───────────────────────────── */}
      <div style={{
        padding: '16px 22px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
      }}>
        <VisualTile
          pigment={pigmentKey}
          iconId="read-elemental"
          eyebrow="Base energy"
          title="Elemental Nature"
          onClick={go('read-elemental')}
        />
        <VisualTile
          pigment={pigmentKey}
          iconId="read-dominant"
          eyebrow="Primary · secondary"
          title="Dominant Energies"
          artSrc={elementArt(dmElement)}
          onClick={go('read-tengods')}
        />
        <VisualTile
          pigment="fire"
          iconId="read-forces"
          eyebrow="Catalyst · resistance"
          title="Forces in Motion"
          onClick={go('read-forces')}
        />
        <VisualTile
          pigment="earth"
          iconId="read-chapters"
          eyebrow="Your decades"
          title="Life Chapters"
          onClick={go('read-chapters')}
        />
        <VisualTile
          pigment="water"
          iconId="read-elemental"
          eyebrow="Daily"
          title="Daily Reading"
          locked={isFree}
          tierChip="Seeker"
          onClick={isFree ? () => openUpgrade('Daily Reading') : go('read-locked')}
        />
        <VisualTile
          pigment="metal"
          iconId="read-pillars"
          eyebrow="Four pillars"
          title="Pillar Patterns"
          onClick={go('read-patterns')}
        />
      </div>
    </main>
  );
}
