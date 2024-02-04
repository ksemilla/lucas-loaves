import { Fragment, useEffect } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { Controller, useForm } from "react-hook-form"
import { Application, useApplicationStore } from "../stores/common"

type ApplyFormProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  position: string
}

export function ApplyForm(props: ApplyFormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<Application>()

  const applicationStore = useApplicationStore()

  const onSubmit = handleSubmit((data) => {
    applicationStore.addApplication({ ...data, position: props.position })
  })

  useEffect(() => {
    if (!props.open) {
      reset({
        name: "",
        email: "",
        coverLetter: null,
        resume: null,
      })
    }
  }, [props.open, reset])

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={props.setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md ">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl ">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-base bg-white font-semibold leading-6 text-gray-900">
                          Applying for {props.position}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => props.setOpen(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <div className="mt-8">
                        <div className="flow-root">
                          <form onSubmit={onSubmit}>
                            <div>
                              <label
                                htmlFor="name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  placeholder="Enter name"
                                  {...register("name", {
                                    required: "This field is required",
                                  })}
                                />
                              </div>
                              {errors?.name ? (
                                <p
                                  className="mt-2 text-sm text-red-600"
                                  id="email-error"
                                >
                                  Please enter your name.
                                </p>
                              ) : null}
                            </div>
                            <div>
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Email
                              </label>
                              <div className="mt-2">
                                <input
                                  type="email"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  placeholder="Enter name"
                                  {...register("email", {
                                    required: "This field is required",
                                  })}
                                />
                              </div>
                              {errors?.email ? (
                                <p
                                  className="mt-2 text-sm text-red-600"
                                  id="email-error"
                                >
                                  Please enter your email.
                                </p>
                              ) : null}
                            </div>
                            <div>
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Cover Letter
                              </label>
                              <div className="mt-2">
                                <Controller
                                  control={control}
                                  name="coverLetter"
                                  rules={{ required: "This field is required" }}
                                  render={({
                                    field: { value, onChange, ...field },
                                  }) => {
                                    return (
                                      <input
                                        {...field}
                                        type="file"
                                        // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Enter name"
                                        value={value?.fileName}
                                        onChange={(e) => {
                                          if (e.target.files) {
                                            onChange(e.target?.files[0])
                                          }
                                        }}
                                      />
                                    )
                                  }}
                                />
                              </div>
                              {errors?.coverLetter ? (
                                <p
                                  className="mt-2 text-sm text-red-600"
                                  id="email-error"
                                >
                                  Please upload cover letter.
                                </p>
                              ) : null}
                            </div>
                            <div>
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Resume
                              </label>
                              <div className="mt-2">
                                <Controller
                                  control={control}
                                  name="resume"
                                  rules={{ required: "This field is required" }}
                                  render={({
                                    field: { value, onChange, ...field },
                                  }) => {
                                    return (
                                      <input
                                        {...field}
                                        type="file"
                                        // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Enter name"
                                        value={value?.fileName}
                                        onChange={(e) => {
                                          if (e.target.files) {
                                            onChange(e.target?.files[0])
                                          }
                                        }}
                                      />
                                    )
                                  }}
                                />
                              </div>
                              {errors?.resume ? (
                                <p
                                  className="mt-2 text-sm text-red-600"
                                  id="email-error"
                                >
                                  Please upload your resume.
                                </p>
                              ) : null}
                            </div>
                            <button className="mt-4 rounded-md bg-indigo-600 px-2.5 py-3 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                              Submit
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
