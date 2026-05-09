@AGENTS.md
# CLAUDE.md — Merge Shop UMKM

> Panduan kerja untuk Claude (dan kontributor lain) di repository ini. Wajib dibaca di awal setiap sesi pengembangan.

---

## 1. Konteks Project

**Merge Shop UMKM** adalah platform *e-commerce hyperlocal* berbasis web yang mewadahi UMKM kuliner di Kabupaten Purbalingga, dengan fitur unggulan AI Chatbot (pencarian global + asisten per-toko), pemetaan lokasi real-time, jadwal operasional akurat, dan integrasi QRIS.

- **Status:** Proposal **PMW UNSOED 2026** sudah lolos **seleksi 1**, sekarang fase pengembangan.
- **Fase saat ini:** **Frontend-only**. Belum ada database, belum ada backend riil. Semua data pakai **mock data** (lihat §6).
- **Target rilis:** Juli – Desember 2026 (sesuai jadwal di proposal).
- **Lead:** Devin Rafa Haryanto (H1D025066), Informatika UNSOED.
- **Tim:** 5 mahasiswa (Devin, Narendro, Eko, Noufal, Fardizza). Dosen pembimbing: Muhammad Ihsan Fawzi, S.Kom., M.Kom.

**Bahasa:**
- **UI/teks pengguna**: Bahasa Indonesia (informal-natural, bukan baku-kaku).
- **Kode, komentar, commit message, nama variabel/file**: English.
- **Diskusi dengan Claude**: Bahasa Indonesia campur istilah teknis Inggris (sesuai gaya komunikasi tim).

---

## 2. Tech Stack

| Layer | Pilihan | Catatan |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | TypeScript wajib (`strict: true`) |
| Styling | **Tailwind CSS** + **shadcn/ui** | Token warna ambil dari Figma (lihat §3) |
| State (lokal) | React hooks + **Zustand** (untuk cart & auth mock) | Hindari Redux, overkill di fase ini |
| Form | **react-hook-form** + **zod** | Validasi schema-based |
| Icon | **lucide-react** | Konsisten satu library |
| Map | **Leaflet** + `react-leaflet` (free tier) | Google Maps API ada di RAB tapi tunda dulu sampai backend siap |
| AI Chat (mock) | UI dummy dulu, integrasi Gemini API di fase berikutnya | Siapkan struktur komponen agar mudah dihubungkan |
| Package manager | **pnpm** | Lebih cepat & hemat disk |
| Linter/Formatter | ESLint (Next default) + Prettier | Auto-format on save |

**JANGAN** install: backend frameworks (Express, NestJS), ORM (Prisma, Drizzle), database client. Belum waktunya.

---

## 3. Design System (Extracted from Figma — 9 Mei 2026)

Design lengkap (UI/UX, color palette, logo) ada di **Figma project "Merge Shop"**, page 2 ("Ui Ux WEB APP"), terhubung via Figma MCP. Token di bawah sudah di-extract langsung dari design aktual — **bukan placeholder**.

### Figma Reference

- **File key:** `0WmCLW5dWCJWGs8DN0c6Y4`
- **Page:** "Ui Ux WEB APP" (page 2, node `1:3`)
- **Versi final (Bahasa Indonesia):** node `19:678` (Home), `19:801` (Search & Map), `19:904` (Account)
- **Device mockup (iPhone 17):** node `19:1145`, `19:1146`, `19:1375`

Setiap kali mau implement screen baru, Claude WAJIB panggil `Figma:get_design_context` dengan `fileKey: "0WmCLW5dWCJWGs8DN0c6Y4"` dan `nodeId` yang sesuai di atas.

### Naming di Figma

- **App name (header):** "Blater" — ini nama customer-facing app. "Merge Shop" adalah nama platform/brand induk.
- **AI Chatbot:** "MINJAN" — tagline: "Bingung pilih menu? Tanya Minjan aja"
- **Bottom nav tabs:** HOME, SEARCH, ACCOUNT

### Color Palette (dari Figma — FINAL)

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      brand: {
        primary:   '#C15F3C', // Terracotta — tombol aktif, harga, teks brand, nav active, chatbot icon bg
        hero:      '#FDEAE4', // Peach muda — background hero section
        'img-placeholder': '#F1DFD9', // Pink-beige — placeholder gambar makanan
      },
      surface: {
        page:      '#F4F3EE', // Cream off-white — background utama halaman & card
        card:      '#F4F3EE', // Sama dengan page (flat design)
        'chatbot-overlay': 'rgba(177, 173, 161, 0.1)', // Glassmorphism chatbot teaser
      },
      border: {
        DEFAULT:   '#DCC1B8', // Warm beige — card border, header/nav divider
        chip:      '#89726B', // Medium brown — inactive chip/button outline
        chatbot:   '#B1ADA1', // Warm gray — chatbot teaser border
      },
      content: {
        primary:   '#231916', // Near-black warm brown — heading, body text utama
        secondary: '#56423C', // Medium warm brown — rating, subtext
        muted:     '#615E54', // Warm gray — deskripsi, inactive nav label
        inverse:   '#FFFFFF', // White — teks di atas brand.primary
      },
    },
    fontFamily: {
      sans: ['"42dot Sans"', 'system-ui', 'sans-serif'],
    },
    fontSize: {
      'nav':     ['10px', { lineHeight: '15px', letterSpacing: '1px' }],
      'caption': ['14px', { lineHeight: '20px' }],
      'body':    ['16px', { lineHeight: '24px' }],
      'heading': ['18px', { lineHeight: '28px' }],
    },
    borderRadius: {
      'card':    '12px',
      'pill':    '9999px',
    },
    spacing: {
      'page':    '20px',  // Padding kiri-kanan halaman
      'card-gap': '16px', // Gap antar food card
      'section-gap': '32px', // Gap antar section
    },
  },
},
```

### Layout Specs (dari Figma)

- **Viewport target:** 390px (mobile-first, tapi harus responsive sampai desktop)
- **Header (TopAppBar):** sticky top, bg `surface-page`, border-bottom `border-DEFAULT`, padding 20px horizontal
- **Bottom Nav:** 3 tab (HOME/SEARCH/ACCOUNT), sticky bottom, bg `surface-page`, border-top `border-DEFAULT`, label 10px uppercase tracking-1px
- **Active nav indicator:** bg `brand-primary` rounded-12px, icon+label putih
- **Hero section:** rounded-12px, bg `brand-hero`, image overlay opacity 80%
- **Category chips:** pill shape (`rounded-pill`), active chip = bg `brand-primary` + white text, inactive = border `border-chip` + text `content-primary`
- **Food card:** rounded-12px, border `border-DEFAULT`, image 128x128 kiri, info kanan (title 18px SemiBold, rating, desc, harga `brand-primary` Bold)
- **Minjan chatbot teaser:** glassmorphism (backdrop-blur-6px), bg `surface-chatbot-overlay`, border `border-chatbot`, icon circle bg `brand-primary`
- **Floating chatbot FAB:** rounded full, bg `brand-primary`, shadow, icon putih (ada di Search & Account page)

**Aturan:** komponen TIDAK BOLEH pakai warna hex/hardcode (`bg-[#C15F3C]`). Selalu lewat token (`bg-brand-primary`). Kalau token belum ada di Tailwind config → tambahkan dulu, baru pakai.

---

## 4. Struktur Folder

```
merge-shop/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Public pages (no auth required)
│   │   ├── page.tsx              # Landing / homepage
│   │   ├── about/page.tsx
│   │   └── help/page.tsx
│   ├── (auth)/                   # Auth flows
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── forgot-password/page.tsx
│   ├── (customer)/               # Customer-facing app
│   │   ├── explore/page.tsx              # Browse semua UMKM
│   │   ├── search/page.tsx               # Search results
│   │   ├── store/[slug]/
│   │   │   ├── page.tsx                  # Profil toko (sejarah, menu, lokasi, AI per-toko)
│   │   │   └── menu/[itemId]/page.tsx
│   │   ├── map/page.tsx                  # Peta interaktif UMKM
│   │   ├── events/
│   │   │   ├── page.tsx                  # List bazaar/event
│   │   │   └── [slug]/page.tsx           # Detail event + UMKM yg ikut
│   │   ├── chat/page.tsx                 # Global AI chatbot (full-page)
│   │   ├── cart/page.tsx
│   │   ├── checkout/page.tsx
│   │   ├── orders/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   └── profile/page.tsx
│   ├── (merchant)/               # Merchant dashboard
│   │   └── merchant/
│   │       ├── dashboard/page.tsx
│   │       ├── products/page.tsx
│   │       ├── orders/page.tsx
│   │       ├── analytics/page.tsx
│   │       └── settings/page.tsx
│   ├── api/                      # Mock API routes (dummy responses)
│   │   ├── chatbot/route.ts
│   │   └── stores/route.ts
│   ├── layout.tsx                # Root layout
│   ├── globals.css
│   └── not-found.tsx
│
├── components/
│   ├── ui/                       # shadcn/ui primitives (button, input, dialog, dll)
│   ├── layout/                   # Navbar, Footer, Sidebar
│   ├── store/                    # StoreCard, StoreHeader, OperationalStatus
│   ├── menu/                     # MenuCard, MenuGrid, MenuFilter
│   ├── chat/                     # ChatWidget (floating), ChatBubble, ChatInput
│   ├── map/                      # MapView, StoreMarker, EventMarker
│   ├── cart/                     # CartItem, CartSummary, QrisPayment (mock)
│   ├── event/                    # EventCard, EventBanner
│   └── shared/                   # SearchBar, EmptyState, LoadingSkeleton
│
├── lib/
│   ├── utils.ts                  # cn() helper, formatters (currency, date)
│   ├── constants.ts              # Static config (kategori UMKM, dll)
│   ├── types.ts                  # Shared TypeScript types
│   └── mock/                     # Mock fetcher functions (simulate API delay)
│       ├── stores.ts
│       ├── menus.ts
│       ├── events.ts
│       └── orders.ts
│
├── data/                         # Mock data (JSON-like TS files)
│   ├── stores.ts                 # 50–100 UMKM dummy
│   ├── menus.ts
│   ├── events.ts
│   └── users.ts
│
├── hooks/                        # Custom React hooks
│   ├── use-cart.ts
│   ├── use-auth.ts               # Mock auth (localStorage)
│   └── use-geolocation.ts
│
├── public/
│   ├── brand/                    # Logo (dari Figma)
│   └── images/                   # Foto dummy UMKM/menu
│
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
├── package.json
└── CLAUDE.md                     # ← file ini
```

### Aturan route grouping

- `(marketing)`, `(customer)`, `(merchant)`, `(auth)` adalah **route groups** Next.js — tidak muncul di URL, hanya untuk organisasi & layout terpisah.
- Setiap group **boleh punya `layout.tsx` sendiri** (mis. merchant pakai sidebar dashboard, customer pakai navbar+footer biasa).

---

## 5. Fitur Utama (dari proposal — prioritas frontend)

| # | Fitur | Status frontend | Catatan |
|---|---|---|---|
| 1 | Landing page + hero + featured UMKM | **MVP** | Prioritas #1 untuk demo PMW |
| 2 | Browse/explore UMKM (filter kategori, lokasi) | **MVP** | Pakai mock data |
| 3 | Detail toko: sejarah, menu, lokasi, jam operasional | **MVP** | Halaman paling penting — showcase keunggulan platform |
| 4 | AI Chatbot global (pencarian menu) — UI dummy | **MVP** | Pakai mock response dulu, struktur siap untuk Gemini API |
| 5 | AI Chatbot per-toko — UI dummy | **MVP** | Embed di halaman `/store/[slug]` |
| 6 | Peta interaktif lokasi UMKM | **MVP** | Leaflet + marker dari mock data |
| 7 | Status real-time operasional (online/offline) | **MVP** | Toggle di mock data; geofencing radius pengiriman jadi UI placeholder |
| 8 | Halaman event/bazaar | Phase 2 | Setelah MVP |
| 9 | Cart + checkout + QRIS (mock screen) | Phase 2 | Belum ada payment gateway |
| 10 | Auth flow (mock, localStorage) | Phase 2 | Login/register UI saja, belum ada session real |
| 11 | Merchant dashboard | Phase 3 | Setelah customer-side selesai |

**Definisi MVP** = bisa di-demo ke reviewer PMW seleksi 2 sebagai bukti kemajuan teknis.

---

## 6. Mock Data Strategy

Karena belum ada DB, semua data hidup di `data/*.ts` sebagai array TypeScript yang ter-type ketat.

**Konvensi:**

```ts
// data/stores.ts
import type { Store } from '@/lib/types'

export const stores: Store[] = [
  {
    id: 'str_001',
    slug: 'warung-mbah-darmi',
    name: 'Warung Mbah Darmi',
    category: 'Tradisional',
    history: 'Berdiri sejak 1987 di pinggir Alun-alun Purbalingga...',
    location: { lat: -7.3878, lng: 109.3636, address: '...' },
    operationalHours: { mon: '07:00-15:00', tue: '07:00-15:00', /* ... */ },
    isOnline: true,
    paymentMethods: ['QRIS'],
    deliveryRadiusKm: 3,
    rating: 4.7,
    photoUrl: '/images/stores/mbah-darmi.jpg',
  },
  // ... 49+ entry lain
]
```

**Akses data via `lib/mock/*`** (bukan import langsung dari `data/*` di komponen) supaya nanti tinggal swap implementasi ke `fetch()` ketika backend siap:

```ts
// lib/mock/stores.ts
import { stores } from '@/data/stores'

export async function getStores(): Promise<Store[]> {
  await new Promise(r => setTimeout(r, 300)) // simulate network
  return stores
}

export async function getStoreBySlug(slug: string): Promise<Store | null> {
  await new Promise(r => setTimeout(r, 200))
  return stores.find(s => s.slug === slug) ?? null
}
```

**Aturan:** komponen TIDAK BOLEH `import { stores } from '@/data/stores'` langsung. Selalu via `lib/mock/*`.

---

## 7. Convention & Best Practices

### Naming

- Files & folders: `kebab-case` (`store-card.tsx`, `use-cart.ts`).
- React components: `PascalCase` export (`export function StoreCard()`).
- Variables/functions: `camelCase`.
- Types/interfaces: `PascalCase` (`type Store`, `interface MenuItem`).
- Constants: `SCREAMING_SNAKE_CASE` (`MAX_CART_ITEMS`).

### Komponen

- **Server Components by default.** Tambahkan `'use client'` HANYA ketika perlu (event handler, hook, browser API).
- 1 komponen = 1 file. Jangan ada file `index.tsx` raksasa.
- Props selalu di-type eksplisit (`type StoreCardProps = { ... }`).
- Hindari prop drilling > 2 level → angkat state ke Zustand atau Context.

### Styling

- Pakai Tailwind utility, **bukan** CSS module / styled-components.
- Class panjang → pecah pakai `cn()` helper + variabel string.
- Dark mode: pakai `dark:` prefix Tailwind, ikut sistem (`prefers-color-scheme`).

### Import order (Prettier akan auto-sort)

```ts
// 1. React / Next
import { useState } from 'react'
import Link from 'next/link'

// 2. Third-party
import { motion } from 'framer-motion'

// 3. Internal alias
import { Button } from '@/components/ui/button'
import { getStores } from '@/lib/mock/stores'

// 4. Relative
import { StoreCardSkeleton } from './store-card-skeleton'

// 5. Types
import type { Store } from '@/lib/types'
```

### Git commit (Conventional Commits)

- `feat: tambah halaman detail toko`
- `fix: perbaiki layout cart di mobile`
- `style: update warna primary sesuai Figma`
- `refactor: pisah ChatWidget dari layout`
- `chore: bump tailwind ke 3.4.1`

Pesan commit boleh Bahasa Indonesia, tapi prefix tetap English.

---

## 8. Yang HARUS dihindari Claude

- ❌ Bikin route/folder baru tanpa cek dulu apakah sudah ada di §4.
- ❌ Hardcode hex color di komponen — semua lewat Tailwind token.
- ❌ Install dependency berat (Redux, Material UI, Chakra) — sudah ada keputusan stack di §2.
- ❌ Tambah backend/database/ORM — fase ini frontend-only.
- ❌ Pakai `any` di TypeScript. Kalau bingung, bilang ke Devin dulu.
- ❌ Reproduksi aset visual atau ikon yang berhak cipta. Logo dari Figma, ikon dari lucide-react.
- ❌ Skip `Figma:get_design_context` saat implement screen baru — design adalah sumber kebenaran.
- ❌ Tambah test framework (Jest, Playwright) di MVP. Tunda sampai struktur stabil.

---

## 9. Workflow Standar Claude di Repo Ini

Tiap kali Devin minta fitur baru, Claude harus:

1. **Cek §4** — apakah route/folder yang dibutuhkan sudah ada?
2. **Cek §3 + Figma MCP** — kalau melibatkan visual baru, fetch design context dari page 2 dulu.
3. **Cek §6** — kalau butuh data, pastikan ada di `data/` atau tambahkan mock baru.
4. **Implement** — server component dulu, client component kalau perlu interaktivitas.
5. **Verifikasi** — pastikan TypeScript pass (`pnpm tsc --noEmit`) dan ESLint clean.
6. **Update CLAUDE.md** — kalau ada keputusan arsitektur baru, dokumentasikan di sini.

---

## 10. Roadmap Singkat

| Bulan | Target |
|---|---|
| Juli 2026 | Setup project, ekstrak design token Figma, scaffolding folder, komponen UI dasar |
| Agustus 2026 | Landing + Explore + Store detail (MVP customer-side) |
| September 2026 | AI Chatbot UI (global + per-toko, mock), peta interaktif |
| Oktober 2026 | Cart, checkout (mock QRIS screen), auth flow mock |
| November 2026 | Merchant dashboard, polish, integrasi awal Gemini API kalau backend sudah ada |
| Desember 2026 | Final polish, deploy ke Vercel, dokumentasi laporan PMW |

---

## 11. Referensi

- Proposal PMW lengkap: `docs/Fakultas_Teknik_Devin_Rafa_Haryanto_Usaha_Baru_Proposal_Baru.pdf`
- Figma "Merge Shop" — file key `0WmCLW5dWCJWGs8DN0c6Y4`, page 2 node `1:3`
  - Home (ID final): `19:678` | Search & Map: `19:801` | Account: `19:904`
  - iPhone mockups: `19:1145`, `19:1146`, `19:1375`
- Dosen pembimbing: Muhammad Ihsan Fawzi, S.Kom., M.Kom. (`muhammad.fawzi@unsoed.ac.id`)

---

*Last updated: 9 Mei 2026 — pre-development phase.*
*Update file ini setiap kali ada keputusan arsitektur signifikan.*
