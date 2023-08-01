import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import ChevronDownIcon from "@heroicons/react/20/solid/ChevronDownIcon"

import { Menu as MainMenu } from "@org/cms"
import { Link, useMatches } from "@remix-run/react"
import MainMenuLink from "../MainMenuLink"

// ####
// #### Types
// ####

type DropdownProps = {
  menuItem: Exclude<MainMenu["mainMenu"]["links"], undefined>[0]
}

// ####
// #### Component
// ####

const Dropdown = ({ menuItem }: DropdownProps) => {
  const { link } = menuItem

  const matches = useMatches()

  const path = matches.map((match) => match.pathname).join("/")

  const linkUrl = link.url ?? "/"

  return (
    <Menu as="div" className="relative h-full">
      {({ open }) => (
        <>
          <MainMenuLink menuItem={menuItem} open={open} button={true}>
            <ChevronDownIcon
              className={`transition ml-1 w-4 h-4 ${
                open && "transform rotate-180"
              } text-gray-400`}
            />
          </MainMenuLink>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="z-40 origin-top absolute -left-1/2 pt-2 w-64">
              <Menu.Items className="rounded bg-white outline-none overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 z-40">
                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}

                {link.children &&
                  link.children.map((childLink) => {
                    return (
                      <Menu.Item
                        key={childLink?.id}
                        as={Link}
                        to={childLink?.url ?? ""}
                        title={childLink?.label ?? undefined}
                        className="transition hover:bg-accent hover:text-white text-gray-700 block px-4 py-2 text-sm ring-transparent outline-none"
                      >
                        {childLink?.label}
                      </Menu.Item>
                    )
                  })}
              </Menu.Items>
            </div>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export default Dropdown
