import { menuItems } from '@/data/menus'
import type { MenuItem } from '@/lib/types'

export async function getMenuItemsByStoreId(storeId: string): Promise<MenuItem[]> {
  await new Promise(r => setTimeout(r, 300))
  return menuItems.filter(item => item.storeId === storeId)
}

export async function getMenuItemById(id: string): Promise<MenuItem | null> {
  await new Promise(r => setTimeout(r, 200))
  return menuItems.find(item => item.id === id) ?? null
}
