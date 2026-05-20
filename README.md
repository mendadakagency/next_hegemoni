# Hegemoni — Next.js

Konversi dari static HTML (`index.html` + `aboutPage.html`) ke Next.js 14 (App Router) + Tailwind CSS.

---

## Stack

- **Next.js 14** — App Router, JavaScript (no TS)
- **React 18**
- **Tailwind CSS 3** — utilities siap pakai untuk page baru
- **Plain CSS legacy** — `app/legacy.css` & `app/about/about.css` mempertahankan visual asli **pixel-identical**

---

## Struktur

```
nextjs/
├── app/
│   ├── layout.jsx              ← root layout (AnnounceBar + Navbar dipasang di sini, jadi muncul di semua halaman)
│   ├── globals.css             ← Tailwind directives + reset minimal
│   ├── legacy.css              ← ⚠️  semua style dari index.html (218 KB) — termasuk styling Navbar
│   ├── page.jsx                ← /              (Home — body asli index.html di-inject via dangerouslySetInnerHTML)
│   ├── about/
│   │   ├── page.jsx            ← /about
│   │   └── about.css           ← style khusus About (rules .nav* sudah di-strip biar nggak conflict)
│   ├── kurikulum/
│   │   └── page.jsx            ← /kurikulum     (placeholder pakai Tailwind — siap diisi)
│   └── _partials/
│       ├── home-body.js        ← markup body Home (auto-generated)
│       └── about-body.js       ← markup body About (auto-generated)
├── components/
│   ├── Navbar.jsx              ← ⭐  navbar component (client) — dipakai di semua page
│   └── AnnounceBar.jsx         ← announce bar (server component)
├── public/
│   ├── assets/
│   │   ├── images/             ← 34 file (logo, brand, hero, dll — di-extract dari bundle)
│   │   └── fonts/              ← 20 woff2 (Inter + JetBrains Mono dari Google Fonts API)
│   └── legacy/
│       ├── index-bumper.js     ← bumper intro animation (~2.2 MB, hosted static)
│       ├── index-runtime.js    ← scroll reveal, mega menu data, counter, typewriter, marquee
│       └── about-runtime.js
├── package.json
├── next.config.mjs
├── tailwind.config.mjs
└── postcss.config.mjs
```

---

## Cara jalanin

```bash
cd nextjs
npm install
npm run dev
```

Buka http://localhost:3000.

Routes:
- `/` — Home
- `/about` — About
- `/kurikulum` — Kurikulum (placeholder)

---

## Catatan teknis

### Navbar
File: `components/Navbar.jsx`

- **Client component** (`'use client'`) karena ada `useState` untuk mega menu Program (Foundation / Growth Engine / Scale System / Mastery).
- Pakai `next/link` untuk routing (`/`, `/about`, `/kurikulum`). External link (WA) tetap pakai `<a>` / `window.open`.
- Mega menu data ada di array `MEGA_TABS` di atas file — tinggal edit di situ untuk ganti modul yang ditampilkan.
- Styling pakai class CSS legacy (`.nav`, `.nav-links`, `.nav-mega`, dll). Style-nya hidup di `app/legacy.css`.

### Tailwind
Tailwind dipasang dan dikonfigurasi (brand colors di-extend: `ink`, `paper`, `gold`, `crimson`, dll). Tapi page-page yang di-port dari HTML lama **tidak** dipindahin ke utility class — biar visualnya 100% sama. Page baru (lihat `app/kurikulum/page.jsx`) bisa langsung pakai Tailwind utilities.

### Kenapa `dangerouslySetInnerHTML` di Home & About?
Body asli kedua file ~400 KB markup dengan banyak inline style/class kompleks. Konversi manual ke JSX akan makan waktu lama dan rawan typo. Pakai `dangerouslySetInnerHTML` jadi body asli ke-inject as-is. Interaksinya (scroll reveal, marquee, typewriter, dll) dihandle oleh script di `/public/legacy/*.js` yang di-load via `next/script`.

**Konsekuensi:**
- ✅ Visual & behavior pixel-identical sama aslinya
- ✅ Navbar bisa di-edit secara React-native di `components/Navbar.jsx`
- ⚠️  Konten body bukan komponen React. Edit body lewat file HTML asli, atau ganti `dangerouslySetInnerHTML` jadi JSX section demi section pas mau di-refactor.

### Aset (gambar & font)
Semua aset dari bundle asli (54 files: 34 images + 20 fonts) di-extract ke `/public/assets/`. Semua reference UUID di CSS & HTML udah diganti ke path `/assets/...` yang sesuai.

### CSS layering
Loading order:
1. `globals.css` — Tailwind preflight + reset
2. `legacy.css` — semua style index.html (termasuk Navbar). Imported di `layout.jsx` jadi apply di semua page.
3. `about.css` — Imported di `about/page.jsx`. Override style untuk halaman About. Rules `.nav*` udah di-strip biar Navbar dari layout pakai style index.

---

## Next steps (saran)

1. **Tambah page baru**: bikin folder di `app/<route>/page.jsx`. Navbar otomatis muncul karena di layout.
2. **Refactor body**: kalau mau Home/About jadi pure React, pecah `home-body.js` / `about-body.js` jadi section komponen (Hero, Kurikulum, Faculty, Pricing, FAQ, Footer) satu per satu.
3. **Image optimization**: `next.config.mjs` saat ini set `images.unoptimized: true` karena legacy markup pakai `<img src="/assets/...">` langsung. Kalau mau, refactor ke `<Image />` dari `next/image` per section.
4. **SEO**: tambahin `metadata` per page (sudah ada starter di Home & About) — bisa juga pakai `generateMetadata` untuk dinamis.
5. **Hubungi & Daftar buttons**: nomor WA hardcoded `6281234567890`. Ganti di `components/Navbar.jsx`.
