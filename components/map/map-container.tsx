'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import type { Store, Event } from '@/lib/types'

const MapView = dynamic(() => import('./map-view'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-brand-hero animate-pulse flex flex-col items-center justify-center gap-2 rounded-card">
      <div className="w-8 h-8 border-[3px] border-brand-primary border-t-transparent rounded-full animate-spin" />
      <span className="text-caption text-content-muted">Memuat peta...</span>
    </div>
  ),
})

interface StoreMapContainerProps {
  stores: Store[]
  events: Event[]
  selectedStore: Store | null
  selectedEvent: Event | null
  onSelectStore: (store: Store) => void
  onSelectEvent: (event: Event) => void
  showEvents: boolean
}

export function StoreMapContainer(props: StoreMapContainerProps) {
  return (
    <div className="h-full w-full">
      <MapView {...props} />
    </div>
  )
}
