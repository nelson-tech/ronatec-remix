import { Product } from "@org/cms"
import { StateCreator } from "zustand"

export type SortOptionType = {
  name: string
  id: { orderby: keyof Product | undefined; order: "" | "-" }
}

export const sortOptions: SortOptionType[] = [
  { name: "Default", id: { orderby: undefined, order: "" } },
  { name: "A - Z", id: { orderby: "title", order: "" } },
  { name: "Z - A", id: { orderby: "title", order: "-" } },
  { name: "Newest", id: { orderby: "createdAt", order: "-" } },
  { name: "Oldest", id: { orderby: "createdAt", order: "" } },
]

export type ShopSliceType = typeof initialState & {
  shop: {
    setViewMode: (viewMode: "grid" | "list") => void
    setGlobalSort: (selectedSort: SortOptionType) => void
    setProductsPerPage: (productsPerPage: number) => void
  }
}

export const initialState = {
  shop: {
    viewMode: "list" as "grid" | "list",
    selectedSort: sortOptions[0],
    productsPerPage: 12,
  },
}

const createShopSlice: StateCreator<ShopSliceType, [], []> = (set) => ({
  shop: {
    ...initialState.shop,
    setViewMode: (viewMode) =>
      set((state) => ({ shop: { ...state.shop, viewMode } })),
    setGlobalSort: (selectedSort) =>
      set((state) => ({ shop: { ...state.shop, selectedSort } })),
    setProductsPerPage: (productsPerPage) =>
      set((state) => ({ shop: { ...state.shop, productsPerPage } })),
  },
})

export default createShopSlice
