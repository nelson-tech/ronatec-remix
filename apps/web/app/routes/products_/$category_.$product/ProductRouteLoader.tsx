import { Category, Product } from "@org/cms"
import { LoaderFunction } from "@remix-run/node"
import type { PaginatedDocs } from "payload/dist/mongoose/types"

export type LoaderData = {
  product: Product | null
  breadcrumbs: Category["breadcrumbs"]
}

const loader: LoaderFunction = async ({
  params,
  context: { payload },
}): Promise<LoaderData> => {
  let product: Product | null = null

  if (params.product) {
    try {
      const products = (await payload.find({
        collection: "products",
        where: { slug: { equals: params.product } },
      })) as PaginatedDocs<Product>

      products?.docs?.length > 0 && (product = products.docs[0])

      if (product?.categories && (product.categories.length ?? 0) > 0) {
      } else {
      }
    } catch (error) {
      console.warn("Error fetching product", error)
    }
  }

  const firstCategory =
    product?.categories && product.categories.length > 0
      ? product.categories[0]
      : null

  const breadcrumbs =
    typeof firstCategory === "object" ? firstCategory?.breadcrumbs : undefined

  return { product, breadcrumbs }
}

export default loader
