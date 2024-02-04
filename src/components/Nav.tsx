import { Dialog } from "@headlessui/react"
import {
  ArrowRightEndOnRectangleIcon,
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { useState } from "react"
import { ShoppingCart } from "./ShoppingCart"
import { Link } from "react-router-dom"
import { useAuthStore, useShoppingStore } from "../stores/common"
import { classNames } from "../uitls"

const navigation = [
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Classes", href: "/classes" },
  { name: "Contact", href: "#" },
]

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const shoppingCart = useShoppingStore()
  const authStore = useAuthStore()

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white opacity-90">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src="src/assets/logo.png" alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </Link>
          ))}
          {authStore.isLogged && (
            <>
              <Link
                to="/orders"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Orders
              </Link>
              {/* <Link
                to="/applications"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Applications
              </Link> */}
            </>
          )}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-2 lg:items-center">
          {!authStore.isLogged && (
            <div>
              <Link
                to="/login"
                className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-2.5 py-1.5 text-md font-semibold text-gray-800 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:text-white"
              >
                Login
                <ArrowRightEndOnRectangleIcon
                  className="-mr-0.5 h-7 w-7"
                  aria-hidden="true"
                />
              </Link>
            </div>
          )}
          <div
            className={classNames(
              "relative group",
              shoppingCart.orderItems.length > 0
                ? "cursor-pointer"
                : "pointer-events-none"
            )}
            onClick={() => setOpen(true)}
          >
            <ShoppingCartIcon className="w-7 group-hover:text-blue-500" />
            <div
              className={classNames(
                "absolute z-0 top-4 -right-2 w-5 h-5 text-white font-medium rounded-full text-sm flex justify-center",
                shoppingCart.orderItems.length === 0
                  ? "bg-gray-500"
                  : "bg-red-500"
              )}
            >
              {shoppingCart.orderItems.length}
            </div>
          </div>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <ShoppingCartIcon className="w-8" />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>

      <ShoppingCart open={open} setOpen={setOpen} />
    </header>
  )
}
