import { useParams } from "react-router-dom"
import { useOrderStore } from "../../stores/common"
import { useEffect, useState } from "react"
import { Order, OrderStatus } from "../../types"

const statusList = [
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "processing",
    label: "Processing",
  },
  {
    value: "invoiced",
    label: "Invoiced",
  },
  {
    value: "delivered",
    label: "Delivered",
  },
  {
    value: "cancelled",
    label: "Cancelled",
  },
  {
    value: "rejected",
    label: "Rejected",
  },
]

export function OrderDetail() {
  const { id } = useParams()

  const orderStore = useOrderStore()
  const [order, setOrder] = useState<Order>()

  useEffect(() => {
    if (id) {
      setOrder(orderStore.getOrder(id ?? ""))
    }
  }, [])

  useEffect(() => {
    if (order && id) {
      orderStore.updateOrder(id, order)
    }
  }, [order])

  const total = order?.orderItems.reduce(
    (acc, o) => acc + o.price * o.quantity,
    0
  )

  return (
    <div className="pt-14 max-w-7xl m-auto space-y-6">
      <h1 className="font-semibold text-3xl">Order Detail</h1>
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 flex justify-between">
        <div>
          <h3 className="font-semibold text-xl">{order?.customerName}</h3>
          <p>{order?.mobile}</p>
          <p>{order?.email}</p>
        </div>
        <div>
          <h3 className="font-semibold text-xl">Delivery Address</h3>
          {order?.forPickup ? (
            <p>For pick up</p>
          ) : order?.shippingSameAsBilling ? (
            <div>
              <div>
                {order.billingAddress?.address1}{" "}
                {order.billingAddress?.address2
                  ? `, ${order.billingAddress.address2}`
                  : ""}
              </div>
              <div>
                {order.billingAddress?.street}, {order.billingAddress?.state}
              </div>
              <div>
                {order.billingAddress?.country} {order.billingAddress?.zipCode}
              </div>
            </div>
          ) : (
            <div>
              <div>
                {order?.shippingAddress?.address1}{" "}
                {order?.shippingAddress?.address2
                  ? `, ${order?.shippingAddress.address2}`
                  : ""}
              </div>
              <div>
                {order?.shippingAddress?.street},{" "}
                {order?.shippingAddress?.state}
              </div>
              <div>
                {order?.shippingAddress?.country}{" "}
                {order?.shippingAddress?.zipCode}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col items-end space-y-2">
          <select
            id="location"
            name="location"
            className="block rounded-md border-0 py-1 px-3  text-gray-900 sm:text-sm sm:leading-6"
            value={order?.status}
            onChange={(e) => {
              setOrder((prevState) => {
                if (prevState) {
                  return { ...prevState, status: e.target.value as OrderStatus }
                } else prevState
              })
            }}
          >
            {statusList.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          <p className="italic">{order?.notes}</p>
          <p className="font-semibold">
            <span className="text-gray-700 text-xl">Total:</span>{" "}
            <span className="text-2xl">${total}</span>
          </p>
        </div>
      </div>
      <div>
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {order?.orderItems.map((orderItem, idx) => (
            <li key={orderItem.id} className="flex py-6">
              <div className="w-6 text-gray-800">{idx + 1}.</div>
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={orderItem.imageUrl}
                  alt={orderItem.imageAlt}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a href="#">{orderItem.name}</a>
                    </h3>
                    <p className="ml-4">$ {orderItem.price} each</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {orderItem.description}
                  </p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="text-gray-800 font-semibold">
                    Qty {orderItem.quantity}
                  </p>

                  {/* <div className="flex">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Remove
                    </button>
                  </div> */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
