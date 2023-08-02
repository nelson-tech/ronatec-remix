import { Order } from "@org/cms"
import { LoaderFunction } from "@remix-run/node"

export type LoaderData = {
  order: Order | null
}
export const loader: LoaderFunction = async ({
  request,
  context,
}): Promise<LoaderData> => {
  const searchParams = new URL(request.url).searchParams
  const orderId = searchParams.get("orderId")

  let order: Order | null = null

  if (orderId) {
    const orderData = await context.payload.findByID({
      collection: "orders",
      id: orderId,
    })

    if (orderData.id) {
      order = orderData
    }
  }

  return { order }
}
