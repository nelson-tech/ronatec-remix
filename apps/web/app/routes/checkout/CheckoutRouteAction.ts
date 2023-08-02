import { Cart, Order } from "@org/cms"
import {
  ActionArgs,
  ActionFunction,
  TypedResponse,
  json,
  redirect,
} from "@remix-run/node"
import getFetcherData from "~/lib/utils/getFetcherData"
import { getSession } from "~/sessions"

type CheckoutInput = {
  email: string
  phone?: string
  firstName: string
  lastName: string
  company?: string
}

export const action = async ({
  request,
  context,
}: ActionArgs): Promise<TypedResponse<{ error?: any; order?: Order }>> => {
  const { payload, user } = context
  const fetcherData = await getFetcherData(request)

  const formDataObj: { [key: string]: any } = {}
  fetcherData.formData?.forEach((value, key) => (formDataObj[key] = value))
  const input = formDataObj as CheckoutInput

  console.log("Form Data", formDataObj)

  if (input?.email) {
    const session = await getSession(request.headers.get("Cookie"))

    const cartId = session.data.cartId

    if (cartId) {
      try {
        const cart = (await payload.findByID({
          collection: "carts",
          id: cartId,
        })) as Cart

        if (cart.id) {
          const { email, phone, firstName, lastName, company } = input
          const order: Omit<Order, "id" | "createdAt" | "updatedAt"> = {
            items: cart.items?.map((item) => ({
              ...item,
              product:
                typeof item.product === "object"
                  ? item.product.id
                  : item.product,
            })),
            orderedBy: {
              user: typeof user === "object" ? user.id : user,
              email,
              phone,
              name: { first: firstName, last: lastName },
              company,
            },
            cartId: cart.id,
          }

          try {
            const newOrder = await payload.create({
              collection: "orders",
              data: order,
            })
            console.log("Order", newOrder)

            newOrder.id && redirect(`/thanks?orderId=${newOrder.id}`)

            return json({ order: newOrder })
          } catch (error) {
            console.warn("Error when creating new order", error)

            return json({ error })
          }
        }
      } catch (error) {
        return json({ error })
      }
    }

    return json({ error: "No cart found." })
  }

  return json({ error: "Email is required." })
}
