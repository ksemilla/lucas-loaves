import { Fragment, useState } from "react"
import { useOrderStore } from "../../stores/common"
import { Order, OrderStatus } from "../../types"
import { useNavigate } from "react-router-dom"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline"
import { classNames } from "../../uitls"

function OrderInline(props: { order: Order }) {
  const navitate = useNavigate()
  const total = props.order.orderItems.reduce(
    (acc, o) => acc + o.price * o.quantity,
    0
  )
  return (
    <tr key={props.order.id}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
        {props.order.customerName}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {props.order.mobile}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {props.order.status}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {total}
      </td>
      <td
        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 cursor-pointer hover:text-blue-500"
        onClick={() => navitate(`${props.order.id}`)}
      >
        View
      </td>
    </tr>
  )
}

function OrdersList(props: { orders: Order[] }) {
  return props.orders.map((order) => (
    <OrderInline key={order.id} order={order} />
  ))
}

export function OrdersPage() {
  const orderStore = useOrderStore()
  const [statusFilter, setStatusFilter] = useState<OrderStatus>("")

  return (
    <div className="pt-14 max-w-7xl m-auto px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Orders
          </h1>
          {/* <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
            email and role.
          </p> */}
        </div>
        {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Add user
          </button>
        </div> */}
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 min-h-[800px]">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Customer
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Mobile
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <OrderStatusDropdown
                      status={statusFilter}
                      setStatus={(status) => {
                        setStatusFilter(status)
                      }}
                    />
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  ></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <OrdersList orders={orderStore.getOrders(statusFilter)} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

const statusList = [
  {
    value: "",
    label: "All",
  },
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

function OrderStatusDropdown(props: {
  status?: OrderStatus
  setStatus: (status: OrderStatus) => void
}) {
  const statusLabel =
    statusList.find((obj) => obj.value === props.status)?.label ?? ""

  return (
    <Listbox value={props.status} onChange={props.setStatus}>
      {({ open }) => (
        <>
          {/* <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
            Status
          </Listbox.Label> */}
          <div className="relative z-0 mt-2">
            <Listbox.Button className="relative flex space-x-2 cursor-default rounded-md bg-white pr-10 text-left text-gray-900 ring-inset sm:text-sm sm:leading-6">
              <span className="block truncate">Status:</span>
              <span className="block truncate">{statusLabel}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {statusList.map((s) => (
                  <Listbox.Option
                    key={s.value}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={s.value}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {s.label}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
