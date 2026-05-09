import React from 'react'
import Link from 'next/link'
import { Search as SearchIcon, Map } from 'lucide-react'
import { getStores } from '@/lib/mock/stores'
import { StoreCard } from '@/components/store/store-card'

export default async function SearchPage() {
  const stores = await getStores()

  return (
    <div className="flex flex-col gap-6 pb-20">
      {/* Search Header */}
      <div className="bg-surface-page px-page py-4 border-b border-border-DEFAULT shadow-sm">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
            <input
              type="text"
              placeholder="Cari soto, bakso, atau warung..."
              className="w-full bg-white border border-border-DEFAULT rounded-pill py-2.5 pl-10 pr-4 text-caption focus:outline-none focus:border-brand-primary"
            />
          </div>
          <Link
            href="/map"
            className="flex items-center gap-1.5 px-3 py-2.5 bg-brand-primary text-white rounded-pill text-caption font-semibold flex-shrink-0 shadow-sm active:scale-95 transition-transform"
          >
            <Map className="w-4 h-4" />
            <span>Peta</span>
          </Link>
        </div>
      </div>

      {/* Results count + map banner */}
      <div className="px-page flex flex-col gap-4">
        <Link
          href="/map"
          className="flex items-center gap-4 p-4 bg-brand-hero rounded-card border border-brand-primary/20 active:scale-[0.98] transition-transform"
        >
          <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0">
            <Map className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-content-primary text-caption">Lihat di Peta Interaktif</p>
            <p className="text-[12px] text-content-muted">Temukan UMKM terdekat dari lokasimu</p>
          </div>
          <span className="text-brand-primary text-caption font-bold">→</span>
        </Link>

        <h2 className="text-body font-bold text-content-primary">
          {stores.length} UMKM di Purbalingga
        </h2>

        <div className="grid grid-cols-1 gap-card-gap">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </div>
    </div>
  )
}
