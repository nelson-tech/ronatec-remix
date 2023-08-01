import { LoaderFunction } from "@remix-run/node"
import { Category, Product } from "@org/cms"
import type { PaginatedDocs } from "payload/dist/mongoose/types"

export type LoaderData = {
  categories: Category[] | null
  productsData: PaginatedDocs<Product> | null
}

export const loader: LoaderFunction = async ({
  context: { payload, user },
  request,
}): Promise<LoaderData> => {
  const searchParams = new URL(request.url).searchParams
  const sort = searchParams.get("sort")
  const page = Number.parseInt(searchParams.get("page") ?? "1")

  const data: LoaderData = { categories: null, productsData: null }

  // Get categories
  try {
    const categories = (await payload.find({
      collection: "categories",
      limit: 100,
      where: {
        or: [{ parent: { exists: false } }, { parent: { equals: null } }],
      },
    })) as PaginatedDocs<Category>

    if (categories.totalDocs > 0) {
      data.categories = categories.docs
    }
  } catch (error) {
    console.warn("Error fetching category", error)
  }

  // Get products
  try {
    const productsByCategory = (await payload.find({
      collection: "products",
      page,
      sort: sort ?? undefined,
    })) as PaginatedDocs<Product>

    data.productsData = productsByCategory
  } catch (error) {
    console.warn("Error fetching products", error)
  }

  return data
}
