import { BeforeChangeHook } from "payload/dist/collections/config/types"
import addOrderNumber from "./addOrderNumber"
import sendNotification from "./sendNotification"
import setPending from "./setPending"
import updateProductSold from "./updateProductSold"

const beforeChange: BeforeChangeHook[] = [
  addOrderNumber,
  setPending,
  sendNotification,
  updateProductSold,
]

export default beforeChange
