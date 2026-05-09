'use client'

import React from 'react'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'

function BlaterLogo() {
  return (
    <div className="flex items-center gap-1.5">
      <svg
        viewBox="0 0 28 28"
        className="w-7 h-7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="14" cy="14" r="14" fill="#C15F3C" />
        <path
          d="M14 5C10.134 5 7 8.134 7 12c0 5.25 7 11 7 11s7-5.75 7-11c0-3.866-3.134-7-7-7z"
          fill="white"
        />
        <circle cx="14" cy="12" r="2.5" fill="#C15F3C" />
      </svg>
      <span className="text-brand-primary font-extrabold text-[22px] tracking-tight leading-none">
        blater
      </span>
    </div>
  )
}

export function TopAppBar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-surface-page border-b border-border-DEFAULT px-page h-16 flex items-center justify-between">
      <Link href="/" aria-label="Blater — Beranda">
        <BlaterLogo />
      </Link>
      <button
        className="p-2 text-content-primary hover:text-brand-primary transition-colors"
        aria-label="Keranjang belanja"
      >
        <ShoppingBag className="w-6 h-6" />
      </button>
    </header>
  )
}
