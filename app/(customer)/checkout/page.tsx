'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ChevronLeft, MapPin, Bike, Store,
  ScanLine, Banknote, ChevronRight, CheckCircle2,
  ClipboardList, User, Phone, StickyNote,
} from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { formatCurrency } from '@/lib/utils'
import { cn } from '@/lib/utils'

type DeliveryMethod = 'pickup' | 'delivery'
type PaymentMethod = 'qris' | 'cash'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, totalItems, clearCart } = useCart()

  const [delivery, setDelivery] = useState<DeliveryMethod>('pickup')
  const [payment, setPayment] = useState<PaymentMethod>('qris')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [ordered, setOrdered] = useState(false)
  const [loading, setLoading] = useState(false)

  const subtotal = totalPrice()
  const deliveryFee = delivery === 'delivery' ? 5000 : 0
  const grandTotal = subtotal + deliveryFee

  const handleOrder = () => {
    if (!name.trim() || !phone.trim()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setOrdered(true)
      clearCart()
    }, 1800)
  }

  /* ─── Success screen ─── */
  if (ordered) {
    return (
      <div className="min-h-[calc(100vh-128px)] flex flex-col items-center justify-center px-page text-center gap-6 bg-surface-page">
        <div className="w-24 h-24 rounded-full bg-brand-hero flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-brand-primary" />
        </div>
        <div>
          <h2 className="text-heading font-bold text-content-primary">Pesanan Dikonfirmasi!</h2>
          <p className="text-caption text-content-muted mt-2">
            Terima kasih {name}! Pesananmu sedang diproses oleh toko.
          </p>
        </div>
        <div className="w-full bg-white border border-border-DEFAULT rounded-card p-4 text-left flex flex-col gap-2">
          <p className="text-[12px] text-content-muted font-semibold uppercase tracking-wide">Ringkasan</p>
          <div className="flex justify-between text-caption">
            <span className="text-content-secondary">Metode</span>
            <span className="font-semibold text-content-primary capitalize">
              {delivery === 'pickup' ? 'Ambil di toko' : 'Diantar'}
            </span>
          </div>
          <div className="flex justify-between text-caption">
            <span className="text-content-secondary">Pembayaran</span>
            <span className="font-semibold text-content-primary uppercase">{payment}</span>
          </div>
          <div className="flex justify-between text-caption border-t border-border-DEFAULT pt-2 mt-1">
            <span className="text-content-secondary">Total dibayar</span>
            <span className="font-bold text-brand-primary">{formatCurrency(grandTotal)}</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Link
            href="/orders"
            className="w-full bg-brand-primary text-white font-bold py-3.5 rounded-pill text-body flex items-center justify-center gap-2"
          >
            <ClipboardList className="w-5 h-5" />
            Lihat Pesanan
          </Link>
          <Link
            href="/"
            className="w-full border border-border-chip text-content-secondary font-semibold py-3.5 rounded-pill text-caption flex items-center justify-center"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    )
  }

  /* ─── Empty guard ─── */
  if (items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-128px)] flex flex-col items-center justify-center gap-4 px-page text-center bg-surface-page">
        <p className="font-bold text-content-primary text-body">Keranjang kosong</p>
        <Link href="/" className="px-6 py-2.5 bg-brand-primary text-white rounded-pill font-bold text-caption">
          Jelajahi Toko
        </Link>
      </div>
    )
  }

  /* ─── Checkout form ─── */
  return (
    <div className="flex flex-col bg-surface-page min-h-[calc(100vh-128px)]">
      {/* Header */}
      <div className="px-page py-3 border-b border-border-DEFAULT bg-white flex items-center gap-3 sticky top-16 z-10">
        <Link href="/cart" className="p-1 -ml-1 text-content-muted">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-bold text-content-primary text-heading">Konfirmasi Pesanan</h1>
      </div>

      <div className="flex flex-col gap-4 px-page py-4 pb-[160px]">

        {/* Order items (readonly) */}
        <div className="bg-white rounded-card border border-border-DEFAULT overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border-DEFAULT">
            <ClipboardList className="w-4 h-4 text-brand-primary" />
            <span className="font-bold text-content-primary text-caption">
              {totalItems()} Item Pesanan
            </span>
          </div>
          <div className="flex flex-col divide-y divide-border-DEFAULT">
            {items.map(({ menuItem, quantity, storeName }) => (
              <div key={menuItem.id} className="flex items-center gap-3 px-4 py-3">
                <div className="w-10 h-10 rounded-[6px] overflow-hidden bg-brand-img-placeholder flex-shrink-0">
                  <img src={menuItem.photoUrl} alt={menuItem.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-caption font-semibold text-content-primary line-clamp-1">{menuItem.name}</p>
                  <p className="text-[11px] text-content-muted">{storeName} · ×{quantity}</p>
                </div>
                <span className="text-caption font-bold text-brand-primary flex-shrink-0">
                  {formatCurrency(menuItem.price * quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery method */}
        <div className="bg-white rounded-card border border-border-DEFAULT overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border-DEFAULT">
            <MapPin className="w-4 h-4 text-brand-primary" />
            <span className="font-bold text-content-primary text-caption">Metode Pengambilan</span>
          </div>
          <div className="flex p-3 gap-3">
            {([
              { value: 'pickup', icon: Store, label: 'Ambil di Toko', desc: 'Gratis' },
              { value: 'delivery', icon: Bike, label: 'Diantar', desc: '+Rp 5.000' },
            ] as const).map(({ value, icon: Icon, label, desc }) => (
              <button
                key={value}
                onClick={() => setDelivery(value)}
                className={cn(
                  'flex-1 flex flex-col items-center gap-1.5 py-3 rounded-card border-2 transition-all',
                  delivery === value
                    ? 'border-brand-primary bg-brand-hero'
                    : 'border-border-DEFAULT bg-white'
                )}
              >
                <Icon className={cn('w-5 h-5', delivery === value ? 'text-brand-primary' : 'text-content-muted')} />
                <span className={cn('text-[12px] font-bold', delivery === value ? 'text-brand-primary' : 'text-content-secondary')}>
                  {label}
                </span>
                <span className="text-[10px] text-content-muted">{desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Contact info */}
        <div className="bg-white rounded-card border border-border-DEFAULT overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border-DEFAULT">
            <User className="w-4 h-4 text-brand-primary" />
            <span className="font-bold text-content-primary text-caption">Data Pemesan</span>
          </div>
          <div className="flex flex-col gap-3 p-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-content-secondary">Nama</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama kamu"
                  className="w-full border border-border-DEFAULT rounded-card py-2.5 pl-9 pr-3 text-caption focus:outline-none focus:border-brand-primary"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-content-secondary">No. WhatsApp</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className="w-full border border-border-DEFAULT rounded-card py-2.5 pl-9 pr-3 text-caption focus:outline-none focus:border-brand-primary"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-content-secondary">
                Catatan <span className="text-content-muted font-normal">(opsional)</span>
              </label>
              <div className="relative">
                <StickyNote className="absolute left-3 top-3 w-4 h-4 text-content-muted" />
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Misal: tidak pedas, ekstra sambal..."
                  rows={2}
                  className="w-full border border-border-DEFAULT rounded-card py-2.5 pl-9 pr-3 text-caption focus:outline-none focus:border-brand-primary resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Payment method */}
        <div className="bg-white rounded-card border border-border-DEFAULT overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border-DEFAULT">
            <ScanLine className="w-4 h-4 text-brand-primary" />
            <span className="font-bold text-content-primary text-caption">Metode Pembayaran</span>
          </div>
          <div className="flex flex-col divide-y divide-border-DEFAULT">
            {([
              { value: 'qris', icon: ScanLine, label: 'QRIS', desc: 'Bayar pakai semua e-wallet & m-banking' },
              { value: 'cash', icon: Banknote, label: 'Tunai', desc: 'Bayar langsung di toko' },
            ] as const).map(({ value, icon: Icon, label, desc }) => (
              <button
                key={value}
                onClick={() => setPayment(value)}
                className="flex items-center gap-3 px-4 py-3 w-full text-left"
              >
                <div className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0',
                  payment === value ? 'bg-brand-primary' : 'bg-surface-page'
                )}>
                  <Icon className={cn('w-4 h-4', payment === value ? 'text-white' : 'text-content-muted')} />
                </div>
                <div className="flex-1">
                  <p className={cn('text-caption font-bold', payment === value ? 'text-brand-primary' : 'text-content-primary')}>
                    {label}
                  </p>
                  <p className="text-[11px] text-content-muted">{desc}</p>
                </div>
                <div className={cn(
                  'w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center',
                  payment === value ? 'border-brand-primary' : 'border-border-chip'
                )}>
                  {payment === value && <div className="w-2.5 h-2.5 rounded-full bg-brand-primary" />}
                </div>
              </button>
            ))}
          </div>

          {/* QRIS mock display */}
          {payment === 'qris' && (
            <div className="mx-4 mb-4 p-4 bg-brand-hero rounded-card flex flex-col items-center gap-2 border border-brand-primary/20">
              <ScanLine className="w-8 h-8 text-brand-primary" />
              <p className="text-[12px] font-bold text-content-primary">Scan QRIS di toko</p>
              <p className="text-[11px] text-content-muted text-center">
                Tunjukkan QR code ini atau scan QR di kasir toko
              </p>
              <div className="w-28 h-28 bg-white rounded-lg border-2 border-brand-primary/30 flex items-center justify-center mt-1">
                <div className="grid grid-cols-5 gap-0.5">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'w-4 h-4 rounded-[2px]',
                        [0,1,5,7,9,10,11,14,15,17,19,20,21,24].includes(i)
                          ? 'bg-content-primary'
                          : 'bg-white'
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Price breakdown */}
        <div className="bg-white rounded-card border border-border-DEFAULT p-4 flex flex-col gap-2">
          <div className="flex justify-between text-caption">
            <span className="text-content-secondary">Subtotal</span>
            <span className="text-content-primary font-semibold">{formatCurrency(subtotal)}</span>
          </div>
          {delivery === 'delivery' && (
            <div className="flex justify-between text-caption">
              <span className="text-content-secondary">Ongkos kirim</span>
              <span className="text-content-primary font-semibold">{formatCurrency(deliveryFee)}</span>
            </div>
          )}
          <div className="flex justify-between text-body border-t border-border-DEFAULT pt-2 mt-1">
            <span className="font-bold text-content-primary">Total</span>
            <span className="font-bold text-brand-primary">{formatCurrency(grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-border-DEFAULT px-page py-4 z-10">
        <button
          onClick={handleOrder}
          disabled={loading || !name.trim() || !phone.trim()}
          className={cn(
            'w-full font-bold py-3.5 rounded-pill text-body transition-all flex items-center justify-center gap-2',
            loading || !name.trim() || !phone.trim()
              ? 'bg-content-muted/30 text-content-muted cursor-not-allowed'
              : 'bg-brand-primary text-white active:scale-[0.98]'
          )}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Memproses...
            </>
          ) : (
            <>
              <ChevronRight className="w-5 h-5" />
              Konfirmasi Pesanan · {formatCurrency(grandTotal)}
            </>
          )}
        </button>
      </div>
    </div>
  )
}
