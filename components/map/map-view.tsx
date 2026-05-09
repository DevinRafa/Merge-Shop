'use client'

import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Store, Event, EventType } from '@/lib/types'

// ── Store markers ──────────────────────────────────────────
function createStoreIcon(isOnline: boolean, isSelected: boolean) {
  const bg = isSelected ? '#231916' : isOnline ? '#C15F3C' : '#89726B'
  const size = isSelected ? 44 : 36
  return L.divIcon({
    html: `
      <div style="
        width:${size}px; height:${size}px;
        background:${bg};
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        display:flex; align-items:center; justify-content:center;
        border:2.5px solid white;
        box-shadow:0 2px 8px rgba(0,0,0,0.25);
        transition:all 0.2s;
      ">
        <span style="transform:rotate(45deg); font-size:${isSelected ? 18 : 13}px; line-height:1;">🍴</span>
      </div>`,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  })
}

// ── Event markers ──────────────────────────────────────────
const EVENT_COLORS: Record<EventType, { bg: string; emoji: string; label: string }> = {
  'bazaar':       { bg: '#E67E22', emoji: '🛍️', label: 'Bazaar'       },
  'festival':     { bg: '#8E44AD', emoji: '🎪', label: 'Festival'     },
  'konser':       { bg: '#2980B9', emoji: '🎵', label: 'Konser'       },
  'pasar-malam':  { bg: '#27AE60', emoji: '🌙', label: 'Pasar Malam'  },
  'car-free-day': { bg: '#16A085', emoji: '🚶', label: 'Car Free Day' },
}

function createEventIcon(type: EventType, isActive: boolean, isSelected: boolean) {
  const { bg, emoji } = EVENT_COLORS[type]
  const color = isSelected ? '#1a1a1a' : isActive ? bg : '#999'
  const size = isSelected ? 48 : 40
  const pulseRing = isActive
    ? `<div style="
        position:absolute; top:-4px; left:-4px;
        width:${size + 8}px; height:${size + 8}px;
        border-radius:50%;
        border:2px solid ${color};
        opacity:0.4;
        animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;
      "></div>`
    : ''

  return L.divIcon({
    html: `
      <style>
        @keyframes ping {
          75%,100%{transform:scale(1.4);opacity:0}
        }
      </style>
      <div style="position:relative; width:${size}px; height:${size}px;">
        ${pulseRing}
        <div style="
          width:${size}px; height:${size}px;
          background:${color};
          border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          border:3px solid white;
          box-shadow:0 3px 10px rgba(0,0,0,0.3);
          position:relative;
        ">
          <span style="font-size:${size * 0.45}px; line-height:1;">${emoji}</span>
        </div>
        <div style="
          position:absolute; bottom:-${size * 0.3}px; left:50%;
          transform:translateX(-50%);
          width:0; height:0;
          border-left:${size * 0.18}px solid transparent;
          border-right:${size * 0.18}px solid transparent;
          border-top:${size * 0.28}px solid ${color};
        "></div>
      </div>`,
    className: '',
    iconSize: [size, size + size * 0.3],
    iconAnchor: [size / 2, size + size * 0.3],
    popupAnchor: [0, -(size + size * 0.3)],
  })
}

// ── Fly to selected item ───────────────────────────────────
function FlyTo({ lat, lng }: { lat: number | null; lng: number | null }) {
  const map = useMap()
  useEffect(() => {
    if (lat !== null && lng !== null) {
      map.flyTo([lat, lng], 16, { duration: 0.8 })
    }
  }, [lat, lng, map])
  return null
}

// ── Main component ─────────────────────────────────────────
interface MapViewProps {
  stores: Store[]
  events: Event[]
  selectedStore: Store | null
  selectedEvent: Event | null
  onSelectStore: (store: Store) => void
  onSelectEvent: (event: Event) => void
  showEvents: boolean
}

export default function MapView({
  stores,
  events,
  selectedStore,
  selectedEvent,
  onSelectStore,
  onSelectEvent,
  showEvents,
}: MapViewProps) {
  const flyTarget =
    selectedStore
      ? { lat: selectedStore.location.lat, lng: selectedStore.location.lng }
      : selectedEvent
      ? { lat: selectedEvent.lat, lng: selectedEvent.lng }
      : { lat: null, lng: null }

  return (
    <div className="h-full w-full rounded-card overflow-hidden">
      <MapContainer
        center={[-7.3885, 109.3640]}
        zoom={14}
        scrollWheelZoom={true}
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FlyTo lat={flyTarget.lat} lng={flyTarget.lng} />

        {/* Store markers */}
        {stores.map((store) => (
          <Marker
            key={store.id}
            position={[store.location.lat, store.location.lng]}
            icon={createStoreIcon(store.isOnline, selectedStore?.id === store.id)}
            eventHandlers={{ click: () => onSelectStore(store) }}
          >
            <Popup closeButton={false}>
              <div className="p-2 min-w-[160px]">
                <p className="font-bold text-[13px] leading-tight">{store.name}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{store.category}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${store.isOnline ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {store.isOnline ? '● Buka' : '● Tutup'}
                  </span>
                  <span className="text-[11px] text-gray-500">⭐ {store.rating}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Event markers */}
        {showEvents && events.map((event) => {
          const meta = EVENT_COLORS[event.type]
          return (
            <Marker
              key={event.id}
              position={[event.lat, event.lng]}
              icon={createEventIcon(event.type, event.isActive, selectedEvent?.id === event.id)}
              eventHandlers={{ click: () => onSelectEvent(event) }}
            >
              <Popup closeButton={false}>
                <div className="p-2 min-w-[180px]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ background: meta.bg }}
                    >
                      {meta.label.toUpperCase()}
                    </span>
                    {event.isActive && (
                      <span className="text-[9px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        AKTIF
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-[13px] leading-tight">{event.name}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{event.location}</p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    👥 {event.sellerCount} penjual UMKM
                  </p>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
