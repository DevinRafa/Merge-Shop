import { stores } from '@/data/stores'
import type { Store } from '@/lib/types'

export async function getStores(): Promise<Store[]> {
  await new Promise(r => setTimeout(r, 300)) // simulate network delay
  return stores
}

export async function getStoreBySlug(slug: string): Promise<Store | null> {
  await new Promise(r => setTimeout(r, 200)) // simulate network delay
  return stores.find(s => s.slug === slug) ?? null
}
