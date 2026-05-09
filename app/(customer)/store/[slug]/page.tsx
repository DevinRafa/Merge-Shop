import React from 'react'
import { notFound } from 'next/navigation'
import { getStoreBySlug } from '@/lib/mock/stores'
import { getMenuItemsByStoreId } from '@/lib/mock/menus'
import { StoreHeader } from '@/components/store/store-header'
import { MenuCard } from '@/components/menu/menu-card'
import { StoreChat } from '@/components/chat/store-chat'
import { CartTeaser } from '@/components/cart/cart-teaser'

interface StorePageProps {
  params: Promise<{ slug: string }>
}

export default async function StorePage({ params }: StorePageProps) {
  const { slug } = await params
  const store = await getStoreBySlug(slug)

  if (!store) {
    notFound()
  }

  const menuItems = await getMenuItemsByStoreId(store.id)

  return (
    <div className="flex flex-col gap-section-gap pb-[260px]">
      <StoreHeader store={store} />

      {/* AI Chatbot per-toko (integrasi 2) */}
      <section className="px-page">
        <StoreChat storeName={store.name} />
      </section>

      {/* Menu Section */}
      <section className="px-page flex flex-col gap-4">
        <h2 className="text-heading font-bold text-content-primary">Menu Kami</h2>

        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          <button className="px-4 py-1.5 rounded-pill bg-brand-primary text-white text-caption font-semibold flex-shrink-0">
            Semua
          </button>
          {['Makanan Utama', 'Minuman', 'Lauk', 'Pelengkap'].map((cat) => (
            <button
              key={cat}
              className="px-4 py-1.5 rounded-pill border border-border-chip text-content-secondary text-caption whitespace-nowrap flex-shrink-0"
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-card-gap">
          {menuItems.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              storeId={store.id}
              storeName={store.name}
            />
          ))}
          {menuItems.length === 0 && (
            <div className="text-center py-10 text-content-muted text-caption">
              Belum ada menu yang terdaftar.
            </div>
          )}
        </div>
      </section>

      {/* Floating cart teaser */}
      <CartTeaser />
    </div>
  )
}
