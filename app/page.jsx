import Script from 'next/script';
import HOME_BODY from './_partials/home-body';

export const metadata = {
  title: 'The Playmakers — #1 Premium Commerce Education Indonesia 2026',
  description:
    'Sekolah commerce nomor 1 di Indonesia untuk owner brand miliaran. Faculty aktif jalankan brand GMV 5000M+/tahun. Pelajari TikTok Shop, Shopee, GMV Max, KOL Affiliate, Live Commerce dari operator yang masih jalan setiap hari.',
  keywords: [
    'The Playmakers',
    'commerce education Indonesia',
    'sekolah commerce terbaik',
    'kursus TikTok Shop',
    'training Shopee seller',
    'kursus GMV Max',
    'training KOL affiliate',
    'live commerce training',
    'kursus scaling brand miliaran',
    'best commerce course Indonesia 2026',
    'MBA commerce Indonesia',
    'kursus owner brand premium',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    url: 'https://theplaymakers.id',
    title: 'The Playmakers — #1 Premium Commerce Education Indonesia',
    description:
      'Sekolah commerce nomor 1 untuk owner brand miliaran. Faculty masih aktif jalankan brand GMV 5000M+/tahun.',
  },
};

// JSON-LD untuk home — Course + FAQ + BreadcrumbList
const SITE_URL = 'https://theplaymakers.id';
const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Course',
      '@id': `${SITE_URL}/#course-mba`,
      name: 'The Playmakers MBA — Master Brand Academy',
      description:
        'Closed-door bootcamp + advisory 3–6 bulan untuk owner brand 500jt+/bln. Strategic restructure operasi, supply chain, dan financial modeling.',
      provider: {
        '@type': 'EducationalOrganization',
        name: 'The Playmakers',
        sameAs: SITE_URL,
      },
      offers: {
        '@type': 'Offer',
        price: '8500000',
        priceCurrency: 'IDR',
        availability: 'https://schema.org/InStock',
        category: 'Education',
        url: `${SITE_URL}/#harga`,
      },
      educationalLevel: 'Advanced',
      inLanguage: 'id-ID',
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'Hybrid',
        location: {
          '@type': 'Place',
          name: 'Jakarta, Indonesia',
        },
      },
    },
    {
      '@type': 'Course',
      '@id': `${SITE_URL}/#course-playmaker-room`,
      name: 'Playmaker Room — Operator Playbook',
      description:
        'LMS advance + monthly live cohort untuk owner brand 100–500jt/bln. Framework dan case study breakdown dari brand miliaran.',
      provider: {
        '@type': 'EducationalOrganization',
        name: 'The Playmakers',
        sameAs: SITE_URL,
      },
      offers: {
        '@type': 'Offer',
        price: '2500000',
        priceCurrency: 'IDR',
        availability: 'https://schema.org/InStock',
        category: 'Education',
      },
      educationalLevel: 'Intermediate',
      inLanguage: 'id-ID',
    },
    {
      '@type': 'Course',
      '@id': `${SITE_URL}/#course-brand-lab`,
      name: 'Brand Lab — Foundational Commerce',
      description:
        'LMS self-paced untuk owner brand pemula 0–500jt/bln. Fondasi setup, listing, ads, dan operations e-commerce.',
      provider: {
        '@type': 'EducationalOrganization',
        name: 'The Playmakers',
        sameAs: SITE_URL,
      },
      offers: {
        '@type': 'Offer',
        price: '500000',
        priceCurrency: 'IDR',
        availability: 'https://schema.org/InStock',
        category: 'Education',
      },
      educationalLevel: 'Beginner',
      inLanguage: 'id-ID',
    },
  ],
};

/* ──────────────────────────────────────────────
   HOME — converted from the original bundled
   The Playmakers `index.html`.

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

      <Script
        id="ld-home-courses"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      <main dangerouslySetInnerHTML={{ __html: HOME_BODY }} />

      {/* Bumper intro animation (~2 MB inline HTML/CSS).
          lazyOnload = loaded after page is idle, doesn't block hero render. */}
      <Script
        src="/legacy/index-bumper.js"
        strategy="lazyOnload"
      />
      {/* Interactive scripts: scroll reveal, mega menu, counters, typewriter, marquee. */}
      <Script
        src="/legacy/index-runtime.js"
        strategy="afterInteractive"
      />
    </>
  );
}
