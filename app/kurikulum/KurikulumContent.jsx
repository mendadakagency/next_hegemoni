'use client';

import { useEffect } from 'react';

/* ──────────────────────────────────────────────
   Curriculum page — Tailwind markup, three tiers
   (Brand Lab · Operator Playbook · MBA) framed as
   "Kurikulum". Hooks:
   - reveal-on-scroll (with immediate reveal for in-view)
   - integer counter (data-count attribute)
   - 3D tilt on tier cards
   - smooth anchor scroll
   ────────────────────────────────────────────── */

const TIERS = [
  {
    id: 'brandlab',
    num: 'Sub 01',
    name: 'Brand Lab',
    aud: 'Pemula · <50jt/bln',
    desc: 'LMS dasar, self-paced, recorded. Foundational setup & execution untuk owner brand early-stage.',
    format: 'LMS recorded',
    price: 'Rp 500 RB',
    accent: 'amber',
  },
  {
    id: 'playbook',
    num: 'Sub 02',
    name: 'Operator Playbook',
    aud: 'Mid · 100-500jt/bln',
    desc: 'LMS advance + monthly live cohort + community. Framework & case study breakdown.',
    format: 'LMS + Live',
    price: 'Rp 2.5 JT',
    accent: 'gold',
    badge: 'Populer',
  },
  {
    id: 'mba',
    num: 'Sub 03',
    name: 'MBA',
    aud: 'Senior · 500jt+/bln',
    desc: 'Bootcamp 2-3 hari + advisory 3-6 bulan. Strategic restructure untuk owner brand premium.',
    format: 'Bootcamp + Advisory',
    price: 'Rp 8.5 JT',
    accent: 'crimson',
  },
];

const BL_FEATURES = [
  ['LMS Recorded',         'Full akses semua materi foundational. Self-paced, bisa diulang kapan aja. Lifetime access.'],
  ['Foundational Playbook','Playbook actionable dari brand positioning sampai pricing strategy.'],
  ['Community Access',     'Masuk Brand Lab group — connect dengan owner brand di stage yang sama.'],
  ['Async Faculty',        'Forum tanya jawab. Faculty review dan kasih feedback substantif.'],
  ['Template Library',     'Spreadsheet, framework canvas, checklist proven di brand miliaran.'],
  ['Upgrade Path',         'Alumni bisa upgrade ke Operator Playbook dengan harga special.'],
];

const BL_MODULES = [
  ['Modul 01', 'Brand Positioning', 'Diferensiasi, value prop, market sizing'],
  ['Modul 02', 'Unit Economics',    'HPP, margin, CAC sebelum scale'],
  ['Modul 03', 'Market Mapping',    'Kompetitor analysis, whitespace'],
  ['Modul 04', 'Pricing Strategy',  'Psikologi harga, tier produk'],
];

const OP_FEATURES = [
  ['LMS Advance',          'Full akses materi advance + Brand Lab library. Deep-dive framework teruji.'],
  ['Monthly Live Cohort',  'Live session bulanan. Case study breakdown, Q&A langsung, peer dialog.'],
  ['Community 100-200',    'Cohort eksklusif. Network dengan owner brand se-level.'],
  ['Case Study Real',      'Dashboard live, angka real. Faculty nunjukin yang jalan hari ini.'],
  ['Playbook Actionable',  'Framework + template + SOP yang langsung bisa di-deploy.'],
  ['Replay + Library',     'Recording sessions + growing library dari cohort sebelumnya.'],
];

const OP_MODULES = [
  ['Stage 01', 'Brand Positioning',   'Value prop, market sizing'],
  ['Stage 01', 'Unit Economics',      'HPP, margin, CAC'],
  ['Stage 01', 'Market Mapping',      'Kompetitor, whitespace'],
  ['Stage 02', 'Traffic Acquisition', 'Ads, organic, KOL'],
  ['Stage 02', 'KOL Management',      'Seleksi, brief, ROI'],
  ['Stage 02', 'Content System',      'Framework replikasi'],
  ['Stage 03', 'Operations',          'Supply chain, fulfillment'],
  ['Stage 03', 'Team Structure',      'Hire, delegate, culture'],
  ['Stage 03', 'Financial Modeling',  'P&L, cashflow, proyeksi'],
  ['Stage 04', 'Multi-brand',         'Portfolio brand, sinergi'],
  ['Stage 04', 'Investor Readiness',  'Deck, due diligence'],
  ['Stage 04', 'Exit Planning',       'M&A, valuasi bisnis'],
];

const MBA_FEATURES = [
  ['Bootcamp 2-3 Hari',       'On-site Jakarta. Full immersion, 100-200 pax, closed-door.'],
  ['Advisory 3-6 Bulan',      'Direct access ke faculty via WA/Telegram. Tanya langsung.'],
  ['Strategic Restructure',   'Faculty bantu restructure operasi. Supply chain, team, financial.'],
  ['Closed-Door Alumni',      'Alumni network selamanya. Peer-level dialog 500jt+/bulan.'],
  ['Direct Faculty',          'Akses langsung faculty lead. Bukan form, bukan asisten.'],
  ['Confidential Case Study', 'Angka real dari brand miliaran. No recording, no screenshot.'],
];

const MBA_AGENDA = [
  ['Day 01',    'Diagnostic',       'Audit operasi, identifikasi bottleneck'],
  ['Day 01',    'Restructure Plan', 'Blueprint supply chain, team, pricing'],
  ['Day 02',    'Scale System',     'Financial modeling, multi-channel'],
  ['Day 02-03', 'Playmaker Room',   'Closed-door dialog, peer review'],
];

const DIFFERENTIATORS = [
  ['P1', 'Praktisi',        ['Faculty = owner brand miliaran yang masih operate hari ini. ', 'Bukan eks-konsultan.']],
  ['P2', 'Commerce-Native', ['Spesifik TikTok Shop, Shopee, GMV Max, KOL Affiliate. ', 'Bukan generic.']],
  ['P3', 'Outcome-Based',   ['Peserta keluar dengan ', 'playbook actionable', ' yang langsung di-deploy.']],
  ['P4', 'Closed-Door',     ['Case study angka real, no recording, ', 'peer-level dialog', '. Bukan webinar.']],
];

const TESTIMONIALS = [
  ['R', 'Rina',  'Beauty Brand · 300jt/bln',  ['Baru kali ini ikut program yang faculty-nya beneran ', 'nunjukin dashboard live', '. Bukan screenshot 2 tahun lalu.']],
  ['D', 'Dimas', 'F&B Brand · 800jt/bln',     ['Yang bikin beda: ', 'peer-level dialog', '. Gue bisa challenge faculty, mereka jawab pake angka.']],
  ['A', 'Andi',  'Fashion Brand · 1.2M/bln',  ['Selesai MBA, gue restructure ', 'supply chain', ' dan ', 'hemat 22% cost', ' dalam 60 hari.']],
];

// ──────────────────────────────────────────────
// Small primitives
// ──────────────────────────────────────────────

function Aurora({ orbs }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {orbs.map((o, i) => (
        <div
          key={i}
          className={`k-aorb k-aorb-a${o.a}`}
          style={{
            width: o.w, height: o.h, background: o.g,
            top: o.t, bottom: o.b, left: o.l, right: o.r,
          }}
        />
      ))}
    </div>
  );
}

function SectionLabel({ children, color = 'gold' }) {
  const palette = {
    gold:     ['text-gold',     'bg-gold/20'],
    crimson:  ['text-crimson',  'bg-crimson/20'],
    imperial: ['text-imperial', 'bg-imperial/20'],
    amber:    ['text-amber',    'bg-amber/15'],
  }[color];
  return (
    <div className={`font-mono text-[10px] tracking-[3px] uppercase font-medium mb-5 flex items-center gap-4 ${palette[0]}`}>
      <span>{children}</span>
      <span className={`flex-1 h-px min-w-[60px] ${palette[1]}`} />
    </div>
  );
}

function SectionTitle({ main, em, dark = false }) {
  return (
    <h2 className={`font-black text-[clamp(42px,5.5vw,68px)] leading-[0.92] tracking-[-0.035em] uppercase ${dark ? 'text-paper' : 'text-ink'}`}>
      {main}
      {em && (
        <em className={`block not-italic font-extrabold italic mt-1 normal-case tracking-[-0.02em] text-[0.82em] ${dark ? 'text-gold' : 'text-amber'}`}>
          {em}
        </em>
      )}
    </h2>
  );
}

// ──────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────

export default function KurikulumContent() {
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

    const els = document.querySelectorAll('.k-reveal');
    const vh = window.innerHeight || document.documentElement.clientHeight;
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) reveal(el);
      else obs.observe(el);
    });

    // Counters
    const cObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target;
          const target = parseInt(el.dataset.count, 10);
          if (!target) return;
          let c = 0;
          const step = Math.max(1, Math.floor(target / 60));
          const tm = setInterval(() => {
            c += step;
            if (c >= target) { c = target; clearInterval(tm); }
            el.textContent = c.toLocaleString('id-ID');
          }, 20);
          cObs.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll('[data-count]').forEach((el) => cObs.observe(el));

    // Failsafe — anything still hidden after 700ms gets shown
    const t = window.setTimeout(() => {
      document.querySelectorAll('.k-reveal:not(.vis)').forEach((el) => reveal(el));
    }, 700);

    // Tier card tilt
    const cards = document.querySelectorAll('[data-tilt]');
    const onMove = (e) => {
      const c = e.currentTarget;
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      c.style.transform = `translateY(-6px) perspective(600px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    };
    const onLeave = (e) => { e.currentTarget.style.transform = ''; };
    cards.forEach((c) => {
      c.addEventListener('mousemove', onMove);
      c.addEventListener('mouseleave', onLeave);
    });

    // Smooth scroll for in-page anchors
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    document.addEventListener('click', onClick);

    return () => {
      obs.disconnect();
      cObs.disconnect();
      window.clearTimeout(t);
      cards.forEach((c) => {
        c.removeEventListener('mousemove', onMove);
        c.removeEventListener('mouseleave', onLeave);
      });
      document.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <main className="bg-ink text-paper overflow-x-hidden">

      {/* ══ HERO ══ */}
      <section className="k-grid-dark relative min-h-[92vh] flex flex-col justify-center overflow-hidden px-6 sm:px-10 lg:px-20 pt-32 pb-6">
        <Aurora orbs={[
          { a: 1, w: '800px', h: '800px', g: 'radial-gradient(circle,rgba(200,131,12,.35),transparent 65%)', t: '-25%', l: '-15%' },
          { a: 2, w: '600px', h: '600px', g: 'radial-gradient(circle,rgba(185,28,28,.22),transparent 65%)', t: '5%',   r: '-10%' },
          { a: 3, w: '700px', h: '500px', g: 'radial-gradient(circle,rgba(30,58,138,.25),transparent 65%)',  b: '-15%', l: '25%'  },
          { a: 4, w: '400px', h: '400px', g: 'radial-gradient(circle,rgba(91,58,75,.2),transparent 65%)',    t: '40%',  r: '20%'  },
        ]}/>

        <div className="relative z-10 max-w-[820px]">
          <p className="k-fu-1 font-mono text-[10px] tracking-[3.5px] uppercase text-gold font-medium mb-7">
            10 · Kurikulum Hegemoni Academy
          </p>
          <h1 className="k-fu-2 font-black text-[clamp(52px,8vw,100px)] leading-[0.9] tracking-[-0.04em] uppercase">
            Three Tiers,
            <em className="block not-italic font-extrabold italic text-gold normal-case tracking-[-0.03em] text-[0.82em] mt-1">
              One Curriculum.
            </em>
          </h1>

          <div className="k-fu-3 flex items-center gap-5 my-10 max-w-[420px]">
            <span className="flex-1 h-px bg-gradient-to-r from-gold/40 to-paper/5" />
            <span className="w-[5px] h-[5px] rounded-full bg-gold shadow-[0_0_12px_rgba(200,131,12,0.6)]" />
            <span className="font-mono text-[9px] tracking-[3px] uppercase text-paper/35 whitespace-nowrap">
              Practice. In Confidence.
            </span>
            <span className="w-[5px] h-[5px] rounded-full bg-gold shadow-[0_0_12px_rgba(200,131,12,0.6)]" />
            <span className="flex-1 h-px bg-gradient-to-r from-paper/5 to-gold/40" />
          </div>

          <p className="k-fu-4 text-base leading-[1.85] text-paper/50 max-w-[540px] mb-11">
            Kurikulum lengkap Hegemoni Academy. Tiga tier sub-brand, satu kurikulum mother. Format
            delivery, kedalaman modul, faculty access, dan community access semuanya di-differentiate
            sesuai stage operasional brand lo.
          </p>

          <div className="k-fu-5 flex flex-wrap gap-3.5">
            <a href="#overview" className="inline-flex items-center gap-2.5 bg-gold text-ink px-9 py-4 rounded font-mono text-[11px] tracking-[1.5px] uppercase font-medium hover:bg-amber hover:-translate-y-[3px] hover:shadow-[0_14px_44px_rgba(200,131,12,0.35)] transition-all duration-300">
              Lihat Kurikulum →
            </a>
            <a href="https://wa.me/6281234567890" className="inline-flex items-center bg-transparent text-paper/55 border border-paper/10 px-7 py-4 rounded text-[13px] font-medium hover:border-paper/40 hover:text-paper hover:bg-paper/5 transition-all duration-300">
              Hubungi Tim
            </a>
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ══ */}
      <div className="k-reveal -mt-px mx-6 sm:mx-10 lg:mx-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 rounded-[10px] border border-paper/5 overflow-hidden bg-carbon/60 backdrop-blur-md relative z-[2]">
        {[
          ['5000', 'M+ GMV / Tahun', true],
          ['12',   'Modul Intensive', false],
          ['200',  'Max Seats', false],
          ['4',    'Praktisi Faculty', false],
        ].map(([v, l, gold], i) => (
          <div key={i} className="text-center py-8 px-4 border-r border-paper/5 last:border-r-0 hover:bg-gold/[0.06] transition-all duration-300">
            <div data-count={v} className={`font-black text-[clamp(28px,3.5vw,48px)] leading-[0.9] tracking-[-1px] ${gold ? 'text-gold' : 'text-paper'}`}>0</div>
            <div className="font-mono text-[9px] tracking-[2px] text-paper/25 mt-2.5 uppercase">{l}</div>
          </div>
        ))}
        <div className="text-center py-8 px-4 hover:bg-gold/[0.06] transition-all duration-300">
          <div className="font-black text-[clamp(14px,1.8vw,20px)] tracking-[-0.5px] text-paper">On-site + Online</div>
          <div className="font-mono text-[9px] tracking-[2px] text-paper/25 mt-2.5 uppercase">Hybrid Format</div>
        </div>
      </div>

      {/* ══ OVERVIEW CARDS ══ */}
      <section id="overview" className="relative overflow-hidden px-6 sm:px-10 lg:px-20 py-[clamp(80px,8vw,110px)]">
        <Aurora orbs={[
          { a: 2, w: '500px', h: '500px', g: 'radial-gradient(circle,rgba(200,131,12,.15),transparent 60%)', t: '-10%', r: '5%' },
          { a: 4, w: '400px', h: '400px', g: 'radial-gradient(circle,rgba(30,58,138,.10),transparent 60%)',  b: '10%',  l: '-5%' },
        ]}/>
        <div className="relative z-10 k-reveal">
          <SectionLabel>01 · Kurikulum</SectionLabel>
          <SectionTitle main="PILIH TIER" em="Sesuai Stage Bisnis Lo." dark />
          <p className="text-[15px] leading-[1.8] text-paper/45 max-w-[560px] mt-4">
            Setiap tier punya kurikulum, format, faculty access, dan community yang di-differentiate.
            Bukan cuma beda harga — beda level kedalaman dan outcome.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {TIERS.map((t, i) => {
            const accent = {
              amber:   { num: 'text-amber',   aud: 'text-amber',   bar: 'from-amber to-amber/20'   },
              gold:    { num: 'text-gold',    aud: 'text-gold',    bar: 'from-gold to-amber'       },
              crimson: { num: 'text-crimson', aud: 'text-crimson', bar: 'from-crimson to-imperial' },
            }[t.accent];
            return (
              <a
                key={t.id}
                href={`#${t.id}`}
                data-tilt
                className={`k-tier-card k-reveal k-d${i + 1} group relative overflow-hidden rounded-xl bg-carbon/50 border border-paper/5 p-10 px-7 flex flex-col cursor-pointer hover:border-gold/20 hover:-translate-y-1.5 hover:shadow-[0_24px_64px_rgba(0,0,0,0.3)] ${t.accent === 'gold' ? 'bg-gold/[0.04] border-gold/10' : ''}`}
              >
                <span className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${accent.bar}`} />
                {t.badge && (
                  <span className="absolute top-3.5 right-3.5 font-mono text-[8px] tracking-[2px] uppercase text-ink bg-gold px-3 py-1 rounded-full font-medium z-10">
                    {t.badge}
                  </span>
                )}
                <span className={`relative font-mono text-[10px] tracking-[2.5px] uppercase font-medium mb-4 ${accent.num}`}>{t.num}</span>
                <span className="relative font-black text-[clamp(24px,2.3vw,32px)] uppercase tracking-[-0.5px] leading-none mb-2.5 text-paper">{t.name}</span>
                <span className={`relative italic font-bold text-sm mb-5 ${accent.aud}`}>{t.aud}</span>
                <span className="relative text-sm leading-[1.75] text-paper/40 flex-1 mb-6">{t.desc}</span>

                <span className="relative border-t border-paper/5 pt-4 mb-5 block">
                  <span className="flex justify-between items-center py-2 border-b border-paper/[0.04]">
                    <span className="font-mono text-[9px] tracking-[2px] uppercase text-paper/25 font-medium">Format</span>
                    <span className="text-[13px] font-bold text-paper">{t.format}</span>
                  </span>
                  <span className="flex justify-between items-center py-2">
                    <span className="font-mono text-[9px] tracking-[2px] uppercase text-paper/25 font-medium">Investasi</span>
                    <span className="text-[13px] font-bold text-gold">{t.price}</span>
                  </span>
                </span>

                <span className={`relative font-mono text-[10px] tracking-[1.5px] uppercase font-medium ${accent.num}`}>Lihat Detail →</span>
              </a>
            );
          })}
        </div>
      </section>

      {/* ══ BRAND LAB (LIGHT) ══ */}
      <section id="brandlab" className="k-grid-light bg-paper text-ink relative overflow-hidden px-6 sm:px-10 lg:px-20 py-[clamp(80px,8vw,110px)]">
        <Aurora orbs={[
          { a: 1, w: '600px', h: '600px', g: 'radial-gradient(circle,rgba(200,131,12,.12),transparent 60%)', t: '-15%', r: '5%'   },
          { a: 3, w: '500px', h: '500px', g: 'radial-gradient(circle,rgba(154,95,8,.08),transparent 60%)',   b: '-10%', l: '-10%' },
          { a: 4, w: '350px', h: '350px', g: 'radial-gradient(circle,rgba(30,58,138,.06),transparent 60%)',  t: '30%',  l: '40%'  },
        ]}/>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-15 items-start mb-14">
          <div className="k-reveal">
            <div className="font-mono text-[10px] tracking-[3px] uppercase mb-3 font-medium text-amber">Sub 01 · Brand Lab</div>
            <h3 className="font-black text-[clamp(48px,6vw,80px)] leading-[0.88] tracking-[-0.04em] uppercase mb-2 text-ink">Brand<br/>Lab</h3>
            <div className="italic font-bold text-base mb-6 text-amber">Pemula · &lt;50jt/bln</div>
            <p className="text-base leading-[1.85] max-w-[520px] text-ink/50">
              Foundational program untuk owner brand early-stage. LMS self-paced dengan recorded
              content — lo bisa belajar kapan aja, di mana aja. Fondasi yang benar sebelum scale.
            </p>
            <p className="mt-4 italic text-sm text-ink/30">"Playbook Dari Operator Yang Masih Jalan. Mulai Dari Dasar."</p>
          </div>
          <div className="k-reveal k-d1 flex flex-col gap-4">
            <div className="p-10 rounded-2xl text-center relative overflow-hidden bg-gradient-to-br from-white to-gold/5 border border-ink/5 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              <div className="font-mono text-[9px] tracking-[2px] uppercase mb-2 text-amber">Mulai Dari</div>
              <div className="font-black text-[52px] tracking-[-2px] leading-none text-ink">Rp 500<span className="text-xl font-bold"> RB</span></div>
              <div className="text-[13px] mt-2.5 text-ink/45">Akses LMS lifetime</div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <a href="#cta" className="inline-flex items-center gap-2.5 bg-ink text-paper px-9 py-4 rounded font-mono text-[11px] tracking-[1.5px] uppercase font-medium hover:-translate-y-[3px] hover:shadow-[0_14px_44px_rgba(0,0,0,0.3)] transition-all duration-300">
                Mulai Brand Lab →
              </a>
              <a href="https://wa.me/6281234567890" className="inline-flex items-center bg-transparent text-ink/45 border border-ink/10 px-7 py-4 rounded text-[13px] font-medium hover:border-ink/30 hover:text-ink transition-all duration-300">
                Tanya Tim
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-3 mb-10 k-reveal">
          {[
            ['4',   'Modul'],
            ['∞',   'Capacity'],
            ['Async', 'Faculty'],
          ].map(([v, l], i) => (
            <div key={i} className="text-center py-5 px-3 rounded-lg bg-white border border-ink/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-gold/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300">
              <div className="font-black text-[28px] tracking-[-1px] leading-none text-amber">{v}</div>
              <div className="font-mono text-[8px] tracking-[2px] uppercase mt-1.5 text-ink/40">{l}</div>
            </div>
          ))}
        </div>

        <div className="relative z-10 font-mono text-[9px] tracking-[3px] uppercase font-medium mb-5 text-amber k-reveal">Apa Yang Lo Dapat</div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-10">
          {BL_FEATURES.map(([title, desc], i) => (
            <div key={i} className={`k-reveal k-d${(i % 3) + 1} group relative overflow-hidden p-7 px-6 rounded-[10px] bg-white border border-ink/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-gold/20 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] transition-all duration-[450ms]`}>
              <span className="absolute top-0 left-0 right-0 h-[2px] bg-amber/10 group-hover:bg-amber transition" />
              <div className="w-11 h-11 rounded-[10px] flex items-center justify-center font-black text-base mb-4 bg-amber/[0.06] text-amber group-hover:bg-amber/15 group-hover:shadow-[0_0_20px_rgba(154,95,8,0.1)] transition">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="font-extrabold text-[15px] uppercase tracking-[-0.3px] mb-2 text-ink">{title}</div>
              <div className="text-[13px] leading-[1.7] text-ink/50">{desc}</div>
            </div>
          ))}
        </div>

        <div className="relative z-10 font-mono text-[9px] tracking-[3px] uppercase font-medium mb-5 text-amber k-reveal">Modul Kurikulum</div>
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 k-reveal">
          {BL_MODULES.map(([n, t, d], i) => (
            <div key={i} className="p-[18px_16px] rounded-lg bg-white border border-ink/[0.04] hover:border-gold/15 hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-300">
              <div className="font-mono text-[9px] tracking-[2px] uppercase mb-1.5 font-medium text-ink/35">{n}</div>
              <div className="font-extrabold text-[13px] mb-1 text-ink">{t}</div>
              <div className="text-[11px] leading-[1.5] text-ink/40">{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ OPERATOR PLAYBOOK (DARK) ══ */}
      <section id="playbook" className="k-grid-dark bg-ink relative overflow-hidden px-6 sm:px-10 lg:px-20 py-[clamp(80px,8vw,110px)]">
        <Aurora orbs={[
          { a: 1, w: '700px', h: '500px', g: 'radial-gradient(circle,rgba(200,131,12,.30),transparent 60%)', t: '-10%', r: '-15%' },
          { a: 2, w: '500px', h: '500px', g: 'radial-gradient(circle,rgba(30,58,138,.20),transparent 60%)',  b: '5%',   l: '-10%' },
          { a: 3, w: '400px', h: '400px', g: 'radial-gradient(circle,rgba(185,28,28,.12),transparent 60%)',  t: '40%',  l: '30%'  },
          { a: 4, w: '350px', h: '350px', g: 'radial-gradient(circle,rgba(91,58,75,.15),transparent 60%)',   b: '-5%',  r: '25%'  },
        ]}/>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-15 items-start mb-14">
          <div className="k-reveal">
            <div className="font-mono text-[10px] tracking-[3px] uppercase mb-3 font-medium text-gold">Sub 02 · Operator Playbook</div>
            <h3 className="font-black text-[clamp(48px,6vw,80px)] leading-[0.88] tracking-[-0.04em] uppercase mb-2 text-paper">Operator<br/>Playbook</h3>
            <div className="italic font-bold text-base mb-6 text-gold">Mid · 100-500jt/bln</div>
            <p className="text-base leading-[1.85] max-w-[520px] text-paper/50">
              Program paling populer. LMS advance + monthly live cohort + community. Framework dan
              case study breakdown untuk owner brand mid-tier yang mau scale.
            </p>
            <p className="mt-4 italic text-sm text-paper/40">"Playbook Dari Operator Yang Masih Jalan. Setiap Bulan."</p>
          </div>
          <div className="k-reveal k-d1 flex flex-col gap-4">
            <div className="p-10 rounded-2xl text-center relative overflow-hidden bg-gradient-to-br from-gold/10 to-carbon/80 border border-gold/15">
              <div className="font-mono text-[9px] tracking-[2px] uppercase mb-2 text-gold">Mulai Dari</div>
              <div className="font-black text-[52px] tracking-[-2px] leading-none text-paper">Rp 2.5<span className="text-xl font-bold"> JT</span></div>
              <div className="text-[13px] mt-2.5 text-paper/45">Per cohort · LMS + Live access</div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <a href="#cta" className="inline-flex items-center gap-2.5 bg-gold text-ink px-9 py-4 rounded font-mono text-[11px] tracking-[1.5px] uppercase font-medium hover:bg-amber hover:-translate-y-[3px] hover:shadow-[0_14px_44px_rgba(200,131,12,0.35)] transition-all duration-300">
                Masuk Cohort →
              </a>
              <a href="https://wa.me/6281234567890" className="inline-flex items-center bg-transparent text-paper/55 border border-paper/10 px-7 py-4 rounded text-[13px] font-medium hover:border-paper/40 hover:text-paper hover:bg-paper/5 transition-all duration-300">
                Tanya Tim
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-3 mb-10 k-reveal">
          {[
            ['12',   'Modul'],
            ['200',  'Max / Cohort'],
            ['Live', 'Monthly'],
          ].map(([v, l], i) => (
            <div key={i} className="text-center py-5 px-3 rounded-lg bg-paper/[0.03] border border-paper/[0.04] hover:bg-gold/[0.06] hover:border-gold/15 transition-all duration-300">
              <div className="font-black text-[28px] tracking-[-1px] leading-none text-gold">{v}</div>
              <div className="font-mono text-[8px] tracking-[2px] uppercase mt-1.5 text-paper/40">{l}</div>
            </div>
          ))}
        </div>

        <div className="relative z-10 font-mono text-[9px] tracking-[3px] uppercase font-medium mb-5 text-gold k-reveal">Apa Yang Lo Dapat</div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-10">
          {OP_FEATURES.map(([title, desc], i) => (
            <div key={i} className={`k-reveal k-d${(i % 3) + 1} group relative overflow-hidden p-7 px-6 rounded-[10px] bg-carbon/50 border border-paper/[0.04] hover:border-gold/15 hover:-translate-y-1.5 hover:bg-gold/[0.05] transition-all duration-[450ms]`}>
              <span className="absolute top-0 left-0 right-0 h-[2px] bg-gold/15 group-hover:bg-gold transition" />
              <div className="w-11 h-11 rounded-[10px] flex items-center justify-center font-black text-base mb-4 bg-gold/[0.08] text-gold group-hover:bg-gold/15 group-hover:shadow-[0_0_20px_rgba(200,131,12,0.15)] transition">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="font-extrabold text-[15px] uppercase tracking-[-0.3px] mb-2 text-paper">{title}</div>
              <div className="text-[13px] leading-[1.7] text-paper/50">{desc}</div>
            </div>
          ))}
        </div>

        <div className="relative z-10 font-mono text-[9px] tracking-[3px] uppercase font-medium mb-5 text-gold k-reveal">Kurikulum · 4 Stage × 12 Modul</div>
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 k-reveal">
          {OP_MODULES.map(([n, t, d], i) => (
            <div key={i} className="p-[18px_16px] rounded-lg bg-carbon/40 border border-paper/[0.04] hover:bg-gold/5 hover:border-gold/12 hover:-translate-y-[3px] transition-all duration-300">
              <div className="font-mono text-[9px] tracking-[2px] uppercase mb-1.5 font-medium text-paper/35">{n}</div>
              <div className="font-extrabold text-[13px] mb-1 text-paper">{t}</div>
              <div className="text-[11px] leading-[1.5] text-paper/40">{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ MBA (LIGHT) ══ */}
      <section id="mba" className="k-grid-light bg-paper text-ink relative overflow-hidden px-6 sm:px-10 lg:px-20 py-[clamp(80px,8vw,110px)]">
        <Aurora orbs={[
          { a: 2, w: '600px', h: '600px', g: 'radial-gradient(circle,rgba(185,28,28,.10),transparent 60%)', t: '-10%', l: '15%' },
          { a: 4, w: '500px', h: '400px', g: 'radial-gradient(circle,rgba(30,58,138,.07),transparent 60%)', b: '-5%',  r: '-5%' },
          { a: 1, w: '350px', h: '350px', g: 'radial-gradient(circle,rgba(200,131,12,.08),transparent 60%)', t: '50%', r: '30%' },
        ]}/>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-15 items-start mb-14">
          <div className="k-reveal">
            <div className="font-mono text-[10px] tracking-[3px] uppercase mb-3 font-medium text-crimson">Sub 03 · Master Brand Academy</div>
            <h3 className="font-black text-[clamp(48px,6vw,80px)] leading-[0.88] tracking-[-0.04em] uppercase mb-2 text-ink">MBA</h3>
            <div className="italic font-bold text-base mb-6 text-crimson">Senior · 500jt+/bln</div>
            <p className="text-base leading-[1.85] max-w-[520px] text-ink/50">
              The premium tier. Bootcamp intensive 2-3 hari di Jakarta + advisory 3-6 bulan via
              WA/Telegram. Strategic restructure untuk owner brand yang udah scale.
            </p>
            <p className="mt-4 italic text-sm text-ink/30">"Playbook Dari Operator Yang Masih Jalan. Closed-Door."</p>
          </div>
          <div className="k-reveal k-d1 flex flex-col gap-4">
            <div className="p-10 rounded-2xl text-center relative overflow-hidden bg-gradient-to-br from-crimson/5 to-white border border-crimson/10 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              <div className="font-mono text-[9px] tracking-[2px] uppercase mb-2 text-crimson">Mulai Dari</div>
              <div className="font-black text-[52px] tracking-[-2px] leading-none text-ink">Rp 8.5<span className="text-xl font-bold"> JT</span></div>
              <div className="text-[13px] mt-2.5 text-ink/45">Per batch · Bootcamp + advisory</div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <a href="#cta" className="inline-flex items-center gap-2.5 bg-crimson text-paper px-9 py-4 rounded font-mono text-[11px] tracking-[1.5px] uppercase font-medium hover:-translate-y-[3px] hover:shadow-[0_14px_44px_rgba(185,28,28,0.35)] transition-all duration-300">
                Daftar MBA Batch #01 →
              </a>
              <a href="https://wa.me/6281234567890" className="inline-flex items-center bg-transparent text-ink/45 border border-ink/10 px-7 py-4 rounded text-[13px] font-medium hover:border-ink/30 hover:text-ink transition-all duration-300">
                Tanya Tim
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-3 mb-10 k-reveal">
          {[
            ['2-3', 'Hari Bootcamp'],
            ['200', 'Pax / Batch'],
            ['3-6', 'Bln Advisory'],
          ].map(([v, l], i) => (
            <div key={i} className="text-center py-5 px-3 rounded-lg bg-white border border-ink/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-crimson/20 transition-all duration-300">
              <div className="font-black text-[28px] tracking-[-1px] leading-none text-crimson">{v}</div>
              <div className="font-mono text-[8px] tracking-[2px] uppercase mt-1.5 text-ink/40">{l}</div>
            </div>
          ))}
        </div>

        <div className="relative z-10 font-mono text-[9px] tracking-[3px] uppercase font-medium mb-5 text-crimson k-reveal">Apa Yang Lo Dapat</div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-10">
          {MBA_FEATURES.map(([title, desc], i) => (
            <div key={i} className={`k-reveal k-d${(i % 3) + 1} group relative overflow-hidden p-7 px-6 rounded-[10px] bg-white border border-ink/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-crimson/15 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] transition-all duration-[450ms]`}>
              <span className="absolute top-0 left-0 right-0 h-[2px] bg-crimson/10 group-hover:bg-crimson transition" />
              <div className="w-11 h-11 rounded-[10px] flex items-center justify-center font-black text-base mb-4 bg-crimson/[0.06] text-crimson group-hover:bg-crimson/15 group-hover:shadow-[0_0_20px_rgba(185,28,28,0.1)] transition">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="font-extrabold text-[15px] uppercase tracking-[-0.3px] mb-2 text-ink">{title}</div>
              <div className="text-[13px] leading-[1.7] text-ink/50">{desc}</div>
            </div>
          ))}
        </div>

        <div className="relative z-10 font-mono text-[9px] tracking-[3px] uppercase font-medium mb-5 text-crimson k-reveal">Agenda Bootcamp</div>
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 k-reveal">
          {MBA_AGENDA.map(([n, t, d], i) => (
            <div key={i} className="p-[18px_16px] rounded-lg bg-white border border-ink/[0.04] hover:border-crimson/15 hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-300">
              <div className="font-mono text-[9px] tracking-[2px] uppercase mb-1.5 font-medium text-ink/35">{n}</div>
              <div className="font-extrabold text-[13px] mb-1 text-ink">{t}</div>
              <div className="text-[11px] leading-[1.5] text-ink/40">{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ COMPARISON (LIGHT) ══ */}
      <section id="compare" className="k-grid-light bg-paper text-ink relative overflow-hidden px-6 sm:px-10 lg:px-20 py-[clamp(80px,8vw,110px)]">
        <Aurora orbs={[
          { a: 1, w: '500px', h: '500px', g: 'radial-gradient(circle,rgba(30,58,138,.08),transparent 60%)', t: '-5%', l: '20%' },
          { a: 3, w: '400px', h: '400px', g: 'radial-gradient(circle,rgba(200,131,12,.07),transparent 60%)', b: '10%', r: '5%' },
        ]}/>
        <div className="relative z-10 k-reveal">
          <SectionLabel color="imperial">Perbandingan</SectionLabel>
          <SectionTitle main="SIDE BY SIDE" em="Tiga Tier Dibedah." />
        </div>
        <div className="relative z-10 mt-12 rounded-xl overflow-hidden border border-ink/8 bg-white k-reveal">
          <table className="k-cmp w-full border-collapse">
            <thead>
              <tr className="bg-sand border-b border-ink/10">
                {['', 'Brand Lab', 'Operator Playbook', 'MBA'].map((h, i) => (
                  <th key={i} className={`font-mono text-[9px] tracking-[2.5px] uppercase text-ink/30 font-medium text-left p-[18px_24px] ${i === 2 ? 'k-col-hl' : ''} ${i === 3 ? 'k-col-mba' : ''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Target',      ['Owner brand <50jt/bln', ['Owner brand ', '100-500jt/bln'], ['Owner brand ', '500jt+/bln']]],
                ['Format',      ['LMS recorded', 'LMS + monthly live', 'Bootcamp + advisory']],
                ['Faculty',     ['Async', 'Monthly live session', 'Direct + WA']],
                ['Community',   ['Brand Lab group', 'Cohort 100-200', 'Closed-door alumni']],
                ['Capacity',    ['Unlimited', '100-200/cohort', '100-200/batch']],
                ['Deliverable', ['Foundational playbook', 'Framework + case study', 'Restructure + advisory']],
                ['Investasi',   [['Mulai ', 'Rp 500 RB'], ['Mulai ', 'Rp 2.5 JT'], ['Mulai ', 'Rp 8.5 JT']]],
              ].map(([key, cells], i) => (
                <tr key={i} className="transition-colors duration-300">
                  <td className="font-mono text-[9.5px] tracking-[1.5px] uppercase text-ink/25 font-medium w-[140px] p-[16px_24px] border-b border-ink/[0.04]">{key}</td>
                  {cells.map((c, j) => {
                    const cls = `text-sm p-[16px_24px] border-b border-ink/[0.04] text-ink/50 ${j === 1 ? 'k-col-hl' : ''} ${j === 2 ? 'k-col-mba' : ''}`;
                    if (Array.isArray(c)) {
                      return (
                        <td key={j} className={cls}>
                          {c[0]}<strong className="text-ink font-bold">{c[1]}</strong>
                        </td>
                      );
                    }
                    return <td key={j} className={cls}><strong className="text-ink font-bold">{c}</strong></td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ══ DIFFERENTIATORS (DARK) ══ */}
      <section className="k-grid-dark bg-ink relative overflow-hidden px-6 sm:px-10 lg:px-20 py-[clamp(80px,8vw,110px)]">
        <Aurora orbs={[
          { a: 3, w: '600px', h: '500px', g: 'radial-gradient(circle,rgba(185,28,28,.18),transparent 60%)', b: '5%',   r: '-10%' },
          { a: 1, w: '500px', h: '500px', g: 'radial-gradient(circle,rgba(200,131,12,.15),transparent 60%)', t: '-10%', l: '10%'  },
          { a: 4, w: '400px', h: '400px', g: 'radial-gradient(circle,rgba(30,58,138,.12),transparent 60%)',  t: '30%',  r: '30%'  },
        ]}/>
        <div className="relative z-10 k-reveal">
          <SectionLabel color="crimson">Differentiators</SectionLabel>
          <SectionTitle main="FOUR" em="Differentiators." dark />
          <p className="text-[15px] leading-[1.8] text-paper/45 max-w-[560px] mt-4">
            Empat pillar yang bikin Hegemoni beda dari semua kompetitor.
          </p>
        </div>
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {DIFFERENTIATORS.map(([n, t, frag], i) => (
            <div key={i} className={`k-reveal k-d${i + 1} group relative overflow-hidden p-9 px-6 rounded-[10px] bg-carbon/30 border border-paper/[0.04] hover:border-gold/15 hover:-translate-y-1.5 hover:bg-gold/[0.04] transition-all duration-[450ms]`}>
              <span className="absolute top-0 left-0 right-0 h-[2px] bg-gold/20 group-hover:bg-gold transition" />
              <div className="font-black text-[22px] text-gold mb-4">{n}</div>
              <div className="font-black text-[17px] uppercase tracking-[-0.3px] mb-2.5 text-paper">{t}</div>
              <div className="text-[13px] leading-[1.7] text-paper/40">
                {frag.map((s, j) =>
                  j === 1
                    ? <span key={j} className="text-gold font-semibold">{s}</span>
                    : <span key={j}>{s}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ TESTIMONIALS (LIGHT) ══ */}
      <section className="k-grid-light bg-paper text-ink relative overflow-hidden px-6 sm:px-10 lg:px-20 py-[clamp(80px,8vw,110px)]">
        <Aurora orbs={[
          { a: 2, w: '500px', h: '500px', g: 'radial-gradient(circle,rgba(200,131,12,.08),transparent 60%)', t: '-10%', r: '10%' },
          { a: 4, w: '400px', h: '400px', g: 'radial-gradient(circle,rgba(185,28,28,.06),transparent 60%)',  b: '5%',   l: '15%' },
        ]}/>
        <div className="relative z-10 k-reveal">
          <SectionLabel color="amber">Social Proof</SectionLabel>
          <SectionTitle main="FROM THE" em="Room." />
          <p className="text-[15px] leading-[1.8] text-ink/50 max-w-[560px] mt-4">
            Apa kata operator yang udah masuk ruangan Hegemoni.
          </p>
        </div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {TESTIMONIALS.map(([initial, name, role, frag], i) => (
            <div key={i} className={`k-testi k-reveal k-d${i + 1} p-8 px-7 rounded-xl bg-white border border-ink/5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-gold/20 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] transition-all duration-[450ms] flex flex-col`}>
              <p className="relative z-10 text-[15px] leading-[1.75] text-ink/60 italic mb-6 flex-1">
                {frag.map((s, j) =>
                  j % 2 === 1
                    ? <strong key={j} className="text-amber not-italic font-bold">{s}</strong>
                    : <span key={j}>{s}</span>
                )}
              </p>
              <div className="relative z-10 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/15 to-crimson/10 flex items-center justify-center font-extrabold text-sm text-amber border-[1.5px] border-gold/15 shrink-0">
                  {initial}
                </div>
                <div>
                  <div className="font-bold text-sm text-ink">{name}</div>
                  <div className="font-mono text-[9px] tracking-[1.5px] uppercase text-ink/30 mt-0.5">{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CTA (DARK) ══ */}
      <section id="cta" className="k-grid-dark bg-ink relative overflow-hidden px-6 sm:px-10 lg:px-20 py-[clamp(100px,10vw,160px)] text-center">
        <Aurora orbs={[
          { a: 1, w: '700px', h: '700px', g: 'radial-gradient(circle,rgba(200,131,12,.30),transparent 60%)', t: '-20%', l: '10%' },
          { a: 3, w: '500px', h: '500px', g: 'radial-gradient(circle,rgba(185,28,28,.18),transparent 60%)',  b: '-10%', r: '5%' },
          { a: 2, w: '400px', h: '400px', g: 'radial-gradient(circle,rgba(30,58,138,.15),transparent 60%)',  t: '30%',  r: '30%' },
        ]}/>
        <div className="relative z-10 max-w-[600px] mx-auto k-reveal">
          <div className="font-mono text-[10px] tracking-[3px] uppercase font-medium mb-5 text-gold flex items-center justify-center">
            <span>Next Step</span>
          </div>
          <div className="font-black text-[clamp(40px,5vw,64px)] leading-[0.92] tracking-[-0.035em] uppercase mb-5 text-paper">
            PILIH TIER.
            <em className="block not-italic font-extrabold italic text-gold normal-case">Lock Seat Lo.</em>
          </div>
          <p className="text-base leading-[1.8] text-paper/45 max-w-[480px] mx-auto mb-10">
            MBA Batch #01 dibuka untuk 200 operator. Gak ada replay, gak ada recording.
            Lo ada di ruangan, atau lo gak ada.
          </p>
          <div className="flex gap-3.5 justify-center flex-wrap">
            <a href="https://wa.me/6281234567890" className="inline-flex items-center gap-2.5 bg-gold text-ink px-9 py-4 rounded font-mono text-[11px] tracking-[1.5px] uppercase font-medium hover:bg-amber hover:-translate-y-[3px] hover:shadow-[0_14px_44px_rgba(200,131,12,0.35)] transition-all duration-300">
              Daftar MBA Batch #01 →
            </a>
            <a href="https://wa.me/6281234567890" className="inline-flex items-center bg-transparent text-paper/55 border border-paper/10 px-7 py-4 rounded text-[13px] font-medium hover:border-paper/40 hover:text-paper hover:bg-paper/5 transition-all duration-300">
              Tanya via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="bg-ink px-6 sm:px-10 lg:px-20 py-10 border-t border-paper/5">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-paper/20">
          <div className="font-mono text-[10px] font-medium tracking-[2px] uppercase">Hegemoni Academy</div>
          <div className="italic text-[13px] text-paper/20">Practice. In Confidence.</div>
          <div className="font-mono text-[10px] tracking-[1.5px]">© 2026</div>
        </div>
      </footer>
    </main>
  );
}
