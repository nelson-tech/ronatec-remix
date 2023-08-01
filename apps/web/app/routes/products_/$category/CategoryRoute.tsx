import { useLoaderData, useMatches } from "@remix-run/react"
import { LoaderData } from "./CategoryRouteLoader"
import { useRef } from "react"
import CategoryLayout from "~/components/Category"

const CategoryRoute = () => {
  const { category, children, productsData } = useLoaderData<LoaderData>()
  const productRef = useRef<HTMLDivElement>(null)

  //

  return (
    <CategoryLayout
      category={category}
      isCategories={false}
      productsData={productsData}
      children={children}
    />
  )
}

export default CategoryRoute
