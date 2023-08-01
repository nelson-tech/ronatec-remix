import CartButton from "./CartButton"
import SearchButton from "./SearchButton"

// ####
// #### Component
// ####

const UserNav = () => {
  return (
    <>
      <div className="flex-1 flex items-center justify-end">
        <div className="flex items-center ">
          <SearchButton />

          <div className="ml-4">
            <CartButton />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserNav
