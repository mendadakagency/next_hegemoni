import AboutContent from './AboutContent';
import './about.css';

export const metadata = {
  title: 'About Us — Hegemoni Group',
  description:
    'Hegemoni didirikan tahun 2020. Holding yang membangun ekosistem brand kecantikan Indonesia berbasis riset, sistem, dan kecepatan.',
};

/* ──────────────────────────────────────────────
   ABOUT — server component shell.
   Metadata lives here (server-only). The actual
   markup + reveal observer live in AboutContent.
   Page-scoped legacy styles imported from about.css.
   ────────────────────────────────────────────── */
export default function AboutPage() {
  return <AboutContent />;
}
