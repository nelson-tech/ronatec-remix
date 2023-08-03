import { BeforeChangeHook } from "payload/dist/collections/config/types"
import { Order } from "payload/generated-types"

const updateProductSold: BeforeChangeHook<Order> = async ({
  req,
  data,
  originalDoc,
}) => {
  if (originalDoc?.status === "pending" && data.status === "complete") {
    data.items?.forEach(async (item) => {
      const productId =
        typeof item.product === "object" ? item.product.id : item.product

      const productSold =
        typeof item.product === "object"
          ? item.product.sold ?? 0
          : (
              await req.payload.findByID({
                collection: "products",
                id: productId,
              })
            ).sold ?? 0

      await req.payload.update({
        collection: "products",
        id: productId,
        data: { sold: productSold + item.quantity },
      })
    })
  }
  return data
}

export default updateProductSold
