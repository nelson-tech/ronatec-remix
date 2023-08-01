import type { Cart, User } from "@org/cms"
import StoreProvider from "./StoreProvider"
import { initialState as defaultAuthState } from "./slices/auth"
import { initialState as defaultCartState } from "./slices/cart"

type StoreContextPropsType = {
  children: React.ReactNode
  user: User | null
  cart: Cart | null | undefined
}

const StoreContext = ({ children, user, cart }: StoreContextPropsType) => {
  const initialAuth: (typeof defaultAuthState)["auth"] = {
    ...defaultAuthState.auth,
    user: user ?? null,
    loggedIn: !!user?.id,
  }

  const initialCart: (typeof defaultCartState)["cart"] = {
    ...defaultCartState.cart,
    state: cart ?? null,
  }

  return (
    <>
      <StoreProvider auth={initialAuth} cart={initialCart}>
        {children}
      </StoreProvider>
    </>
  )
}

export default StoreContext
