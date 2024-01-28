import { create } from "zustand"

export const useShoppingStore = create<ShoppingStore>()((set) => ({
  orderItems: [],
  addItem: (item) =>
    set((state) => ({ ...state, orderItems: [...state.orderItems, item] })),
  removeItem: (idx) =>
    set((state) => {
      const arr = state.orderItems
      arr.splice(idx, 1)
      return { ...state, orderItems: arr }
    }),
  resetItems: () => set((state) => ({ ...state, items: [] })),
}))
