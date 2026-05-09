import React from 'react'
import Link from 'next/link'
import { ChevronLeft, Map } from 'lucide-react'
import { getStores } from '@/lib/mock/stores'
import { getEvents } from '@/lib/mock/events'
import { MapClient } from '@/components/map/map-client'

export default async function MapPage() {
  const [stores, events] = await Promise.all([
    getStores(),
    getEvents(),
  ])

  return (
    <div className="flex flex-col h-[calc(100vh-128px)] bg-surface-page overflow-hidden">
      {/* Header */}
      <div className="px-page py-3 border-b border-border-DEFAULT bg-white flex items-center gap-3 flex-shrink-0">
        <Link href="/" className="p-1 -ml-1 text-content-muted">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-brand-primary flex items-center justify-center">
            <Map className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-content-primary leading-tight">Peta UMKM Purbalingga</h2>
            <p className="text-[10px] text-content-muted">{stores.length} toko · {events.length} event</p>
          </div>
        </div>
      </div>

      {/* Interactive map client */}
      <div className="flex-1 min-h-0">
        <MapClient stores={stores} events={events} />
      </div>
    </div>
  )
}
