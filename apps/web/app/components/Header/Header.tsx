import useRootData from "~/lib/hooks/useRootData"
import useScrollDirection from "~/lib/hooks/useScrollDirection"
import Promo from "./Promo"
import MainMenu from "./MainMenu"
import Logo from "./Logo"
import { Link } from "@remix-run/react"
import UserNav from "./UserNav"
import MobileNav from "./MobileNav"

const Header = () => {
  const { scrollDirection, atTop } = useScrollDirection()

  const { menus, promo } = useRootData()
  return (
    <header
      className={`z-30 sticky ${
        scrollDirection === "down" ? "-top-20" : "top-0"
      } transition-all duration-500`}
    >
      {promo && (
        <Promo
          className={`${atTop ? "h-10" : "h-0"} transition-all duration-500`}
        />
      )}
      <nav
        aria-label="Top"
        className="border-b bg-white border-gray-200 w-full"
      >
        <div className="bg-white mx-auto lg:max-w-7xl">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="">
              <div className="h-16 flex items-center justify-between">
                <MobileNav />

                {/* Logo (lg+) */}
                <div className="flex items-center">
                  <Link to="/" className="text-accent">
                    <span className="sr-only">Ronatec C2C, Inc.</span>
                    <Logo />
                  </Link>
                </div>

                <MainMenu />

                {/* Mobile menu and search (lg-) */}

                {/* Logo (lg-) */}
                {/* <div className="h-8 w-8 lg:hidden">
                  <Link to="/" className="text-accent">
                    <span className="sr-only">Ronatec C2C, Inc.</span>
                    <Logo />
                  </Link>
                </div> */}

                <UserNav />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
