import { Cart } from "@org/cms"
import { type ActionFunction, json } from "@remix-run/node"
import getCart from "~/lib/utils/getCart"
import getFetcherData from "~/lib/utils/getFetcherData"
import { getSession } from "~/sessions"

type AddToCartInput = { product: string } | null

// type MergeCartItemsInputType = {
//   newItems: Exclude<Cart["items"], undefined>
//   existingItems: Exclude<Cart["items"], undefined>
// }

// type MergeCartItemsType = (args: MergeCartItemsInputType) => Cart["items"]

// const mergeCartItems: MergeCartItemsType = ({ newItems, existingItems }) => {
//   let mergedItems = new Map<string, Exclude<Cart["items"], undefined>[0]>()
//   ;[...newItems, ...existingItems].forEach((item) => {
//     const productID =
//       typeof item.product === "object" ? item.product.id : item.product

//     mergedItems.has(productID)
//       ? mergedItems.set(productID, {
//           ...item,
//           product: productID,
//           quantity: (mergedItems.get(productID)?.quantity ?? 0) + item.quantity,
//         })
//       : mergedItems.set(productID, { ...item, product: productID })
//   })

//   return Array.from(mergedItems.values())
// }

export const action: ActionFunction = async ({ request, context }) => {
  const { payload } = context
  const fetcherData = await getFetcherData(request)
  const input: AddToCartInput = fetcherData.json

  if (input?.product) {
    const session = await getSession(request.headers.get("Cookie"))

    const cartId = session.data.cartId

    if (cartId) {
      try {
        const previousCart = await getCart(context, cartId)

        const filteredItems = previousCart?.items?.filter((item) => {
          return item.product !== input?.product
        })

        const updatedCart = (await payload.update({
          collection: "carts",
          id: cartId,
          data: {
            items: filteredItems,
          },
        })) as Cart

        return json({ cart: updatedCart })
      } catch (error) {
        return json({ error })
      }
    } else {
      // Create guest cart and cookie
    }

    return json({ error: "No cart ID found" })
  }

  return json({ error: "No cart data provided for update." })
}
