import { Category, Product } from "@org/cms"
import Breadcrumbs from "../Breadcrumbs"
import CategorySummary from "./CategorySummary"
import { useRef } from "react"

import type { PaginatedDocs } from "payload/dist/mongoose/types"
import ProductGrid from "../Product/Grid"
import Pagination from "../Pagination"
import Sort from "../Sort"

// ####
// #### Types
// ####

type CategoryPropsType = {
  category: Category | null | undefined
  children: Category[] | null
}

type CategoriesPropsType = {
  categories: Category[] | null | undefined
}

type CategoryLayoutProps = (CategoryPropsType | CategoriesPropsType) & {
  isCategories?: boolean | undefined
  productsData: PaginatedDocs<Product> | null
}

// ####
// #### Component
// ####

const CategoryLayout = ({
  isCategories,
  productsData,
  ...props
}: CategoryLayoutProps) => {
  const productRef = useRef<HTMLDivElement>(null)

  return (
    <main>
      {!isCategories && (
        <Breadcrumbs
          breadcrumbs={(props as CategoryPropsType).category?.breadcrumbs}
        />
      )}
      <CategorySummary
        category={
          isCategories
            ? ({
                title: "Categories",
                id: "",
                createdAt: "",
                updatedAt: "",
              } as Category)
            : (props as CategoryPropsType).category
        }
        main={isCategories}
        children={
          isCategories
            ? (props as CategoriesPropsType).categories
            : (props as CategoryPropsType).children
        }
        productRef={productRef}
      />
      <Sort productRef={productRef} />
      {productsData?.docs && (productsData?.totalDocs ?? 0) > 0 && (
        <div className="products">
          <ProductGrid products={productsData?.docs} />

          {productsData && (
            <Pagination productRef={productRef} pageData={productsData} />
          )}
        </div>
      )}
    </main>
  )
}

export default CategoryLayout
