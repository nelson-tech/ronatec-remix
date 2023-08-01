import useStore from "~/lib/hooks/useStore"

import ProductCard from "./ProductCard"
import { Product } from "@org/cms"

// ####
// #### Types
// ####

type PropsType = {
  products: Product[]
}

// ####
// #### Component
// ####

const ProductGrid = ({ products }: PropsType) => {
  const viewMode = useStore((state) => state.shop.viewMode)

  return (
    <>
      <div className="py-6 px-8 mx-auto lg:max-w-7xl">
        <div className="">
          <h2 id="product-heading" className="sr-only">
            Products
          </h2>

          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-2 gap-y-4 gap-x-2 md:gap-x-4 md:gap-y-10 md:grid-cols-3 lg:gap-x-4 lg:grid-cols-4"
                : "flex flex-col divide-y"
            }
          >
            {products &&
              products.map((product) => {
                if (product) {
                  return <ProductCard product={product} key={product.id} />
                }
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductGrid
