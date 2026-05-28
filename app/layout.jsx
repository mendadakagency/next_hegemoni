import './globals.css';
import './legacy.css';

import AnnounceBar from '@/components/AnnounceBar';
import Navbar from '@/components/Navbar';
import WhatsAppFloater from '@/components/WhatsAppFloater';

const SITE_URL = 'https://theplaymakers.id';
const SITE_NAME = 'The Playmakers';
const OG_IMAGE = `${SITE_URL}/assets/images/og-cover.jpg`;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'The Playmakers — #1 Premium Commerce Education Indonesia 2026',
    template: '%s | The Playmakers',
  },
  description:
    'The Playmakers — sekolah commerce nomor 1 di Indonesia. Closed-door intensive untuk owner brand skala miliaran. Faculty aktif jalankan brand dengan GMV 5000M+/tahun. TikTok Shop, Shopee, GMV Max, KOL Affiliate, Live Commerce.',
  keywords: [
    'The Playmakers',
    'theplaymakers.id',
    'The Playmakers Academy',
    'commerce education Indonesia',
    'kursus commerce Indonesia',
    'sekolah brand Indonesia',
    'kursus TikTok Shop',
    'training TikTok Shop',
    'kursus Shopee seller',
    'training GMV Max',
    'kursus KOL affiliate',
    'training live commerce',
    'kursus scaling brand',
    'kursus brand miliaran',
    'best education for seller',
    'best commerce course Indonesia',
    'pelatihan e-commerce premium',
    'MBA commerce Indonesia',
    'kursus owner brand',
    'sekolah CEO commerce',
    'CPAS Shopee training',
    'GMV Max anti boncos',
    'sekolah seller TikTok',
    'live commerce training Jakarta',
    'commerce playbook Indonesia',
  ],
  authors: [{ name: 'The Playmakers', url: SITE_URL }],
  creator: 'The Playmakers',
  publisher: 'Hegemoni Group',
  category: 'education',
  applicationName: SITE_NAME,
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'The Playmakers — #1 Premium Commerce Education Indonesia',
    description:
      'Closed-door intensive untuk owner brand skala miliaran. Faculty aktif jalankan brand GMV 5000M+/tahun. TikTok Shop · Shopee · GMV Max · KOL Affiliate · Live Commerce.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'The Playmakers — Premium Commerce Education Indonesia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Playmakers — #1 Premium Commerce Education Indonesia',
    description:
      'Closed-door intensive untuk owner brand skala miliaran. Faculty aktif jalankan brand GMV 5000M+/tahun.',
    images: [OG_IMAGE],
    creator: '@theplaymakersid',
  },
  verification: {
    // Tambah ID Google Search Console setelah kamu claim domain
    // google: 'xxxx',
  },
};

export const viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// JSON-LD structured data — Organization, WebSite, EducationalOrganization
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: ['The Playmakers Academy', 'Hegemoni Group'],
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/images/logo.png`,
        width: 512,
        height: 512,
      },
      sameAs: [
        'https://www.instagram.com/theplaymakers.id',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+62-812-3456-7890',
        contactType: 'customer service',
        areaServed: 'ID',
        availableLanguage: ['Indonesian', 'English'],
      },
    },
    {
      '@type': 'EducationalOrganization',
      '@id': `${SITE_URL}/#school`,
      name: SITE_NAME,
      url: SITE_URL,
      description:
        'Premium commerce education Indonesia — closed-door intensive untuk owner brand miliaran. Faculty aktif jalankan brand GMV 5000M+/tahun.',
      foundingDate: '2020',
      parentOrganization: {
        '@type': 'Organization',
        name: 'Hegemoni Group',
      },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'ID',
        addressLocality: 'Jakarta',
        addressRegion: 'DKI Jakarta',
      },
      areaServed: { '@type': 'Country', name: 'Indonesia' },
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#localbusiness`,
      name: SITE_NAME,
      url: SITE_URL,
      image: OG_IMAGE,
      priceRange: 'Rp 500.000 – Rp 8.500.000',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'ID',
        addressLocality: 'Jakarta',
        addressRegion: 'DKI Jakarta',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -6.2088,
        longitude: 106.8456,
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: 'id-ID',
      publisher: { '@id': `${SITE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        {/* Preload first hero slide for fast LCP */}
        <link
          rel="preload"
          as="image"
          href="/assets/images/1.webp"
          type="image/webp"
          fetchPriority="high"
        />
        {/* DNS prefetch + preconnect for fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <AnnounceBar />
        <Navbar />
        {children}
        <WhatsAppFloater />
      </body>
    </html>
  );
}
