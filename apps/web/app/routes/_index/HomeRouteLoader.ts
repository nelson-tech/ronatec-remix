import { Category, Home, Product } from "@org/cms"
import { LoaderFunction } from "@remix-run/node"

export type LoaderData = {
  topSellers: Product[] | null
  home: Home | null
}
export const loader: LoaderFunction = async ({
  context: { payload },
}): Promise<LoaderData> => {
  const topSellersData = await payload.find({
    collection: "products",
    limit: 8,
    sort: "sold",
  })

  const home = (await payload.findGlobal({ slug: "home" })) as Home

  return {
    topSellers: topSellersData.docs,
    home,
  }
}
