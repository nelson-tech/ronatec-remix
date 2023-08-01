import { useEffect, useState } from "react"
import { useFetcher } from "@remix-run/react"
import debounce from "lodash.debounce"

import type { Product } from "@org/cms"

const useSearch = () => {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Product[] | undefined>()

  const searchFetcher = useFetcher<{ products: Product[] }>()

  // Set products
  useEffect(() => {
    if (searchFetcher.data?.products) {
      setResults(searchFetcher.data.products)
      setLoading(false)
    }
  })

  const fetchSearchResults = async (search: string) => {
    setLoading(true)
    searchFetcher.submit(
      { search },
      { method: "post", action: "/actions/search", encType: "application/json" }
    )
  }

  const getSearchResults = debounce(fetchSearchResults, 500) as (
    search: string
  ) => Promise<void>

  return { results, loading, getSearchResults }
}

export default useSearch
