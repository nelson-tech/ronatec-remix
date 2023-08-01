import { useLoaderData } from "@remix-run/react"
import Breadcrumbs from "~/components/Breadcrumbs/Breadcrumbs"
import type { LoaderData } from "./ProductRouteLoader"
import ProductDetails from "~/components/Product/Details/ProductDetails"

const ProductRoute = () => {
  const { product, breadcrumbs } = useLoaderData<LoaderData>()
  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} product={product} />
      <ProductDetails product={product} />
    </div>
  )
}

export default ProductRoute
