'use client';

import { useEffect, useState } from 'react';
import './webinar.css';

const FAQS = [
  {
    q: 'Siapa Hegemoni Group? Apa track record-nya?',
    a: 'Hegemoni Group adalah holding dari Multi lokal brand di Indonesia. Kami bukan content creator atau guru course, kami operator yang menjalankan brand sendiri di TikTok Shop setiap hari. Salah satu brand yang kami handle adalah Brighty, Ciara, Jiera, Herbikids, yang growth-nya kami pakai sebagai case study utama di course ini.',
    defaultOpen: true,
  },
  {
    q: 'Apa aja yang saya dapatkan setelah beli?',
    a: 'Akses penuh ke 50+ lesson, tools kalkulator margin, script & winning brief affiliate, grup WhatsApp private, dan semua update materi selamanya.',
  },
  {
    q: 'Akses LMS-nya berapa lama?',
    a: 'Lifetime access. Sekali bayar, akses selamanya termasuk semua update materi ke depannya.',
  },
  {
    q: 'Kalau udah ikut kelas affiliate lain, masih relevan?',
    a: 'Sangat relevan. Materi ini fokus ke sistem & framework real brand owner — bukan teori. Banyak yang udah ikut kelas lain bilang ini yang paling actionable.',
  },
  {
    q: 'Apakah ada garansi?',
    a: 'Ya, garansi 30 hari balik modal. Kalau materi nggak sesuai ekspektasi, uang kamu kami kembalikan.',
  },
  {
    q: 'Berapa lama sebelum lihat hasil?',
    a: 'Tergantung eksekusi. Banyak student lihat peningkatan GMV affiliate dalam 30 hari setelah apply framework BAB 3 & BAB 4.',
  },
  {
    q: 'Materinya update gimana?',
    a: 'Update otomatis & gratis selamanya. Setiap ada strategi atau insight baru, langsung masuk ke LMS kamu tanpa biaya tambahan.',
  },
];

const PROOF_MONTHS = [
  {
    month: 'Januari 2026', date: '01/01/2026 ~ 01/31/2026', count: '9911',
    rows: [
      { rank: '1', name: '@cheryantoinette', handle: 'Cheryl Antoinette', badge: 'Affiliate', rev: 'Rp384.27m' },
      { rank: '2', name: '@brightyindonesia', handle: 'Brighty Indonesia', badge: 'Seller operated', so: true, rev: 'Rp360.46m' },
      { rank: '3', name: '@imeyhou', handle: 'Meyden', badge: 'Affiliate', rev: 'Rp180.99m' },
    ],
  },
  {
    month: 'Februari 2026', date: '02/01/2026 ~ 02/28/2026', count: '9485',
    rows: [
      { rank: '1', name: '@cheryantoinette', handle: 'Cheryl Antoinette', badge: 'Affiliate', rev: 'Rp474.72m' },
      { rank: '2', name: '@brightyindonesia', handle: 'Brighty Indonesia', badge: 'Seller operated', so: true, rev: 'Rp321.71m' },
      { rank: '3', name: '@imeyhou', handle: 'Meyden', badge: 'Affiliate', rev: 'Rp268.94m' },
    ],
  },
  {
    month: 'Maret 2026', date: '03/01/2026 ~ 03/31/2026', count: '9106',
    rows: [
      { rank: '1', name: '@cheryantoinette', handle: 'Cheryl Antoinette', badge: 'Affiliate', rev: 'Rp777.49m' },
      { rank: '2', name: '@saefulbahri_15', handle: 'COCO BAHRI', badge: 'Affiliate', rev: 'Rp588.50m' },
      { rank: '3', name: '@brightyindonesia', handle: 'Brighty Indonesia', badge: 'Seller operated', so: true, rev: 'Rp440.80m' },
    ],
  },
];

const CURRICULUM = [
  { n: '00', title: 'PEMBUKAAN', desc: 'Info wajib baca, pendahuluan, & study case Brand Brighty', lessons: 4, time: '20 menit' },
  { n: '01', title: 'BAB 1 — Fundamental Logic', desc: 'Kenapa affiliate = leverage paling murah & cara berpikir non-seller', lessons: 5, time: '30 menit' },
  { n: '02', title: 'BAB 2 — Persiapan', desc: 'Setup produk, harga, komisi, & checklist sebelum aktivasi', lessons: 4, time: '25 menit' },
  { n: '03', title: 'BAB 3 — Key Affiliate Strategy', desc: 'Strategi inti rekrut, aktivasi, retain, & scale ratusan affiliate', lessons: 15, time: '3 jam+' },
  { n: '04', title: 'Affiliate Winning Framework', desc: 'Asset siap-pakai untuk kamu share ke pasukan affiliate', lessons: 9, time: '2 jam' },
  { n: '05', title: 'BAB 4 — Scale Up with GMV Max Ads', desc: 'Game changer: boost konten affiliate jadi mesin omzet', lessons: 9, time: '2 jam' },
  { n: '06', title: 'BAB 5 — Review the Result · Repeat', desc: 'Sistem review biar growth compounding & gak stuck', lessons: 2, time: '15 menit' },
];

const FEATURES = [
  'Full 50+ lesson sections — 8+ jam materi padat',
  'Lifetime access + update otomatis selamanya',
  'Tools kalkulator margin, script, winning brief affiliate — siap pakai',
  'Underground strategi boost FYP video affiliate',
  'Akses grup WhatsApp private + Q&A langsung',
  'Winning sistem affiliate TikTok — dari rekrut, kelola, sampai scale revenue via GMV Max Ads',
  'Real study brand kami yang berhasil scale ke 8-figure GMV',
];

const TESTIMONIALS = [
  { tag: 'HASIL: +3,2x GMV', quote: '"30 hari setelah apply BAB 3 + BAB 4, GMV affiliate gw naik 3,2x. Yang paling kena tuh activation framework-nya — affiliate yang dulu silent jadi posting tiap hari."', name: 'R*** A****', role: 'Founder · Brand Local' },
  { tag: 'HASIL: Margin +12%', quote: '"Gw udah ikut 4 kelas affiliate sebelumnya, ini yang paling actionable. Section komisi structure-nya doang udah balik modal — nggak bocor lagi 12% / bulan."', name: 'D**** M*****', role: 'CEO · Local Brand' },
  { tag: 'HASIL: Sistem auto-pilot', quote: '"Bahasanya enak, bukan corporate. Tapi datanya kuat. Gw kasih akses LMS ke 2 admin gw, sebulan kemudian mereka yang jalanin sistem affiliate-nya."', name: 'B**** Pr****', role: 'Brand Owner · Produk Kecantikan' },
];

const ACTIVITY = [
  ['A*** P.', 'selesai persiapan · 31 menit lalu'],
  ['S*** L.', 'baru aja join · 44 menit lalu'],
  ['R*** A.', 'baru aja join · 2 menit lalu'],
  ['D*** M.', 'selesai BAB 3 · 8 menit lalu'],
  ['B*** P.', 'share ke tim'],
  ['A*** P.', 'selesai persiapan · 31 menit lalu'],
  ['S*** L.', 'baru aja join · 44 menit lalu'],
  ['R*** A.', 'baru aja join · 2 menit lalu'],
  ['D*** M.', 'selesai BAB 3 · 8 menit lalu'],
  ['B*** P.', 'share ke tim'],
];

function FaqItem({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`wb-faq-item${open ? ' open' : ''}`} onClick={() => setOpen(!open)}>
      <div className="wb-faq-q">
        {q}
        <span className="wb-faq-ic">{open ? '×' : '+'}</span>
      </div>
      <div className="wb-faq-a">{a}</div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="wb-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="18" height="18" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

export default function WebinarPage() {
  useEffect(() => {
    document.documentElement.classList.add('ha-webinar');
    return () => document.documentElement.classList.remove('ha-webinar');
  }, []);

  return (
    <div className="wb-page">

      {/* ===== 1. HERO ===== */}
      <section className="wb-hero">
        <div className="wb-wrap">
          <div className="wb-star-pill">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" strokeWidth="2">
              <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7.4-6.3-4.6L5.7 21.4 8 14 2 9.4h7.6z"/>
            </svg>
            Winning Strategi Dari Rekor Muri Brand
          </div>
          <h1>
            Framework <span className="wb-reg">Bangun Pasukan</span><br/>
            Affiliate di TikTok Shop<br/>
            Dari 0 Sampai XX Milliar
          </h1>
          <p className="wb-hero-sub">Cocok Untuk Semua Kategori Usaha, <b>Copy Paste - Scale!</b></p>

          <div className="wb-brand-cards">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/porto_brighty.png" alt="brighty.id brand stats" className="wb-bcard-img"/>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/porto_ciara.png" alt="Ciaraindonesia brand stats" className="wb-bcard-img"/>
          </div>

          <a href="#pricing" className="wb-akses-btn">Akses Full Materi</a>
        </div>
      </section>

      {/* ===== 2. PRESENTER ===== */}
      <section className="wb-presenter">
        <div className="wb-presenter-inner">
          <div className="wb-presenter-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://static.wixstatic.com/media/43e145_7b7d9321ef1e4af1a9368b768089107f~mv2.png/v1/fill/w_630,h_630,al_c,q_90,enc_avif,quality_auto/Strategi%20Raafi%20dan%20Haadi%20Tembus%20Ratusan%20Milliar%20Dengan%20Marketing%20KOL%20360%C2%B0%20(3)%20(1).png"
              alt="Hadi & Raafi"
            />
          </div>
          <div className="wb-presenter-card">
            {/* Zoom badge */}
            <div className="wb-zoom-badge">
              <div className="wb-zoom-icon">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
                  <rect width="32" height="32" rx="8" fill="#2D8CFF"/>
                  <path d="M6 12a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-8z" fill="#fff"/>
                  <path d="M20 14.5l6-3.5v10l-6-3.5v-3z" fill="#fff"/>
                </svg>
                <span className="wb-zoom-name">zoom</span>
              </div>
              <span className="wb-zoom-pill">Exclusive Webinar</span>
            </div>

            <h2>
              <span className="wb-presenter-quote">"Ilmu Daging"</span>{' '}
              Presented by Hadi &amp; Raafi, CEO &amp; CCO at Hegemoni Group.
            </h2>
            <p>
              Sistem KOL → Affiliate → GMV Max yang bawa Brighty tembus rekor MURI
              penjualan terbanyak di marketplace. 3 jam bedah materi, yang masih
              digunakan operator brand miliaran hari ini.
            </p>

            {/* Logo marquee with arrow decorations */}
            <div className="wb-logo-row">
              <span className="wb-logo-arrow">‹</span>
              <div className="wb-brand-marquee-wrap">
                <div className="wb-brand-marquee-track">
                  {[
                    { src: '/assets/images/1015106b-7b1e-4b6c-8f4c-971e6aa4a62c.png', alt: 'Brighty' },
                    { src: '/assets/images/9a74159f-2022-40d4-a991-0d97aaff5c4b.png', alt: 'Ciara' },
                    { src: '/assets/images/80e7aca1-5090-4830-911c-0c0bf3000712.png', alt: 'Jiera' },
                    { src: '/assets/images/76fedb19-fbe1-465d-947c-dcc3ce8d4064.png', alt: 'Grooving' },
                    { src: '/assets/images/9bef88f1-d84d-45c0-8b5b-289834a6f69b.png', alt: 'Herbi Kids' },
                    { src: '/assets/images/75d7917d-96ef-4198-b29d-79367a12c621.png', alt: 'Harnisch' },
                    { src: '/assets/images/d9017d72-1e1c-452b-a5cb-3a2b4f5df8fd.png', alt: 'Glow Industri' },
                    /* duplicate for seamless loop */
                    { src: '/assets/images/1015106b-7b1e-4b6c-8f4c-971e6aa4a62c.png', alt: 'Brighty' },
                    { src: '/assets/images/9a74159f-2022-40d4-a991-0d97aaff5c4b.png', alt: 'Ciara' },
                    { src: '/assets/images/80e7aca1-5090-4830-911c-0c0bf3000712.png', alt: 'Jiera' },
                    { src: '/assets/images/76fedb19-fbe1-465d-947c-dcc3ce8d4064.png', alt: 'Grooving' },
                    { src: '/assets/images/9bef88f1-d84d-45c0-8b5b-289834a6f69b.png', alt: 'Herbi Kids' },
                    { src: '/assets/images/75d7917d-96ef-4198-b29d-79367a12c621.png', alt: 'Harnisch' },
                    { src: '/assets/images/d9017d72-1e1c-452b-a5cb-3a2b4f5df8fd.png', alt: 'Glow Industri' },
                  ].map((logo, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} src={logo.src} alt={logo.alt} className="wb-brand-logo"/>
                  ))}
                </div>
              </div>
              <span className="wb-logo-arrow">›</span>
            </div>
          </div>
        </div>
        <div className="wb-marquee-strip">
          <div className="wb-marquee-strip-inner">
            <span>⚡ Winning Strategy</span>
            <span>🎬 Lengkap Video Tutorial</span>
            <span>🔥 500+ Komunitas Founders</span>
            <span>⚡ Winning Strategy</span>
            <span>🎬 Lengkap Video Tutorial</span>
            <span>🔥 500+ Komunitas Founders</span>
          </div>
        </div>
      </section>

      {/* ===== 3. PAIN POINTS ===== */}
      <section className="wb-pain">
        <div className="wb-wrap">
          <div className="wb-pain-head">
            <h2>
              Affiliate kamu ramai.<br/>
              Tapi GMV-nya gak naik.<br/>
              <span className="wb-blue">Itu bukan masalah jumlah creator.</span>
            </h2>
            <p>Kebanyakan brand kejebak di hal yang salah. Coba cek dulu, apakah ini yang kamu rasain?</p>
          </div>
          <div className="wb-pain-list">
            {[
              'Bingung cara build pasukan affiliate yang loyal dan menghasilkan',
              'GMV Stuck padahal video affiliate udah upload banyak dan massive.',
              'Gak punya framework dan winning system dan strategi yang proven.',
              'GMV Max Ads jalan, budget kebakar, ROAS stuck revenue gak naik.',
              'Affiliate udah ramai? tapi yang hasilin cuma 2-3 orang. Sisanya senyap.',
            ].map((text, i) => (
              <div key={i} className="wb-pain-row">
                <div className="wb-pain-n">{String(i + 1).padStart(2, '0')}</div>
                <div className="wb-pain-t">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. PROOF ===== */}
      <section className="wb-proof">
        <div className="wb-wrap">
          <h2>Ini yang terjadi kalau kamu punya <span className="wb-blue">strategi dan framework yang benar.</span></h2>
          <div className="wb-proof-grid">
            {PROOF_MONTHS.map((col, ci) => (
              <div key={ci} className="wb-proof-col">
                <h4>{col.month}</h4>
                <div className="wb-proof-shot">
                  <div className="wb-ps-top"><span>Creator ({col.count} items)</span></div>
                  <div className="wb-ps-top"><span>▸ All Categories · {col.date}</span></div>
                  {col.rows.map((r, ri) => (
                    <div key={ri} className="wb-ps-row">
                      <span className="wb-ps-rank">{r.rank}</span>
                      <span className="wb-ps-av"/>
                      <div className="wb-ps-info">
                        <div className="wb-ps-name">{r.name}</div>
                        <div className="wb-ps-handle">{r.handle}</div>
                      </div>
                      <span className={`wb-ps-badge${r.so ? ' so' : ''}`}>{r.badge}</span>
                      <span className="wb-ps-rev">{r.rev}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="wb-proven-bubble">
            <h3>Proven Strategy (Bukan Kebetulan)</h3>
            <p>Liat growth Cheryl: Rp 384jt → 475jt → 777jt. Itu bukan Cheryl yang tiba-tiba rajin. Staff kami yang aktif dan menjalankan winning strategi yang sudah terbukti works.</p>
          </div>
        </div>
      </section>

      {/* ===== 5. BRAND BARU ===== */}
      <section className="wb-baru">
        <div className="wb-wrap">
          <h2>Tapi brand / toko saya <span className="wb-blue">masih baru, apakah bisa di aplikasikan strateginya?</span></h2>
          <div className="wb-baru-shots">
            <div className="wb-baru-shot">
              <div className="wb-baru-shot-top">
                <span className="wb-baru-date">Custom: Jan 01, 2025 - Jan 31, 2025</span>
                <span>↓</span>
              </div>
              <div className="wb-baru-body">
                <div className="wb-baru-cell">
                  <div className="wb-baru-cl"><span className="wb-baru-chk">✓</span> GMV (with TikTok co-fun...)</div>
                  <div className="wb-baru-cv"><span className="rp">Rp</span> 698.610</div>
                  <div className="wb-baru-view">View breakdown ›</div>
                </div>
                <div className="wb-baru-cell">
                  <div className="wb-baru-cl">Items sold ↑</div>
                  <div className="wb-baru-cv">20</div>
                </div>
              </div>
            </div>
            <div className="wb-baru-shot">
              <div className="wb-baru-shot-top">
                <span className="wb-baru-date">Custom: Apr 01, 2025 - Apr 30, 2025</span>
                <span>↓</span>
              </div>
              <div className="wb-baru-body">
                <div className="wb-baru-cell">
                  <div className="wb-baru-cl"><span className="wb-baru-chk">✓</span> GMV (with TikTok co-fun...)</div>
                  <div className="wb-baru-cv"><span className="rp">Rp</span> 68.233.970</div>
                  <div className="wb-baru-view">View breakdown ›</div>
                </div>
                <div className="wb-baru-cell">
                  <div className="wb-baru-cl">Items sold ↑</div>
                  <div className="wb-baru-cv">151</div>
                </div>
              </div>
            </div>
          </div>
          <div className="wb-baru-bubble">
            <h3>Brand Baru Bukan Excuse!</h3>
            <p>Justru lebih bagus, bangun sistemnya dari awal dengan strategi dan sistem yang benar. (Real Case) Start dari omset dibawah 1 juta, dengan metode dan bimbingan kami, sekarang brand ini udah otw ke 100 juta pertama dalam kurun waktu hanya 3 bulan.</p>
          </div>
        </div>
      </section>

      {/* ===== 8. PRICING ===== */}
      <section className="wb-pricing" id="pricing">
        <div className="wb-wrap">
          <div className="wb-pricing-head">
            <span className="wb-pricing-eyebrow">Harga · Lifetime Access</span>
            <h2>Sekali Bayar. Akses Selamanya.<br/><span className="wb-blue-light">Garansi Balik Modal.</span></h2>
          </div>
          <div className="wb-pcard">
            <div className="wb-pcard-disc">MINGGU INI 90% OFF</div>
            <div className="wb-pcard-cat">Framework &amp; Winning Strategi</div>
            <div className="wb-pcard-name">Bangun Pasukan Affiliate · Scale Up Revenue TikTok Shop</div>
            <div className="wb-pcard-old">Rp 12.500.000</div>
            <div className="wb-pcard-price">Rp 998.000</div>
            <div className="wb-pcard-note">Sekali bayar · bukan langganan · termasuk semua update</div>
            <div className="wb-pcard-divider"/>
            <ul className="wb-pcard-feats">
              {FEATURES.map((feat, i) => (
                <li key={i}><CheckIcon/>{feat}</li>
              ))}
            </ul>
            <a
              href="https://mendadak-space.myscalev.com/landing-page-checkout-tiktok-affiliate-winning-framework"
              className="wb-gabung-btn"
            >
              GABUNG SEKARANG →
            </a>
            <div className="wb-pcard-guarantee">
              <span><span className="wb-gck">✓</span> Garansi 30 hari</span>
              <span>·</span>
              <span>Akses instan setelah bayar</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 9. STUDENT RESULT ===== */}
      <section className="wb-result">
        <div className="wb-wrap">
          <span className="wb-result-eyebrow">Student Result</span>
          <h2>
            Brand Owner yang Udah Eksekusi,<br/>
            <span className="wb-blue-light">Hasilnya Begini.</span>
          </h2>
          <div className="wb-result-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="wb-rcard">
                <div className="wb-rcard-tag">★ {t.tag}</div>
                <p className="wb-rcard-quote">{t.quote}</p>
                <div className="wb-rcard-name">{t.name}</div>
                <div className="wb-rcard-role">{t.role}</div>
              </div>
            ))}
          </div>
          <div className="wb-activity-strip">
            <div className="wb-activity-inner">
              {ACTIVITY.map(([name, action], i) => (
                <span key={i}>
                  <span className="wb-act-dot"/>
                  <span className="wb-act-name">{name}</span>
                  {' '}{action}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 10. FAQ ===== */}
      <section className="wb-faq">
        <div className="wb-wrap">
          <span className="wb-faq-eyebrow">FAQ</span>
          <h2>Pertanyaan yang Sering Ditanya.</h2>
          <div className="wb-faq-list">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} defaultOpen={faq.defaultOpen || false}/>
            ))}
          </div>
        </div>
      </section>

      <footer className="wb-footer">
        <div className="wb-wrap">© 2026 Hegemoni Group. All rights reserved.</div>
      </footer>

    </div>
  );
}
