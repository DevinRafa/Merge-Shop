'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { formatCurrency } from '@/lib/utils'

export function CartTeaser() {
  const { totalItems, totalPrice } = useCart()
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => { setHydrated(true) }, [])

  const count = hydrated ? totalItems() : 0
  const total = hydrated ? totalPrice() : 0
  const isEmpty = count === 0

  return (
    <div className="fixed bottom-[88px] left-5 right-5 z-30 rounded-card shadow-lg overflow-hidden">
      {isEmpty ? (
        /* Empty state — selalu tampil, tapi muted */
        <div className="bg-content-primary/80 text-white p-4 flex items-center justify-between backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-white/60" />
            </div>
            <span className="text-[13px] opacity-60 font-medium">Belum ada item dipilih</span>
          </div>
          <Link
            href="/cart"
            className="bg-white/10 text-white/70 font-bold px-4 py-2 rounded-lg text-caption"
          >
            Keranjang
          </Link>
        </div>
      ) : (
        /* Filled state */
        <div className="bg-brand-primary text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] opacity-90 font-medium">{count} item dipilih</span>
              <span className="font-bold text-body">{formatCurrency(total)}</span>
            </div>
          </div>
          <Link
            href="/cart"
            className="bg-white text-brand-primary font-bold px-4 py-2 rounded-lg text-caption active:scale-95 transition-transform"
          >
            Lihat Keranjang
          </Link>
        </div>
      )}
    </div>
  )
}
