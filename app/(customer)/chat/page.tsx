'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, Sparkles, ChevronLeft, Clock, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  getMockAIResponse,
  getAutoSuggestions,
  getTimeBasedGreeting,
  INITIAL_BOT_MESSAGE,
} from '@/lib/chat-ai'
import type { ChatMessage } from '@/lib/types'

const TRENDING_TOPICS = [
  { label: 'Ayam Geprek', icon: '🍗' },
  { label: 'Soto Riyanto', icon: '🍜' },
  { label: 'Nasi Goreng', icon: '🍚' },
  { label: 'Es Dawet', icon: '🥤' },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_BOT_MESSAGE])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [initialized, setInitialized] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSuggestions(getAutoSuggestions())
    if (!initialized) {
      setInitialized(true)
      const greeting = getTimeBasedGreeting()
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: 'bot', content: greeting }])
      }, 700)
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setInput('')
    setTyping(true)

    const delay = 800 + Math.random() * 600
    setTimeout(() => {
      const reply = getMockAIResponse(text)
      setMessages((prev) => [...prev, { role: 'bot', content: reply }])
      setTyping(false)
      setSuggestions(getAutoSuggestions())
    }, delay)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-128px)]">

      {/* Header */}
      <div className="px-page py-3 border-b border-border-DEFAULT bg-surface-page flex items-center gap-3">
        <Link href="/" className="p-1 -ml-1 text-content-muted">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center shadow-sm flex-shrink-0">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-content-primary leading-tight">MINJAN</h2>
          <div className="flex items-center gap-1 text-[10px] text-brand-primary">
            <Sparkles className="w-3 h-3" />
            <span>AI Asisten Kuliner Purbalingga</span>
          </div>
        </div>
      </div>

      {/* Trending Banner (AI automation) */}
      <div className="px-page py-3 border-b border-border-DEFAULT bg-white">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-brand-primary" />
          <span className="text-[12px] font-semibold text-content-secondary">Sedang Trending</span>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {TRENDING_TOPICS.map((topic) => (
            <button
              key={topic.label}
              onClick={() => sendMessage(topic.label)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-page border border-border-DEFAULT text-[12px] text-content-primary whitespace-nowrap flex-shrink-0 font-medium"
            >
              <span>{topic.icon}</span>
              <span>{topic.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-page flex flex-col gap-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              'max-w-[85%] p-4 rounded-2xl text-caption leading-relaxed',
              msg.role === 'user'
                ? 'self-end bg-brand-primary text-white rounded-tr-none'
                : 'self-start bg-white border border-border-DEFAULT text-content-primary rounded-tl-none shadow-sm'
            )}
          >
            {msg.content}
          </div>
        ))}

        {typing && (
          <div className="self-start bg-white border border-border-DEFAULT px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
            <div className="flex gap-1 items-center h-4">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full bg-content-muted animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick suggestions (AI automation: time-based) */}
      {suggestions.length > 0 && (
        <div className="px-page pb-2 pt-1 flex gap-2 overflow-x-auto scrollbar-hide bg-surface-page border-t border-border-DEFAULT">
          <div className="flex items-center gap-1 text-[10px] text-content-muted flex-shrink-0">
            <Clock className="w-3 h-3" />
            Saran:
          </div>
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="flex-shrink-0 text-[12px] px-3 py-1.5 rounded-full border border-brand-primary text-brand-primary font-medium bg-brand-hero whitespace-nowrap"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-white border-t border-border-DEFAULT">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
            placeholder="Tanya MINJAN..."
            className="flex-1 bg-surface-page border border-border-DEFAULT rounded-pill py-3 px-5 text-caption focus:outline-none focus:border-brand-primary"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center text-white shadow-md active:scale-95 transition-transform disabled:opacity-50"
            aria-label="Kirim pesan"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
