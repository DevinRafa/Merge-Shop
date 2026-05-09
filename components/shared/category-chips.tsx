'use client'

import React, { useState } from 'react'

const CATEGORIES = ['Paling Laku', 'Promo', 'Terdekat', 'Tradisional', 'Soto']

export function CategoryChips() {
  const [active, setActive] = useState('Paling Laku')

  return (
    <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
      {CATEGORIES.map((cat) => {
        const isActive = active === cat
        return (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={[
              'px-4 py-2 rounded-pill text-caption font-semibold whitespace-nowrap transition-all duration-150 flex-shrink-0 select-none',
              isActive
                ? 'bg-brand-primary text-white shadow-sm scale-[1.03]'
                : 'border border-border-chip bg-surface-page text-content-secondary hover:bg-brand-hero hover:border-brand-primary hover:text-brand-primary active:scale-95',
            ].join(' ')}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}
