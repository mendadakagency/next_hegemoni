'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

/* ──────────────────────────────────────────────
   Mega menu data — sourced from The Playmakers
   "Program" dropdown (4 stages). Edit this list to
   change what shows in the Program mega menu.
   ────────────────────────────────────────────── */
const MEGA_TABS = [
  {
    label: 'Stage 01 · Foundation',
    items: [
      ['Brand Positioning', 'Diferensiasi, value prop, dan market sizing.'],
      ['Unit Economics', 'HPP, margin, dan CAC sebelum scale.'],
      ['Market Mapping', 'Peta kompetitor dan peluang whitespace.'],
      ['Pricing Strategy', 'Psikologi harga dan tier produk.'],
    ],
  },
  {
    label: 'Stage 02 · Growth Engine',
    items: [
      ['Traffic Acquisition', 'Ads, organic, KOL — full-funnel system.'],
      ['KOL Management', 'Seleksi, brief, tracking, dan ROI.'],
      ['Content System', 'Framework konten yang bisa direplikasi.'],
      ['Marketplace Ops', 'SEO produk, flash sale, dan campaign.'],
    ],
  },
  {
    label: 'Stage 03 · Scale System',
    items: [
      ['Operations & Fulfillment', 'Sistem gudang dan logistik untuk volume.'],
      ['Team Structure', 'Hire, delegate, dan build culture.'],
      ['Supply Chain', 'Sourcing, kontrak, dan buffer stok.'],
      ['Financial Modeling', 'P&L, cashflow, dan proyeksi 9-digit.'],
    ],
  },
  {
    label: 'Stage 04 · Mastery',
    items: [
      ['Multi-brand Strategy', 'Portfolio brand dan sinergi antar produk.'],
      ['Investor Readiness', 'Deck, due diligence, dan negosiasi.'],
      ['Exit Planning', 'M&A basics dan valuasi bisnis.'],
      ['Corporate Governance', 'Struktur legal dan compliance.'],
    ],
  },
];

function Chevron() {
  return (
    <svg className="nav-chevron" fill="none" viewBox="0 0 14 14">
      <path
        d="M2 4.5L7 9.5L12 4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function Navbar() {
  const [megaTab, setMegaTab] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeTab = MEGA_TABS[megaTab];

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onResize = () => { if (window.innerWidth > 900) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleContact = () => {
    if (typeof window !== 'undefined') {
      window.open('https://wa.me/6281234567890');
    }
  };

  const handleRegister = () => {
    if (typeof window === 'undefined') return;
    const target = document.getElementById('harga');
    if (target) {
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    } else {
      // Not on home — route to home and let the hash do the work.
      window.location.href = '/#harga';
    }
  };

  return (
    <>
    <div className="nav">
      <a className="nav-logo" href="/">
        <div className="nav-logo-mark">
          <span
            style={{
              display: 'inline-block',
              background: 'var(--di0) center/contain no-repeat',
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
        <div className="nav-logo-text">
          THE<br />PLAYMAKERS
        </div>
      </a>

      <div className="nav-links">
        {/* Program — mega menu. Plain <a> so clicking it triggers a full
            page reload to /, which replays the legacy bumper intro. */}
        <div className="nav-item" id="navProgram">
          <a href="/">
            Program
            <Chevron />
          </a>
          <div
            className="nav-dropdown nav-mega"
            style={{ left: '-20px' }}
          >
            <div className="nav-dropdown-inner">
              <div className="mega-sidebar">
                <div
                  style={{
                    padding: '16px 24px 12px',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 9,
                    letterSpacing: 2,
                    color: 'rgba(10,10,10,.3)',
                    textTransform: 'uppercase',
                  }}
                >
                  Stage
                </div>
                {MEGA_TABS.map((t, i) => (
                  <div
                    key={t.label}
                    className={`mega-sidebar-item${i === megaTab ? ' active' : ''}`}
                    onMouseEnter={() => setMegaTab(i)}
                    onClick={() => setMegaTab(i)}
                  >
                    <div className="dot" />
                    {t.label.split('·')[1]?.trim() || t.label}
                  </div>
                ))}
                <div
                  style={{
                    height: 1,
                    background: 'rgba(10,10,10,.06)',
                    margin: '12px 0',
                  }}
                />
                <Link href="/kurikulum" className="mega-sidebar-item">
                  <div className="dot" />
                  Semua Modul →
                </Link>
              </div>

              <div className="mega-content">
                <div className="mega-label">{activeTab.label}</div>
                <div className="mega-grid">
                  {activeTab.items.map(([title, desc]) => (
                    <Link key={title} className="mega-link" href="/kurikulum">
                      <div className="mega-link-title">{title}</div>
                      <div className="mega-link-desc">{desc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kurikulum — simple link */}
        <div className="nav-item">
          <Link href="/kurikulum">Kurikulum</Link>
        </div>

        {/* Tentang — dropdown */}
        <div className="nav-item" id="navTentang">
          <button type="button">
            Tentang
            <Chevron />
          </button>
          <div className="nav-dropdown">
            <div className="nav-dropdown-inner">
              <Link className="drop-link" href="/about">Hegemoni Group</Link>
              <Link className="drop-link" href="/about">Tentang Program</Link>
              <Link className="drop-link" href="/about">✦ Confidentia et Praxis</Link>
              <div className="drop-divider" />
              <a className="drop-link" href="#">🤝 Karir &amp; Partnership</a>
            </div>
          </div>
        </div>

        {/* Harga — simple link */}
        <div className="nav-item">
          <a href="/#harga">Harga</a>
        </div>
      </div>

      <div className="nav-right">
        <button className="nav-btn-ghost" onClick={handleContact}>
          Hubungi
        </button>
        <button className="nav-cta" onClick={handleRegister}>
          Daftar Sekarang
        </button>
        <button
          type="button"
          className={`nav-burger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </div>

    {/* Rendered as a sibling of .nav (not inside it) so it isn't trapped
        in .nav's `position:sticky; z-index:100` stacking context — that
        was keeping the menu beneath the announce bar (z-index 101). */}
    <div className={`nav-mobile-menu${menuOpen ? ' open' : ''}`}>
      <div className="nav-mobile-header">
        <button
          type="button"
          className="nav-mobile-close"
          onClick={closeMenu}
          aria-label="Close menu"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6L18 18M18 6L6 18" />
          </svg>
        </button>
      </div>
      <ul>
        <li><a href="/" onClick={closeMenu}>Program</a></li>
        <li><Link href="/kurikulum" onClick={closeMenu}>Kurikulum</Link></li>
        <li><a href="/#faculty" onClick={closeMenu}>Faculty</a></li>
        <li><Link href="/about" onClick={closeMenu}>Tentang</Link></li>
        <li><a href="/#harga" onClick={closeMenu}>Harga</a></li>
      </ul>
      <div className="nav-mobile-actions">
        <button
          type="button"
          className="nav-mobile-ghost"
          onClick={() => { closeMenu(); handleContact(); }}
        >
          Hubungi
        </button>
        <button
          type="button"
          className="nav-mobile-cta"
          onClick={() => { closeMenu(); handleRegister(); }}
        >
          Daftar Sekarang
        </button>
      </div>
    </div>
    </>
  );
}
