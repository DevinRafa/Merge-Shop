import React from 'react'
import Link from 'next/link'
import { Star, MessageCircle, ArrowRight, Flame } from 'lucide-react'
import { getStores } from '@/lib/mock/stores'
import { StoreCard } from '@/components/store/store-card'
import { getFeaturedReviews } from '@/lib/mock/reviews'
import { menuItems } from '@/data/menus'
import { formatCurrency } from '@/lib/utils'
import { CategoryChips } from '@/components/shared/category-chips'

function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 140 120"
      className="absolute right-0 bottom-0 h-full w-auto opacity-90 select-none pointer-events-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Body */}
      <ellipse cx="80" cy="100" rx="22" ry="10" fill="#C15F3C" opacity="0.3" />
      <rect x="65" y="60" width="28" height="40" rx="10" fill="#C15F3C" />
      {/* Head */}
      <circle cx="79" cy="48" r="16" fill="#FDEAE4" />
      <circle cx="73" cy="46" r="2.5" fill="#231916" />
      <circle cx="85" cy="46" r="2.5" fill="#231916" />
      <path d="M74 53 Q79 57 84 53" stroke="#C15F3C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Hat */}
      <rect x="66" y="34" width="26" height="4" rx="2" fill="#231916" />
      <rect x="70" y="24" width="18" height="12" rx="4" fill="#231916" />
      {/* Arm + food tray */}
      <rect x="43" y="64" width="22" height="5" rx="2.5" fill="#C15F3C" />
      <ellipse cx="38" cy="66" rx="14" ry="5" fill="#F1DFD9" />
      <rect x="33" y="58" width="10" height="8" rx="3" fill="#FDEAE4" stroke="#DCC1B8" strokeWidth="1" />
      {/* Sign */}
      <rect x="92" y="38" width="42" height="22" rx="6" fill="#231916" />
      <text x="113" y="50" fontSize="7" fill="white" textAnchor="middle" fontWeight="bold">25K</text>
      <text x="113" y="58" fontSize="5" fill="#C15F3C" textAnchor="middle">CASHBACK</text>
      <line x1="92" y1="49" x2="93" y2="65" stroke="#231916" strokeWidth="2" />
    </svg>
  )
}

const FEATURED_MENU_IDS = ['menu_008', 'menu_001', 'menu_013']

export default async function HomePage() {
  const [stores, reviews] = await Promise.all([
    getStores(),
    getFeaturedReviews(),
  ])

  const featuredMenuItems = FEATURED_MENU_IDS.map(
    (id) => menuItems.find((m) => m.id === id)
  ).filter(Boolean)

  return (
    <div className="flex flex-col gap-section-gap pb-24">

      {/* ── Hero Section ───────────────────────────────── */}
      <section className="px-page pt-5">
        <div className="bg-brand-hero rounded-card p-5 min-h-[148px] flex flex-col justify-between relative overflow-hidden">
          <div className="z-10 max-w-[190px]">
            <p className="text-[11px] font-semibold text-content-secondary uppercase tracking-wide mb-1">
              Diskon spesial
            </p>
            <h2 className="text-[22px] font-extrabold text-content-primary leading-tight">
              Nyatuin Rasa,<br />Kenyangin Mahasiswa
            </h2>
          </div>
          <div className="z-10 mt-3">
            <span className="inline-block bg-brand-primary text-white text-[11px] font-bold px-3 py-1.5 rounded-pill shadow-sm">
              CASHBACK s/d Rp 25.000 →
            </span>
          </div>
          <HeroIllustration />
        </div>
      </section>

      {/* ── Category Chips ──────────────────────────────── */}
      <section className="px-page">
        <CategoryChips />
      </section>

      {/* ── MINJAN Chatbot Teaser ────────────────────────── */}
      <section className="px-page">
        <Link
          href="/chat"
          className="bg-surface-chatbot-overlay backdrop-blur-[6px] border border-border-chatbot rounded-card p-4 flex items-center gap-4 active:scale-[0.98] transition-transform block"
        >
          <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0 shadow-sm">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-content-primary text-body">MINJAN</h3>
            <p className="text-caption text-content-muted truncate">
              "Bingung pilih menu? Tanya Minjan aja"
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-content-muted flex-shrink-0" />
        </Link>
      </section>

      {/* ── Featured Menu (Food Cards matching Figma) ────── */}
      <section className="px-page flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-heading font-bold text-content-primary">Menu Populer</h2>
          <button className="text-brand-primary text-caption font-semibold">Lihat Semua</button>
        </div>

        <div className="flex flex-col gap-card-gap">
          {featuredMenuItems.map((item) => {
            if (!item) return null
            const store = stores.find((s) => s.id === item.storeId)
            return (
              <Link
                key={item.id}
                href={store ? `/store/${store.slug}` : '/'}
                className="flex gap-3 p-3 bg-white border border-border-DEFAULT rounded-card overflow-hidden active:scale-[0.98] transition-transform"
              >
                <div className="relative w-[120px] h-[120px] flex-shrink-0 rounded-[10px] overflow-hidden bg-brand-img-placeholder">
                  <img
                    src={item.photoUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {item.isBestSeller && (
                    <div className="absolute top-1.5 left-1.5 flex items-center gap-0.5 bg-brand-primary rounded-full px-1.5 py-0.5">
                      <Flame className="w-2.5 h-2.5 text-white" />
                      <span className="text-[8px] text-white font-bold">LARIS</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-between py-0.5 flex-1 min-w-0">
                  <div>
                    <h3 className="text-heading font-semibold text-content-primary line-clamp-1">
                      {item.name}
                    </h3>
                    {store && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 text-brand-primary fill-brand-primary" />
                        <span className="text-[12px] text-content-secondary font-medium">
                          {store.rating}
                        </span>
                        <span className="text-[12px] text-content-muted">· {store.name}</span>
                      </div>
                    )}
                    <p className="text-[12px] text-content-muted mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-brand-primary font-bold text-heading">
                      {formatCurrency(item.price)}
                    </span>
                    <div className="w-7 h-7 rounded-full border border-border-chip flex items-center justify-center text-brand-primary">
                      <span className="text-[18px] leading-none">+</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── Ulasan Pengguna (Real user photos) ──────────── */}
      <section className="px-page flex flex-col gap-4">
        <h2 className="text-heading font-bold text-content-primary">Kata Pelanggan</h2>

        <div className="flex flex-col gap-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-border-DEFAULT rounded-card p-4 flex gap-3"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-brand-img-placeholder">
                <img
                  src={review.userAvatar}
                  alt={review.userName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-caption font-semibold text-content-primary truncate">
                    {review.userName}
                  </span>
                  <div className="flex items-center gap-0.5 flex-shrink-0">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-brand-primary fill-brand-primary" />
                    ))}
                  </div>
                </div>
                <p className="text-[13px] text-content-muted mt-1 leading-snug">
                  {review.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── UMKM Terpopuler ─────────────────────────────── */}
      <section className="px-page flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-heading font-bold text-content-primary">UMKM Terpopuler</h2>
          <button className="text-brand-primary text-caption font-semibold">Lihat Semua</button>
        </div>

        <div className="flex flex-col gap-card-gap">
          {stores.slice(0, 4).map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </section>
    </div>
  )
}
