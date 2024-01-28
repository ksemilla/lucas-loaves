interface Item {
  id: number
  name: string
  imageUrl: string
  imageAlt: string
  price: number
  description: string
}

interface OrderItem extends Item {
  uuid: string
  quantity: number
}

type ShoppingStore = {
  orderItems: OrderItem[]
  addItem: (item: OrderItem) => void
  removeItem: (idx: number) => void
  resetItems: () => void
}

type Order = {
  orderItems: OrderItem[]
}
