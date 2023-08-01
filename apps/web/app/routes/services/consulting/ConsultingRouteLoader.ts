import { Consulting } from "@org/cms"
import { LoaderFunction } from "@remix-run/node"

export const loader: LoaderFunction = async ({
  context: { payload },
}): Promise<Consulting> => {
  const data = await payload.findGlobal({ slug: "consulting" })
  return data
}
