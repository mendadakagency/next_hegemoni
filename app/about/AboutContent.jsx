'use client';

import { useEffect } from 'react';
import ABOUT_BODY from '../_partials/about-body';

/* ──────────────────────────────────────────────
   About page content — client wrapper.

   Body markup injected via dangerouslySetInnerHTML
   (preserves 1:1 visual). Reveal-on-scroll runs in
   useEffect so it always fires after DOM is in place.

   Strategy:
   1. On mount, immediately reveal anything already
      inside the viewport (so the hero never sits at
      opacity 0 waiting for scroll).
   2. Observe the rest and reveal as they scroll in.
   3. Failsafe: force-show anything still hidden
      after 600ms (covers IO edge cases on Safari /
      back-forward cache, etc).
   ────────────────────────────────────────────── */
export default function AboutContent() {
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

    const els = document.querySelectorAll('.reveal');
    const viewportH =
      window.innerHeight || document.documentElement.clientHeight;

    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < viewportH && rect.bottom > 0;
      if (inView) {
        // Already on-screen — reveal immediately, no scroll dance.
        reveal(el);
      } else {
        obs.observe(el);
      }
    });

    const t = window.setTimeout(() => {
      document
        .querySelectorAll('.reveal:not(.vis)')
        .forEach((el) => reveal(el));
    }, 600);

    return () => {
      obs.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return <main dangerouslySetInnerHTML={{ __html: ABOUT_BODY }} />;
}
