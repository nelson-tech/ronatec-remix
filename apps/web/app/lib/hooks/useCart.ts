import { useFetcher } from "@remix-run/react"
import useStore from "./useStore"
import { Cart } from "@org/cms"
import { useEffect } from "react"
import { AddToCartInput } from "~/routes/actions/cart/add/addToCartAction"

const useCart = () => {
  const { state, setCart, setLoading, setOpen } = useStore(
    (stores) => stores.cart
  )

  const cartFetcher = useFetcher<{ cart: Cart | null }>()

  // Update cart state
  useEffect(() => {
    if (cartFetcher.data && Object.keys(cartFetcher.data).includes("cart")) {
      setCart(cartFetcher.data.cart)
      setLoading(false)
    }
  }, [cartFetcher.data])

  // Update cart loading
  // useEffect(() => {
  //   setLoading(cartFetcher.state === "loading")
  // }, [cartFetcher])

  const fetchCart = async () => {
    setLoading(true)

    console.log("Fetching cart")

    cartFetcher.submit(
      {},
      {
        method: "post",
        action: "/actions/cart/fetch",
        encType: "application/json",
      }
    )
  }

  const addToCart = async (items: AddToCartInput) => {
    setLoading(true)

    cartFetcher.submit(items, {
      method: "post",
      action: "/actions/cart/add",
      encType: "application/json",
    })
  }

  const removeFromCart = async (item: { product: string }) => {
    setLoading(true)

    cartFetcher.submit(item, {
      method: "post",
      action: "/actions/cart/remove",
      encType: "application/json",
    })
    console.log("Removed")
  }

  const clearCart = async () => {
    setLoading(true)

    cartFetcher.submit(
      {},
      {
        method: "post",
        action: "/actions/cart/clear",
        encType: "application/json",
      }
    )
  }

  return { cart: state, addToCart, removeFromCart, clearCart, fetchCart }
}

export default useCart
