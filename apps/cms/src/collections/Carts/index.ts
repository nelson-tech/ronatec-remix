import { CollectionConfig } from "payload/dist/collections/config/types"

import adminsAndUser from "./access/adminsAndUser"
import beforeChange from "./hooks/beforeChange"
import afterChange from "./hooks/afterChange"
import afterDelete from "./hooks/afterDelete"
import afterRead from "./hooks/afterRead"
import ProductItemsField from "../../fields/productItems"

export const Carts: CollectionConfig = {
  slug: "carts",
  fields: [
    ProductItemsField({ readOnly: false }),
    {
      name: "count",
      label: "Items in cart",
      type: "number",
      admin: { readOnly: true, position: "sidebar" },
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: false,
      hasMany: false,
      admin: { hidden: false, position: "sidebar" },
    },
    {
      name: "lastEdit",
      type: "number",
      hidden: true,
    },
  ],
  access: {
    read: adminsAndUser,
    create: adminsAndUser,
    update: adminsAndUser,
    delete: adminsAndUser,
  },
  hooks: { afterRead, beforeChange, afterChange, afterDelete },
  admin: { group: "Shop", hidden: false },
}
