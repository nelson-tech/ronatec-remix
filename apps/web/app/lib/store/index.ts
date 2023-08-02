import { createContext } from "react"
import { createStore } from "zustand"
import { createWithEqualityFn } from 'zustand/traditional';

import createAlertSlice, { AlertSliceType } from "./slices/alert"
import createAuthSlice, { AuthSliceType } from "./slices/auth"
import createCartSlice, { CartSliceType } from "./slices/cart"
import createShopSlice, { ShopSliceType } from "./slices/shop"
import createUISlice, { UISliceType } from "./slices/ui"
import { shallow } from "zustand/shallow";

//
// Types
//

export type SlicesType = AlertSliceType &
  AuthSliceType &
  CartSliceType &
  ShopSliceType &
  UISliceType

export type initialStateType = DeepPartial<SlicesType>

export type StoreType = ReturnType<typeof createClientStore>

//
// Variables
//

export const StoreContext = createContext<StoreType | null>(null)

//
// Hook
//

export const createClientStore = (initialState?: initialStateType) => {
  return createWithEqualityFn<SlicesType>()((...a) => ({
    ...createAlertSlice(...a),
    ...createAuthSlice(initialState?.auth)(...a),
    ...createCartSlice(initialState?.cart)(...a),
    ...createShopSlice(...a),
    ...createUISlice(...a),
  }), shallow)
}

// Old Vanilla - Just in case.

// import { createStore } from "zustand/vanilla"

// import createAlertSlice, { AlertSliceType } from "./slices/alert"
// import createAuthSlice, { AuthSliceType } from "./slices/auth"
// import createCartSlice, { CartSliceType } from "./slices/cart"
// import createShopSlice, { ShopSliceType } from "./slices/shop"
// import createUISlice, { UISliceType } from "./slices/ui"

// export type SlicesType = AlertSliceType &
//   AuthSliceType &
//   CartSliceType &
//   ShopSliceType &
//   UISliceType

// export type initialStateType = DeepPartial<SlicesType>

// const vanillaStore = (initialState?: initialStateType) => {
//   return createStore<SlicesType>()((...a) => ({
//     ...createAlertSlice(...a),
//     ...createAuthSlice(initialState?.auth)(...a),
//     ...createCartSlice(initialState?.cart)(...a),
//     ...createShopSlice(...a),
//     ...createUISlice(...a),
//   }))
// }

// export default vanillaStore
