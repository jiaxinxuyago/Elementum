// ===================================================================
// ELEMENTUM · Onboarding Steps 1–7 (+ 4A, 6A, 7A conditionals)
// Ported from Design/flow/onboarding.jsx. Each step owns only its input
// zone — the shell (progress, question, subtitle, Back/Continue) is
// shared via <OnboardingShell>. All state lives in ChartContext.
// ===================================================================

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  INK,
  INK_SOFT,
  INK_LIGHT,
  SILK,
  SILK_FOLD,
  PAPER_HAIR,
  BRONZE_MID,
  BRONZE_DARK,
  PIG_METAL,
  PIG_WOOD,
  PIG_WATER,
  PIG_FIRE,
  PIG_EARTH,
  ElementSign,
} from '../../styles/tokens.jsx';
import { OnboardingShell, ScrollPicker } from './OnboardingShell.jsx';
import { useChart } from '../../store/chartContext.jsx';
import { searchCities, formatCityForInput } from '../../services/geocoding.js';

// -----------------------------------------------------------
// STEP 1 — YEAR
// -----------------------------------------------------------
export function Step1_Year({ onBack, onContinue }) {
  const { birthData, updateBirthData } = useChart();
  const years = useMemo(() => {
    const arr = [];
    const now = new Date().getFullYear();
    for (let y = now; y >= 1900; y--) arr.push(y);
    return arr;
  }, []);
  const defaultIdx = years.indexOf(birthData.year ?? 1991);
  const [sel, setSel] = useState(defaultIdx >= 0 ? defaultIdx : 0);

  return (
    <OnboardingShell
      step={1}
      question="When were you born?"
      subtitle={
        <>
          “The year you arrived reveals what you carry
          <br />
          from those who came before.”
        </>
      }
      canContinue={sel >= 0}
      onBack={onBack}
      onContinue={() => {
        updateBirthData({ year: years[sel] });
        onContinue();
      }}
    >
      <div style={{ padding: '12px 0' }}>
        <ScrollPicker
          values={years}
          selectedIndex={sel}
          onChange={setSel}
        />
      </div>
    </OnboardingShell>
  );
}

// -----------------------------------------------------------
// STEP 2 — MONTH
// -----------------------------------------------------------
export function Step2_Month({ onBack, onContinue }) {
  const { birthData, updateBirthData } = useChart();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const [sel, setSel] = useState(
    birthData.month != null ? birthData.month - 1 : 7
  );

  return (
    <OnboardingShell
      step={2}
      question="Which month?"
      subtitle={
        <>
          “Your month is the season your soul
          <br />
          chose to enter this world.”
        </>
      }
      canContinue={sel >= 0}
      onBack={onBack}
      onContinue={() => {
        updateBirthData({ month: sel + 1 });
        onContinue();
      }}
    >
      <div style={{ padding: '12px 0' }}>
        <ScrollPicker
          values={months}
          selectedIndex={sel}
          onChange={setSel}
        />
      </div>
    </OnboardingShell>
  );
}

// -----------------------------------------------------------
// STEP 3 — DAY
// -----------------------------------------------------------
export function Step3_Day({ onBack, onContinue }) {
  const { birthData, updateBirthData } = useChart();
  const days = useMemo(() => {
    const arr = [];
    for (let d = 1; d <= 31; d++) arr.push(d);
    return arr;
  }, []);
  const [sel, setSel] = useState(
    birthData.day != null ? birthData.day - 1 : 14
  );

  return (
    <OnboardingShell
      step={3}
      question="What day?"
      subtitle={
        <>
          “Your day is your core — the essence
          <br />
          of who you are at the deepest level.”
        </>
      }
      canContinue={sel >= 0}
      onBack={onBack}
      onContinue={() => {
        updateBirthData({ day: sel + 1 });
        onContinue();
      }}
    >
      <div style={{ padding: '12px 0' }}>
        <ScrollPicker
          values={days}
          selectedIndex={sel}
          onChange={setSel}
          formatter={(v) => (v < 10 ? `0${v}` : `${v}`)}
        />
      </div>
    </OnboardingShell>
  );
}

// -----------------------------------------------------------
// STEP 4 — BIRTH TIME (Level 1 — exact hour scroll picker)
// Level 2 link routes to 4A; Level 3 link skips straight to Step 5.
// -----------------------------------------------------------
export function Step4_Hour({ onBack, onContinue, onApproximate, onUnknown }) {
  const { birthData, updateBirthData } = useChart();
  const hours = useMemo(() => {
    const arr = [];
    for (let h = 0; h <= 23; h++) arr.push(h);
    return arr;
  }, []);
  const [sel, setSel] = useState(birthData.hour != null ? birthData.hour : 9);
  const fmt = (v) => `${v < 10 ? '0' : ''}${v}:00`;

  return (
    <OnboardingShell
      step={4}
      question="What time?"
      subtitle={
        <>
          “Your hour reveals how you express
          <br />
          your nature outward.”
        </>
      }
      canContinue={true}
      onBack={onBack}
      onContinue={() => {
        updateBirthData({
          hour: hours[sel],
          hourWindow: null,
          hourUnknown: false,
        });
        onContinue();
      }}
    >
      <div style={{ padding: '4px 0 0' }}>
        <ScrollPicker
          values={hours}
          selectedIndex={sel}
          onChange={setSel}
          formatter={fmt}
        />

        <div
          style={{
            marginTop: 18,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onApproximate && onApproximate();
            }}
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 14,
              color: BRONZE_MID,
              textDecoration: 'underline',
              textUnderlineOffset: 3,
              textDecorationThickness: '1px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            I only know the general time →
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              updateBirthData({
                hour: null,
                hourWindow: null,
                hourUnknown: true,
              });
              onUnknown && onUnknown();
            }}
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 13,
              color: INK_LIGHT,
              textDecoration: 'underline',
              textUnderlineOffset: 3,
              textDecorationThickness: '1px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            I have no idea →
          </a>
        </div>
      </div>
    </OnboardingShell>
  );
}

// -----------------------------------------------------------
// STEP 4A — HOUR WINDOW (conditional)
// Six 4-hour bands, each wrapping one traditional 时辰 pair.
// -----------------------------------------------------------
export function Step4A_HourWindow({ onBack, onContinue, onUnknown }) {
  const { birthData, updateBirthData } = useChart();
  const [sel, setSel] = useState(birthData.hourWindow || 'morning');

  const windows = [
    { id: 'late-night', label: 'Late night',    range: '11 pm – 3 am',  branch: '子·丑', color: PIG_WATER, element: 'water' },
    { id: 'early',      label: 'Early morning', range: '3 am – 7 am',   branch: '寅·卯', color: PIG_WOOD,  element: 'wood' },
    { id: 'morning',    label: 'Morning',       range: '7 am – 11 am',  branch: '辰·巳', color: PIG_WOOD,  element: 'wood' },
    { id: 'midday',     label: 'Midday',        range: '11 am – 3 pm',  branch: '午·未', color: PIG_FIRE,  element: 'fire' },
    { id: 'afternoon',  label: 'Afternoon',     range: '3 pm – 7 pm',   branch: '申·酉', color: PIG_METAL, element: 'metal' },
    { id: 'evening',    label: 'Evening',       range: '7 pm – 11 pm',  branch: '戌·亥', color: PIG_EARTH, element: 'earth' },
  ];

  const tile = (w) => {
    const isActive = sel === w.id;
    return (
      <button
        key={w.id}
        onClick={() => setSel(w.id)}
        style={{
          position: 'relative',
          padding: '14px 12px 13px',
          borderRadius: 10,
          border: isActive ? `1px solid ${BRONZE_MID}` : `1px solid #d9d3c8`,
          background: isActive
            ? 'rgba(139,115,85,0.13)'
            : 'rgba(232,227,216,0.7)',
          fontFamily: "'EB Garamond', serif",
          color: INK,
          cursor: 'pointer',
          textAlign: 'center',
          transition: 'all 220ms ease',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 6,
            left: 7,
            opacity: isActive ? 0.55 : 0.3,
          }}
        >
          <ElementSign element={w.element} size={11} color={w.color} />
        </div>
        <div style={{ fontSize: 14.5, fontWeight: 500, letterSpacing: 0.2 }}>
          {w.label}
        </div>
        <div
          style={{
            fontSize: 11.5,
            color: INK_LIGHT,
            marginTop: 3,
            letterSpacing: 0.4,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {w.range}
        </div>
        <div
          style={{
            fontSize: 10,
            color: BRONZE_MID,
            marginTop: 4,
            letterSpacing: 1.4,
            opacity: 0.7,
          }}
        >
          {w.branch}
        </div>
      </button>
    );
  };

  return (
    <OnboardingShell
      step={4}
      progressValue={4.5 / 7}
      question="Which part of the day?"
      subtitle={
        <>
          “An approximate window still places
          <br />
          you within a true 时辰.”
        </>
      }
      canContinue={sel !== null}
      onBack={onBack}
      onContinue={() => {
        updateBirthData({
          hour: null,
          hourWindow: sel,
          hourUnknown: false,
        });
        onContinue();
      }}
    >
      <div style={{ padding: '0 2px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
          }}
        >
          {windows.map(tile)}
        </div>

        <div
          style={{
            marginTop: 16,
            textAlign: 'center',
            fontFamily: "'EB Garamond', serif",
            fontSize: 12.5,
            fontStyle: 'italic',
            color: INK_LIGHT,
            lineHeight: 1.55,
            padding: '0 12px',
          }}
        >
          Each window covers one traditional two-hour 时辰,
          <br />
          the unit Chinese astrology has always used.
        </div>

        <div
          style={{
            marginTop: 14,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              updateBirthData({
                hour: null,
                hourWindow: null,
                hourUnknown: true,
              });
              onUnknown && onUnknown();
            }}
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 13,
              color: INK_LIGHT,
              textDecoration: 'underline',
              textUnderlineOffset: 3,
              textDecorationThickness: '1px',
              cursor: 'pointer',
            }}
          >
            I have no idea →
          </a>
        </div>
      </div>
    </OnboardingShell>
  );
}

// -----------------------------------------------------------
// STEP 5 — LOCATION (with Open-Meteo autocomplete)
// Debounced city search via src/services/geocoding.js.
// Per DOC5 §22: any failure (no match, network error) keeps the
// typed text and falls back silently to Beijing longitude at calc time.
// -----------------------------------------------------------
export function Step5_Location({ onBack, onContinue }) {
  const { birthData, updateBirthData } = useChart();

  // Initial display text — derive from the stored location (object or string)
  const initialText =
    birthData.location && typeof birthData.location === 'object'
      ? formatCityForInput(birthData.location)
      : birthData.location || '';
  const [val, setVal] = useState(initialText);
  const [picked, setPicked] = useState(
    birthData.location && typeof birthData.location === 'object' ? birthData.location : null
  );

  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(-1);

  const abortRef = useRef(null);
  const debounceRef = useRef(null);
  const skipNextSearchRef = useRef(false); // suppress a search immediately after pick
  const inputWrapRef = useRef(null);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (abortRef.current) abortRef.current.abort();

    // Skip one search after a suggestion pick (the input value change is
    // synthetic, not user-typed).
    if (skipNextSearchRef.current) {
      skipNextSearchRef.current = false;
      return;
    }

    const q = val.trim();
    if (q.length < 2) {
      setSuggestions([]);
      setIsSearching(false);
      setShowDropdown(false);
      return;
    }

    setIsSearching(true);
    const ctl = new AbortController();
    abortRef.current = ctl;

    debounceRef.current = setTimeout(async () => {
      const results = await searchCities(q, { signal: ctl.signal, count: 5 });
      if (ctl.signal.aborted) return;
      setSuggestions(results);
      setIsSearching(false);
      setShowDropdown(results.length > 0);
      setHighlightIdx(results.length > 0 ? 0 : -1);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      ctl.abort();
    };
  }, [val]);

  // Hide dropdown on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (!inputWrapRef.current?.contains(e.target)) setShowDropdown(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const pickSuggestion = (city) => {
    const display = formatCityForInput(city);
    skipNextSearchRef.current = true;
    setVal(display);
    setPicked(city);
    setShowDropdown(false);
    setHighlightIdx(-1);
  };

  const onKeyDown = (e) => {
    if (!showDropdown || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIdx((i) => (i + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIdx((i) => (i - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
      if (highlightIdx >= 0) {
        e.preventDefault();
        pickSuggestion(suggestions[highlightIdx]);
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  const canContinue = val.trim().length > 0;

  return (
    <OnboardingShell
      step={5}
      question="Where were you born?"
      subtitle={
        <>
          “We’ll calculate your True Solar Time
          <br />
          to place you precisely.”
        </>
      }
      canContinue={canContinue}
      onBack={onBack}
      onContinue={() => {
        // If a suggestion was picked, store the full city object (longitude + meta).
        // Otherwise store the freeform string — the calc layer silently falls back
        // to Beijing longitude and the profile shows "location not confirmed".
        const payload = picked ? picked : val.trim();
        updateBirthData({ location: payload });
        onContinue();
      }}
    >
      <div style={{ padding: '0 4px' }}>
        <div ref={inputWrapRef} style={{ position: 'relative' }}>
          <input
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
              setPicked(null); // typing invalidates any prior pick
            }}
            onFocus={() => {
              if (suggestions.length > 0) setShowDropdown(true);
            }}
            onKeyDown={onKeyDown}
            placeholder="Start typing a city — e.g. London"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            style={{
              width: '100%',
              padding: '16px 44px 16px 18px',
              background: 'rgba(248,241,225,0.85)',
              border: picked
                ? `1px solid ${BRONZE_MID}`
                : `1px solid ${PAPER_HAIR}`,
              borderRadius: 12,
              fontFamily: "'EB Garamond', serif",
              fontSize: 17,
              color: INK,
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 200ms ease',
            }}
          />

          {/* Right-side icon: loading spinner, checkmark when picked, or pin. */}
          <div
            style={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              color: picked ? BRONZE_MID : INK_LIGHT,
              fontSize: 18,
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {isSearching ? (
              <svg viewBox="0 0 20 20" width="18" height="18">
                <circle
                  cx="10" cy="10" r="7"
                  stroke={INK_LIGHT} strokeWidth="1.5" fill="none"
                  strokeDasharray="10 28"
                  strokeLinecap="round"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 10 10"
                    to="360 10 10"
                    dur="0.9s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            ) : picked ? (
              <svg viewBox="0 0 20 20" width="18" height="18">
                <path
                  d="M4 10 L8 14 L16 6"
                  stroke={BRONZE_MID} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" width="18" height="18">
                <path
                  d="M10 3 C 6.5 3 4 5.5 4 9 C 4 13 10 18 10 18 C 10 18 16 13 16 9 C 16 5.5 13.5 3 10 3 Z"
                  stroke={INK_LIGHT} strokeWidth="1.2" fill="none"
                />
                <circle cx="10" cy="9" r="2" stroke={INK_LIGHT} strokeWidth="1.2" fill="none" />
              </svg>
            )}
          </div>

          {/* Suggestions dropdown */}
          {showDropdown && suggestions.length > 0 && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                left: 0,
                right: 0,
                background: 'rgba(248,241,225,0.98)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                border: `1px solid ${PAPER_HAIR}`,
                borderRadius: 12,
                boxShadow: '0 6px 20px rgba(60,40,20,0.12)',
                overflow: 'hidden',
                zIndex: 20,
                maxHeight: 260,
                overflowY: 'auto',
              }}
            >
              {suggestions.map((city, i) => {
                const isHot = i === highlightIdx;
                const sub = [city.admin1, city.country].filter(Boolean).join(' · ');
                return (
                  <div
                    key={city.id || `${city.name}-${i}`}
                    onMouseEnter={() => setHighlightIdx(i)}
                    onMouseDown={(e) => {
                      // onMouseDown (not onClick) so we fire before the input's blur
                      e.preventDefault();
                      pickSuggestion(city);
                    }}
                    style={{
                      padding: '11px 16px',
                      cursor: 'pointer',
                      background: isHot ? 'rgba(139,115,85,0.10)' : 'transparent',
                      borderBottom:
                        i < suggestions.length - 1
                          ? `1px solid rgba(139,115,85,0.12)`
                          : 'none',
                      transition: 'background 120ms ease',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'EB Garamond', serif",
                        fontSize: 15,
                        color: INK,
                        fontWeight: 500,
                      }}
                    >
                      {city.name}
                    </div>
                    {sub && (
                      <div
                        style={{
                          fontFamily: "'EB Garamond', serif",
                          fontSize: 12,
                          color: INK_LIGHT,
                          marginTop: 2,
                          letterSpacing: 0.2,
                        }}
                      >
                        {sub}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Accuracy note — or, if no city picked, a quiet fallback hint */}
        <div
          style={{
            marginTop: 18,
            padding: '16px 18px',
            background: 'rgba(139,115,85,0.06)',
            border: `1px solid rgba(139,115,85,0.25)`,
            borderRadius: 12,
          }}
        >
          <div
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 11,
              letterSpacing: 2.5,
              textTransform: 'uppercase',
              color: BRONZE_MID,
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            A note on accuracy
          </div>
          <p
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 13.5,
              color: INK_SOFT,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {picked
              ? 'Clock time drifts from the sun by up to sixteen minutes. We’ll use your city’s true longitude to place your chart precisely.'
              : 'If we don’t recognise the city, we’ll use the traditional Beijing solar time — you can update your location in Profile later.'}
          </p>
        </div>
      </div>
    </OnboardingShell>
  );
}

// -----------------------------------------------------------
// STEP 6 — GENDER (three-option stack with conditional 6A route)
// -----------------------------------------------------------
export function Step6_Polarity({ onBack, onContinue, onPreferNot }) {
  const { birthData, updateBirthData } = useChart();
  const [selected, setSelected] = useState(birthData.gender || 'prefer-not');

  const btn = (id, label, fontSize = 17) => {
    const isActive = selected === id;
    return (
      <div
        key={id}
        onClick={() => setSelected(id)}
        style={{
          width: '100%',
          padding: '14px 18px',
          borderRadius: 10,
          border: isActive ? `1px solid ${BRONZE_MID}` : `1px solid #d9d3c8`,
          background: isActive
            ? 'rgba(139,115,85,0.12)'
            : 'rgba(232,227,216,0.7)',
          fontFamily: "'EB Garamond', serif",
          fontSize,
          fontWeight: isActive ? 500 : 400,
          color: id === 'prefer-not' ? INK_SOFT : INK,
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 250ms ease',
          boxSizing: 'border-box',
        }}
      >
        {label}
      </div>
    );
  };

  return (
    <OnboardingShell
      step={6}
      question="What is your gender?"
      subtitle={
        <>“This determines the direction of your Decade Luck Cycles (大运).”</>
      }
      canContinue={true}
      onBack={onBack}
      onContinue={() => {
        updateBirthData({ gender: selected });
        if (selected === 'prefer-not') onPreferNot && onPreferNot();
        else onContinue();
      }}
    >
      <div
        style={{
          padding: '0 2px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {btn('male', 'Male')}
        {btn('female', 'Female')}
        {btn('prefer-not', 'Prefer not to specify', 15)}
      </div>
    </OnboardingShell>
  );
}

// -----------------------------------------------------------
// STEP 6A — ENERGY CURRENT (conditional on prefer-not)
// -----------------------------------------------------------
export function Step6A_EnergyCurrent({ onBack, onContinue }) {
  const { birthData, updateBirthData } = useChart();
  const [current, setCurrent] = useState(birthData.polarity || 'yang');

  const curBtn = (id, title, subtitle) => {
    const isActive = current === id;
    return (
      <button
        key={id}
        onClick={() => setCurrent(id)}
        style={{
          flex: '1 1 0',
          minWidth: 0,
          padding: '16px 14px',
          borderRadius: 10,
          border: isActive ? `1px solid ${BRONZE_MID}` : `1px solid #d9d3c8`,
          background: isActive
            ? 'rgba(139,115,85,0.15)'
            : 'rgba(232,227,216,0.7)',
          fontFamily: "'EB Garamond', serif",
          color: INK,
          cursor: 'pointer',
          textAlign: 'center',
          transition: 'all 250ms ease',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ fontSize: 15, fontWeight: 500 }}>{title}</div>
        <div
          style={{
            fontSize: 12,
            color: INK_LIGHT,
            marginTop: 4,
            letterSpacing: 0.5,
          }}
        >
          {subtitle}
        </div>
      </button>
    );
  };

  return (
    <OnboardingShell
      step={6}
      progressValue={6.5 / 7}
      question="Which current moves through you?"
      subtitle={
        <>
          “A quiet follow-up — this sets the direction of
          <br />
          your Decade Luck Cycles.”
        </>
      }
      canContinue={current !== null}
      onBack={onBack}
      onContinue={() => {
        updateBirthData({ polarity: current });
        onContinue();
      }}
    >
      <div
        style={{
          padding: '0 2px',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <div style={{ display: 'flex', gap: 10 }}>
          {curBtn('yang', 'Forward / Yang', '↑ Outward')}
          {curBtn('yin', 'Inward / Yin', '↓ Receptive')}
        </div>
        <div
          style={{
            marginTop: 4,
            padding: '12px 14px',
            borderRadius: 10,
            border: `1px dashed rgba(139,115,85,0.35)`,
            background: 'rgba(139,115,85,0.05)',
            fontFamily: "'EB Garamond', serif",
            fontSize: 12.5,
            fontStyle: 'italic',
            color: INK_SOFT,
            lineHeight: 1.55,
            textAlign: 'center',
          }}
        >
          Either choice is structural only — we use it
          <br />
          to read 大运, not to name you.
        </div>
        <div
          onClick={() => {
            updateBirthData({ polarity: 'yang' });
            onContinue();
          }}
          style={{
            textAlign: 'center',
            fontFamily: "'EB Garamond', serif",
            fontSize: 13.5,
            color: INK_LIGHT,
            cursor: 'pointer',
            textDecoration: 'underline',
            textUnderlineOffset: 3,
            marginTop: 2,
          }}
        >
          I’m not sure →
        </div>
      </div>
    </OnboardingShell>
  );
}

// -----------------------------------------------------------
// STEP 7 — NOTIFICATIONS
// -----------------------------------------------------------
export function Step7_Notify({ onBack, onContinue, onChangeTime }) {
  const { birthData, updateBirthData } = useChart();
  const [on, setOn] = useState(birthData.notifyOn);

  return (
    <OnboardingShell
      step={7}
      question="Stay in tune with your energy?"
      subtitle={
        <>
          “We’ll send you a morning reading each day.
          <br />
          Your energy doesn’t wait for you to remember to check.”
        </>
      }
      canContinue={true}
      onBack={onBack}
      onContinue={() => {
        updateBirthData({ notifyOn: on });
        onContinue();
      }}
      continueLabel="Reveal My Nature"
      finalStep={true}
    >
      <div style={{ padding: '0 2px' }}>
        {/* Bell icon */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 24,
          }}
        >
          <svg viewBox="0 0 32 32" width="36" height="36">
            <path
              d="M16 4 C 11 4 8 8 8 14 L 8 18 L 5 22 L 27 22 L 24 18 L 24 14 C 24 8 21 4 16 4 Z"
              stroke={BRONZE_MID}
              strokeWidth="1.5"
              fill="none"
              strokeLinejoin="round"
            />
            <path
              d="M13 24 Q 16 28 19 24"
              stroke={BRONZE_MID}
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <p
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 14,
            color: INK_SOFT,
            textAlign: 'center',
            margin: '0 0 22px',
            lineHeight: 1.6,
            padding: '0 10px',
          }}
        >
          Personalized to your archetype and the day’s energy.
        </p>

        {/* Toggle card */}
        <div
          style={{
            padding: '16px 18px',
            background: 'rgba(248,241,225,0.92)',
            border: `1px solid ${PAPER_HAIR}`,
            borderRadius: 14,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 14,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: 15,
                  color: INK,
                  fontWeight: 500,
                }}
              >
                Morning reading
              </div>
              <div
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: 13,
                  color: INK_LIGHT,
                  marginTop: 2,
                }}
              >
                Delivered at 8:00 AM
              </div>
            </div>
            <div
              onClick={() => setOn(!on)}
              style={{
                width: 48,
                height: 28,
                borderRadius: 999,
                background: on ? BRONZE_DARK : '#cfc7b3',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background 200ms ease',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 2,
                  left: on ? 22 : 2,
                  width: 24,
                  height: 24,
                  borderRadius: 999,
                  background: SILK,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                  transition:
                    'left 200ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              />
            </div>
          </div>
          <div
            onClick={() => onChangeTime && onChangeTime()}
            style={{
              marginTop: 12,
              paddingTop: 12,
              borderTop: `1px solid ${SILK_FOLD}`,
              fontFamily: "'EB Garamond', serif",
              fontSize: 13,
              color: INK_LIGHT,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span style={{ fontSize: 10 }}>▼</span> Change time
          </div>
        </div>

        <div
          style={{
            marginTop: 16,
            textAlign: 'center',
            fontFamily: "'EB Garamond', serif",
            fontSize: 13,
            color: INK_LIGHT,
            fontStyle: 'italic',
          }}
        >
          <span
            onClick={() => {
              updateBirthData({ notifyOn: false });
              onContinue();
            }}
            style={{
              textDecoration: 'underline',
              textUnderlineOffset: 3,
              cursor: 'pointer',
              fontStyle: 'normal',
            }}
          >
            Skip for now
          </span>
        </div>
      </div>
    </OnboardingShell>
  );
}

// -----------------------------------------------------------
// STEP 7A — NOTIFICATION TIME (conditional expansion of Step 7)
// Triple scroll wheel + quick-set chips
// -----------------------------------------------------------
export function Step7A_NotifyTime({ onBack, onContinue }) {
  const { birthData, updateBirthData } = useChart();
  const hours = useMemo(() => {
    const a = [];
    for (let h = 1; h <= 12; h++) a.push(h);
    return a;
  }, []);
  const minutes = useMemo(() => {
    const a = [];
    for (let m = 0; m < 60; m += 5) a.push(m);
    return a;
  }, []);
  const meridiems = ['AM', 'PM'];

  const [hIdx, setHIdx] = useState(
    hours.indexOf(birthData.notifyHour || 8) >= 0
      ? hours.indexOf(birthData.notifyHour || 8)
      : 7
  );
  const [mIdx, setMIdx] = useState(
    minutes.indexOf(birthData.notifyMinute || 0) >= 0
      ? minutes.indexOf(birthData.notifyMinute || 0)
      : 0
  );
  const [pIdx, setPIdx] = useState(
    (birthData.notifyMeridiem || 'AM') === 'PM' ? 1 : 0
  );

  const colHeader = (label) => (
    <div
      style={{
        fontFamily: "'EB Garamond', serif",
        fontSize: 10.5,
        letterSpacing: 2.2,
        textTransform: 'uppercase',
        color: INK_LIGHT,
        textAlign: 'center',
        marginBottom: 4,
      }}
    >
      {label}
    </div>
  );

  return (
    <OnboardingShell
      step={7}
      progressValue={6.85 / 7}
      question="Stay in tune with your energy?"
      // Terse — the user already agreed on Step 7. This screen is just the
      // time picker, so the subtitle is a single imperative line.
      subtitle="Adjust your delivery time."
      canContinue={true}
      onBack={onBack}
      onContinue={() => {
        updateBirthData({
          notifyHour: hours[hIdx],
          notifyMinute: minutes[mIdx],
          notifyMeridiem: meridiems[pIdx],
          customNotifyTime: true,
          notifyOn: true,
        });
        onContinue();
      }}
      continueLabel="Reveal My Nature"
      finalStep={true}
    >
      <div style={{ padding: '0 2px' }}>
        <div
          style={{
            padding: '14px 16px 12px',
            background: 'rgba(248,241,225,0.92)',
            border: `1px solid ${PAPER_HAIR}`,
            borderRadius: 14,
          }}
        >
          {/* Live-preview header — the wheels below update this */}
          <div
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 11,
              letterSpacing: 2.6,
              textTransform: 'uppercase',
              color: INK_LIGHT,
              textAlign: 'center',
              marginBottom: 2,
            }}
          >
            Morning reading
          </div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 22,
              color: BRONZE_DARK,
              textAlign: 'center',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: 0.4,
              marginBottom: 10,
            }}
          >
            {hours[hIdx]}:{String(minutes[mIdx]).padStart(2, '0')}{' '}
            <span style={{ fontSize: 14, color: BRONZE_MID, letterSpacing: 2 }}>
              {meridiems[pIdx]}
            </span>
          </div>

          {/* Triple wheel — 3 visible rows each to fit the viewport */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 6,
              padding: '2px 2px 6px',
            }}
          >
            <div>
              {colHeader('Hour')}
              <ScrollPicker
                values={hours}
                selectedIndex={hIdx}
                onChange={setHIdx}
                formatter={(v) => String(v)}
                visibleRows={3}
              />
            </div>
            <div>
              {colHeader('Minute')}
              <ScrollPicker
                values={minutes}
                selectedIndex={mIdx}
                onChange={setMIdx}
                formatter={(v) => String(v).padStart(2, '0')}
                visibleRows={3}
              />
            </div>
            <div>
              {colHeader('—')}
              <ScrollPicker
                values={meridiems}
                selectedIndex={pIdx}
                onChange={setPIdx}
                formatter={(v) => v}
                visibleRows={3}
              />
            </div>
          </div>
        </div>
      </div>
    </OnboardingShell>
  );
}
