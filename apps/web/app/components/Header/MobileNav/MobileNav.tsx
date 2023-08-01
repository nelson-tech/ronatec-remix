import { Bars3Icon } from "@heroicons/react/24/outline"

import useStore from "~/lib/hooks/useStore"

// ####
// #### Component
// ####

const MobileNav = () => {
  const { setMobileMenuOpen } = useStore((state) => ({
    setMobileMenuOpen: state.ui.setMobileMenuOpen,
    setSearchOpen: state.ui.setSearchOpen,
  }))
  return (
    <>
      <div className="flex-1 flex items-center lg:hidden">
        <button
          type="button"
          className="-ml-2 bg-white p-2 rounded text-gray-400"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only focus:text-white">Open menu</span>
          <Bars3Icon className="w-6" />
        </button>
      </div>
    </>
  )
}

export default MobileNav
