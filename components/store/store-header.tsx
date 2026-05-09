'use client'

import React from 'react'
import { Star, MapPin, Clock, Info, CreditCard, Bike } from 'lucide-react'
import type { Store } from '@/lib/types'

interface StoreHeaderProps {
  store: Store
}

export function StoreHeader({ store }: StoreHeaderProps) {
  return (
    <div className="flex flex-col">
      {/* Cover photo */}
      <div className="relative w-full h-52 bg-brand-img-placeholder overflow-hidden">
        <img
          src={store.photoUrl}
          alt={`Foto ${store.name}`}
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {store.isOnline && (
          <span className="absolute top-4 right-4 bg-green-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
            Sedang Buka
          </span>
        )}
      </div>

      {/* Info card */}
      <div className="px-page pt-4 flex flex-col gap-3">
        <h1 className="text-[24px] font-extrabold text-content-primary leading-tight">
          {store.name}
        </h1>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-brand-primary fill-brand-primary" />
            <span className="font-bold text-content-primary">{store.rating}</span>
            {store.reviewCount && (
              <span className="text-content-muted text-caption">({store.reviewCount} ulasan)</span>
            )}
          </div>
          <span className="text-content-muted">·</span>
          <span className="text-content-secondary font-medium text-caption">{store.category}</span>
        </div>

        {/* Tags */}
        {store.tags && store.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {store.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2.5 py-1 rounded-full bg-brand-hero text-brand-primary font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-2 text-caption text-content-muted">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-primary flex-shrink-0" />
            <span>{store.location.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-primary flex-shrink-0" />
            <span>
              {store.isOnline ? (
                <span className="text-green-600 font-medium">Buka</span>
              ) : (
                <span className="text-red-500 font-medium">Tutup</span>
              )}
              {' '}· Jam operasional: {store.operationalHours.mon}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-brand-primary flex-shrink-0" />
            <span>{store.paymentMethods.join(' · ')}</span>
          </div>
          {store.deliveryRadiusKm > 0 && (
            <div className="flex items-center gap-2">
              <Bike className="w-4 h-4 text-brand-primary flex-shrink-0" />
              <span>Antar s/d {store.deliveryRadiusKm} km</span>
            </div>
          )}
        </div>

        {/* History */}
        <div className="bg-white p-4 rounded-card border border-border-DEFAULT flex flex-col gap-2 shadow-sm">
          <div className="flex items-center gap-2 text-brand-primary font-semibold text-caption">
            <Info className="w-4 h-4" />
            <span>Sejarah Singkat</span>
          </div>
          <p className="text-caption text-content-secondary leading-relaxed">
            {store.history}
          </p>
        </div>
      </div>
    </div>
  )
}
