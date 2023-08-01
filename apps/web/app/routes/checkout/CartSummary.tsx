import useStore from "~/lib/hooks/useStore"

import CartItem from "~/components/Modals/CartSlider/CartItem"
import useCart from "~/lib/hooks/useCart"

// ####
// #### Component
// ####

const CartSummary = () => {
  const { lineItems, setOpen, setCartLoading } = useStore((state) => ({
    lineItems: state.cart.state?.items,
    setOpen: state.cart.setOpen,
    setCartLoading: state.cart.setLoading,
  }))

  const { removeFromCart } = useCart()

  return (
    <>
      {lineItems &&
        lineItems.map((lineItem) => {
          if (lineItem)
            return (
              <CartItem
                lineItem={lineItem}
                key={lineItem.id}
                removeFromCart={removeFromCart}
                setOpen={setOpen}
                setCartLoading={setCartLoading}
              />
            )
        })}
    </>
  )
}

export default CartSummary
