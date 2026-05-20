'use client';

import { useEffect, useState } from 'react';

/* ──────────────────────────────────────────────
   Announce bar with swipe-up-on-scroll behaviour.
   When the user scrolls past the threshold, the
   `.is-hidden` class is added to the wrapper, which
   collapses its height (so the navbar slides up
   smoothly) while the inner `.announce-bar` slides
   up via translateY for the "swipe" feel.
   ────────────────────────────────────────────── */
export default function AnnounceBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onScroll = () => setHidden(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    <>
      <strong>Early Bird Open</strong>{' '}
      <span className="announce-sep">·</span> Hegemoni MBA Batch #01{' '}
      <span className="announce-sep">·</span> s.d. 28 Mei 2026{' '}
      <a className="ann-pill" href="/#harga">Daftar →</a>
    </>,
    <>
      Closed-door intensive untuk owner brand skala miliaran{' '}
      <span className="announce-sep">·</span> <strong>200 seats only</strong>
    </>,
    <>
      Faculty: GMV 5000M+/tahun <span className="announce-sep">·</span> Masih
      aktif jalankan brand <span className="announce-sep">·</span>{' '}
      <a className="ann-pill" href="/#faculty">Lihat Faculty →</a>
    </>,
  ];

  const loop = [...items, ...items];

  return (
    <div className={`announce-wrap${hidden ? ' is-hidden' : ''}`}>
      <div className="announce-bar">
        <div className="announce-track">
          {loop.map((node, i) => (
            <div key={i} className="announce-item">
              {node}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
