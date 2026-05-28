'use client';

import { useEffect, useState } from 'react';
import {
  BL_PHASES,
  PM_CLUSTERS,
  WR_CLUSTERS,
  WR_CROSSOVER,
  TIER_META,
  TAG_COLOR,
} from './kurikulum-data';

/* ──────────────────────────────────────────────
   Curriculum page — three tiers, expandable modules.
   Tier 01 Brand Lab     · 28 modules · 4 phases (sequential, amber)
   Tier 02 Playmaker Room · 25 modules · 6 clusters (free-pick, gold)
   Tier 03 The War Room  · 12 modules · 4 clusters (tactical, crimson)
   ────────────────────────────────────────────── */

// ──────────────────────────────────────────────
// Small primitives
// ──────────────────────────────────────────────

function Aurora({ orbs }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {orbs.map((o, i) => (
        <div
          key={i}
          className={`k-aorb k-aorb-a${o.a}`}
          style={{
            width: o.w, height: o.h, background: o.g,
            top: o.t, bottom: o.b, left: o.l, right: o.r,
          }}
        />
      ))}
    </div>
  );
}

function SectionLabel({ children, color = 'gold' }) {
  const palette = {
    gold:     ['text-gold',     'bg-gold/20'],
    crimson:  ['text-crimson',  'bg-crimson/20'],
    imperial: ['text-imperial', 'bg-imperial/20'],
    amber:    ['text-amber',    'bg-amber/15'],
  }[color];
  return (
    <div className={`font-mono text-[10px] tracking-[3px] uppercase font-medium mb-5 flex items-center gap-4 ${palette[0]}`}>
      <span>{children}</span>
      <span className={`flex-1 h-px min-w-[60px] ${palette[1]}`} />
    </div>
  );
}

function SectionTitle({ main, em, dark = false }) {
  return (
    <h2 className={`font-black text-[clamp(42px,5.5vw,68px)] leading-[0.92] tracking-[-0.035em] uppercase ${dark ? 'text-paper' : 'text-ink'}`}>
      {main}
      {em && (
        <em className={`block not-italic font-extrabold italic mt-1 normal-case tracking-[-0.02em] text-[0.82em] ${dark ? 'text-gold' : 'text-amber'}`}>
          {em}
        </em>
      )}
    </h2>
  );
}

// Tag chip — small uppercase pill colored per tag mapping
function TagChip({ tag }) {
  const s = TAG_COLOR[tag] || { bg: 'rgba(10,10,10,.06)', c: 'rgba(10,10,10,.5)' };
  return (
    <span
      className="font-mono text-[8.5px] tracking-[0.07em] font-semibold uppercase px-[7px] py-[2px] rounded-[3px]"
      style={{ background: s.bg, color: s.c }}
    >
      {tag}
    </span>
  );
}

// Expandable module card — supports light/dark mode via `theme` prop
function ModuleCard({ mod, accent, theme = 'light' }) {
  const [open, setOpen] = useState(false);

  const accentColor = {
    amber:   '#9A5F08',
    gold:    '#C8830C',
    crimson: '#B91C1C',
  }[accent];

  const isDark = theme === 'dark';

  return (
    <div
      className={`k-mod ${isDark ? 'k-mod-dark' : 'k-mod-light'} ${open ? 'is-open' : ''}`}
      style={{ '--accent': accentColor }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="k-mod-btn"
        aria-expanded={open}
      >
        {/* Number badge — filled with accent on hover */}
        <span className="k-mod-badge" aria-hidden>
          <span className="k-mod-badge-n">{mod.n}</span>
        </span>

        {/* Content */}
        <span className="k-mod-info">
          <span className="k-mod-titlerow">
            <span className="k-mod-title">{mod.title}</span>
            {mod.free && <span className="k-mod-freepill">Gratis</span>}
          </span>
          <span className="k-mod-sub">{mod.sub}</span>
          <span className="k-mod-meta">
            {mod.tags.map((t) => <TagChip key={t} tag={t} />)}
            <span className="k-mod-dot" aria-hidden>·</span>
            <span className="k-mod-dur">{mod.dur}</span>
          </span>
        </span>

        {/* Arrow indicator */}
        <span className="k-mod-arrow" aria-hidden>
          <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      {open && (
        <div className="k-mod-detail">
          {mod.cs && (
            <div className="k-detail-cs-block">
              <div className="k-detail-label">Case Study Referensi</div>
              <div className="k-detail-cs">{mod.cs}</div>
            </div>
          )}
          <div className="k-detail-label">Sub-Sections</div>
          <ol className="k-detail-subs">
            {mod.subs.map((s, i) => (
              <li key={i}>
                <span className="k-detail-subn">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          <div className="k-detail-del">
            <span className="k-detail-del-label">Deliverable</span>
            <span className="k-detail-del-text">{mod.del}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Group header (phase/cluster) — prominent chapter divider
function GroupHeader({ groupNoun, n, title, count, accent, theme }) {
  const accentColor = {
    amber:   '#9A5F08',
    gold:    '#C8830C',
    crimson: '#B91C1C',
  }[accent];
  const isDark = theme === 'dark';
  return (
    <div
      className="k-phase"
      style={{ '--accent': accentColor }}
      data-theme={isDark ? 'dark' : 'light'}
    >
      <span className="k-phase-bignum" aria-hidden>{n}</span>
      <div className="k-phase-body">
        <div className="k-phase-label">
          {groupNoun} · {n}
        </div>
        <h4 className="k-phase-title">{title}</h4>
      </div>
      <span className="k-phase-count">
        <span className="k-phase-count-n">{count}</span>
        <span className="k-phase-count-l">modul</span>
      </span>
    </div>
  );
}

// Shared journey data used by both mockup variants
const TIER_JOURNEYS = [
  {
    tier: '01', tierName: 'Brand Lab', aud: 'Pemula · 0–500jt/bln',
    currentN: '03', currentTitle: 'HPP Real, Bukan HPP Asumsi',
    currentTags: ['FUNDAMENTAL'], currentMeta: '4 video · 50 mnt',
    progress: 29, total: 31, completed: 9,
    next: [
      { n: '04', title: 'Legal & Compliance Beres 7 Hari' },
      { n: '05', title: 'Setup Toko Shopee A–Z' },
      { n: '06', title: 'Setup Toko TikTok Shop' },
    ],
    accent: '#9A5F08', accentSoft: 'rgba(154,95,8,.18)',
  },
  {
    tier: '02', tierName: 'Playmaker Room', aud: 'Mid · 500jt–10M/bln',
    currentN: '07', currentTitle: 'KOL System at Scale: 100 → 1000+',
    currentTags: ['CASE-STUDY', 'OPS-SCALING'], currentMeta: '7 video · 120 mnt',
    progress: 62, total: 26, completed: 16,
    next: [
      { n: '08', title: 'Live Commerce Empire' },
      { n: '09', title: 'Negosiasi dengan AM Shopee' },
      { n: '10', title: 'Multi-Marketplace Stack' },
    ],
    accent: '#C8830C', accentSoft: 'rgba(200,131,12,.18)',
  },
  {
    tier: '03', tierName: 'The War Room', aud: 'E-Commerce Specialist',
    currentN: '08', currentTitle: 'GMV Max Decoded: Anti-Boncos',
    currentTags: ['ADS', 'TACTICAL'], currentMeta: '12 video · 240 mnt',
    progress: 67, total: 12, completed: 8,
    next: [
      { n: '09', title: 'Shopee Ads 4-Layer Stacking' },
      { n: '10', title: 'CPAS Hacks: ROAS 10x' },
      { n: '11', title: 'Live Commerce Engineering' },
    ],
    accent: '#B91C1C', accentSoft: 'rgba(185,28,28,.18)',
  },
];

function useCyclingTier() {
  const [state, setState] = useState(0);
  useEffect(() => {
    const reduced = typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const id = setInterval(() => setState((s) => (s + 1) % 3), 4500);
    return () => clearInterval(id);
  }, []);
  return [state, setState];
}

// Animated macbook-style browser mockup — desktop hero variant.
// Shows the Hegemoni journey app in a Safari-style window with a
// sidebar of tiers and main panel that cycles through stages.
function JourneyMacbookMockup() {
  const [state, setState] = useCyclingTier();
  const j = TIER_JOURNEYS[state];

  return (
    <div className="k-laptop-wrap">
      {/* Top label */}
      <div className="flex items-center gap-2 mb-3 font-mono text-[10px] tracking-[2.5px] uppercase text-paper/40">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span>Live · The Playmakers Web</span>
      </div>

      <div className="k-laptop" style={{ '--accent': j.accent }}>
        {/* Browser chrome */}
        <div className="k-laptop-chrome">
          <div className="k-laptop-dots">
            <span style={{ background: '#FF5F57' }} />
            <span style={{ background: '#FEBC2E' }} />
            <span style={{ background: '#28C840' }} />
          </div>
          <div className="k-laptop-url">
            <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>the.playmaker<span className="opacity-50">/journey</span></span>
          </div>
          <div className="k-laptop-chrome-actions">
            <span />
            <span />
            <span />
          </div>
        </div>

        {/* App content */}
        <div className="k-laptop-content">
          {/* Sidebar */}
          <div className="k-laptop-sidebar">
            <div className="flex items-center gap-2 mb-5">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center transition-colors"
                style={{ background: j.accent }}
              >
                <span className="text-white text-[11px] font-black">H</span>
              </div>
              <div>
                <div className="text-white text-[10px] font-bold tracking-[0.15em]">THE</div>
                <div className="text-white/40 text-[7.5px] font-mono tracking-[0.2em]">PLAYMAKERS</div>
              </div>
            </div>

            <div className="font-mono text-[8px] tracking-[2px] uppercase text-white/35 mb-2 px-2">
              Tier Path
            </div>
            <div className="flex flex-col gap-1">
              {TIER_JOURNEYS.map((jj, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setState(i)}
                  className={`k-laptop-navitem ${i === state ? 'active' : ''}`}
                  style={i === state ? { '--accent': jj.accent } : undefined}
                >
                  <span className="k-laptop-navbadge" style={i === state ? { background: jj.accent, color: '#fff' } : undefined}>
                    {jj.tier}
                  </span>
                  <span className="flex-1 text-left">
                    <span className="block text-[10px] font-bold leading-tight">{jj.tierName}</span>
                    <span className="block text-[8.5px] opacity-60 mt-0.5">{jj.completed}/{jj.total} modul</span>
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-auto pt-4 border-t border-white/[0.06]">
              <div className="font-mono text-[8px] tracking-[2px] uppercase text-white/30 mb-1.5">Total</div>
              <div className="text-white text-[18px] font-black leading-none">69 <span className="text-[10px] font-mono text-white/40">modul</span></div>
            </div>
          </div>

          {/* Main panel (animates per state via key) */}
          <div key={state} className="k-laptop-main">
            {/* Hero stripe */}
            <div
              className="rounded-xl p-4 border mb-3"
              style={{
                borderColor: j.accent + '50',
                background: `linear-gradient(135deg, ${j.accentSoft} 0%, rgba(255,255,255,0.02) 100%)`,
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-mono text-[8.5px] tracking-[2px] uppercase text-white/40 mb-1">Stage Lo</div>
                  <div className="font-black text-[20px] uppercase text-white leading-none tracking-tight">{j.tierName}</div>
                  <div className="italic text-[10.5px] font-bold mt-1" style={{ color: j.accent }}>{j.aud}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-mono text-[8.5px] tracking-[2px] uppercase opacity-70" style={{ color: j.accent }}>Tier</div>
                  <div className="font-black text-[26px] leading-none" style={{ color: j.accent }}>{j.tier}</div>
                </div>
              </div>
              {/* Progress */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[8.5px] font-mono uppercase tracking-wider text-white/50">Progress</span>
                <span className="text-[9.5px] font-bold text-white">{j.completed}/{j.total} modul · {j.progress}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full k-progress-bar"
                  style={{ width: `${j.progress}%`, background: j.accent }}
                />
              </div>
            </div>

            {/* Two columns: current + next */}
            <div className="grid grid-cols-[1.1fr_1fr] gap-3 mb-3">
              {/* Current */}
              <div>
                <div className="font-mono text-[8.5px] tracking-[2px] uppercase text-white/40 mb-1.5">Lagi Di Modul</div>
                <div className="rounded-lg p-2.5 bg-white/[0.04] border border-white/[0.08]">
                  <div className="flex items-start gap-2.5 mb-2">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: j.accent }}
                    >
                      <span className="text-white text-[12px] font-black">{j.currentN}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-[10.5px] font-bold leading-tight">{j.currentTitle}</div>
                      <div className="text-[8.5px] font-mono text-white/40 mt-0.5">{j.currentMeta}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    {j.currentTags.map((t) => (
                      <span
                        key={t}
                        className="text-[7px] font-mono font-bold tracking-wider uppercase px-1.5 py-0.5 rounded"
                        style={{ background: j.accentSoft, color: j.accent }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Up next */}
              <div>
                <div className="font-mono text-[8.5px] tracking-[2px] uppercase text-white/40 mb-1.5">Up Next</div>
                <div className="flex flex-col gap-1">
                  {j.next.map((m) => (
                    <div
                      key={m.n}
                      className="flex items-center gap-2 p-1.5 rounded-md bg-white/[0.02] border border-white/[0.04]"
                    >
                      <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border border-white/10 bg-white/[0.02]">
                        <span className="text-white/60 text-[8.5px] font-black">{m.n}</span>
                      </div>
                      <span className="text-white/55 text-[9px] truncate flex-1">{m.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              type="button"
              className="w-full py-2.5 rounded-lg text-[10.5px] font-bold uppercase tracking-[0.12em] text-white flex items-center justify-center gap-2 transition-transform mt-auto"
              style={{
                background: j.accent,
                boxShadow: `0 8px 24px -8px ${j.accent}99`,
              }}
            >
              <span>Lanjut Modul {String(parseInt(j.currentN, 10) + 1).padStart(2, '0')}</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 font-mono text-[10px] tracking-[2px] uppercase text-paper/45 text-center">
        Tier {j.tier} · <span style={{ color: j.accent }}>{j.tierName}</span>
      </div>
    </div>
  );
}

// Animated phone mockup — mobile/tablet variant of the journey app
// cycling through the three tiers every few seconds.
function JourneyPhoneMockup() {
  const [state, setState] = useCyclingTier();
  const journeys = TIER_JOURNEYS;
  const j = journeys[state];

  return (
    <div className="k-phone-wrap">
      {/* Top label — Preview the App */}
      <div className="flex flex-col items-center gap-3 mb-6 mt-4">
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-paper/[0.04] border border-paper/10">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="font-mono text-[11px] tracking-[2.5px] uppercase text-paper/75 font-semibold">Live · Journey App</span>
        </div>
        <p className="text-[13px] text-paper/55 text-center max-w-[260px] leading-snug">
          Preview cara cohort kamu navigate tier-by-tier
        </p>
      </div>

      <div className="k-phone" style={{ '--accent': j.accent }}>
        <div className="k-phone-notch" />
        <div className="k-phone-screen">
          {/* Status bar */}
          <div className="k-phone-statusbar">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px]">5G</span>
              <div className="w-5 h-2.5 border border-white/70 rounded-[2px] flex items-center p-px">
                <div className="h-full w-[80%] bg-white rounded-sm" />
              </div>
            </div>
          </div>

          {/* Content (re-mounts per state via key for fade-in animation) */}
          <div key={state} className="k-screen-content">
            {/* App header */}
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center transition-colors"
                  style={{ background: j.accent }}
                >
                  <span className="text-white text-[11px] font-black">H</span>
                </div>
                <div>
                  <div className="text-white text-[10px] font-bold tracking-[0.15em]">HEGEMONI</div>
                  <div className="text-white/40 text-[7.5px] font-mono tracking-[0.2em]">ACADEMY</div>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-white/[0.08] flex items-center justify-center relative">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500" />
              </div>
            </div>

            {/* Tier hero card */}
            <div
              className="rounded-2xl p-3.5 mb-3 border"
              style={{
                borderColor: j.accent + '50',
                background: `linear-gradient(135deg, ${j.accentSoft} 0%, rgba(255,255,255,0.02) 100%)`,
              }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="font-mono text-[8px] tracking-[2px] uppercase text-white/40">Stage Lo</div>
                <div className="font-mono text-[8px] font-bold tracking-wider" style={{ color: j.accent }}>
                  TIER {j.tier}
                </div>
              </div>
              <div className="font-black text-[18px] uppercase text-white leading-tight tracking-tight">
                {j.tierName}
              </div>
              <div className="italic text-[10px] font-bold mt-0.5 mb-3" style={{ color: j.accent }}>
                {j.aud}
              </div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[8px] font-mono uppercase tracking-wider text-white/50">Progress</span>
                <span className="text-[9px] font-bold text-white">{j.completed}/{j.total} modul</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full k-progress-bar"
                  style={{ width: `${j.progress}%`, background: j.accent }}
                />
              </div>
            </div>

            {/* Current module */}
            <div className="mb-3">
              <div className="font-mono text-[8px] tracking-[2px] uppercase text-white/40 mb-1.5">
                Lagi Di Modul
              </div>
              <div className="rounded-xl p-2.5 bg-white/[0.04] border border-white/[0.08] flex items-start gap-2.5">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: j.accent }}
                >
                  <span className="text-white text-[12px] font-black">{j.currentN}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-[10.5px] font-bold leading-tight mb-1">
                    {j.currentTitle}
                  </div>
                  <div className="flex items-center gap-1 flex-wrap mb-0.5">
                    {j.currentTags.map((t) => (
                      <span
                        key={t}
                        className="text-[6.5px] font-mono font-bold tracking-wider uppercase px-1.5 py-0.5 rounded"
                        style={{ background: j.accentSoft, color: j.accent }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="text-[8px] font-mono text-white/40">{j.currentMeta}</div>
                </div>
              </div>
            </div>

            {/* Up next */}
            <div className="mb-3 flex-1 min-h-0">
              <div className="font-mono text-[8px] tracking-[2px] uppercase text-white/40 mb-1.5">
                Up Next
              </div>
              <div className="flex flex-col gap-1.5">
                {j.next.map((m) => (
                  <div
                    key={m.n}
                    className="flex items-center gap-2 p-1.5 rounded-lg bg-white/[0.02] border border-white/[0.05]"
                  >
                    <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 border border-white/10 bg-white/[0.02]">
                      <span className="text-white/60 text-[9px] font-black">{m.n}</span>
                    </div>
                    <span className="text-white/55 text-[9.5px] truncate flex-1">{m.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              type="button"
              className="w-full py-2.5 rounded-xl text-[10.5px] font-bold uppercase tracking-[0.12em] text-white flex items-center justify-center gap-2 transition-transform"
              style={{
                background: j.accent,
                boxShadow: `0 8px 24px -8px ${j.accent}99`,
              }}
            >
              <span>Lanjut Modul {String(parseInt(j.currentN, 10) + 1).padStart(2, '0')}</span>
              <span>→</span>
            </button>
          </div>

          <div className="k-phone-indicator" />
        </div>
      </div>

      {/* Bottom dots — clickable to switch tiers */}
      <div className="k-phone-dots">
        {journeys.map((jj, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setState(i)}
            className={`k-phone-dot ${i === state ? 'active' : ''}`}
            style={i === state ? { background: jj.accent } : undefined}
            aria-label={`Tier ${jj.tier}`}
          />
        ))}
      </div>

      <div className="mt-2 font-mono text-[10px] tracking-[2px] uppercase text-paper/45 text-center">
        Tier {j.tier} · <span style={{ color: j.accent }}>{j.tierName}</span>
      </div>
    </div>
  );
}

// Crossover list rendered as War Room's "Cluster 05" — same phase header
// and 2-col masonry grid as other clusters, but cards are non-expandable
// references back to the actual K2 modules in Playmaker Room.
function CrossoverList({ items }) {
  return (
    <div className="k-phase-wrap" style={{ marginTop: 48 }}>
      <GroupHeader
        groupNoun="Cluster"
        n="05"
        title="Strategic Crossover · Modul K2"
        count={items.length}
        accent="crimson"
        theme="light"
      />
      <p className="text-[12px] text-ink/55 mb-4 max-w-[760px]">
        Modul dari Playmaker Room yang juga relevan di War Room — tersedia di Tier 2 sebagai
        strategic layer. Pelajari dulu di sana sebelum taktik di sini.
      </p>
      <div className="k-mod-grid">
        {items.map((m, i) => (
          <div
            key={i}
            className="k-mod k-mod-light k-mod-cx"
            style={{ '--accent': '#B91C1C' }}
          >
            <div className="k-mod-btn" style={{ cursor: 'default' }}>
              <span className="k-mod-badge" aria-hidden>
                <span className="k-mod-badge-n">{String(i + 1).padStart(2, '0')}</span>
              </span>
              <span className="k-mod-info">
                <span className="k-mod-titlerow">
                  <span className="k-mod-title">{m.title}</span>
                  <span className="k-mod-k2pill">↑ Modul K2</span>
                </span>
                <span className="k-mod-sub">{m.sub}</span>
                <span className="k-mod-cxfrom">{m.from}</span>
                <span className="k-mod-meta">
                  <span
                    className="font-mono text-[8.5px] tracking-[0.07em] font-semibold uppercase px-[7px] py-[2px] rounded-[3px]"
                    style={{ background: 'rgba(185,28,28,.1)', color: '#B91C1C' }}
                  >
                    {m.tag}
                  </span>
                  <span className="k-mod-dot" aria-hidden>·</span>
                  <span className="k-mod-dur">{m.dur}</span>
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Static section data — Comparison / Differentiators / Testimonials
// ──────────────────────────────────────────────

const TIERS = [TIER_META.brandlab, TIER_META.playmaker, TIER_META.warroom];

const DIFFERENTIATORS = [
  ['P1', 'Praktisi',        ['Faculty = owner brand miliaran yang masih operate hari ini. ', 'Bukan eks-konsultan.']],
  ['P2', 'Commerce-Native', ['Spesifik TikTok Shop, Shopee, GMV Max, KOL Affiliate. ', 'Bukan generic.']],
  ['P3', 'Outcome-Based',   ['Peserta keluar dengan ', 'playbook actionable', ' yang langsung di-deploy.']],
  ['P4', 'Closed-Door',     ['Case study angka real, no recording, ', 'peer-level dialog', '. Bukan webinar.']],
];

const COMPARE_TIERS = ['Brand Lab', 'Playmaker Room', 'The War Room'];
const COMPARE_ROWS = [
  ['Target',       ['Owner brand 0–500jt/bln', ['Owner brand ', '500jt–10M/bln'], ['E-commerce specialist ', '(add-on)']]],
  ['Format',       ['LMS sequential · self-paced', 'LMS advance + monthly live', 'Tactical add-on + operator guest']],
  ['Faculty',      ['Async + recorded', 'Founder-led + monthly live', 'Founder + operator guest']],
  ['Struktur',     ['4 Fase (sequential lock)', '6 Cluster (free-pick)', '4 Cluster (tactical)']],
  ['Modul',        ['28 modul', '25 modul', '12 modul deep']],
  ['Fokus',        ['Setup, fondasi, listing, ads', 'Strategi, scale, multi-channel', 'TikTok Shop × Shopee tactical']],
  ['Deliverable',  ['Foundational playbook + 4 free', 'Framework + case study real', 'Tactical hacks + numbers-first']],
  ['Investasi',    [['Mulai ', 'Rp 500 RB'], ['Mulai ', 'Rp 2.5 JT'], ['Mulai ', 'Rp 8.5 JT']]],
];

const TESTIMONIALS = [
  ['R', 'Rina',  'Beauty Brand · 300jt/bln',  ['Baru kali ini ikut program yang faculty-nya beneran ', 'nunjukin dashboard live', '. Bukan screenshot 2 tahun lalu.']],
  ['D', 'Dimas', 'F&B Brand · 800jt/bln',     ['Yang bikin beda: ', 'peer-level dialog', '. Gue bisa challenge faculty, mereka jawab pake angka.']],
  ['A', 'Andi',  'Fashion Brand · 1.2M/bln',  ['Selesai War Room, gue restructure ', 'GMV Max', ' dan ', 'naik ROAS dari 2.8 ke 5.4', ' dalam 45 hari.']],
];

// ──────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────

export default function KurikulumContent() {
  useEffect(() => {
    const reveal = (el) => el.classList.add('vis');

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );

    const els = document.querySelectorAll('.k-reveal');
    const vh = window.innerHeight || document.documentElement.clientHeight;
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) reveal(el);
      else obs.observe(el);
    });

    // Counters
    const cObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target;
          const target = parseInt(el.dataset.count, 10);
          if (!target) return;
          let c = 0;
          const step = Math.max(1, Math.floor(target / 60));
          const tm = setInterval(() => {
            c += step;
            if (c >= target) { c = target; clearInterval(tm); }
            el.textContent = c.toLocaleString('id-ID');
          }, 20);
          cObs.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll('[data-count]').forEach((el) => cObs.observe(el));

    // Failsafe — anything still hidden after 700ms gets shown
    const t = window.setTimeout(() => {
      document.querySelectorAll('.k-reveal:not(.vis)').forEach((el) => reveal(el));
    }, 700);

    // Tier card tilt
    const cards = document.querySelectorAll('[data-tilt]');
    const onMove = (e) => {
      const c = e.currentTarget;
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      c.style.transform = `translateY(-6px) perspective(600px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    };
    const onLeave = (e) => { e.currentTarget.style.transform = ''; };
    cards.forEach((c) => {
      c.addEventListener('mousemove', onMove);
      c.addEventListener('mouseleave', onLeave);
    });

    // Smooth scroll for in-page anchors
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    document.addEventListener('click', onClick);

    return () => {
      obs.disconnect();
      cObs.disconnect();
      window.clearTimeout(t);
      cards.forEach((c) => {
        c.removeEventListener('mousemove', onMove);
        c.removeEventListener('mouseleave', onLeave);
      });
      document.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <main className="bg-ink text-paper overflow-x-hidden">

      {/* ══ HERO ══ */}
      <section className="k-grid-dark relative min-h-[60vh] sm:min-h-[2vh] flex flex-col overflow-hidden px-6 sm:px-10 lg:px-20 pt-6 sm:pt-14 lg:pt-15 pb-10 sm:pb-10">
        <Aurora orbs={[
          { a: 1, w: '800px', h: '800px', g: 'radial-gradient(circle,rgba(200,131,12,.35),transparent 65%)', t: '-25%', l: '-15%' },
          { a: 2, w: '600px', h: '600px', g: 'radial-gradient(circle,rgba(185,28,28,.22),transparent 65%)', t: '5%',   r: '-10%' },
          { a: 3, w: '700px', h: '500px', g: 'radial-gradient(circle,rgba(30,58,138,.25),transparent 65%)',  b: '-15%', l: '25%'  },
          { a: 4, w: '400px', h: '400px', g: 'radial-gradient(circle,rgba(91,58,75,.2),transparent 65%)',    t: '40%',  r: '20%'  },
          { a: 2, w: '500px', h: '500px', g: 'radial-gradient(circle,rgba(200,131,12,.18),transparent 60%)', t: '45%',  l: '-15%' },
          { a: 3, w: '450px', h: '450px', g: 'radial-gradient(circle,rgba(154,95,8,.14),transparent 60%)',   t: '60%',  l: '5%'   },
        ]}/>

        <div className="relative z-10 grid xl:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] gap-10 xl:gap-12 items-stretch flex-1">
          {/* Left — copy */}
          <div className="flex flex-col">
            <p className="k-fu-1 font-mono text-[11.5px] sm:text-[10px] tracking-[2px] sm:tracking-[3.5px] uppercase text-paper/65 font-semibold sm:font-medium mb-7 sm:mb-7">
              <span className="text-gold mr-1.5">10</span>· Curriculum Map V1 · 2026
            </p>
            <h1 className="k-fu-2 font-black text-[clamp(32px,6.5vw,130px)] leading-[0.9] tracking-[-0.04em] uppercase mb-5 sm:mb-5">
              69 Modul.
              <em className="block not-italic font-extrabold italic text-gold normal-case tracking-[-0.03em] text-[0.72em] mt-1">
                Tiga Tier.<br/>Satu Platform.
              </em>
            </h1>

            <p className="k-fu-4 text-[13px] sm:text-[clamp(14px,1vw,17px)] leading-[1.7] text-paper/55 max-w-[540px] mb-6 sm:mb-11 text-pretty sm:mt-5">
              Long-list kurikulum 3 tier: <strong className="text-paper/90 font-semibold">Brand Lab</strong> (foundational, sequential, 0–500jt/bln —
              termasuk Tim Ideal, TikTok Ads Manager ekosistem + CPAS intro · 4 modul akses gratis),
              <strong className="text-paper/90 font-semibold"> Playmaker Room</strong> (strategic multi-channel, free-pick, 500jt–10M/bln), dan <strong className="text-paper/90 font-semibold">The War Room</strong>
              (tactical e-commerce specialist — TikTok Shop × Shopee deep ops, 12 modul in-depth).
            </p>

            <div className="k-fu-5 flex flex-wrap gap-3">
              <a href="#overview" className="inline-flex items-center gap-2.5 bg-gold text-ink px-7 py-3.5 sm:px-9 sm:py-4 rounded font-mono text-[11px] tracking-[1.5px] uppercase font-medium hover:bg-amber hover:-translate-y-[3px] hover:shadow-[0_14px_44px_rgba(200,131,12,0.35)] transition-all duration-300">
                Lihat Kurikulum →
              </a>
              <a href="https://wa.me/6281234567890" className="inline-flex items-center bg-transparent text-paper/75 border border-paper/25 px-6 py-3.5 sm:px-7 sm:py-4 rounded text-[13px] font-medium hover:border-paper/50 hover:text-paper hover:bg-paper/5 transition-all duration-300">
                Hubungi Tim
              </a>
            </div>
          </div>

          {/* Right (desktop xl+) — Macbook browser mockup */}
          <div className="hidden xl:flex flex-col items-center w-full k-fu-4">
            <JourneyMacbookMockup />
          </div>

          {/* Below xl (tablet/mobile) — Phone mockup stacks under the text */}
          <div className="xl:hidden flex justify-center mt-6 k-fu-4">
            <JourneyPhoneMockup />
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ══ */}
      <div className="k-reveal m-6 sm:m-10 lg:m-20 grid grid-cols-4 rounded-[10px] border border-paper/5 overflow-hidden bg-carbon/60 backdrop-blur-md relative z-[2]">
        {[
          ['31', 'Brand Lab',       true],
          ['26', 'Playmaker Room',  false],
          ['12', 'The War Room',    false],
          ['75', 'Templates & Tools', false],
        ].map(([v, l, gold], i) => (
          <div key={i} className="text-center py-5 px-2 sm:py-8 sm:px-4 border-r border-paper/5 last:border-r-0 hover:bg-gold/[0.06] transition-all duration-300">
            <div data-count={v} className={`font-black text-[clamp(20px,3.5vw,48px)] leading-[0.9] tracking-[-1px] ${gold ? 'text-gold' : 'text-paper'}`}>0</div>
            <div className="font-mono text-[7px] sm:text-[9px] tracking-[1.5px] sm:tracking-[2px] text-paper/25 mt-1.5 sm:mt-2.5 uppercase leading-tight">{l}</div>
          </div>
        ))}
      </div>

      {/* ══ OVERVIEW CARDS ══ */}
      <section id="overview" className="k-grid-dark relative overflow-hidden px-6 sm:px-10 lg:px-20 py-[clamp(80px,8vw,110px)]">
        <Aurora orbs={[
          { a: 2, w: '500px', h: '500px', g: 'radial-gradient(circle,rgba(200,131,12,.15),transparent 60%)', t: '-10%', r: '5%' },
          { a: 4, w: '400px', h: '400px', g: 'radial-gradient(circle,rgba(30,58,138,.10),transparent 60%)',  b: '10%',  l: '-5%' },
        ]}/>
        <div className="relative z-10 k-reveal">
          <SectionLabel>01 · Kurikulum</SectionLabel>
          <SectionTitle main="PILIH TIER" em="Sesuai Stage Bisnis Kamu." dark />
          <p className="text-[15px] leading-[1.8] text-paper/45 max-w-[560px] mt-4">
            Setiap tier punya kurikulum, struktur, faculty access, dan komunitas yang di-differentiate.
            Bukan beda harga — beda level kedalaman, format delivery, dan outcome.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {TIERS.map((t, i) => {
            const accent = {
              amber:   { num: 'text-amber',   aud: 'text-amber',   bar: 'from-amber to-amber/20'   },
              gold:    { num: 'text-gold',    aud: 'text-gold',    bar: 'from-gold to-amber'       },
              crimson: { num: 'text-crimson', aud: 'text-crimson', bar: 'from-crimson to-imperial' },
            }[t.accent];
            return (
              <a
                key={t.id}
                href={`#${t.id}`}
                data-tilt
                className={`k-tier-card k-reveal k-d${i + 1} group relative overflow-hidden rounded-xl bg-carbon border border-paper/5 p-10 px-7 flex flex-col cursor-pointer hover:border-gold/20 hover:-translate-y-1.5 hover:shadow-[0_24px_64px_rgba(0,0,0,0.3)] ${t.accent === 'gold' ? 'bg-[#23201B] border-gold/10' : ''}`}
              >
                <span className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${accent.bar}`} />
                {t.badge && (
                  <span className="absolute top-3.5 right-3.5 font-mono text-[8px] tracking-[2px] uppercase text-ink bg-gold px-3 py-1 rounded-full font-medium z-10">
                    {t.badge}
                  </span>
                )}
                <span className={`relative font-mono text-[10px] tracking-[2.5px] uppercase font-medium mb-4 ${accent.num}`}>{t.num}</span>
                <span className="relative font-black text-[clamp(24px,2.3vw,32px)] uppercase tracking-[-0.5px] leading-none mb-2.5 text-paper">{t.name}</span>
                <span className={`relative italic font-bold text-sm mb-5 ${accent.aud}`}>{t.aud}</span>
                <span className="relative text-sm leading-[1.75] text-paper/40 flex-1 mb-6">{t.desc}</span>

                <span className="relative border-t border-paper/5 pt-4 mb-5 block">
                  <span className="flex justify-between items-center py-2 border-b border-paper/[0.04]">
                    <span className="font-mono text-[9px] tracking-[2px] uppercase text-paper/25 font-medium">Struktur</span>
                    <span className="text-[13px] font-bold text-paper">{t.structureLabel}</span>
                  </span>
                  <span className="flex justify-between items-center py-2 border-b border-paper/[0.04]">
                    <span className="font-mono text-[9px] tracking-[2px] uppercase text-paper/25 font-medium">Modul</span>
                    <span className="text-[13px] font-bold text-paper">{t.moduleCount} modul</span>
                  </span>
                  <span className="flex justify-between items-center py-2">
                    <span className="font-mono text-[9px] tracking-[2px] uppercase text-paper/25 font-medium">Investasi</span>
                    <span className="text-[13px] font-bold text-gold">{t.price}</span>
                  </span>
                </span>

                <span className={`relative font-mono text-[10px] tracking-[1.5px] uppercase font-medium ${accent.num}`}>Lihat Modul →</span>
              </a>
            );
          })}
        </div>
      </section>

      {/* ══ BRAND LAB (LIGHT) ══ */}
      <section id="brandlab" className="k-grid-light bg-paper text-ink relative overflow-hidden px-6 sm:px-10 lg:px-20 py-[clamp(80px,8vw,110px)]">
        <Aurora orbs={[
          { a: 1, w: '600px', h: '600px', g: 'radial-gradient(circle,rgba(200,131,12,.12),transparent 60%)', t: '-15%', r: '5%'   },
          { a: 3, w: '500px', h: '500px', g: 'radial-gradient(circle,rgba(154,95,8,.08),transparent 60%)',   b: '-10%', l: '-10%' },
          { a: 4, w: '350px', h: '350px', g: 'radial-gradient(circle,rgba(30,58,138,.06),transparent 60%)',  t: '30%',  l: '40%'  },
        ]}/>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-15 items-start mb-14">
          <div className="k-reveal">
            <div className="font-mono text-[10px] tracking-[3px] uppercase mb-3 font-medium text-amber">{TIER_META.brandlab.num} · {TIER_META.brandlab.name}</div>
            <h3 className="font-black text-[clamp(48px,6vw,80px)] leading-[0.88] tracking-[-0.04em] uppercase mb-2 text-ink">Brand<br/>Lab</h3>
            <div className="italic font-bold text-base mb-6 text-amber">{TIER_META.brandlab.aud}</div>
            <p className="text-base leading-[1.85] max-w-[520px] text-ink/50">
              {TIER_META.brandlab.desc}
            </p>
            <p className="mt-4 italic text-sm text-ink/30">{TIER_META.brandlab.tagline}</p>
          </div>
          <div className="k-reveal k-d1 flex flex-col gap-5">
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {[
                ['31',  'Modul'],
                ['157', 'Video'],
                ['33',  'Jam Total'],
                ['4',   'Fase'],
              ].map(([v, l], i) => (
                <div key={i} className="text-center py-4 px-2 sm:py-6 sm:px-3 rounded-lg bg-white border border-ink/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-gold/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300">
                  <div className="font-black text-[22px] sm:text-[32px] tracking-[-1px] leading-none text-amber">{v}</div>
                  <div className="font-mono text-[7px] sm:text-[8px] tracking-[1.5px] sm:tracking-[2px] uppercase mt-1.5 sm:mt-2 text-ink/40">{l}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 flex-wrap">
              <a href="#cta" className="inline-flex items-center gap-2.5 bg-ink text-paper px-9 py-4 rounded font-mono text-[11px] tracking-[1.5px] uppercase font-medium hover:-translate-y-[3px] hover:shadow-[0_14px_44px_rgba(0,0,0,0.3)] transition-all duration-300">
                Mulai Brand Lab →
              </a>
              <a href="https://wa.me/6281234567890" className="inline-flex items-center bg-transparent text-ink/45 border border-ink/10 px-7 py-4 rounded text-[13px] font-medium hover:border-ink/30 hover:text-ink transition-all duration-300">
                Tanya Tim
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-10 font-mono text-[9px] tracking-[3px] uppercase font-medium mb-2 text-amber k-reveal">Long-List Kurikulum · 4 Fase</div>
        <p className="relative z-10 text-[12px] text-ink/45 mb-6 k-reveal">Klik modul untuk expand sub-section, case study, dan deliverable.</p>

        <div className="relative z-10 k-reveal">
          {BL_PHASES.map((g) => (
            <div key={g.n} className="k-phase-wrap">
              <GroupHeader
                groupNoun="Fase"
                n={g.n}
                title={g.title}
                count={g.modules.length}
                accent="amber"
                theme="light"
              />
              <div className="k-mod-grid">
                {g.modules.map((m) => (
                  <ModuleCard key={m.n} mod={m} accent="amber" theme="light" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ PLAYMAKER ROOM (DARK) ══ */}
      <section id="playmaker" className="k-grid-dark bg-ink relative overflow-hidden px-6 sm:px-10 lg:px-20 py-[clamp(80px,8vw,110px)]">
        <Aurora orbs={[
          { a: 1, w: '700px', h: '500px', g: 'radial-gradient(circle,rgba(200,131,12,.30),transparent 60%)', t: '-10%', r: '-15%' },
          { a: 2, w: '500px', h: '500px', g: 'radial-gradient(circle,rgba(30,58,138,.20),transparent 60%)',  b: '5%',   l: '-10%' },
          { a: 3, w: '400px', h: '400px', g: 'radial-gradient(circle,rgba(185,28,28,.12),transparent 60%)',  t: '40%',  l: '30%'  },
          { a: 4, w: '350px', h: '350px', g: 'radial-gradient(circle,rgba(91,58,75,.15),transparent 60%)',   b: '-5%',  r: '25%'  },
        ]}/>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-15 items-start mb-14">
          <div className="k-reveal">
            <div className="font-mono text-[10px] tracking-[3px] uppercase mb-3 font-medium text-gold">{TIER_META.playmaker.num} · {TIER_META.playmaker.name}</div>
            <h3 className="font-black text-[clamp(48px,6vw,80px)] leading-[0.88] tracking-[-0.04em] uppercase mb-2 text-paper">Playmaker<br/>Room</h3>
            <div className="italic font-bold text-base mb-6 text-gold">{TIER_META.playmaker.aud}</div>
            <p className="text-base leading-[1.85] max-w-[520px] text-paper/50">
              {TIER_META.playmaker.desc}
            </p>
            <p className="mt-4 italic text-sm text-paper/40">{TIER_META.playmaker.tagline}</p>
          </div>
          <div className="k-reveal k-d1 flex flex-col gap-5">
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {[
                ['26',  'Modul'],
                ['153', 'Video'],
                ['44',  'Jam Total'],
                ['6',   'Cluster'],
              ].map(([v, l], i) => (
                <div key={i} className="text-center py-4 px-2 sm:py-6 sm:px-3 rounded-lg bg-paper/[0.03] border border-paper/[0.04] hover:bg-gold/[0.06] hover:border-gold/15 transition-all duration-300">
                  <div className="font-black text-[22px] sm:text-[32px] tracking-[-1px] leading-none text-gold">{v}</div>
                  <div className="font-mono text-[7px] sm:text-[8px] tracking-[1.5px] sm:tracking-[2px] uppercase mt-1.5 sm:mt-2 text-paper/40">{l}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 flex-wrap">
              <a href="#cta" className="inline-flex items-center gap-2.5 bg-gold text-ink px-9 py-4 rounded font-mono text-[11px] tracking-[1.5px] uppercase font-medium hover:bg-amber hover:-translate-y-[3px] hover:shadow-[0_14px_44px_rgba(200,131,12,0.35)] transition-all duration-300">
                Masuk Cohort →
              </a>
              <a href="https://wa.me/6281234567890" className="inline-flex items-center bg-transparent text-paper/55 border border-paper/10 px-7 py-4 rounded text-[13px] font-medium hover:border-paper/40 hover:text-paper hover:bg-paper/5 transition-all duration-300">
                Tanya Tim
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-10 font-mono text-[9px] tracking-[3px] uppercase font-medium mb-2 text-gold k-reveal">Long-List Kurikulum · 6 Cluster · Free-Pick</div>
        <p className="relative z-10 text-[12px] text-paper/45 mb-6 k-reveal">Klik modul untuk expand sub-section, case study, dan deliverable.</p>

        <div className="relative z-10 k-reveal">
          {PM_CLUSTERS.map((g) => (
            <div key={g.n} className="k-phase-wrap">
              <GroupHeader
                groupNoun="Cluster"
                n={g.n}
                title={g.title}
                count={g.modules.length}
                accent="gold"
                theme="dark"
              />
              <div className="k-mod-grid">
                {g.modules.map((m) => (
                  <ModuleCard key={m.n} mod={m} accent="gold" theme="dark" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ THE WAR ROOM (LIGHT) ══ */}
      <section id="warroom" className="k-grid-light bg-paper text-ink relative overflow-hidden px-6 sm:px-10 lg:px-20 py-[clamp(80px,8vw,110px)]">
        <Aurora orbs={[
          { a: 2, w: '600px', h: '600px', g: 'radial-gradient(circle,rgba(185,28,28,.10),transparent 60%)', t: '-10%', l: '15%' },
          { a: 4, w: '500px', h: '400px', g: 'radial-gradient(circle,rgba(30,58,138,.07),transparent 60%)', b: '-5%',  r: '-5%' },
          { a: 1, w: '350px', h: '350px', g: 'radial-gradient(circle,rgba(200,131,12,.08),transparent 60%)', t: '50%', r: '30%' },
        ]}/>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-15 items-start mb-14">
          <div className="k-reveal">
            <div className="font-mono text-[10px] tracking-[3px] uppercase mb-3 font-medium text-crimson">{TIER_META.warroom.num} · {TIER_META.warroom.name}</div>
            <h3 className="font-black text-[clamp(48px,6vw,80px)] leading-[0.88] tracking-[-0.04em] uppercase mb-2 text-ink">The<br/>War Room</h3>
            <div className="italic font-bold text-base mb-6 text-crimson">{TIER_META.warroom.aud}</div>
            <p className="text-base leading-[1.85] max-w-[520px] text-ink/50">
              {TIER_META.warroom.desc}
            </p>
            <p className="mt-4 italic text-sm text-ink/30">{TIER_META.warroom.tagline}</p>
          </div>
          <div className="k-reveal k-d1 flex flex-col gap-5">
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {[
                ['12',  'Modul'],
                ['121', 'Video'],
                ['36',  'Jam Total'],
                ['4',   'Cluster'],
              ].map(([v, l], i) => (
                <div key={i} className="text-center py-4 px-2 sm:py-6 sm:px-3 rounded-lg bg-white border border-ink/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-crimson/20 transition-all duration-300">
                  <div className="font-black text-[22px] sm:text-[32px] tracking-[-1px] leading-none text-crimson">{v}</div>
                  <div className="font-mono text-[7px] sm:text-[8px] tracking-[1.5px] sm:tracking-[2px] uppercase mt-1.5 sm:mt-2 text-ink/40">{l}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 flex-wrap">
              <a href="#cta" className="inline-flex items-center gap-2.5 bg-crimson text-paper px-9 py-4 rounded font-mono text-[11px] tracking-[1.5px] uppercase font-medium hover:-translate-y-[3px] hover:shadow-[0_14px_44px_rgba(185,28,28,0.35)] transition-all duration-300">
                Daftar War Room →
              </a>
              <a href="https://wa.me/6281234567890" className="inline-flex items-center bg-transparent text-ink/45 border border-ink/10 px-7 py-4 rounded text-[13px] font-medium hover:border-ink/30 hover:text-ink transition-all duration-300">
                Tanya Tim
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-10 font-mono text-[9px] tracking-[3px] uppercase font-medium mb-2 text-crimson k-reveal">Long-List Kurikulum · 4 Cluster Tactical</div>
        <p className="relative z-10 text-[12px] text-ink/45 mb-6 k-reveal">Tactics, hacks, numbers-first. Klik modul untuk expand sub-section, case study, dan deliverable.</p>

        <div className="relative z-10 k-reveal">
          {WR_CLUSTERS.map((g) => (
            <div key={g.n} className="k-phase-wrap">
              <GroupHeader
                groupNoun="Cluster"
                n={g.n}
                title={g.title}
                count={g.modules.length}
                accent="crimson"
                theme="light"
              />
              <div className="k-mod-grid">
                {g.modules.map((m) => (
                  <ModuleCard key={m.n} mod={m} accent="crimson" theme="light" />
                ))}
              </div>
            </div>
          ))}

          <CrossoverList items={WR_CROSSOVER} />
        </div>
      </section>

      {/* ══ COMPARISON (LIGHT) ══ */}
      <section id="compare" className="k-grid-light bg-paper text-ink relative overflow-hidden px-6 sm:px-10 lg:px-20 py-[clamp(80px,8vw,110px)]">
        <Aurora orbs={[
          { a: 1, w: '500px', h: '500px', g: 'radial-gradient(circle,rgba(30,58,138,.08),transparent 60%)', t: '-5%', l: '20%' },
          { a: 3, w: '400px', h: '400px', g: 'radial-gradient(circle,rgba(200,131,12,.07),transparent 60%)', b: '10%', r: '5%' },
        ]}/>
        <div className="relative z-10 k-reveal">
          <SectionLabel color="imperial">Perbandingan</SectionLabel>
          <SectionTitle main="SIDE BY SIDE" em="Tiga Tier Dibedah." />
        </div>
        {/* Desktop: table */}
        <div className="hidden md:block relative z-10 mt-12 rounded-xl overflow-hidden border border-ink/8 bg-white k-reveal">
          <table className="k-cmp w-full border-collapse">
            <thead>
              <tr className="bg-sand border-b border-ink/10">
                {['', ...COMPARE_TIERS].map((h, i) => (
                  <th key={i} className={`font-mono text-[9px] tracking-[2.5px] uppercase text-ink/30 font-medium text-left p-[18px_24px] ${i === 2 ? 'k-col-hl' : ''} ${i === 3 ? 'k-col-mba' : ''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map(([key, cells], i) => (
                <tr key={i} className="transition-colors duration-300">
                  <td className="font-mono text-[9.5px] tracking-[1.5px] uppercase text-ink/25 font-medium w-[140px] p-[16px_24px] border-b border-ink/[0.04]">{key}</td>
                  {cells.map((c, j) => {
                    const cls = `text-sm p-[16px_24px] border-b border-ink/[0.04] text-ink/50 ${j === 1 ? 'k-col-hl' : ''} ${j === 2 ? 'k-col-mba' : ''}`;
                    if (Array.isArray(c)) {
                      return (
                        <td key={j} className={cls}>
                          {c[0]}<strong className="text-ink font-bold">{c[1]}</strong>
                        </td>
                      );
                    }
                    return <td key={j} className={cls}><strong className="text-ink font-bold">{c}</strong></td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: card per tier */}
        <div className="md:hidden relative z-10 mt-10 space-y-4">
          {COMPARE_TIERS.map((tierName, tierIdx) => {
            const accent =
              tierIdx === 1 ? 'border-gold/30 bg-[#F3EDE1]' :
              tierIdx === 2 ? 'border-crimson/20 bg-[#F4EDE6]' :
              'border-ink/8 bg-white';
            const label =
              tierIdx === 1 ? 'text-gold' :
              tierIdx === 2 ? 'text-crimson' :
              'text-ink/40';
            return (
              <div key={tierIdx} className={`k-reveal rounded-xl border ${accent} p-5`}>
                <div className={`font-mono text-[10px] tracking-[2.5px] uppercase font-semibold mb-4 ${label}`}>{tierName}</div>
                <div className="divide-y divide-ink/[0.06]">
                  {COMPARE_ROWS.map(([key, cells], i) => {
                    const c = cells[tierIdx];
                    const value = Array.isArray(c) ? (
                      <>{c[0]}<strong className="text-ink font-bold">{c[1]}</strong></>
                    ) : (
                      <strong className="text-ink font-bold">{c}</strong>
                    );
                    return (
                      <div key={i} className="flex justify-between items-start gap-4 py-3">
                        <span className="font-mono text-[9.5px] tracking-[1.5px] uppercase text-ink/30 font-medium pt-0.5 flex-shrink-0">{key}</span>
                        <span className="text-[13px] leading-[1.5] text-ink/55 text-right">{value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══ DIFFERENTIATORS (DARK) ══ */}
      <section className="k-grid-dark bg-ink relative overflow-hidden px-6 sm:px-10 lg:px-20 py-[clamp(80px,8vw,110px)]">
        <Aurora orbs={[
          { a: 3, w: '600px', h: '500px', g: 'radial-gradient(circle,rgba(185,28,28,.18),transparent 60%)', b: '5%',   r: '-10%' },
          { a: 1, w: '500px', h: '500px', g: 'radial-gradient(circle,rgba(200,131,12,.15),transparent 60%)', t: '-10%', l: '10%'  },
          { a: 4, w: '400px', h: '400px', g: 'radial-gradient(circle,rgba(30,58,138,.12),transparent 60%)',  t: '30%',  r: '30%'  },
        ]}/>
        <div className="relative z-10 k-reveal">
          <SectionLabel color="crimson">Differentiators</SectionLabel>
          <SectionTitle main="FOUR" em="Differentiators." dark />
          <p className="text-[15px] leading-[1.8] text-paper/45 max-w-[560px] mt-4">
            Empat pillar yang bikin Hegemoni beda dari semua kompetitor.
          </p>
        </div>
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {DIFFERENTIATORS.map(([n, t, frag], i) => (
            <div key={i} className={`k-reveal k-d${i + 1} group relative overflow-hidden p-9 px-6 rounded-[10px] bg-carbon border border-paper/[0.04] hover:border-gold/15 hover:-translate-y-1.5 hover:bg-gold/[0.04] transition-all duration-[450ms]`}>
              <span className="absolute top-0 left-0 right-0 h-[2px] bg-gold/20 group-hover:bg-gold transition" />
              <div className="font-black text-[22px] text-gold mb-4">{n}</div>
              <div className="font-black text-[17px] uppercase tracking-[-0.3px] mb-2.5 text-paper">{t}</div>
              <div className="text-[13px] leading-[1.7] text-paper/40">
                {frag.map((s, j) =>
                  j === 1
                    ? <span key={j} className="text-gold font-semibold">{s}</span>
                    : <span key={j}>{s}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ TESTIMONIALS (LIGHT) ══ */}
      <section className="k-grid-light bg-paper text-ink relative overflow-hidden px-6 sm:px-10 lg:px-20 py-[clamp(80px,8vw,110px)]">
        <Aurora orbs={[
          { a: 2, w: '500px', h: '500px', g: 'radial-gradient(circle,rgba(200,131,12,.08),transparent 60%)', t: '-10%', r: '10%' },
          { a: 4, w: '400px', h: '400px', g: 'radial-gradient(circle,rgba(185,28,28,.06),transparent 60%)',  b: '5%',   l: '15%' },
        ]}/>
        <div className="relative z-10 k-reveal">
          <SectionLabel color="amber">Social Proof</SectionLabel>
          <SectionTitle main="FROM THE" em="Room." />
          <p className="text-[15px] leading-[1.8] text-ink/50 max-w-[560px] mt-4">
            Apa kata operator yang udah masuk ruangan Hegemoni.
          </p>
        </div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {TESTIMONIALS.map(([initial, name, role, frag], i) => (
            <div key={i} className={`k-testi k-reveal k-d${i + 1} p-8 px-7 rounded-xl bg-white border border-ink/5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-gold/20 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] transition-all duration-[450ms] flex flex-col`}>
              <p className="relative z-10 text-[15px] leading-[1.75] text-ink/60 italic mb-6 flex-1">
                {frag.map((s, j) =>
                  j % 2 === 1
                    ? <strong key={j} className="text-amber not-italic font-bold">{s}</strong>
                    : <span key={j}>{s}</span>
                )}
              </p>
              <div className="relative z-10 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/15 to-crimson/10 flex items-center justify-center font-extrabold text-sm text-amber border-[1.5px] border-gold/15 shrink-0">
                  {initial}
                </div>
                <div>
                  <div className="font-bold text-sm text-ink">{name}</div>
                  <div className="font-mono text-[9px] tracking-[1.5px] uppercase text-ink/30 mt-0.5">{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CTA (DARK) ══ */}
      <section id="cta" className="k-grid-dark bg-ink relative overflow-hidden px-6 sm:px-10 lg:px-20 py-[clamp(100px,10vw,160px)] text-center">
        <Aurora orbs={[
          { a: 1, w: '700px', h: '700px', g: 'radial-gradient(circle,rgba(200,131,12,.30),transparent 60%)', t: '-20%', l: '10%' },
          { a: 3, w: '500px', h: '500px', g: 'radial-gradient(circle,rgba(185,28,28,.18),transparent 60%)',  b: '-10%', r: '5%' },
          { a: 2, w: '400px', h: '400px', g: 'radial-gradient(circle,rgba(30,58,138,.15),transparent 60%)',  t: '30%',  r: '30%' },
        ]}/>
        <div className="relative z-10 max-w-[600px] mx-auto k-reveal">
          <div className="font-mono text-[10px] tracking-[3px] uppercase font-medium mb-5 text-gold flex items-center justify-center">
            <span>Next Step</span>
          </div>
          <div className="font-black text-[clamp(40px,5vw,64px)] leading-[0.92] tracking-[-0.035em] uppercase mb-5 text-paper">
            PILIH TIER.
            <em className="block not-italic font-extrabold italic text-gold normal-case">Lock Seat Lo.</em>
          </div>
          <p className="text-base leading-[1.8] text-paper/45 max-w-[480px] mx-auto mb-10">
            Brand Lab, Playmaker Room, atau The War Room — pilih sesuai stage operasional kamu.
            Built, not theorized. Practice in confidence.
          </p>
          <div className="flex gap-3.5 justify-center flex-wrap">
            <a href="https://wa.me/6281234567890" className="inline-flex items-center gap-2.5 bg-gold text-ink px-9 py-4 rounded font-mono text-[11px] tracking-[1.5px] uppercase font-medium hover:bg-amber hover:-translate-y-[3px] hover:shadow-[0_14px_44px_rgba(200,131,12,0.35)] transition-all duration-300">
              Konsultasi Pilih Tier →
            </a>
            <a href="https://wa.me/6281234567890" className="inline-flex items-center bg-transparent text-paper/55 border border-paper/10 px-7 py-4 rounded text-[13px] font-medium hover:border-paper/40 hover:text-paper hover:bg-paper/5 transition-all duration-300">
              Tanya via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="bg-ink px-6 sm:px-10 lg:px-20 py-10 border-t border-paper/5">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-paper/20">
          <div className="font-mono text-[10px] font-medium tracking-[2px] uppercase">The Playmakers · Curriculum Map V1</div>
          <div className="italic text-[13px] text-paper/20">Built, Not Theorized.</div>
          <div className="font-mono text-[10px] tracking-[1.5px]">© 2026</div>
        </div>
      </footer>
    </main>
  );
}
