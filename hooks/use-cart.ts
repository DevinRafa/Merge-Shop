import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, MenuItem } from '@/lib/types'

interface CartStore {
  items: CartItem[]
  addItem: (menuItem: MenuItem, storeId: string, storeName: string) => void
  removeItem: (menuItemId: string) => void
  increaseQty: (menuItemId: string) => void
  decreaseQty: (menuItemId: string) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (menuItem, storeId, storeName) => {
        set((state) => {
          const existing = state.items.find((i) => i.menuItem.id === menuItem.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.menuItem.id === menuItem.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            }
          }
          return { items: [...state.items, { menuItem, quantity: 1, storeId, storeName }] }
        })
      },

      removeItem: (menuItemId) => {
        set((state) => ({ items: state.items.filter((i) => i.menuItem.id !== menuItemId) }))
      },

      increaseQty: (menuItemId) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.menuItem.id === menuItemId ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }))
      },

      decreaseQty: (menuItemId) => {
        set((state) => {
          const item = state.items.find((i) => i.menuItem.id === menuItemId)
          if (!item) return state
          if (item.quantity <= 1) {
            return { items: state.items.filter((i) => i.menuItem.id !== menuItemId) }
          }
          return {
            items: state.items.map((i) =>
              i.menuItem.id === menuItemId ? { ...i, quantity: i.quantity - 1 } : i
            ),
          }
        })
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0),
    }),
    { name: 'blater-cart' }
  )
)
