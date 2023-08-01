import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import useStore from "~/lib/hooks/useStore"

// ####
// #### Component
// ####

const SearchButton = () => {
  const setSearchOpen = useStore((state) => state.ui.setSearchOpen)
  return (
    <>
      <div
        onClick={() => setSearchOpen(true)}
        className="-m-2 mr-2 p-2 text-gray-400 hover:text-gray-500 cursor-pointer"
      >
        <span className="sr-only">Search</span>
        <MagnifyingGlassIcon className="w-6 h-6" aria-hidden="true" />
      </div>
    </>
  )
}

export default SearchButton
