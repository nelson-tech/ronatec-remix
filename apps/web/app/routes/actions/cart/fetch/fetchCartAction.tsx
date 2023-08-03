import { Cart } from "@org/cms"
import { ActionFunction, json } from "@remix-run/node"
import { getSession } from "~/sessions"

export const action: ActionFunction = async ({ request, context }) => {
  const { payload } = context

  const session = await getSession(request.headers.get("Cookie"))

  const cartId = session.data.cartId

  if (cartId) {
    const cart = (await payload.findByID({
      collection: "carts",
      id: cartId,
    })) as Cart

    return json({ cart })
  }

  return json({ error: "No cart ID found", cart: null })
}
