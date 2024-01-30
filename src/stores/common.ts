import { create } from "zustand"
import { OrderStore, ShoppingStore } from "../types"
import { v4 as uuidv4 } from "uuid"

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
  resetItems: () => set((state) => ({ ...state, orderItems: [] })),
}))

type AuthStoreType = {
  isLogged: boolean
  setIsLogged: (data: boolean) => void
}

export const useAuthStore = create<AuthStoreType>()((set) => ({
  isLogged: false,
  setIsLogged: (val) => set((state) => ({ ...state, isLogged: val })),
}))

export const useOrderStore = create<OrderStore>()((set, get) => ({
  orders: [
    {
      id: uuidv4(),
      status: "pending",
      customerName: "John Doe",
      mobile: "+61 (543) 2345 346",
      forPickup: true,
      notes: "I will pick this up 6am tomorrow",
      orderItems: [
        {
          id: 1,
          name: "Sourdough White",
          price: 7,
          imageUrl:
            "https://source.unsplash.com/sliced-breads-on-white-surface-WHJTaLqonkU/",
          description: "Our standard sourdough",
          imageAlt: "sourdough-white",
          quantity: 10,
          uuid: uuidv4(),
        },
        {
          id: 2,
          name: "Sourdough Rye",
          price: 8,
          imageUrl:
            "https://source.unsplash.com/a-bunch-of-loaves-of-bread-sitting-on-top-of-a-table-9pxEmvxBCiw/",
          description: "Sourdough created with 50% rye flour",
          imageAlt: "sourdough-rye",
          quantity: 8,
          uuid: uuidv4(),
        },
      ],
    },
    {
      id: uuidv4(),
      status: "pending",
      customerName: "Jane Doe",
      mobile: "43634567",
      forPickup: false,
      shippingAddress: {
        address1: "Unit 12",
        street: "These Street",
        city: "Surry Hills",
        state: "NSW",
        country: "AU",
        zipCode: "1234",
      },
      notes: "Please deliver",
      orderItems: [
        {
          id: 3,
          name: "Sourdough Spelt",
          price: 9,
          imageUrl:
            "https://source.unsplash.com/brown-bread-on-brown-wooden-table-nVoDL1YDWRE/",
          description: "Sourdough created with 100% spelt flour",
          imageAlt: "sourdough-spelt",
          quantity: 10,
          uuid: uuidv4(),
        },
        {
          id: 2,
          name: "Sourdough Rye",
          price: 8,
          imageUrl:
            "https://source.unsplash.com/a-bunch-of-loaves-of-bread-sitting-on-top-of-a-table-9pxEmvxBCiw/",
          description: "Sourdough created with 50% rye flour",
          imageAlt: "sourdough-rye",
          quantity: 8,
          uuid: uuidv4(),
        },
      ],
    },
    {
      id: uuidv4(),
      status: "delivered",
      customerName: "Peter Parker",
      mobile: "43634567",
      forPickup: false,
      shippingAddress: {
        address1: "Unit 12",
        street: "These Street",
        city: "Surry Hills",
        state: "NSW",
        country: "AU",
        zipCode: "1234",
      },
      notes: "Please deliver",
      orderItems: [
        {
          id: 3,
          name: "Sourdough Spelt",
          price: 9,
          imageUrl:
            "https://source.unsplash.com/brown-bread-on-brown-wooden-table-nVoDL1YDWRE/",
          description: "Sourdough created with 100% spelt flour",
          imageAlt: "sourdough-spelt",
          quantity: 5,
          uuid: uuidv4(),
        },
        {
          id: 2,
          name: "Sourdough Rye",
          price: 8,
          imageUrl:
            "https://source.unsplash.com/a-bunch-of-loaves-of-bread-sitting-on-top-of-a-table-9pxEmvxBCiw/",
          description: "Sourdough created with 50% rye flour",
          imageAlt: "sourdough-rye",
          quantity: 4,
          uuid: uuidv4(),
        },
      ],
    },
  ],
  addOrder: (order) =>
    set((state) => ({ ...state, orders: [order, ...state.orders] })),
  updateOrder: (id, order) =>
    set((state) => {
      const _orders = state.orders
      const index = state.orders.findIndex((obj) => obj.id === id)
      _orders[index] = order
      return { ...state, orders: _orders }
    }),
  getOrders: (status) => {
    if (status) {
      return get().orders.filter((obj) => obj.status === status)
    } else {
      return get().orders
    }
  },
  getOrder: (id) => get().orders.find((obj) => obj.id === id),
}))

export type Application = {
  name: string
  email: string
  resume: any
  coverLetter: any
  position: string
}

type ApplicationStore = {
  applications: Application[]
  addApplication: (application: Application) => void
}

export const useApplicationStore = create<ApplicationStore>()((set) => ({
  applications: [],
  addApplication: (application) =>
    set((state) => ({
      ...state,
      applications: [...state.applications, application],
    })),
}))
