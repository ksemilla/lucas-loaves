import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form"
import { Order } from "../../types"
import { useEffect, useState } from "react"
import { useOrderStore, useShoppingStore } from "../../stores/common"
import { v4 as uuidv4 } from "uuid"
import { Modal } from "../../components/Modal"
import { useNavigate } from "react-router-dom"

function ShippingAddress() {
  const { register } = useFormContext<Order>()
  return (
    <>
      <div className="col-span-6">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Address 1
        </label>
        <div className="mt-2">
          <input
            type="text"
            {...register("shippingAddress.address1", { required: true })}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="col-span-6">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Address 2
        </label>
        <div className="mt-2">
          <input
            type="text"
            {...register("shippingAddress.address2")}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="col-span-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Street
        </label>
        <div className="mt-2">
          <input
            type="text"
            {...register("shippingAddress.street", { required: true })}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="col-span-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          City
        </label>
        <div className="mt-2">
          <input
            type="text"
            {...register("shippingAddress.city", { required: true })}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="col-span-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          State
        </label>
        <div className="mt-2">
          <input
            type="text"
            {...register("shippingAddress.state", { required: true })}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="col-span-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Country
        </label>
        <div className="mt-2">
          <input
            type="text"
            {...register("shippingAddress.country", { required: true })}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="col-span-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Zip Code
        </label>
        <div className="mt-2">
          <input
            type="text"
            {...register("shippingAddress.zipCode", { required: true })}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </>
  )
}

export function CheckoutPage() {
  const orderStore = useOrderStore()
  const shoppingCart = useShoppingStore()
  const methods = useForm<Order>()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods
  const sameAsBilling = useWatch({ control, name: "shippingSameAsBilling" })
  const [cardNumber, setCardNumber] = useState("")
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    orderStore.addOrder({
      ...data,
      orderItems: shoppingCart.orderItems,
      status: "pending",
      id: uuidv4(),
    })
    shoppingCart.resetItems()
    setOpen(true)
    setTimeout(() => {
      setOpen(false)
    }, 10000)
  })

  useEffect(() => {
    const lastChar: string = cardNumber.charAt(cardNumber.length - 1)
    const substringWithoutLastChar: string = cardNumber.slice(0, -1)

    if ([5, 10, 15].includes(cardNumber.length)) {
      if (lastChar !== " ") {
        setCardNumber(substringWithoutLastChar + " " + lastChar)
      } else {
        setCardNumber(substringWithoutLastChar)
      }
    }
  }, [cardNumber])

  useEffect(() => {
    if (!open && shoppingCart.orderItems.length === 0) {
      navigate("/")
    }
  }, [open])

  return (
    <div className="pt-14 m-auto max-w-3xl">
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <div className="grid sm:grid-cols-12 gap-4">
            <div className="col-span-12 text-xl font-medium">
              Customer Details
            </div>
            <div className="col-span-6">
              <label
                htmlFor="text"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("customerName", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors?.customerName ? (
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    Please enter your name.
                  </p>
                ) : null}
              </div>
            </div>

            <div className="col-span-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mobile
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("mobile", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors?.mobile ? (
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    Please enter your mobile.
                  </p>
                ) : null}
              </div>
            </div>

            <div className="col-span-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  {...register("email")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-12 text-xl font-medium">
              Billing Address
            </div>
            <div className="col-span-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Address 1
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("billingAddress.address1", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors?.billingAddress?.address1 ? (
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    Please enter your address 1.
                  </p>
                ) : null}
              </div>
            </div>

            <div className="col-span-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Address 2
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("billingAddress.address2")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Street
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("billingAddress.street", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors?.billingAddress?.street ? (
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    Please enter street.
                  </p>
                ) : null}
              </div>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("billingAddress.city", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors?.billingAddress?.city ? (
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    Please enter city.
                  </p>
                ) : null}
              </div>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                State
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("billingAddress.state", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors?.billingAddress?.state ? (
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    Please enter state.
                  </p>
                ) : null}
              </div>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Country
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("billingAddress.country", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors?.billingAddress?.country ? (
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    Please enter country.
                  </p>
                ) : null}
              </div>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Zip Code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("billingAddress.zipCode", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors?.billingAddress?.zipCode ? (
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    Please enter zipCode.
                  </p>
                ) : null}
              </div>
            </div>

            <div className="col-span-12 text-xl font-medium flex items-center space-x-4">
              <span>Shipping Address</span>{" "}
              <span className="text-sm">Same as billing?</span>
              <input type="checkbox" {...register("shippingSameAsBilling")} />
            </div>

            {sameAsBilling ? null : <ShippingAddress />}

            <div className="col-span-12 text-xl font-medium">Card Details</div>

            <div className="col-span-6 grid sm:grid-cols-12 gap-4">
              <div className="col-span-12">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name on Card
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-12">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Card Number
                </label>
                <div className="mt-2">
                  <input
                    value={cardNumber}
                    onChange={(e) => {
                      if (e.target.value.length < 20) {
                        setCardNumber(e.target.value)
                      }
                    }}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-12 flex space-x-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Expiry Month
                  </label>
                  <div className="mt-2">
                    <select className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      <option value="">--</option>
                      <option>01</option>
                      <option>02</option>
                      <option>03</option>
                      <option>04</option>
                      <option>05</option>
                      <option>06</option>
                      <option>07</option>
                      <option>08</option>
                      <option>09</option>
                      <option>10</option>
                      <option>11</option>
                      <option>12</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Expiry Year
                  </label>
                  <div className="mt-2">
                    <select className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      <option value="">--</option>
                      <option>2024</option>
                      <option>2025</option>
                      <option>2026</option>
                      <option>2027</option>
                      <option>2028</option>
                      <option>2029</option>
                      <option>2030</option>
                      <option>2031</option>
                      <option>2032</option>
                      <option>2033</option>
                      <option>2034</option>
                      <option>2035</option>
                      <option>2036</option>
                      <option>2037</option>
                      <option>2038</option>
                      <option>2039</option>
                      <option>2040</option>
                    </select>
                  </div>
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    CCV
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-6">
              <div className="col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Notes
                </label>
                <div className="mt-2">
                  <textarea
                    {...register("notes")}
                    rows={5}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <button className="w-full mt-4 rounded-md bg-indigo-600 px-2.5 py-3 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Place Order!
                </button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
      <Modal open={open} setOpen={setOpen}>
        <p className="text-center text-2xl font-medium text-green-600">
          Order is Placed!
        </p>
        <p className="text-center text-gray-600">
          Redirecting to home page in 10 seconds
        </p>
      </Modal>
    </div>
  )
}
