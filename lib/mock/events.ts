import { events } from '@/data/events'
import type { Event } from '@/lib/types'

export async function getEvents(): Promise<Event[]> {
  await new Promise((r) => setTimeout(r, 200))
  return events
}

export async function getActiveEvents(): Promise<Event[]> {
  await new Promise((r) => setTimeout(r, 200))
  return events.filter((e) => e.isActive)
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  await new Promise((r) => setTimeout(r, 150))
  return events.find((e) => e.slug === slug) ?? null
}
