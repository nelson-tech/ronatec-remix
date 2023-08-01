import { Category, Product } from "@org/cms"
import { LoaderFunction } from "@remix-run/node"
import type { PaginatedDocs } from "payload/dist/mongoose/types"

export type LoaderData = {
  productsData: PaginatedDocs<Product> | null
  category: Category | null
  childIds: (string | null)[]
  children: Category[] | null
}

const loader: LoaderFunction = async ({
  params,
  request,
  context: { payload },
}): Promise<LoaderData> => {
  const searchParams = new URL(request.url).searchParams
  const sort = searchParams.get("sort")
  const page = Number.parseInt(searchParams.get("page") ?? "1")

  // find children
  const findChildren = async (
    categoryId: string
  ): Promise<(string | null)[]> => {
    const childMatches = (await payload.find({
      collection: "categories",
      where: { parent: { equals: categoryId } },
    })) as PaginatedDocs<Category>

    let childIds: (string | null)[] = []

    childMatches.docs.forEach((child) => {
      findChildren(child.id).then(
        (children) => (childIds = childIds.concat(children))
      )

      childIds.push(child.id)
    })
    return childIds
  }

  const data: LoaderData = {
    category: null,
    productsData: null,
    children: null,
    childIds: [],
  }

  if (params.category) {
    try {
      const categories = (await payload.find({
        collection: "categories",
        where: { slug: { equals: params.category } },
      })) as PaginatedDocs<Category>

      const category = categories?.docs?.length > 0 && categories.docs[0]

      if (category) {
        data.category = category
        const childMatches = (await payload.find({
          collection: "categories",
          where: { parent: { equals: category.id } },
        })) as PaginatedDocs<Category>
        data.children = childMatches.docs

        data.childIds = await findChildren(category.id)
      }
    } catch (error) {
      console.warn("Error fetching category", error)
    }
  }

  if (data.category) {
    try {
      const productsByCategory = (await payload.find({
        collection: "products",
        where: { categories: { in: [data.category.id, ...data.childIds] } },
        page,
        sort: sort ?? undefined,
      })) as PaginatedDocs<Product>

      data.productsData = productsByCategory
    } catch (error) {
      console.warn("Error fetching products", data.category, error)
    }
  }
  return data
}

export default loader
