'use client'

import React, { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { X, Send, Bot, Sparkles, MessageCircleMore } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  getMockAIResponse,
  getAutoSuggestions,
  getTimeBasedGreeting,
  INITIAL_BOT_MESSAGE,
} from '@/lib/chat-ai'
import type { ChatMessage } from '@/lib/types'

export function ChatWidget() {
  const pathname = usePathname()
  const isStorePage = pathname.startsWith('/store/')
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_BOT_MESSAGE])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSuggestions(getAutoSuggestions())
  }, [])

  useEffect(() => {
    if (open && messages.length === 1) {
      const greeting = getTimeBasedGreeting()
      if (greeting !== INITIAL_BOT_MESSAGE.content) {
        setTimeout(() => {
          setMessages((prev) => [...prev, { role: 'bot', content: greeting }])
        }, 600)
      }
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const userMsg: ChatMessage = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)

    const delay = 800 + Math.random() * 600
    setTimeout(() => {
      const botReply = getMockAIResponse(text)
      setMessages((prev) => [...prev, { role: 'bot', content: botReply }])
      setTyping(false)
      setSuggestions(getAutoSuggestions())
    }, delay)
  }

  return (
    <>
      {/* FAB */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className={cn(
            'fixed right-5 z-40 w-14 h-14 bg-brand-primary rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform',
            isStorePage ? 'bottom-[180px]' : 'bottom-[88px]'
          )}
          aria-label="Buka MINJAN AI Chatbot"
        >
          <MessageCircleMore className="w-7 h-7 text-white" />
        </button>
      )}

      {/* Chat Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end pointer-events-none">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px] pointer-events-auto"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="relative pointer-events-auto bg-surface-page rounded-t-[24px] shadow-2xl max-h-[75vh] flex flex-col">
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-border-DEFAULT rounded-full" />
            </div>

            {/* Header */}
            <div className="px-page py-3 flex items-center gap-3 border-b border-border-DEFAULT">
              <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center shadow-sm flex-shrink-0">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-content-primary text-body leading-tight">MINJAN</h2>
                <div className="flex items-center gap-1 text-[10px] text-brand-primary">
                  <Sparkles className="w-3 h-3" />
                  <span>AI Asisten Kuliner</span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-full hover:bg-border-DEFAULT/20 text-content-muted transition-colors"
                aria-label="Tutup chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 min-h-0">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    'max-w-[85%] px-4 py-3 rounded-2xl text-caption leading-relaxed',
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
                        className="w-1.5 h-1.5 rounded-full bg-content-muted animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Suggestions */}
            {suggestions.length > 0 && (
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
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
            <div className="px-4 pb-5 pt-2 border-t border-border-DEFAULT flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                placeholder="Tanya MINJAN..."
                className="flex-1 bg-white border border-border-DEFAULT rounded-pill py-2.5 px-4 text-caption focus:outline-none focus:border-brand-primary"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center text-white shadow-md active:scale-95 transition-all disabled:opacity-50"
                aria-label="Kirim pesan"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
