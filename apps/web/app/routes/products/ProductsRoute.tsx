import { useLoaderData } from "@remix-run/react"
import CategoryLayout from "~/components/Category"
import { LoaderData } from "./ProductsRouteLoader"

const ProductsRoute = () => {
  const { categories, productsData } = useLoaderData<LoaderData>()
  return (
    <CategoryLayout
      categories={categories}
      productsData={productsData}
      isCategories={true}
    />
  )
}

export default ProductsRoute
