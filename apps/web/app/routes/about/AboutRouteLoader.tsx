import { About } from "@org/cms"
import { LoaderFunction } from "@remix-run/node"

export const loader: LoaderFunction = async ({
  context: { payload },
}): Promise<About> => {
  const data = await payload.findGlobal({ slug: "about" })

  return data
}
