import { Menu, Popover } from "@headlessui/react"
import { MainMenuLink as MainMenuLinkType, NavLink } from "@org/cms"
import { Link, useMatches } from "@remix-run/react"

type PropsType = {
  menuItem: MainMenuLinkType[0]
  open?: boolean
  children?: React.ReactNode
  button?: boolean
  mega?: boolean
}

const MainMenuLink = ({
  menuItem,
  open = false,
  button = false,
  mega = false,
  children,
}: PropsType) => {
  const { id, link } = menuItem
  const matches = useMatches()

  const path = matches.map((match) => match.pathname).join("/")

  const linkUrl =
    link.type === "reference" && typeof link.reference.value === "object"
      ? link.reference.value.slug ?? "/"
      : link?.url ?? "/"

  const Wrapper = button ? Menu.Button : mega ? Popover.Button : Link

  return (
    <div className="relative flex">
      <Wrapper
        to={linkUrl}
        title={link.label}
        className={`transition-colors ease-out duration-200 py-2 px-3 rounded outline-none ${
          open || linkUrl === path ? "bg-gray-100" : "hover:bg-gray-100"
        } text-gray-900 font-medium inline-flex items-center`}
      >
        {link.label}
        {children}
      </Wrapper>
    </div>
  )
}

export default MainMenuLink
