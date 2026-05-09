'use client'

import React from 'react'
import { Plus, Minus, Flame } from 'lucide-react'
import type { MenuItem } from '@/lib/types'
import { formatCurrency } from '@/lib/utils'
import { useCart } from '@/hooks/use-cart'

interface MenuCardProps {
  item: MenuItem
  storeId: string
  storeName: string
}

export function MenuCard({ item, storeId, storeName }: MenuCardProps) {
  const { items, addItem, increaseQty, decreaseQty } = useCart()
  const cartItem = items.find((i) => i.menuItem.id === item.id)
  const qty = cartItem?.quantity ?? 0

  return (
    <div className="flex gap-4 p-3 bg-surface-card border border-border-DEFAULT rounded-card overflow-hidden">
      <div className="relative w-24 h-24 flex-shrink-0 rounded-[10px] overflow-hidden bg-brand-img-placeholder">
        <img
          src={item.photoUrl}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        {item.isBestSeller && (
          <div className="absolute top-1 left-1 flex items-center gap-0.5 bg-brand-primary rounded-full px-1.5 py-0.5">
            <Flame className="w-2.5 h-2.5 text-white" />
            <span className="text-[8px] text-white font-bold">LARIS</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between py-0.5 min-w-0">
        <div>
          <h3 className="text-body font-semibold text-content-primary leading-tight line-clamp-1">
            {item.name}
          </h3>
          <p className="text-caption text-content-muted mt-0.5 line-clamp-2">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-brand-primary font-bold text-heading">
            {formatCurrency(item.price)}
          </span>

          {qty === 0 ? (
            <button
              onClick={() => addItem(item, storeId, storeName)}
              className="w-8 h-8 rounded-full border border-border-chip text-brand-primary flex items-center justify-center active:bg-brand-primary active:text-white transition-colors"
              aria-label={`Tambah ${item.name} ke keranjang`}
            >
              <Plus className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => decreaseQty(item.id)}
                className="w-7 h-7 rounded-full bg-brand-hero border border-brand-primary text-brand-primary flex items-center justify-center active:scale-90 transition-transform"
                aria-label="Kurangi"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-body font-bold text-content-primary w-4 text-center">
                {qty}
              </span>
              <button
                onClick={() => increaseQty(item.id)}
                className="w-7 h-7 rounded-full bg-brand-primary text-white flex items-center justify-center active:scale-90 transition-transform"
                aria-label="Tambah"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
