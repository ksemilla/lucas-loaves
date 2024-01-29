export interface Item {
  id: number
  name: string
  imageUrl: string
  imageAlt: string
  price: number
  description: string
}

export interface OrderItem extends Item {
  uuid: string
  quantity: number
}

export type ShoppingStore = {
  orderItems: OrderItem[]
  addItem: (item: OrderItem) => void
  removeItem: (idx: number) => void
  resetItems: () => void
}

export type Address = {
  address1: string
  address2?: string
  street: string
  city: string
  state: string
  country: string
  zipCode: string
}

export type OrderStatus =
  | ""
  | "pending"
  | "processing"
  | "invoiced"
  | "delivered"
  | "cancelled"
  | "rejected"

export type Order = {
  id?: string
  orderItems: OrderItem[]
  status: OrderStatus
  customerName: string
  mobile: string
  email?: string
  billingAddress?: Address
  shippingAddress?: Address
  shippingSameAsBilling?: boolean
  forPickup?: boolean
  notes?: string
}

export type OrderStore = {
  orders: Order[]
  addOrder: (order: Order) => void
  updateOrder: (id: string, order: Order) => void
  getOrders: (orderStatus?: OrderStatus) => Order[]
  getOrder: (id: string) => Order | undefined
}
