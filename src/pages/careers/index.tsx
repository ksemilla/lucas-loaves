import { useState } from "react"
import { ApplyForm } from "../../components/ApplyForm"

const people = [
  {
    name: "Baker",
    role: "Senior Designer",
    imageUrl:
      "https://source.unsplash.com/man-wearing-white-polo-shirt-CceG6jpl19M/",
    bio: "Quia illum aut in beatae. Possimus dolores aliquid accusantium aut in ut non assumenda. Enim iusto molestias aut deleniti eos aliquid magnam molestiae. At et non possimus ab. Magni labore molestiae nulla qui.",
  },
  {
    name: "Bakery Assistant",
    role: "Senior Designer",
    imageUrl:
      "https://source.unsplash.com/waist-up-portrait-view-of-the-female-baker-taking-tray-with-balls-from-the-dough-and-preparing-to-putting-it-to-the-oven-while-making-future-cookies-at-the-kitchen-with-her-colleague-coolinary-concept-stock-photo-udRIpHjCurY/",
    bio: "Quia illum aut in beatae. Possimus dolores aliquid accusantium aut in ut non assumenda. Enim iusto molestias aut deleniti eos aliquid magnam molestiae. At et non possimus ab. Magni labore molestiae nulla qui.",
  },
  {
    name: "Pastry Cook",
    role: "Senior Designer",
    imageUrl:
      "https://source.unsplash.com/selective-focus-photography-of-woman-putting-icing-on-cupcakes-XTHa-47HjjI/",
    bio: "Quia illum aut in beatae. Possimus dolores aliquid accusantium aut in ut non assumenda. Enim iusto molestias aut deleniti eos aliquid magnam molestiae. At et non possimus ab. Magni labore molestiae nulla qui.",
  },
  // More people...
]

export function CareersPage() {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState("Baker")
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Join our team!
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We’re a dynamic group of individuals who are passionate about what
            we do and dedicated to delivering the best results for our clients.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:max-w-4xl lg:gap-x-8 xl:max-w-none"
        >
          {people.map((person) => (
            <li key={person.name} className="flex flex-col gap-6 xl:flex-row">
              <img
                className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover"
                src={person.imageUrl}
                alt=""
              />
              <div className="flex-auto">
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                  {person.name}
                </h3>
                {/* <p className="text-base leading-7 text-gray-600">
                  {person.role}
                </p> */}
                <p className="mt-6 text-base leading-7 text-gray-600">
                  {person.bio}
                </p>
                <div
                  className="mt-4 cursor-pointer text-blue-500 hover:text-blue-700"
                  onClick={() => {
                    setOpen(true)
                    setPosition(person.name)
                  }}
                >
                  Apply here <span aria-hidden="true">→</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ApplyForm setOpen={setOpen} position={position} open={open} />
    </div>
  )
}
