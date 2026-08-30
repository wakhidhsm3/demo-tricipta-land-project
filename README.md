# 🏡 TRICIPTA LAND — Portal Web Properti & Pengembang Hunian Modern

[![Next.js](https://img.shields.io/badge/Next.js-16.3.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Runtime](https://img.shields.io/badge/Runtime-Bun%201.4-fbf0df?style=flat-square&logo=bun)](https://bun.sh/)
[![License](https://img.shields.io/badge/License-Proprietary-emerald?style=flat-square)]()

Portal web resmi **PT TRICIPTA LAND INDONESIA** — Pengembang perumahan terpercaya dengan legalitas 100% aman (SHM telah terpecah per kavling), lingkungan asri, dan lokasi strategis di Jawa Barat. Aplikasi web enterprise berbasis **Next.js 16 App Router**, **React 19**, **TypeScript**, dan **Tailwind CSS v4**.

---

## 📑 Daftar Isi

- [✨ Fitur Utama](#-fitur-utama)
- [🛠️ Tech Stack & Arsitektur](#️-tech-stack--arsitektur)
- [📁 Struktur Direktori](#-struktur-direktori)
- [🍴 Panduan Memulai & Alur Fork (Fork-Only Workflow)](#-panduan-memulai--alur-fork-fork-only-workflow)
- [⚙️ Variabel Lingkungan (.env)](#️-variabel-lingkungan-env)
- [📜 Skrip Tersedia](#-skrip-tersedia)
- [🛡️ Standar Kualitas Kode (Code Quality)](#️-standar-kualitas-kode-code-quality)
- [📈 Optimasi SEO & Metadata](#-optimasi-seo--metadata)
- [📄 Lisensi](#-lisensi)

---

## ✨ Fitur Utama

### 1. 🏘️ Katalog Proyek & Unit Interaktif
- **Pencarian & Multi-Filter**: Filter proyek berdasarkan tipe (*Komersil*, *Subsidi FLPP*, *Tropical Villa*), status ketersediaan, rentang harga, dan lokasi kota.
- **Showcase Tipe Unit**: Pemilih denah lantai (*floor plan*), luas tanah/bangunan (LT/LB), jumlah kamar tidur, kamar mandi, dan *carport*.
- **Galeri Visual Resolusi Tinggi**: Dukungan foto kawasan, siteplan interaktif, dan video tur perumahan dengan Next.js Image Optimization.

### 2. 🧮 Kalkulator Simulasi KPR Pintar
- Estimasi cicilan per bulan secara *real-time* berdasarkan harga properti, uang muka (DP %), tenor pembiayaan (5–25 tahun), dan suku bunga tahunan.
- Breakdown transparansi biaya awal, estimasi pokok bulanan, dan tombol langsung konsultasi pengajuan KPR ke tim marketing.

### 3. 🏢 Profil Perusahaan & Transparansi Legalitas
- Informasi lengkap profil perusahaan, riwayat pendiri (*leadership*), dan struktur organisasi.
- Transparansi dokumen hukum dan perizinan resmi (NIB, PBG/IMB, Sertifikat Induk/Pecahan SHM, izin lingkungan AMDAL).

### 4. 📰 Edukasi & Portal Artikel Properti
- Portal artikel informatif seputar tips membeli rumah pertama, panduan KPR subsidi vs komersil, dan tata cara verifikasi legalitas tanah.
- Dilengkapi estimasi waktu baca (*reading time*), pencarian teks, dan rekomendasi artikel terkait.

### 5. 📬 Formulir Konsultasi & Integrasi WhatsApp
- Formulir kontak dan *lead generation* dengan validasi ketat menggunakan **Zod**.
- Proteksi keamanan antispam bawaan via *Honeypot protection*.
- Tombol WhatsApp Call-to-Action pintar yang otomatis memformat pesan pertanyaan sesuai proyek yang diminati.

---

## 🛠️ Tech Stack & Arsitektur

| Kategori | Teknologi | Deskripsi |
|---|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) | Server Components, Turbopack, Streaming Suspense, Dynamic Routing |
| **UI Library** | [React 19](https://react.dev/) | React Server Components, Hooks, Concurrent Rendering |
| **Bahasa** | [TypeScript 5](https://www.typescriptlang.org/) | Strict Type Checking, Zero `any`, Complete Type Safety |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern CSS variables, design token system, fluid responsiveness |
| **Validasi** | [Zod](https://zod.dev/) | Skema validasi formulir dan verifikasi tipe data runtime |
| **Icons** | [Lucide React](https://lucide.dev/) | Set ikon modern, konsisten, dan ringan |
| **Image Processing** | [Sharp](https://sharp.pixelplumbing.com/) | Optimasi kompresi gambar otomatis |
| **Package Manager** | [Bun](https://bun.sh/) | Fast runtime & package management |

---

## 📁 Struktur Direktori

Proyek ini mengadopsi arsitektur berbasis fitur (*feature-driven modular architecture*):

```
tricipta-land-project/
├── public/                     # Static assets (images, icons, manifest)
├── src/
│   ├── app/                    # Next.js App Router (Pages, Layouts, API routes)
│   │   ├── about/              # Halaman profil & legalitas perusahaan
│   │   ├── articles/           # Halaman portal edukasi & detail artikel
│   │   ├── contact/            # Halaman konsultasi & formulir kontak
│   │   ├── projects/           # Halaman katalog & detail unit proyek
│   │   ├── layout.tsx          # Root layout utama & font definitions
│   │   ├── page.tsx            # Halaman Beranda (Landing Page)
│   │   └── sitemap.ts          # Generator sitemap.xml dinamis
│   ├── components/             # Reusable UI & Layout Components
│   │   ├── layout/             # Header, Navbar, Footer, Sticky CTA
│   │   ├── shared/             # SectionContainer, SectionHeader, Badges
│   │   └── ui/                 # Tabs, Dialog, Card, Input, Button, Accordion
│   ├── features/               # Feature-specific Business Logic & Modules
│   │   ├── about/              # Components & data modul profil perusahaan
│   │   ├── articles/           # Components & data modul artikel edukasi
│   │   ├── contact/            # Formulir kontak & handler
│   │   ├── home/               # Sections beranda (Hero, USP, Testimoni)
│   │   └── projects/           # Katalog unit, filter, dan kalkulator KPR
│   ├── lib/                    # Shared Utilities, Config, & Core Services
│   │   ├── actions/            # Server actions
│   │   ├── config/             # Site configuration, canonical data
│   │   ├── data/               # Structured data sources & mock repositories
│   │   ├── repositories/       # Data access layer (Decoupled repositories)
│   │   ├── security/           # Rate limiting & spam protection
│   │   ├── seo/                # JSON-LD Schema generators (Organization, RealEstateAgent)
│   │   ├── types/              # Strict TypeScript interfaces & types
│   │   └── utils.ts            # Class merge (clsx + twMerge) & helpers
│   └── proxy.ts                # Next.js custom proxy & request handling
├── AGENTS.md                   # Project engineering guidelines
├── next.config.ts              # Next.js runtime configuration
├── package.json                # Project dependencies & scripts
└── tsconfig.json               # TypeScript compiler configuration
```

---

## 🍴 Panduan Memulai & Alur Fork (Fork-Only Workflow)

> [!NOTE]
> Repository ini dikonfigurasi dengan alur **Fork-First**. Pengembang atau kontributor tidak diperkenankan melakukan *push* langsung ke *upstream main branch*. Seluruh eksplorasi kode, kustomisasi, maupun kontribusi wajib dilakukan melalui **Fork** ke akun GitHub masing-masing.

### 1. Fork Repository
Klik tombol **Fork** di pojok kanan atas halaman repository GitHub ini untuk membuat salinan ke akun pribadi Anda.

### 2. Kloning Repository Hasil Fork Anda
```bash
# Ganti <USERNAME_ANDA> dengan username GitHub Anda
git clone https://github.com/<USERNAME_ANDA>/demo-tricipta-land-project.git
cd demo-tricipta-land-project
```

### 3. Tambahkan Remote Upstream (Opsional untuk Sinkronisasi)
```bash
git remote add upstream https://github.com/wakhidhsm3/demo-tricipta-land-project.git
```

### 4. Instalasi Dependensi
Menggunakan **Bun** (direkomendasikan):
```bash
bun install
```
Atau menggunakan **npm** / **pnpm** / **yarn**:
```bash
npm install
```

### 5. Menjalankan Server Pengembangan
```bash
bun run dev
# atau
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

### 6. Alur Pengajuan Perubahan (Pull Request)
Jika Anda ingin mengajukan perbaikan atau fitur baru:
1. Buat branch baru di repo fork Anda: `git checkout -b feature/nama-fitur-anda`
2. Lakukan perubahan kode dan commit: `git commit -m "feat: deskripsi perubahan"`
3. Push ke branch repo fork Anda: `git push origin feature/nama-fitur-anda`
4. Buat **Pull Request (PR)** dari repo fork Anda ke *upstream repository* untuk ditinjau (*code review*).

---

## ⚙️ Variabel Lingkungan (.env)

Buat file `.env.local` di root direktori jika diperlukan:

```env
# Domain URL produksi
NEXT_PUBLIC_SITE_URL=https://triciptaland.com

# Kontak WhatsApp Utama (tanpa tanda +)
NEXT_PUBLIC_WHATSAPP_NUMBER=6281234567890
```

---

## 📜 Skrip Tersedia

| Perintah | Deskripsi |
|---|---|
| `bun run dev` | Menjalankan *development server* dengan Next.js Turbopack |
| `bun run build` | Melakukan kompilasi *production build* yang teroptimasi |
| `bun run start` | Menjalankan server *production* hasil build |
| `bun run lint` | Menjalankan pengecekan ESLint & standar format kode |

---

## 🛡️ Standar Kualitas Kode (Code Quality)

Seluruh kontribusi kode pada proyek ini wajib mengikuti aturan standar di [`AGENTS.md`](file:///Users/wakhidhasim/haz-labs/tricipta-land-project/AGENTS.md):

1. **Strict TypeScript (No `any`)**: Semua model data, props komponen, dan fungsi utilitas harus memiliki tipe data yang eksplisit dan presisi.
2. **No Hardcoded Values**: Seluruh teks konten, spesifikasi teknis, data proyek, dan informasi kontak dipusatkan pada modul data terstruktur (`src/lib/data/...` & `src/lib/config/...`).
3. **No Dead Code**: Bersihkan import yang tidak terpakai, fungsi usang, atau blok kode yang dikomentari (*YAGNI principle*).
4. **Accessible & Responsive**: Mengikuti standar aksesibilitas web (WAI-ARIA, semantic HTML5, dan kontras warna yang nyaman).

---

## 📈 Optimasi SEO & Metadata

- **Metadata Komprehensif**: Mendukung OpenGraph, Twitter Card, Canonical URL, dan Apple Web App.
- **Rich Snippets JSON-LD**: Skema terstruktur `Organization`, `RealEstateAgent`, `SingleFamilyResidence`, `Article`, dan `BreadcrumbList` untuk memaksimalkan peringkat di mesin pencari Google.
- **Peta Situs Otomatis**: Generator `sitemap.xml` dan `robots.txt` dinamis untuk pengindeksan halaman proyek dan artikel secara instan.

---

## 📄 Lisensi

Hak Cipta © 2026 **PT TRICIPTA LAND INDONESIA**. Seluruh hak cipta dilindungi undang-undang.
