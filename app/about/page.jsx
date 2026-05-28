import AboutContent from './AboutContent';
import './about.css';

const SITE_URL = 'https://theplaymakers.id';

export const metadata = {
  title: 'About — Hegemoni Group, Parent of The Playmakers',
  description:
    'Hegemoni Group didirikan 2020 — holding yang membangun ekosistem brand kecantikan Indonesia berbasis riset, sistem, dan kecepatan. The Playmakers adalah arm edukasi commerce premium kami.',
  keywords: [
    'Hegemoni Group',
    'The Playmakers founder',
    'sejarah The Playmakers',
    'holding brand kecantikan Indonesia',
    'commerce education founder Indonesia',
  ],
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    url: `${SITE_URL}/about`,
    title: 'About — Hegemoni Group, Parent of The Playmakers',
    description:
      'Holding yang membangun ekosistem brand kecantikan Indonesia berbasis riset, sistem, dan kecepatan.',
  },
};

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
  ],
};

/* ──────────────────────────────────────────────
   ABOUT — server component shell.
   Metadata lives here (server-only). The actual
   markup + reveal observer live in AboutContent.
   Page-scoped legacy styles imported from about.css.
   ────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <AboutContent />
    </>
  );
}
