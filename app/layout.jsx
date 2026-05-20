import './globals.css';
import './legacy.css';

import AnnounceBar from '@/components/AnnounceBar';
import Navbar from '@/components/Navbar';
import WhatsAppFloater from '@/components/WhatsAppFloater';

export const metadata = {
  title: 'Hegemoni Academy — Playbook Dari Playmaker Yang Masih Jalan.',
  description:
    'Closed-door intensive untuk owner brand skala miliaran. Faculty masih aktif menjalankan brand dengan GMV 5000M+/tahun.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <AnnounceBar />
        <Navbar />
        {children}
        <WhatsAppFloater />
      </body>
    </html>
  );
}
