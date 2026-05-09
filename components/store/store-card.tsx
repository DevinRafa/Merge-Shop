'use client'

import React from 'react'
import Link from 'next/link'
import { Star, MapPin, Clock } from 'lucide-react'
import type { Store } from '@/lib/types'

interface StoreCardProps {
  store: Store
}

export function StoreCard({ store }: StoreCardProps) {
  return (
    <Link
      href={`/store/${store.slug}`}
      className="flex gap-4 p-3 bg-surface-card border border-border-DEFAULT rounded-card overflow-hidden active:scale-[0.98] transition-transform"
    >
      <div className="relative w-28 h-28 flex-shrink-0 rounded-[10px] overflow-hidden bg-brand-img-placeholder">
        <img
          src={store.photoUrl}
          alt={store.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.currentTarget
            target.style.display = 'none'
          }}
        />
        {store.isOnline && (
          <span className="absolute top-1.5 left-1.5 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
            BUKA
          </span>
        )}
      </div>

      <div className="flex flex-col justify-between py-0.5 min-w-0">
        <div>
          <h3 className="text-heading font-semibold text-content-primary leading-tight line-clamp-1">
            {store.name}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3.5 h-3.5 text-brand-primary fill-brand-primary flex-shrink-0" />
            <span className="text-caption text-content-secondary font-semibold">
              {store.rating}
            </span>
            {store.reviewCount && (
              <span className="text-[12px] text-content-muted">
                ({store.reviewCount})
              </span>
            )}
            <span className="text-caption text-content-muted mx-0.5">·</span>
            <span className="text-caption text-content-muted truncate">
              {store.category}
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-content-muted">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="text-[12px] line-clamp-1">{store.location.address}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 mt-2">
          <Clock className="w-3 h-3 text-brand-primary flex-shrink-0" />
          <span className="text-brand-primary font-semibold text-[12px]">
            {store.isOnline ? `Buka · ${store.operationalHours.mon}` : 'Tutup sementara'}
          </span>
        </div>

        {store.tags && store.tags.length > 0 && (
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {store.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full bg-brand-hero text-brand-primary font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
