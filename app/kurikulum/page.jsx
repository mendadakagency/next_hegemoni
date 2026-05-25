import KurikulumContent from './KurikulumContent';
import './kurikulum.css';

const SITE_URL = 'https://theplaymakers.id';

export const metadata = {
  title: 'Kurikulum 65 Modul — Brand Lab, Playmaker Room, War Room',
  description:
    'Long-list kurikulum The Playmakers: 65 modul, 3 tier. Brand Lab (foundational 0–500jt/bln), Playmaker Room (scaling 500jt–10M/bln), The War Room (TikTok Shop × Shopee tactical). Deep case study Skintific, Glad2Glow, Originote, Erigo, Wardah, dll.',
  keywords: [
    'kurikulum commerce',
    'modul TikTok Shop',
    'modul Shopee Ads',
    'modul GMV Max',
    'modul KOL affiliate',
    'modul live commerce',
    'kurikulum brand lab',
    'playmaker room cluster',
    'the war room tactical',
    'CPAS Shopee tutorial',
    'GMV Max anti-boncos',
    'live commerce engineering',
    'KOL system at scale',
    'kurikulum scaling brand miliaran',
    'case study Skintific Glad2Glow Originote',
  ],
  alternates: { canonical: `${SITE_URL}/kurikulum` },
  openGraph: {
    url: `${SITE_URL}/kurikulum`,
    title: 'Kurikulum 65 Modul — Brand Lab, Playmaker Room, War Room',
    description:
      '3 tier · 65 modul · long-list curriculum. Foundational → Scaling → Tactical e-commerce specialist. Built by operators yang masih jalan.',
  },
};

const kurikulumJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Kurikulum', item: `${SITE_URL}/kurikulum` },
  ],
};

export default function KurikulumPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(kurikulumJsonLd) }}
      />
      <KurikulumContent />
    </>
  );
}
