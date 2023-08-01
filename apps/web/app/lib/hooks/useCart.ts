import { useFetcher } from "@remix-run/react"
import useStore from "./useStore"
import { Cart } from "@org/cms"
import { useEffect } from "react"
import { AddToCartInput } from "~/routes/actions/cart/add/addToCartAction"

const useCart = () => {
  const { state, setCart, setLoading, setOpen } = useStore(
    (stores) => stores.cart
  )

  const cartFetcher = useFetcher<{ cart: Cart }>()

  // Update cart state
  useEffect(() => {
    if (cartFetcher.data?.cart) {
      setCart(cartFetcher.data.cart)
      setLoading(false)
    }
  }, [cartFetcher.data])

  // Update cart loading
  // useEffect(() => {
  //   setLoading(cartFetcher.state === "loading")
  // }, [cartFetcher])

  const addToCart = async (items: AddToCartInput) => {
    await setLoading(true)

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

  return { cart: state, addToCart, removeFromCart, clearCart }
}

export default useCart
