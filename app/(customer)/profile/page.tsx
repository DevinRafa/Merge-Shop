import React from 'react'
import { User, Settings, ShoppingBag, Heart, LogOut, ChevronRight } from 'lucide-react'

export default function ProfilePage() {
  const menuItems = [
    { icon: ShoppingBag, label: 'Pesanan Saya', color: 'text-blue-500' },
    { icon: Heart, label: 'Toko Favorit', color: 'text-red-500' },
    { icon: Settings, label: 'Pengaturan', color: 'text-gray-500' },
  ]

  return (
    <div className="flex flex-col gap-6 pb-20">
      {/* Profile Header */}
      <div className="bg-white px-page pt-10 pb-6 border-b border-border-DEFAULT flex flex-col items-center gap-4">
        <div className="w-24 h-24 rounded-full bg-brand-hero border-4 border-white shadow-md flex items-center justify-center">
          <User className="w-12 h-12 text-brand-primary" />
        </div>
        <div className="text-center">
          <h2 className="text-heading font-bold text-content-primary">Pengunjung Setia</h2>
          <p className="text-caption text-content-muted">pengunjung@mergeshop.id</p>
        </div>
        <button className="bg-brand-primary text-content-inverse px-6 py-2 rounded-pill font-bold text-caption shadow-sm active:scale-95 transition-transform">
          Edit Profil
        </button>
      </div>

      {/* Menu List */}
      <div className="px-page flex flex-col gap-3">
        {menuItems.map((item, i) => (
          <button 
            key={i}
            className="flex items-center justify-between p-4 bg-white rounded-card border border-border-DEFAULT active:bg-surface-page transition-colors"
          >
            <div className="flex items-center gap-4">
              <item.icon className="w-5 h-5 text-content-secondary" />
              <span className="font-semibold text-content-primary text-caption">{item.label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-content-muted" />
          </button>
        ))}
        
        <button className="mt-4 flex items-center justify-center gap-2 p-4 text-red-500 font-bold text-caption active:opacity-70 transition-opacity">
          <LogOut className="w-5 h-5" />
          <span>Keluar</span>
        </button>
      </div>
      
      {/* Footer Info */}
      <div className="px-page text-center py-4">
        <p className="text-[12px] text-content-muted">Merge Shop UMKM v0.1.0-mvp</p>
        <p className="text-[10px] text-content-muted mt-1">PMW UNSOED 2026</p>
      </div>
    </div>
  )
}
