import { Application, useApplicationStore } from "../../stores/common"
import { StatusBadge } from "../../components/StatusBadge"

function ApplicatinInline(props: { application: Application }) {
  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
        {props.application.name}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {props.application.email}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 cursor-pointer hover:text-blue-500">
        {props.application.coverLetter.name}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 cursor-pointer hover:text-blue-500">
        {props.application.resume.name}
      </td>
    </tr>
  )
}

function ApplicationList(props: { applications: Application[] }) {
  return props.applications.map((order, idx) => (
    <ApplicatinInline key={idx} application={order} />
  ))
}

export function ApplicationPage() {
  const applicationStore = useApplicationStore()
  return (
    <div className="pt-14 max-w-7xl m-auto px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Applications
          </h1>
        </div>
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
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Cover Letter
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Resume
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  ></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <ApplicationList applications={applicationStore.applications} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
