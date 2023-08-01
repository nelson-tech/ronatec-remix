import { LoaderArgs } from "@remix-run/node"
import type { Cart } from "@org/cms"

const getCart = async (
  context: LoaderArgs["context"],
  cartId: string | null = null
) => {
  const { payload } = context

  if (cartId) {
    try {
      const cart = (await payload
        .findByID({
          collection: "carts",
          id: cartId,
          depth: 0,
        })
        .catch((e) => e)) as Cart | null

      if (cart) return cart

      return null
    } catch (error) {
      console.warn(
        "No cart found. Either an issue with cart ID or authentication."
      )
    }
  }

  return null
}

export default getCart
