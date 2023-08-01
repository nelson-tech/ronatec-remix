import { ActionFunction, json } from "@remix-run/node"
import getFetcherData from "~/lib/utils/getFetcherData"

type SearchInput = {
  search: string
}

export const action: ActionFunction = async ({ request, context }) => {
  const { payload } = context
  const fetcherData = await getFetcherData(request)
  const input: SearchInput = fetcherData.json

  if (input.search) {
    const products = (
      await payload.find({
        collection: "products",
        where: { title: { like: input.search } },
      })
    ).docs

    if (products) return json({ products })

    return json({ error: "No products found" })
  }

  return json({ error: "No search term supplied" })
}
