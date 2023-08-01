import { type ActionFunction, json } from "@remix-run/node"

import type { Cart, ProductItems } from "@org/cms"
import getCart from "~/lib/utils/getCart"
import getFetcherData from "~/lib/utils/getFetcherData"
import { commitSession, getSession } from "~/sessions"

export type AddToCartInput =
  | { product: string; quantity: number; title: string; price: string }[]
  | null

type MergeCartItemsInputType = {
  newItems: ProductItems
  existingItems: ProductItems
}

type MergeCartItemsType = (args: MergeCartItemsInputType) => ProductItems

const mergeCartItems: MergeCartItemsType = ({ newItems, existingItems }) => {
  let mergedItems = new Map<string, ProductItems[0]>()
  ;[...newItems, ...existingItems].forEach((item) => {
    const productID =
      typeof item.product === "object" ? item.product.id : item.product

    mergedItems.has(productID)
      ? mergedItems.set(productID, {
          ...item,
          product: productID,
          quantity: (mergedItems.get(productID)?.quantity ?? 0) + item.quantity,
        })
      : mergedItems.set(productID, { ...item, product: productID })
  })

  return Array.from(mergedItems.values())
}

export const action: ActionFunction = async ({ request, context }) => {
  const { payload, user } = context
  const fetcherData = await getFetcherData(request)
  const input: AddToCartInput = fetcherData.json

  if (input && input.length > 0) {
    const session = await getSession(request.headers.get("Cookie"))

    const cartId = session.data.cartId

    if (cartId) {
      try {
        const previousCart = await getCart(context, cartId)
        const previousItems = previousCart?.items

        const mergedItems = mergeCartItems({
          newItems: input,
          existingItems: previousItems ?? [],
        })

        const updatedCart = (await payload.update({
          collection: "carts",
          id: cartId,
          data: {
            items: mergedItems,
          },
        })) as Cart

        return json({ cart: updatedCart })
      } catch (error) {
        return json({ error })
      }
    } else {
      // Create guest cart and cookie

      try {
        const newCart = (await payload.create({
          collection: "carts",
          data: { items: input },
        })) as Cart

        if (newCart.id) {
          console.log("New cart", newCart, await commitSession(session))

          session.set("cartId", newCart.id)

          return json(
            { cart: newCart },
            { headers: { "Set-Cookie": await commitSession(session) } }
          )
        }

        return json({ error: "Error creating guest cart." })
      } catch (error) {
        return json({ error })
      }
    }
  }

  return json({ error: "No cart data provided for update." })
}
