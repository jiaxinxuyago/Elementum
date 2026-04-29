// ===================================================================
// ELEMENTUM · Reveal + Energy Map mockup export
//
// Minimal app shell: pre-seeds the 庚 Blade chart on mount, then
// renders either the Reveal screen or the Energy Map mockup, with
// the same "Enter Your Dashboard" CTA on Reveal that the production
// app uses to hand off to the dashboard.
//
// No onboarding, no DevBar, no router — just the two surfaces.
// Switch between them with the floating "Reveal / Energy Map" toggle
// in the top-right corner (dev affordance only).
// ===================================================================

import React, { useState, useEffect } from 'react';
import {
  ChartProvider, useChart,
  resolveHourForCalc, resolveGenderForCalc,
  resolveLongitudeForCalc, resolveLocationName,
} from './store/chartContext.jsx';
import { calculateBaziChart } from './engine/calculator.js';
import RevealScreen from './components/RevealScreen.jsx';
import EnergyMapMockup from './components/mockup/EnergyMapMockup.jsx';
import { SILK } from './styles/tokens.jsx';

// 390×844 phone-frame container (matches DOC5 §6 viewport).
function PhoneFrame({ children }) {
  return (
    <div
      style={{
        position: 'relative',
        width: 390,
        height: 844,
        maxHeight: 'calc(100vh - 40px)',
        maxWidth: 'calc(100vw - 40px)',
        aspectRatio: '390 / 844',
        background: SILK,
        borderRadius: 40,
        overflow: 'hidden',
        boxShadow: '0 30px 80px rgba(0,0,0,0.45), 0 0 0 6px #0f0d0b',
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

function Shell({ children }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#1a1815',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      {children}
    </div>
  );
}

// Floating page toggle — minimal dev affordance to switch screens.
function ScreenToggle({ active, onChange }) {
  const Btn = ({ name, label }) => (
    <button
      onClick={() => onChange(name)}
      style={{
        padding: '6px 12px',
        borderRadius: 6,
        border: `1px solid ${active === name ? '#8b7355' : '#3a342d'}`,
        background: active === name ? 'rgba(139,115,85,0.22)' : '#2a2621',
        color: active === name ? '#e0d6c3' : '#9d968a',
        cursor: 'pointer',
        fontFamily: "'EB Garamond', serif",
        fontSize: 12,
        letterSpacing: 0.3,
      }}
    >{label}</button>
  );
  return (
    <div
      style={{
        position: 'fixed', top: 20, right: 20, zIndex: 1000,
        display: 'flex', gap: 6,
      }}
    >
      <Btn name="reveal" label="Reveal" />
      <Btn name="energymap" label="Energy Map" />
    </div>
  );
}

function Inner() {
  const { birthData, updateBirthData, chart, setChart } = useChart();
  const [screen, setScreen] = useState('reveal');

  // Auto-seed the 庚 reference chart on mount so both surfaces have
  // real data without an onboarding pass. Edit these values to test
  // other charts. (DOC1 reference: 乙亥 庚辰 庚寅 乙酉 · The Blade)
  useEffect(() => {
    updateBirthData({
      year: 1995, month: 4, day: 29, hour: 18,
      hourWindow: null, hourUnknown: false,
      location: 'Beijing', gender: 'male', polarity: null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Compute the chart from the seeded birthData. Mirrors what
  // LoadingScreen does in the production app.
  useEffect(() => {
    if (!birthData.year || chart) return;
    try {
      const computed = calculateBaziChart({
        year: birthData.year,
        month: birthData.month,
        day: birthData.day,
        hour: resolveHourForCalc(birthData),
        gender: resolveGenderForCalc(birthData),
        longitude: resolveLongitudeForCalc(birthData),
        location: resolveLocationName(birthData),
      });
      setChart(computed);
    } catch (err) {
      console.error('calculateBaziChart failed:', err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [birthData.year, birthData.month, birthData.day]);

  if (!chart) {
    return (
      <Shell>
        <div style={{ color: '#857D72', fontFamily: "'EB Garamond', serif" }}>
          computing chart…
        </div>
      </Shell>
    );
  }

  return (
    <>
      <ScreenToggle active={screen} onChange={setScreen} />
      <Shell>
        <PhoneFrame>
          {screen === 'reveal' && (
            <RevealScreen onEnterDashboard={() => setScreen('energymap')} />
          )}
          {screen === 'energymap' && (
            <EnergyMapMockup
              onBack={() => setScreen('reveal')}
              onOpenDetail={(key) => console.log('Open detail:', key)}
            />
          )}
        </PhoneFrame>
      </Shell>
    </>
  );
}

export default function App() {
  return (
    <ChartProvider>
      <Inner />
    </ChartProvider>
  );
}
