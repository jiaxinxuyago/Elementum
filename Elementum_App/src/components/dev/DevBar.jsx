// ===================================================================
// ELEMENTUM · DevBar (development only)
// Dev-mode sidebar that sits OUTSIDE the phone frame on wide screens.
//
// Two views (tab-switched):
//   Chart  — tier switcher, chart + birthData summary, seed presets,
//            jump-to, reset  (original content)
//   Schema — field coverage for the active stem's archetype record,
//            walked against ARCHETYPE_SCHEMA. Shows present / missing /
//            constraint violations, per field, grouped by section.
//
// Only renders in development (import.meta.env.DEV) and only on viewports
// wide enough to have space beside the 390px phone frame. Never shipped.
// ===================================================================

import { useEffect, useMemo, useState } from 'react';
import { useChart } from '../../store/chartContext.jsx';
import { TIERS, TIER_LABELS, TIER_PRICES } from '../../infra/index.js';
import { STEM_CARD_DATA, coverageFor } from '../../content/index.js';
import { SCHEMA_VERSION, ARCHETYPE_SCHEMA } from '../../contract/index.js';

// Tier → pigment. Matches the pricing card gradients in DES_04 §19.
const TIER_ACCENT = {
  free:    '#8D9C7A', // wood — free is natural, ambient
  seeker:  '#B59A6B', // earth — seeker is grounded, established
  advisor: '#B4755E', // fire — advisor is premium, animated
};

// Schema-status → pigment.
const STATUS_ACCENT = {
  present:         '#8D9C7A',  // wood — healthy
  missing:         '#B4755E',  // fire — needs attention
  'optional-missing': '#6c655a',
  violates:        '#c79b4a',  // amber — constraint violation
  placeholder:     '#B59A6B',  // earth — accepted generic fallback, flagged
  deprecated:      '#8a8378',  // grey — retired
  default:         '#7d766b',
};

const FLOW_SCREENS = [
  'welcome',
  'step1', 'step2', 'step3',
  'step4', 'step4a',
  'step5',
  'step6', 'step6a',
  'step7', 'step7a',
  'loading', 'reveal',
  // Dashboard tabs (DES_04 §10–§14)
  'app-today', 'app-guidance', 'app-reading', 'app-compat', 'app-profile',
  // Reading-detail destinations (DES_04 §11)
  'read-elemental', 'read-daymaster', 'read-tengods', 'read-locked',
];

// 10 day-master stems in canonical 甲乙丙丁戊己庚辛壬癸 order.
// Each maps to a __seedData preset that produces that day-master.
const STEM_CYCLE = [
  { key: 'jia',  hanzi: '甲', label: 'Oak'   },
  { key: 'yi',   hanzi: '乙', label: 'Vine'  },
  { key: 'bing', hanzi: '丙', label: 'Sun'   },
  { key: 'ding', hanzi: '丁', label: 'Ember' },
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
        <SchemaView chart={chart} />
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {FLOW_SCREENS.map((s) => {
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
// SCHEMA VIEW
// Walks the active stem's archetype record against ARCHETYPE_SCHEMA and
// renders a field-by-field coverage report. The "universal vocabulary"
// panel — tells the designer/writer what every field is and whether
// the current stem fills it.
// ═══════════════════════════════════════════════════════════════════

function SchemaView({ chart }) {
  const activeStem = chart?.dayMaster?.stem || '庚';
  const record = STEM_CARD_DATA?.[activeStem];
  const { rows, summary } = useMemo(
    () => coverageFor(record),
    [record]
  );
  const [collapsed, setCollapsed] = useState({});

  const toggle = (key) => setCollapsed((s) => ({ ...s, [key]: !s[key] }));

  // Group the flat row list by top-level key for collapsible sections.
  const grouped = useMemo(() => {
    const m = new Map();
    for (const r of rows) {
      const top = r.path.split('.')[0];
      if (!m.has(top)) m.set(top, []);
      m.get(top).push(r);
    }
    return m;
  }, [rows]);

  return (
    <>
      <DevSection label="Schema Coverage">
        <div style={{ fontSize: 11, color: '#8a8378', marginBottom: 8 }}>
          Stem <span style={{ color: '#e0d6c3' }}>{activeStem}</span>
          {' '}· schema v{SCHEMA_VERSION}
        </div>
        <CoverageBar summary={summary} />
        <div style={{ fontSize: 11, color: '#8a8378', marginTop: 6, lineHeight: 1.6 }}>
          <StatDot color={STATUS_ACCENT.present}   label={`${summary.present} present`}   />
          <StatDot color={STATUS_ACCENT.missing}   label={`${summary.missing} missing`}   />
          <StatDot color={STATUS_ACCENT.violates}  label={`${summary.violates} violates`} />
          {summary.placeholder > 0 &&
            <StatDot color={STATUS_ACCENT.placeholder} label={`${summary.placeholder} placeholder`} />}
          {summary.optionalMissing > 0 &&
            <StatDot color={STATUS_ACCENT['optional-missing']} label={`${summary.optionalMissing} optional`} />}
        </div>
      </DevSection>

      {[...grouped.entries()].map(([topKey, groupRows]) => {
        const meta = ARCHETYPE_SCHEMA[topKey]?._meta;
        const firstRow = groupRows[0];
        const isDeprecated = firstRow?.status === 'deprecated';
        const isCollapsed = collapsed[topKey] ?? (topKey === 'blocks' || isDeprecated); // collapse heavy/dead groups by default

        return (
          <div key={topKey} style={{ marginBottom: 10 }}>
            <button
              onClick={() => toggle(topKey)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '6px 8px',
                borderRadius: 6,
                border: '1px solid #3a342d',
                background: '#2a2621',
                color: isDeprecated ? '#8a8378' : '#d8d2c2',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 12,
                textAlign: 'left',
              }}
            >
              <span>
                <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 11 }}>
                  {isCollapsed ? '▸' : '▾'}
                </span>
                {' '}
                <strong>{topKey}</strong>
                {meta?.tier && <TierChip tier={meta.tier} />}
                <VaryChip varyBy={firstRow?.varyBy} cardinality={firstRow?.cardinality} />
                {isDeprecated && <span style={{ marginLeft: 6, fontSize: 10, color: '#c79b4a' }}>deprecated</span>}
              </span>
              <span style={{ fontSize: 10, color: '#7d766b' }}>
                {countBy(groupRows, (r) => r.kind === 'leaf' && r.status === 'present')}
                /
                {countBy(groupRows, (r) => r.kind === 'leaf' && r.status !== 'deprecated')}
              </span>
            </button>
            {!isCollapsed && (
              <div style={{ paddingLeft: 8, paddingTop: 6 }}>
                {meta?.section && (
                  <div style={{ fontSize: 10, color: '#7d766b', marginBottom: 4 }}>
                    {meta.section}
                  </div>
                )}
                {/* If the top-level schema entry is a leaf (e.g. subtitle, chips),
                    groupRows[0] IS the leaf — render it. Otherwise skip the
                    synthetic group row walkSchema inserted at index 0. */}
                {(firstRow?.kind === 'leaf' ? groupRows : groupRows.slice(1))
                  .map((r) => (
                    <SchemaRow key={r.path} row={r} />
                  ))}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

function SchemaRow({ row }) {
  if (row.kind !== 'leaf') {
    return (
      <div style={{ fontSize: 11, color: '#9d968a', padding: '3px 0' }}>
        <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
          {row.path.split('.').slice(1).join('.')}
        </span>
        {row.section && <span style={{ color: '#7d766b', fontSize: 10, marginLeft: 6 }}>({row.section})</span>}
      </div>
    );
  }

  const statusKey =
    row.status?.startsWith('violates')    ? 'violates' :
    row.status?.startsWith('placeholder') ? 'placeholder' :
    row.status;
  const color = STATUS_ACCENT[statusKey] || STATUS_ACCENT.default;
  const subPath = row.path.split('.').slice(1).join('.');
  const preview = previewValue(row.value);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '10px 1fr auto',
        gap: 6,
        padding: '2px 0',
        alignItems: 'start',
        fontSize: 11,
      }}
    >
      <div style={{
        width: 6, height: 6, borderRadius: 6, background: color,
        marginTop: 6,
      }} />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', color: '#c7bfb0' }}>
          {subPath}
          <span style={{ color: '#7d766b', fontSize: 10, marginLeft: 6 }}>{row.type}</span>
          {row.tier && row.tier !== '—' && <TierChip tier={row.tier} />}
          <VaryChip varyBy={row.varyBy} cardinality={row.cardinality} />
        </div>
        {preview && (
          <div style={{ color: '#8a8378', fontSize: 10, lineHeight: 1.4, marginTop: 2, wordBreak: 'break-word' }}>
            {preview}
          </div>
        )}
        {row.status?.startsWith('violates') && (
          <div style={{ color: '#c79b4a', fontSize: 10, marginTop: 2 }}>
            ⚠ {row.status.replace(/^violates:/, '')}
          </div>
        )}
        {row.status?.startsWith('placeholder') && (
          <div style={{ color: STATUS_ACCENT.placeholder, fontSize: 10, marginTop: 2 }}>
            ◐ placeholder — replace with per-stem value
          </div>
        )}
      </div>
      <div style={{ fontSize: 9, color, letterSpacing: 0.6, textTransform: 'uppercase', textAlign: 'right' }}>
        {statusLabel(row.status)}
      </div>
    </div>
  );
}

function CoverageBar({ summary }) {
  const total = Math.max(1, summary.present + summary.missing + summary.violates + summary.placeholder);
  const seg = (n, c) => n > 0
    ? <div style={{ flexBasis: `${(n/total)*100}%`, background: c }} />
    : null;
  return (
    <div style={{
      display: 'flex', height: 6, borderRadius: 3, overflow: 'hidden',
      background: '#2a2621', border: '1px solid #3a342d',
    }}>
      {seg(summary.present, STATUS_ACCENT.present)}
      {seg(summary.placeholder, STATUS_ACCENT.placeholder)}
      {seg(summary.violates, STATUS_ACCENT.violates)}
      {seg(summary.missing, STATUS_ACCENT.missing)}
    </div>
  );
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

function VaryChip({ varyBy, cardinality }) {
  // Static fields and defaults don't need a chip.
  if (!varyBy || !varyBy.length) return null;

  // Pigment by primary dimension so stem / tg / element sets are visually distinct.
  // Multi-dim fields inherit from amber (high generation cost) regardless of primary.
  const PRIMARY_COLOR = {
    stem:    '#7a8a9a',  // slate — the baseline stem set
    tg:      '#9a7a8a',  // dusty rose — the ten god set
    element: '#8fa88f',  // sage — the element set (yang/yin shared)
    band:    '#8a7a9a',
    tgPattern: '#a8908a',
  };
  const color = varyBy.length > 1 ? '#c79b4a' : (PRIMARY_COLOR[varyBy[0]] || '#7d766b');

  // Always show dimension + count so "stem ×10" and "tg ×10" never look the same.
  const label = `${varyBy.join('·')}×${cardinality}`;

  return (
    <span
      title={`varyBy: [${varyBy.join(', ')}] — ${cardinality} authored variants`}
      style={{
        marginLeft: 5,
        fontSize: 9,
        letterSpacing: 0.3,
        padding: '1px 5px',
        borderRadius: 3,
        border: `1px solid ${color}55`,
        color,
        background: `${color}15`,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      }}
    >{label}</span>
  );
}

function TierChip({ tier }) {
  const label = String(tier).toUpperCase();
  const color = {
    free:     '#8D9C7A',
    pro:      '#B4755E',
    internal: '#7d766b',
    mixed:    '#B59A6B',
  }[tier] || '#7d766b';
  return (
    <span style={{
      marginLeft: 6,
      fontSize: 9,
      letterSpacing: 0.8,
      padding: '1px 5px',
      borderRadius: 3,
      border: `1px solid ${color}55`,
      color,
      background: `${color}15`,
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    }}>{label}</span>
  );
}

function StatDot({ color, label }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: 10 }}>
      <span style={{ width: 6, height: 6, borderRadius: 6, background: color, display: 'inline-block', marginRight: 5 }} />
      {label}
    </span>
  );
}

function statusLabel(status) {
  if (!status) return '';
  if (status.startsWith('violates'))    return '⚠';
  if (status.startsWith('placeholder')) return '◐';
  if (status === 'present')             return '✓';
  if (status === 'missing')             return '—';
  if (status === 'optional-missing')    return '·';
  if (status === 'deprecated')          return 'dep';
  return status;
}

function previewValue(v) {
  if (v === undefined || v === null) return '';
  if (typeof v === 'string') return v.length > 80 ? v.slice(0, 77) + '…' : v;
  if (Array.isArray(v)) {
    if (v.length === 0) return '[]';
    if (typeof v[0] === 'string') return `[${v.map(s => `"${s.length > 20 ? s.slice(0,18)+'…' : s}"`).join(', ').slice(0, 80)}${v.join(', ').length > 80 ? '…' : ''}]`;
    return `[${v.length} items]`;
  }
  if (typeof v === 'object') return '{…}';
  return String(v);
}

function countBy(rows, pred) {
  let n = 0;
  for (const r of rows) if (pred(r)) n++;
  return n;
}

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
