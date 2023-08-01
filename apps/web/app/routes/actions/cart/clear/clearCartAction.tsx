import { Cart } from "@org/cms"
import { ActionFunction, json } from "@remix-run/node"
import { getSession } from "~/sessions"

export const action: ActionFunction = async ({ request, context }) => {
  const { payload } = context

  const session = await getSession(request.headers.get("Cookie"))

  const cartId = session.data.cartId

  if (cartId) {
    const updatedCart = (await payload.update({
      collection: "carts",
      id: cartId,
      data: { items: [] },
    })) as Cart

    return json({ cart: updatedCart })
  }

  return json({ error: "No cart ID found" })
}
