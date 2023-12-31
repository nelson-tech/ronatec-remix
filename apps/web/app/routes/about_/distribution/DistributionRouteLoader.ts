import { LoaderFunction } from "@remix-run/node"

export const loader: LoaderFunction = async ({ context: { payload } }) => {
  const data = await payload.find({ collection: "suppliers", limit: 999 })

  return data.docs
}
