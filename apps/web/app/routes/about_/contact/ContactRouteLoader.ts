import { Contact } from "@org/cms"
import { LoaderFunction } from "@remix-run/node"

export type LoaderData = {
  data: Contact
}

export const loader: LoaderFunction = async ({
  context: { payload },
}): Promise<LoaderData> => {
  const data = await payload.findGlobal({ slug: "contact" })
  return { data }
}
