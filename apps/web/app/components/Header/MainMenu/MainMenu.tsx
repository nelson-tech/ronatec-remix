import { Popover } from "@headlessui/react"

import useRootData from "~/lib/hooks/useRootData"

import MegaMenu from "./MegaMenu"
import Dropdown from "./Dropdown"
import MainMenuLink from "./MainMenuLink"

// ####
// #### Types
// ####

type DesktopLinkStyleProps = {
  open: boolean
  path: string
}

export type GetDesktopLinkStyleType = ({
  open,
  path,
}: DesktopLinkStyleProps) => string

// ####
// #### Component
// ####

const MainMenu = () => {
  const { menus } = useRootData()

  return (
    <>
      {menus?.mainMenu.links && (
        <div className="hidden h-full lg:flex items-center">
          {/* Mega menus */}
          <Popover.Group className="ml-8">
            <div className="h-full flex items-center space-x-2 text-sm font-medium text-gray-600">
              {menus?.mainMenu.links.map((menuItem) => {
                const { link, id } = menuItem

                if (link.children && link.children.length > 0) {
                  if (link?.megaMenu) {
                    // Mega Menu Column
                    return <MegaMenu megaItem={menuItem} key={id} />
                  } else {
                    return <Dropdown menuItem={menuItem} key={id} />
                  }
                } else {
                  return (
                    link?.label && <MainMenuLink menuItem={menuItem} key={id} />
                  )
                }
              })}
            </div>
          </Popover.Group>
        </div>
      )}
    </>
  )
}

export default MainMenu
