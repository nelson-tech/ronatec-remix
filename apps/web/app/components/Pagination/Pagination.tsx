import { RefObject } from "react"

import useStore from "~/lib/hooks/useStore"
import { Product } from "@org/cms"
import { PaginatedDocs } from "payload/dist/mongoose/types"
import { useSearchParams } from "@remix-run/react"

// ####
// #### Types
// ####

export type PaginationType = {
  page?: number
  per_page?: number
}

export const defaultProductsPerPage = 12

export const defaultPagination: PaginationType = {
  per_page: defaultProductsPerPage,
  page: 1,
}

type PropsType = {
  // setPagination: (pagination: PaginationType) => void
  pageData: Omit<PaginatedDocs<Product>, "docs"> | null
  productRef: RefObject<HTMLDivElement>
  // productCount: number
  // perPage: number
}

// ####
// #### Component
// ####

const Pagination = ({ pageData, productRef }: PropsType) => {
  const productsPerPage = useStore((state) => state.shop.productsPerPage)

  const [params, setParams] = useSearchParams()

  const scrollIntoView = () => {
    window.scrollTo({
      behavior: "smooth",
      top:
        productRef.current!.getBoundingClientRect().top -
        document.body.getBoundingClientRect().top -
        55,
    })
  }

  const handleNext = () => {
    setParams(
      {
        ...Object.fromEntries(params.entries()),
        page: ((pageData?.page ?? 1) + 1).toString(),
      },
      { preventScrollReset: true }
    )

    scrollIntoView()
  }

  const handlePrevious = () => {
    setParams(
      {
        ...Object.fromEntries(params.entries()),
        page: ((pageData?.page ?? 1) - 1).toString(),
      },
      { preventScrollReset: true }
    )

    scrollIntoView()
  }
  return (
    <>
      <nav
        className="bg-white px-6 py-6 flex items-center justify-between border-t border-gray-200"
        aria-label="Pagination"
      >
        <div className="flex-1 flex justify-end mr-2">
          {pageData?.hasPrevPage && (
            <button
              onClick={handlePrevious}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
          )}
          {pageData?.hasNextPage && (
            <button
              onClick={handleNext}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          )}
        </div>
      </nav>
    </>
  )
}

export default Pagination
