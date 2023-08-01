import { Cart } from "@org/cms"
import { StateCreator } from "zustand"

export type CartSliceType = typeof initialState & {
  cart: {
    setOpen: (open: boolean) => void
    setCart: (cart: Cart | null) => void
    setLoading: (loading: boolean) => void
    setSessionError: (error: string | null) => void
  }
}

export const initialState = {
  cart: {
    open: false,
    state: null as Cart | null,
    loading: false,
    errors: {
      session: null as string | null,
      adding: null as string | null,
      removing: null as string | null,
      clearing: null as string | null,
    },
  },
}

const createCartSlice = (
  defaultValues?: Partial<(typeof initialState)["cart"]> | undefined
): StateCreator<CartSliceType, [], []> => {
  return (set) => ({
    cart: {
      ...initialState.cart,
      ...defaultValues,
      setOpen: (open) => set((state) => ({ cart: { ...state.cart, open } })),
      setCart: (cart) =>
        set((state) => ({ cart: { ...state.cart, state: cart } })),
      setLoading: (loading) =>
        set((state) => ({ cart: { ...state.cart, loading } })),
      setSessionError: (error) =>
        set((state) => ({
          cart: {
            ...state.cart,
            errors: { ...state.cart.errors, session: error },
          },
        })),
    },
  })
}

export default createCartSlice
