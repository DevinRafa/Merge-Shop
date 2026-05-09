'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { label: 'HOME', href: '/', icon: Home },
    { label: 'SEARCH', href: '/search', icon: Search },
    { label: 'ACCOUNT', href: '/profile', icon: User },
  ]

  return (
    <nav className="sticky bottom-0 z-50 w-full bg-surface-page border-t border-border-DEFAULT h-16 flex items-center justify-around px-4">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 min-w-[64px] py-1 transition-all duration-200",
              isActive ? "text-content-inverse bg-brand-primary rounded-card px-4" : "text-content-muted"
            )}
          >
            <item.icon className={cn("w-5 h-5", isActive ? "text-content-inverse" : "text-content-muted")} />
            <span className="text-nav font-medium tracking-wider">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
