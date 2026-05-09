'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, ChevronDown, ChevronUp, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getStoreChatResponse } from '@/lib/chat-ai'
import type { ChatMessage } from '@/lib/types'

interface StoreChatProps {
  storeName: string
}

const QUICK_PROMPTS = [
  'Menu paling laris?',
  'Cara pemesanan?',
  'Buka jam berapa?',
  'Ada promo?',
]

function BokuIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Robot face */}
      <rect x="4" y="7" width="16" height="12" rx="3" fill="white" />
      {/* Eyes */}
      <rect x="7.5" y="10.5" width="3" height="3" rx="1" fill="#C15F3C" />
      <rect x="13.5" y="10.5" width="3" height="3" rx="1" fill="#C15F3C" />
      {/* Mouth */}
      <rect x="8" y="15" width="8" height="1.5" rx="0.75" fill="#C15F3C" />
      {/* Antenna */}
      <line x1="12" y1="7" x2="12" y2="4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="3.5" r="1.2" fill="white" />
      {/* Ears */}
      <rect x="2" y="10" width="2" height="4" rx="1" fill="white" />
      <rect x="20" y="10" width="2" height="4" rx="1" fill="white" />
    </svg>
  )
}

export function StoreChat({ storeName }: StoreChatProps) {
  const [expanded, setExpanded] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'bot',
      content: `Halo! Saya BoKul, asisten toko ${storeName} 🤖 Mau tanya soal menu, jam buka, atau cara pesan?`,
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (expanded) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, typing, expanded])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setInput('')
    setTyping(true)
    setExpanded(true)

    setTimeout(() => {
      const reply = getStoreChatResponse(storeName, text)
      setMessages((prev) => [...prev, { role: 'bot', content: reply }])
      setTyping(false)
    }, 700 + Math.random() * 400)
  }

  return (
    <div className="border border-brand-primary/20 rounded-card overflow-hidden bg-brand-primary/5">
      {/* Header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-4"
        aria-expanded={expanded}
      >
        <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0 shadow-sm">
          <BokuIcon className="w-6 h-6" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-caption font-bold text-content-primary">
            BoKul — Asisten {storeName}
          </p>
          <div className="flex items-center gap-1 text-[10px] text-brand-primary">
            <Sparkles className="w-3 h-3" />
            <span>Bot Kuliner</span>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-content-muted" />
        ) : (
          <ChevronDown className="w-5 h-5 text-content-muted" />
        )}
      </button>

      {/* Expanded chat area */}
      {expanded && (
        <>
          <div className="border-t border-border-DEFAULT px-4 py-3 max-h-56 overflow-y-auto flex flex-col gap-3 bg-white">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  'max-w-[88%] px-3 py-2 rounded-2xl text-[13px] leading-snug',
                  msg.role === 'user'
                    ? 'self-end bg-brand-primary text-white rounded-tr-none'
                    : 'self-start bg-surface-page border border-border-DEFAULT text-content-primary rounded-tl-none'
                )}
              >
                {msg.content}
              </div>
            ))}
            {typing && (
              <div className="self-start bg-surface-page border border-border-DEFAULT px-3 py-2 rounded-2xl rounded-tl-none">
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-content-muted animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          <div className="px-4 pt-2 pb-1 flex gap-2 overflow-x-auto scrollbar-hide bg-white">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                className="flex-shrink-0 text-[11px] px-2.5 py-1 rounded-full border border-brand-primary/40 text-brand-primary font-medium whitespace-nowrap hover:bg-brand-hero transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-border-DEFAULT flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder={`Tanya BoKul tentang ${storeName}...`}
              className="flex-1 bg-surface-page border border-border-DEFAULT rounded-pill py-2 px-4 text-caption focus:outline-none focus:border-brand-primary text-[13px]"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="w-9 h-9 bg-brand-primary rounded-full flex items-center justify-center text-white active:scale-95 transition-all disabled:opacity-40"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
