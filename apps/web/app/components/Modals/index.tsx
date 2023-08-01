import CartSlider from "./CartSlider"
import LoginModal from "./LoginModal"
import MobileMenu from "./MobileMenu"
import SearchModal from "./SearchModal"

// ####
// #### Component
// ####

const Modals = () => {
  return (
    <>
      <MobileMenu />
      <SearchModal />
      <LoginModal />
      <CartSlider />
    </>
  )
}

export default Modals
