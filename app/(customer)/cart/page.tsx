'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronLeft, ShoppingCart, Plus, Minus, Trash2, Store } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { formatCurrency } from '@/lib/utils'

export default function CartPage() {
  const { items, increaseQty, decreaseQty, removeItem, clearCart, totalPrice } = useCart()

  const total = totalPrice()

  // Group items by store
  const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
    const key = item.storeId
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {})

  return (
    <div className="flex flex-col min-h-[calc(100vh-128px)] bg-surface-page">
      {/* Header */}
      <div className="px-page py-3 border-b border-border-DEFAULT bg-white flex items-center gap-3 flex-shrink-0">
        <Link href="/" className="p-1 -ml-1 text-content-muted">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-bold text-content-primary text-heading flex-1">Keranjang</h1>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-[12px] text-content-muted underline"
          >
            Kosongkan
          </button>
        )}
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-page text-center">
          <div className="w-20 h-20 rounded-full bg-brand-hero flex items-center justify-center">
            <ShoppingCart className="w-10 h-10 text-brand-primary" />
          </div>
          <div>
            <p className="font-bold text-content-primary text-body">Keranjang kosong</p>
            <p className="text-caption text-content-muted mt-1">
              Yuk tambah menu dari toko favoritmu!
            </p>
          </div>
          <Link
            href="/"
            className="mt-2 px-6 py-2.5 bg-brand-primary text-white rounded-pill font-bold text-caption active:scale-95 transition-transform"
          >
            Jelajahi Toko
          </Link>
        </div>
      )}

      {/* Cart items grouped by store */}
      {items.length > 0 && (
        <div className="flex-1 flex flex-col gap-4 px-page py-4 pb-[160px]">
          {Object.entries(grouped).map(([storeId, storeItems]) => (
            <div key={storeId} className="flex flex-col gap-3">
              {/* Store label */}
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-brand-primary flex-shrink-0" />
                <span className="text-caption font-bold text-content-primary">
                  {storeItems[0].storeName}
                </span>
                <Link
                  href={`/store/${storeId}`}
                  className="ml-auto text-[11px] text-brand-primary font-semibold"
                >
                  + Tambah menu
                </Link>
              </div>

              {/* Item cards */}
              {storeItems.map(({ menuItem, quantity }) => (
                <div
                  key={menuItem.id}
                  className="flex gap-3 p-3 bg-white border border-border-DEFAULT rounded-card"
                >
                  {/* Photo */}
                  <div className="w-16 h-16 flex-shrink-0 rounded-[8px] overflow-hidden bg-brand-img-placeholder">
                    <img
                      src={menuItem.photoUrl}
                      alt={menuItem.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <p className="text-caption font-semibold text-content-primary line-clamp-1">
                      {menuItem.name}
                    </p>
                    <p className="text-brand-primary font-bold text-body">
                      {formatCurrency(menuItem.price * quantity)}
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-col items-end justify-between gap-2">
                    <button
                      onClick={() => removeItem(menuItem.id)}
                      className="text-content-muted active:text-red-500 transition-colors"
                      aria-label="Hapus item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQty(menuItem.id)}
                        className="w-7 h-7 rounded-full bg-brand-hero border border-brand-primary text-brand-primary flex items-center justify-center active:scale-90 transition-transform"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-caption font-bold text-content-primary w-4 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => increaseQty(menuItem.id)}
                        className="w-7 h-7 rounded-full bg-brand-primary text-white flex items-center justify-center active:scale-90 transition-transform"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Order summary + checkout button */}
      {items.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-border-DEFAULT px-page py-4 flex flex-col gap-3 z-30">
          <div className="flex items-center justify-between">
            <span className="text-caption text-content-muted">Total pembayaran</span>
            <span className="text-heading font-bold text-brand-primary">
              {formatCurrency(total)}
            </span>
          </div>
          <Link
            href="/checkout"
            className="w-full bg-brand-primary text-white font-bold py-3.5 rounded-pill text-body active:scale-[0.98] transition-transform flex items-center justify-center"
          >
            Pesan Sekarang
          </Link>
        </div>
      )}
    </div>
  )
}
