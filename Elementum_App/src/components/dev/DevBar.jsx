// ===================================================================
// ELEMENTUM · DevBar (development only)
// Dev-mode sidebar that sits OUTSIDE the phone frame on wide screens.
//
// Two views (tab-switched):
//   Chart  — tier switcher, chart + birthData summary, seed presets,
//            jump-to (the CURRENT journey's screens only), reset
//   Schema — the REA_03 reading data variables, grouped by journey
//            surface, resolved LIVE against the active chart (axis +
//            status + value). Mirrors devVariables.js ← REA_03.
//
// Only renders in development (import.meta.env.DEV) and only on viewports
// wide enough to have space beside the 390px phone frame. Never shipped.
// ===================================================================

import { useEffect, useMemo, useState } from 'react';
import { useChart } from '../../store/chartContext.jsx';
import { TIERS, TIER_LABELS, TIER_PRICES } from '../../infra/index.js';
import { STEM_CARD_DATA } from '../../content/index.js';
import { buildEnergyChart } from '../../engine/index.js';
import { buildIdentity } from '../reading/identity.js';
import { buildJourneyModel } from '../journey/journeyData.js';
import { buildVariableGroups, VARIABLE_REGISTRY_NOTE } from './devVariables.js';

// Tier → pigment. Matches the pricing card gradients in DES_04 §19.
const TIER_ACCENT = {
  free:    '#8D9C7A', // wood — free is natural, ambient
  seeker:  '#B59A6B', // earth — seeker is grounded, established
  advisor: '#B4755E', // fire — advisor is premium, animated
};

// Variable-status → pigment.
const STATUS_ACCENT = {
  LIVE:    '#8D9C7A',  // wood — shipping
  INTERIM: '#c79b4a',  // amber — placeholder/gated copy
  PLANNED: '#9a7a8a',  // dusty rose — awaiting the K2 pass
  default: '#7d766b',
};

// The CURRENT user journey's screens, grouped for scannability.
// Source of truth: App.jsx FLOW — the legacy read-* detail stack is
// orphaned (nothing navigates to it) and deliberately NOT listed.
const SCREEN_GROUPS = [
  { label: 'Onboarding', screens: ['welcome', 'step1', 'step2', 'step3', 'step4', 'step4a', 'step5', 'step6', 'step6a', 'step7', 'step7a', 'loading', 'reveal'] },
  { label: 'Tabs', screens: ['app-today', 'app-guidance', 'app-reading', 'app-compat', 'app-profile'] },
  { label: 'Today drill-downs', screens: ['app-day', 'app-month', 'app-year', 'app-decade'] },
  { label: 'Reading journey', screens: ['app-daymaster', 'app-pillars', 'app-energymap', 'app-codex'] },
  { label: 'Guidance cards', screens: ['app-draw', 'app-manual', 'app-selfreport', 'app-consultant'] },
  { label: 'Compat + chart', screens: ['compat-friends', 'chart-reveal', 'chart-resonance'] },
];

// Per-element energy reading pages. The in-journey element screen is
// JourneyStage internal state (not a hash route) — reached via the dev
// hook __journeyElement, polled briefly while JourneyStage mounts.
const ENERGY_ELS = [
  { el: 'metal', hz: '金' }, { el: 'earth', hz: '土' }, { el: 'wood', hz: '木' },
  { el: 'water', hz: '水' }, { el: 'fire', hz: '火' },
];
const openJourneyElement = (el) => () => {
  window.__goto?.('app-reading');
  let tries = 0;
  const t = setInterval(() => {
    if (window.__journeyElement || tries++ > 20) {
      clearInterval(t);
      window.__journeyElement?.(el);
    }
  }, 100);
};

// 10 day-master stems in canonical 甲乙丙丁戊己庚辛壬癸 order.
// Each maps to a __seedData preset that produces that day-master.
const STEM_CYCLE = [
  { key: 'jia',  hanzi: '甲', label: 'Oak'   },
  { key: 'yi',   hanzi: '乙', label: 'Vine'  },
  { key: 'bing', hanzi: '丙', label: 'Sun'   },
  { key: 'ding', hanzi: '丁', label: 'Candle' },
  { key: 'wu',   hanzi: '戊', label: 'Mountain' },
  { key: 'ji',   hanzi: '己', label: 'Field' },
  { key: 'geng', hanzi: '庚', label: 'Blade' },
  { key: 'xin',  hanzi: '辛', label: 'Jewel' },
  { key: 'ren',  hanzi: '壬', label: 'Ocean' },
  { key: 'gui',  hanzi: '癸', label: 'Rain'  },
];

export default function DevBar() {
  const { birthData, chart, tier, setTier, resetFlow } = useChart();
  const [hash, setHash] = useState(
    typeof window !== 'undefined' ? window.location.hash : ''
  );
  const [view, setView] = useState('chart');   // 'chart' | 'schema'

  // Track the current screen via hashchange so the "now on" indicator updates.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // [ / ] keyboard shortcuts cycle prev/next day-master stem. Ignored
  // when an input/textarea/contenteditable is focused so we don't hijack
  // typing in onboarding form fields.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onKey = (e) => {
      const tag = (e.target?.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || e.target?.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === ']') { e.preventDefault(); window.__cycleStem?.('next'); }
      else if (e.key === '[') { e.preventDefault(); window.__cycleStem?.('prev'); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const currentScreen = (hash.replace(/^#\/?/, '') || 'welcome').toLowerCase();

  const goto = (name) => () => {
    window.__goto?.(name);
  };

  const seed = (preset) => () => {
    window.__seedData?.(preset);
  };

  const regenerate = () => {
    resetFlow();
    window.__goto?.('welcome');
  };

  return (
    <div
      style={{
        width: 340,
        flexShrink: 0,
        background: '#22201c',
        color: '#d8d2c2',
        border: '1px solid #3a342d',
        borderRadius: 14,
        padding: 14,
        fontFamily: "'EB Garamond', serif",
        fontSize: 13,
        lineHeight: 1.55,
        // Sit parallel to the phone frame — vertical centering inherited
        // from the Shell's alignItems: 'center'. Cap height so long content
        // scrolls inside the panel instead of pushing layout.
        maxHeight: 'calc(100vh - 40px)',
        overflowY: 'auto',
      }}
    >
      {/* ── Header + view toggle ──────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ color: '#8a8378', fontSize: 10, letterSpacing: 2.2, textTransform: 'uppercase' }}>
          DEV ONLY · not shipped
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <TabBtn active={view === 'chart'}  onClick={() => setView('chart')}>Chart</TabBtn>
          <TabBtn active={view === 'schema'} onClick={() => setView('schema')}>Schema</TabBtn>
        </div>
      </div>

      {view === 'chart' ? (
        <ChartView
          birthData={birthData}
          chart={chart}
          tier={tier}
          setTier={setTier}
          currentScreen={currentScreen}
          goto={goto}
          seed={seed}
          regenerate={regenerate}
        />
      ) : (
        <SchemaView chart={chart} birthData={birthData} currentScreen={currentScreen} />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CHART VIEW  (original DevBar content)
// ═══════════════════════════════════════════════════════════════════

function ChartView({ birthData, chart, tier, setTier, currentScreen, goto, seed, regenerate }) {
  return (
    <>
      <DevSection label="Pricing Tier">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {TIERS.map((t) => {
            const active = tier === t;
            return (
              <button
                key={t}
                onClick={() => setTier(t)}
                style={{
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: `1px solid ${active ? TIER_ACCENT[t] : '#3a342d'}`,
                  background: active ? `${TIER_ACCENT[t]}22` : '#2a2621',
                  color: active ? TIER_ACCENT[t] : '#bfb7a8',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                  fontSize: 13,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 160ms ease',
                }}
              >
                <span style={{ fontWeight: 500 }}>{TIER_LABELS[t]}</span>
                <span style={{ fontSize: 11, opacity: 0.75 }}>{TIER_PRICES[t]}</span>
              </button>
            );
          })}
        </div>
      </DevSection>

      <DevSection label="Birth Chart">
        {chart ? (
          <div style={{ fontSize: 12, color: '#c7bfb0' }}>
            <Row k="Archetype" v={chart.dayMaster?.stem ? `${chart.dayMaster.stem} · ${chart.dayMaster.element}` : '—'} />
            <Row k="Band" v={chart.dayMaster?.strength || '—'} />
            <Row k="Pattern" v={chart.tgPattern || '—'} />
            <Row k="Archetype Key" v={chart.archetypeKey || '—'} mono />
            <Row k="Catalyst" v={chart.catalyst || '—'} />
            <Row k="Missing" v={(chart.missingElements || []).join(', ') || 'none'} />
          </div>
        ) : (
          <div style={{ color: '#8a8378', fontSize: 12 }}>
            no chart generated yet
          </div>
        )}
      </DevSection>

      <DevSection label="Birth Data">
        <div style={{ fontSize: 12, color: '#c7bfb0' }}>
          <Row k="Date" v={birthData.year ? `${birthData.year}-${String(birthData.month).padStart(2, '0')}-${String(birthData.day).padStart(2, '0')}` : '—'} />
          <Row k="Hour" v={birthData.hourUnknown ? 'unknown' : birthData.hour != null ? `${String(birthData.hour).padStart(2, '0')}:00` : birthData.hourWindow || '—'} />
          <Row k="Location" v={
            birthData.location && typeof birthData.location === 'object'
              ? `${birthData.location.name} · ${Number(birthData.location.longitude).toFixed(2)}°`
              : birthData.location || '—'
          } />
          <Row k="Gender" v={birthData.gender || '—'} />
          {birthData.polarity && <Row k="Polarity" v={birthData.polarity} />}
        </div>
      </DevSection>

      <DevSection label="Exemplar chart">
        {/* The golden reference chart (REA_03 Appendix A) through the real
            loading→reveal ceremony — full location object, so the cast
            line carries its timezone. */}
        <button
          onClick={() => window.__seedExemplar?.()}
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: 8,
            border: '1px solid #8b7355',
            background: 'rgba(139,115,85,0.18)',
            color: '#e8dec8',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: 13,
            textAlign: 'left',
            lineHeight: 1.4,
          }}
        >
          庚 The Blade · 1995-04-29 · 18:00 CST
          <div style={{ fontSize: 10, color: '#bfb7a8', letterSpacing: 0.4 }}>
            Beijing · replay loading → reveal
          </div>
        </button>
      </DevSection>

      <DevSection label={`Day-master cycle  ·  ${chart?.dayMaster?.stem || '—'}`}>
        {/* 10-stem grid — clicking seeds that stem in place.
            Keyboard shortcuts: [ ] cycles prev/next stem (see useEffect). */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4, marginBottom: 6 }}>
          {STEM_CYCLE.map((s) => {
            const active = chart?.dayMaster?.stem === s.hanzi;
            return (
              <button
                key={s.key}
                onClick={seed(s.key)}
                title={`${s.hanzi} ${s.label}`}
                style={{
                  padding: '6px 2px',
                  borderRadius: 6,
                  border: `1px solid ${active ? '#8b7355' : '#3a342d'}`,
                  background: active ? 'rgba(139,115,85,0.28)' : '#2a2621',
                  color: active ? '#e8dec8' : '#bfb7a8',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 13,
                  lineHeight: 1.2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <span style={{ fontSize: 16 }}>{s.hanzi}</span>
                <span style={{ fontSize: 9, opacity: 0.75, letterSpacing: 0.2 }}>{s.label}</span>
              </button>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={() => window.__cycleStem?.('prev')} style={miniBtn}>← prev</button>
          <button onClick={() => window.__cycleStem?.('next')} style={miniBtn}>next →</button>
          <span style={{ flex: 1, alignSelf: 'center', textAlign: 'right', fontSize: 10, color: '#7d766b', letterSpacing: 0.3 }}>
            [&nbsp;] keys
          </span>
        </div>
      </DevSection>

      <DevSection label="Jump to Screen">
        {SCREEN_GROUPS.map((g) => (
          <div key={g.label} style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 9, letterSpacing: 1.4, textTransform: 'uppercase', color: '#6c655a', marginBottom: 4 }}>
              {g.label}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {g.screens.map((s) => {
                const active = currentScreen === s;
                return (
                  <button
                    key={s}
                    onClick={goto(s)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: 4,
                      border: `1px solid ${active ? '#8b7355' : '#3a342d'}`,
                      background: active ? 'rgba(139,115,85,0.22)' : '#2a2621',
                      color: active ? '#e0d6c3' : '#9d968a',
                      cursor: 'pointer',
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                      fontSize: 10,
                      letterSpacing: 0.2,
                    }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 9, letterSpacing: 1.4, textTransform: 'uppercase', color: '#6c655a', marginBottom: 4 }}>
            Energy readings · journey screen
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {ENERGY_ELS.map(({ el, hz }) => (
              <button key={el} onClick={openJourneyElement(el)} title={`app-reading → ${el} element screen`} style={elBtn}>
                {hz} {el}
              </button>
            ))}
          </div>
        </div>
      </DevSection>

      <DevSection label="Actions">
        <button
          onClick={regenerate}
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: 8,
            border: '1px solid #8b7355',
            background: '#6b5339',
            color: '#f1e9d6',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: 0.3,
          }}
        >
          ↻ Reset &amp; regenerate
        </button>
      </DevSection>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCHEMA VIEW — the reading data variables (REA_03), by surface,
// resolved live for the active chart. Slot IDs are not shown: the slots
// are already visible on the screens; variables are what authoring,
// budgets, and rulings target.
// ═══════════════════════════════════════════════════════════════════

// Which variable surfaces are ON SCREEN per app screen. Journey sub-screens
// (catalogue / element inside JourneyStage; the daymaster sub-screen retired
// 2026-08-13) arrive via the dev-only 'journey-screen' event since they are
// not hash routes.
const SURFACE = {
  identity: 'Identity · Reveal plate + Share card',
  catalogue: 'Catalogue · Folio + Panels + Pills',
  daymaster: 'Day-Master screen',
  element: 'Element screens (the depth home: faces + corpus ×50)',
  deep: 'Deep pages (the element-god depth corpus)',
};
function surfacesFor(screen, journeyScreen) {
  if (screen === 'reveal') return [SURFACE.identity];
  if (screen === 'app-reading' || screen === 'app-energymap') {
    if (journeyScreen === 'element' || journeyScreen === 'elsec') return [SURFACE.element, SURFACE.deep];
    return [SURFACE.identity, SURFACE.catalogue];
  }
  if (screen === 'app-daymaster') return [SURFACE.daymaster];
  if (screen === 'app-pillars') return [SURFACE.deep];
  return []; // screen carries no reading variables
}

function SchemaView({ chart, birthData, currentScreen }) {
  const model = useMemo(() => {
    if (!chart) return null;
    try {
      const card = STEM_CARD_DATA[chart.dayMaster.stem];
      const ec = buildEnergyChart(chart);
      const identity = buildIdentity(chart, card, birthData);
      return buildJourneyModel({ chart, ec, identity, card });
    } catch {
      return null;
    }
  }, [chart, birthData]);

  // Track JourneyStage's internal sub-screen (catalogue/daymaster/element).
  const [journeyScreen, setJourneyScreen] = useState(
    typeof window !== 'undefined' ? window.__journeyScreen : undefined
  );
  const [journeyEl, setJourneyEl] = useState(
    typeof window !== 'undefined' ? window.__journeyElOpen : null
  );
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const onJourney = (e) => { setJourneyScreen(e.detail); setJourneyEl(window.__journeyElOpen ?? null); };
    window.addEventListener('journey-screen', onJourney);
    return () => window.removeEventListener('journey-screen', onJourney);
  }, []);

  // The element in focus: the journey element sub-screen or its section detail.
  const activeEl = (journeyScreen === 'element' || journeyScreen === 'elsec') ? journeyEl : null;
  const allGroups = useMemo(() => buildVariableGroups(model, activeEl, chart), [model, activeEl, chart]);
  const [showAll, setShowAll] = useState(false);
  const onScreen = surfacesFor(currentScreen, journeyScreen);
  const groups = showAll ? allGroups : allGroups.filter((g) => onScreen.includes(g.surface));
  const [collapsed, setCollapsed] = useState({});
  const toggle = (k) => setCollapsed((s) => ({ ...s, [k]: !s[k] }));

  return (
    <>
      <div style={{ fontSize: 11, color: '#8a8378', marginBottom: 10, lineHeight: 1.5 }}>
        Reading data variables (REA_03) resolved for{' '}
        <span style={{ color: '#e0d6c3' }}>{model ? `${model.stem} ${model.archetype}` : 'no chart'}</span>.
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{ fontSize: 10, color: '#6c655a' }}>
            on{' '}
            <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', color: '#9d968a' }}>
              {currentScreen}{journeyScreen && (currentScreen === 'app-reading' || currentScreen === 'app-energymap') ? ` · ${journeyScreen}` : ''}{activeEl ? ` · ${activeEl}` : ''}
            </span>
          </span>
          <TabBtn active={showAll} onClick={() => setShowAll((v) => !v)}>all</TabBtn>
        </div>
        <div style={{ fontSize: 10, color: '#6c655a', marginTop: 2 }}>{VARIABLE_REGISTRY_NOTE}</div>
      </div>

      {!showAll && groups.length === 0 && (
        <div style={{ fontSize: 11, color: '#7d766b', padding: '8px 2px', lineHeight: 1.5 }}>
          No reading data variables on this screen. Toggle <em>all</em> to see the full registry.
        </div>
      )}

      {groups.map((g) => {
        const isCollapsed = collapsed[g.surface] ?? false;
        return (
          <div key={g.surface} style={{ marginBottom: 10 }}>
            <button
              onClick={() => toggle(g.surface)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '6px 8px',
                borderRadius: 6,
                border: '1px solid #3a342d',
                background: '#2a2621',
                color: '#d8d2c2',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 12,
                textAlign: 'left',
              }}
            >
              <span>
                <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 11 }}>
                  {isCollapsed ? '▸' : '▾'}
                </span>{' '}
                <strong>{g.surface}</strong>
              </span>
              <span style={{ fontSize: 10, color: '#7d766b' }}>{g.vars.length}</span>
            </button>
            {!isCollapsed && (
              <div style={{ paddingLeft: 4, paddingTop: 6 }}>
                {g.vars.map((v) => <VariableRow key={v.name} v={v} />)}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

function VariableRow({ v }) {
  const statusKey = v.status?.startsWith('LIVE') ? 'LIVE' : v.status?.startsWith('INTERIM') ? 'INTERIM' : v.status?.startsWith('PLANNED') ? 'PLANNED' : 'default';
  const color = STATUS_ACCENT[statusKey];
  const flagged = v.status?.includes('⚠');
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '10px 1fr', gap: 6, padding: '3px 0', alignItems: 'start', fontSize: 11 }}>
      <div style={{ width: 6, height: 6, borderRadius: 6, background: color, marginTop: 5 }} />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', color: '#c7bfb0' }}>
          {v.name}
          <AxisChip axis={v.axis} />
          <ArchChip arch={v.arch} />
          <span style={{ marginLeft: 5, fontSize: 9, letterSpacing: 0.6, color: flagged ? '#c79b4a' : color, textTransform: 'uppercase' }}>
            {v.status}
          </span>
        </div>
        <div style={{ color: v.value ? '#8a8378' : '#5d574e', fontSize: 10, lineHeight: 1.4, marginTop: 1, wordBreak: 'break-word' }}>
          {preview(v.value)}
        </div>
      </div>
    </div>
  );
}

function AxisChip({ axis }) {
  if (!axis) return null;
  const color =
    axis.startsWith('STEM') ? '#7a8a9a' :
    axis.startsWith('GOD') ? '#9a7a8a' :
    axis.startsWith('ELEMENT') ? '#8fa88f' :
    axis.startsWith('CONDITION') || axis.startsWith('FAMILY') ? '#8a7a9a' :
    axis.startsWith('DERIVED') ? '#7d766b' :
    axis.startsWith('T') ? '#a8908a' : '#7d766b';
  return (
    <span style={{
      marginLeft: 5, fontSize: 9, letterSpacing: 0.3, padding: '1px 5px', borderRadius: 3,
      border: `1px solid ${color}55`, color, background: `${color}15`,
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    }}>{axis}</span>
  );
}

// The resolved archetype of the row's axis — names the station file
// (Reading/Database/templates/by_axis/json/<AXIS>/<arch>.json) this chart selects.
function ArchChip({ arch }) {
  if (!arch) return null;
  return (
    <span style={{
      marginLeft: 5, fontSize: 9, letterSpacing: 0.3, padding: '1px 5px', borderRadius: 3,
      border: '1px dashed #b09b5e66', color: '#b09b5e', background: '#b09b5e10',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    }}>{arch}</span>
  );
}

function preview(v) {
  if (v === undefined || v === null || v === '') return '(unauthored)';
  const s = String(v);
  return s.length > 160 ? s.slice(0, 157) + '…' : s;
}

// ── helpers ───────────────────────────────────────────────────

function DevSection({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div
        style={{
          fontSize: 10,
          letterSpacing: 2.4,
          textTransform: 'uppercase',
          color: '#7d766b',
          marginBottom: 6,
          fontWeight: 600,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function Row({ k, v, mono = false }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 8,
        padding: '2px 0',
      }}
    >
      <span style={{ color: '#7d766b', flexShrink: 0 }}>{k}</span>
      <span
        style={{
          textAlign: 'right',
          fontFamily: mono ? 'ui-monospace, SFMono-Regular, Menlo, monospace' : 'inherit',
          fontSize: mono ? 11 : 12,
          wordBreak: 'break-all',
        }}
      >
        {v}
      </span>
    </div>
  );
}

function TabBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '3px 10px',
        borderRadius: 4,
        border: `1px solid ${active ? '#8b7355' : '#3a342d'}`,
        background: active ? 'rgba(139,115,85,0.22)' : '#2a2621',
        color: active ? '#e0d6c3' : '#9d968a',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 11,
        letterSpacing: 0.4,
      }}
    >
      {children}
    </button>
  );
}

const elBtn = {
  padding: '4px 8px',
  borderRadius: 4,
  border: '1px solid #3a342d',
  background: '#2a2621',
  color: '#9d968a',
  cursor: 'pointer',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: 10,
  letterSpacing: 0.2,
};

const miniBtn = {
  flex: 1,
  padding: '6px 8px',
  borderRadius: 6,
  border: '1px solid #3a342d',
  background: '#2a2621',
  color: '#c7bfb0',
  cursor: 'pointer',
  fontFamily: "'EB Garamond', serif",
  fontSize: 12,
};
