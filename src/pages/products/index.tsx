import { useState } from "react"
import { products } from "../../const"
import { Modal } from "../../components/Modal"
import { useShoppingStore } from "../../stores/common"
import { v4 as uuidv4 } from "uuid"
import { Item, OrderItem } from "../../types"

export function ProductList() {
  const [open, setOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Item>()
  const shoppingCart = useShoppingStore()
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Order our delicous sourdoughs!
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative"
              onClick={() => {
                setOpen(true)
                setSelectedProduct(product)
              }}
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.imageUrl}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.description}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <div>
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img
              src={selectedProduct?.imageUrl}
              alt={selectedProduct?.imageAlt}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
        </div>
        <div className="mt-2 flex justify-between">
          <h3 className="text-lg font-medium">{selectedProduct?.name}</h3>
          <p className="text-base font-semibold text-gray-90">
            $ {selectedProduct?.price}
          </p>
        </div>
        <div>
          {/* <label
              htmlFor="company-website"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              QTY
            </label> */}
          <div className="mt-2 flex rounded-md shadow-sm">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
              QTY
            </span>
            <input
              type="number"
              name="company-website"
              id="company-website"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <button
          className="mt-2 w-full rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => {
            setOpen(false)
            shoppingCart.addItem({
              ...selectedProduct,
              quantity,
              uuid: uuidv4(),
            } as OrderItem)
            setQuantity(1)
          }}
        >
          Add to cart
        </button>
      </Modal>
    </div>
  )
}
