import Script from 'next/script';
import HOME_BODY from './_partials/home-body';

/* ──────────────────────────────────────────────
   HOME — converted from the original bundled
   Hegemoni Academy `index.html`.

   The body markup (hero, kurikulum, faculty, harga,
   FAQ, footer, …) is preserved verbatim and injected
   via dangerouslySetInnerHTML so the original visual
   output is pixel-identical to the bundled page.

   Inline scripts that the original page shipped are
   served from /public/legacy/ and loaded below.

   The Navbar + AnnounceBar are rendered from the
   shared layout (app/layout.jsx) — not from this
   body — so they can be re-used on every route.
   ────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      {/* Lock body before paint until the bumper intro finishes (matches
          original index.html behaviour). */}
      <Script id="ha-bumper-lock" strategy="beforeInteractive">
        {`window.__HA_BUMPER_PENDING = true;`}
      </Script>

      <main dangerouslySetInnerHTML={{ __html: HOME_BODY }} />

      {/* Bumper intro animation (~2 MB of inline HTML/CSS — hosted as a
          separate JS file so it doesn't bloat the page bundle). */}
      <Script
        src="/legacy/index-bumper.js"
        strategy="afterInteractive"
      />
      {/* All other interactive scripts: scroll reveal, mega menu,
          counters, typewriter, marquee, etc. */}
      <Script
        src="/legacy/index-runtime.js"
        strategy="afterInteractive"
      />
    </>
  );
}
