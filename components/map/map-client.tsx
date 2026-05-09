'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import {
  Search, X, Star, MapPin, Clock, Navigation,
  Store as StoreIcon, Calendar, Users, ChevronRight,
} from 'lucide-react'
import { StoreMapContainer } from './map-container'
import type { Store, Event, EventType } from '@/lib/types'
import { cn } from '@/lib/utils'

const CATEGORY_FILTERS = ['Semua', 'Tradisional', 'Soto', 'Ayam', 'Bakso', 'Nasi Goreng', 'Minuman']

const EVENT_META: Record<EventType, { color: string; bg: string; emoji: string; label: string }> = {
  'bazaar':       { color: '#E67E22', bg: '#FEF3E2', emoji: '🛍️', label: 'Bazaar'       },
  'festival':     { color: '#8E44AD', bg: '#F5EEF8', emoji: '🎪', label: 'Festival'     },
  'konser':       { color: '#2980B9', bg: '#EBF5FB', emoji: '🎵', label: 'Konser'       },
  'pasar-malam':  { color: '#27AE60', bg: '#EAFAF1', emoji: '🌙', label: 'Pasar Malam'  },
  'car-free-day': { color: '#16A085', bg: '#E8F8F5', emoji: '🚶', label: 'Car Free Day' },
}

type ActiveTab = 'toko' | 'event'

interface MapClientProps {
  stores: Store[]
  events: Event[]
}

export function MapClient({ stores, events }: MapClientProps) {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')
  const [showEvents, setShowEvents] = useState(true)
  const [activeTab, setActiveTab] = useState<ActiveTab>('toko')

  const storeCardRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const eventCardRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const filteredStores = stores.filter((s) => {
    const matchCat = activeCategory === 'Semua' || s.category === activeCategory
    const matchSearch =
      searchQuery === '' ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  const handleSelectStore = (store: Store) => {
    setSelectedStore(store)
    setSelectedEvent(null)
    setActiveTab('toko')
    setTimeout(() => {
      storeCardRefs.current[store.id]?.scrollIntoView({
        behavior: 'smooth', block: 'nearest', inline: 'center',
      })
    }, 100)
  }

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event)
    setSelectedStore(null)
    setActiveTab('event')
    setTimeout(() => {
      eventCardRefs.current[event.id]?.scrollIntoView({
        behavior: 'smooth', block: 'nearest', inline: 'center',
      })
    }, 100)
  }

  const activeEvents = events.filter((e) => e.isActive)

  return (
    <div className="flex flex-col h-full">

      {/* ── Search + filter ───────────────────────────── */}
      <div className="px-page pt-3 pb-2 bg-surface-page border-b border-border-DEFAULT flex-shrink-0">
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-content-muted pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari toko atau kategori..."
            className="w-full bg-white border border-border-DEFAULT rounded-pill py-2.5 pl-9 pr-9 text-caption focus:outline-none focus:border-brand-primary"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 text-content-muted">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex gap-2 mt-2.5 overflow-x-auto pb-0.5 scrollbar-hide">
          {/* Event layer toggle */}
          <button
            onClick={() => setShowEvents(!showEvents)}
            className={cn(
              'flex-shrink-0 text-[12px] px-3 py-1.5 rounded-full font-semibold flex items-center gap-1 transition-all border',
              showEvents
                ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                : 'bg-white text-content-secondary border-border-chip'
            )}
          >
            <Calendar className="w-3 h-3" />
            <span>Event</span>
            {activeEvents.length > 0 && showEvents && (
              <span className="bg-white text-brand-primary rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-extrabold">
                {activeEvents.length}
              </span>
            )}
          </button>

          {CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'flex-shrink-0 text-[12px] px-3 py-1.5 rounded-full font-semibold transition-all border',
                activeCategory === cat
                  ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                  : 'bg-white text-content-secondary border-border-chip hover:bg-brand-hero hover:border-brand-primary hover:text-brand-primary'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Map area ─────────────────────────────────── */}
      <div className="flex-1 relative min-h-0">
        <StoreMapContainer
          stores={filteredStores}
          events={events}
          selectedStore={selectedStore}
          selectedEvent={selectedEvent}
          onSelectStore={handleSelectStore}
          onSelectEvent={handleSelectEvent}
          showEvents={showEvents}
        />

        {/* Badges top-right */}
        <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-1.5 items-end">
          <div className="bg-white rounded-pill px-2.5 py-1.5 shadow-md border border-border-DEFAULT flex items-center gap-1.5">
            <StoreIcon className="w-3 h-3 text-brand-primary" />
            <span className="text-[11px] font-bold text-content-primary">{filteredStores.length} Toko</span>
          </div>
          {showEvents && (
            <div className="bg-white rounded-pill px-2.5 py-1.5 shadow-md border border-border-DEFAULT flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-[#E67E22]" />
              <span className="text-[11px] font-bold text-content-primary">{events.length} Event</span>
            </div>
          )}
        </div>

        {/* Selected chip */}
        {(selectedStore || selectedEvent) && (
          <div className="absolute top-3 left-3 z-[1000] bg-content-primary text-white rounded-pill px-3 py-1.5 shadow-md flex items-center gap-2 max-w-[200px]">
            <span className="text-[11px] font-semibold truncate">
              {selectedStore?.name ?? selectedEvent?.name}
            </span>
            <button onClick={() => { setSelectedStore(null); setSelectedEvent(null) }}>
              <X className="w-3.5 h-3.5 flex-shrink-0" />
            </button>
          </div>
        )}

        {/* Map legend (bottom-left) */}
        {showEvents && (
          <div className="absolute bottom-3 left-3 z-[1000] bg-white rounded-card p-2.5 shadow-md border border-border-DEFAULT">
            <p className="text-[9px] font-bold text-content-muted uppercase tracking-wide mb-1.5">Legenda Event</p>
            <div className="flex flex-col gap-1">
              {(Object.entries(EVENT_META) as [EventType, typeof EVENT_META[EventType]][]).map(([, meta]) => (
                <div key={meta.label} className="flex items-center gap-1.5">
                  <span className="text-[11px]">{meta.emoji}</span>
                  <span
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                    style={{ color: meta.color, background: meta.bg }}
                  >
                    {meta.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom panel — tabs ───────────────────────── */}
      <div className="bg-surface-page border-t border-border-DEFAULT flex-shrink-0">
        {/* Tab header */}
        <div className="flex border-b border-border-DEFAULT">
          <button
            onClick={() => setActiveTab('toko')}
            className={cn(
              'flex-1 py-2.5 text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors',
              activeTab === 'toko'
                ? 'text-brand-primary border-b-2 border-brand-primary'
                : 'text-content-muted'
            )}
          >
            <StoreIcon className="w-3.5 h-3.5" />
            Toko ({filteredStores.length})
          </button>
          <button
            onClick={() => setActiveTab('event')}
            className={cn(
              'flex-1 py-2.5 text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors',
              activeTab === 'event'
                ? 'text-brand-primary border-b-2 border-brand-primary'
                : 'text-content-muted'
            )}
          >
            <Calendar className="w-3.5 h-3.5" />
            Event ({events.length})
            {activeEvents.length > 0 && (
              <span className="bg-brand-primary text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {activeEvents.length}
              </span>
            )}
          </button>
        </div>

        {/* Store cards */}
        {activeTab === 'toko' && (
          <div className="flex gap-3 overflow-x-auto px-page py-3 scrollbar-hide">
            {filteredStores.length === 0 ? (
              <p className="text-caption text-content-muted py-2">Tidak ada toko yang cocok</p>
            ) : (
              filteredStores.map((store) => {
                const isActive = selectedStore?.id === store.id
                return (
                  <div
                    key={store.id}
                    ref={(el) => { storeCardRefs.current[store.id] = el }}
                    onClick={() => handleSelectStore(store)}
                    className={cn(
                      'flex-shrink-0 w-[210px] rounded-card border bg-white overflow-hidden cursor-pointer transition-all duration-200',
                      isActive ? 'border-brand-primary shadow-md scale-[1.02]' : 'border-border-DEFAULT shadow-sm hover:border-brand-primary/50'
                    )}
                  >
                    <div className="relative h-[80px] bg-brand-img-placeholder">
                      <img src={store.photoUrl} alt={store.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <span className={cn('absolute top-1.5 right-1.5 text-[9px] font-bold px-2 py-0.5 rounded-full', store.isOnline ? 'bg-green-500 text-white' : 'bg-gray-400 text-white')}>
                        {store.isOnline ? 'BUKA' : 'TUTUP'}
                      </span>
                    </div>
                    <div className="p-2.5">
                      <p className="text-[13px] font-bold text-content-primary line-clamp-1">{store.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 text-brand-primary fill-brand-primary" />
                        <span className="text-[11px] text-content-secondary font-semibold">{store.rating}</span>
                        <span className="text-[11px] text-content-muted">· {store.category}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1.5">
                        <Clock className="w-2.5 h-2.5 text-content-muted flex-shrink-0" />
                        <span className="text-[10px] text-content-muted truncate">{store.operationalHours.mon}</span>
                      </div>
                      <Link
                        href={`/store/${store.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-2 w-full flex items-center justify-center gap-1 text-[11px] font-bold text-brand-primary bg-brand-hero py-1.5 rounded-lg"
                      >
                        Lihat Toko <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        )}

        {/* Event cards */}
        {activeTab === 'event' && (
          <div className="flex gap-3 overflow-x-auto px-page py-3 scrollbar-hide">
            {events.map((event) => {
              const meta = EVENT_META[event.type]
              const isActive = selectedEvent?.id === event.id
              return (
                <div
                  key={event.id}
                  ref={(el) => { eventCardRefs.current[event.id] = el }}
                  onClick={() => handleSelectEvent(event)}
                  className={cn(
                    'flex-shrink-0 w-[230px] rounded-card border bg-white overflow-hidden cursor-pointer transition-all duration-200',
                    isActive ? 'shadow-md scale-[1.02]' : 'border-border-DEFAULT shadow-sm',
                  )}
                  style={{ borderColor: isActive ? meta.color : undefined }}
                >
                  <div className="relative h-[80px] bg-brand-img-placeholder">
                    <img src={event.photoUrl} alt={event.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {/* type badge */}
                    <span
                      className="absolute top-1.5 left-1.5 text-[9px] font-bold px-2 py-0.5 rounded-full"
                      style={{ color: meta.color, background: 'white' }}
                    >
                      {meta.emoji} {meta.label}
                    </span>
                    {event.isActive && (
                      <span className="absolute top-1.5 right-1.5 text-[9px] font-bold px-2 py-0.5 rounded-full bg-green-500 text-white animate-pulse">
                        AKTIF
                      </span>
                    )}
                  </div>
                  <div className="p-2.5">
                    <p className="text-[13px] font-bold text-content-primary line-clamp-1">{event.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="w-2.5 h-2.5 text-content-muted flex-shrink-0" />
                      <span className="text-[10px] text-content-muted line-clamp-1">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Users className="w-2.5 h-2.5 text-content-muted flex-shrink-0" />
                      <span className="text-[10px] text-content-muted">{event.sellerCount} penjual UMKM</span>
                    </div>
                    <div
                      className="mt-2 w-full flex items-center justify-center gap-1 text-[11px] font-bold py-1.5 rounded-lg"
                      style={{ color: meta.color, background: meta.bg }}
                    >
                      {meta.emoji} Lihat di Peta
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
