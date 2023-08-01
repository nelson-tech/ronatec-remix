import type { CollectionConfig } from "payload/types"

import { admins } from "../../access/admins"
import { adminsAndOrderedBy } from "./access/adminsAndOrderedBy"
import beforeChange from "./hooks/beforeChange"
import afterChange from "./hooks/afterChange"
import ProductItemsField from "../../fields/productItems"

const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    group: "Shop",
    useAsTitle: "orderNumber",
    defaultColumns: ["createdAt"],
  },
  access: {
    read: adminsAndOrderedBy,
    create: adminsAndOrderedBy,
    update: admins,
    delete: admins,
  },
  hooks: { beforeChange, afterChange },
  timestamps: true,
  fields: [
    {
      name: "orderNumber",
      type: "number",
      admin: { readOnly: true, position: "sidebar" },
    },
    {
      name: "status",
      type: "select",
      options: [
        { value: "pending", label: "Pending" },
        { value: "complete", label: "Complete" },
        { value: "cancelled", label: "Cancelled" },
      ],
    },
    {
      name: "orderedBy",
      type: "group",
      admin: {
        readOnly: true,
      },
      fields: [
        {
          name: "user",
          type: "relationship",
          relationTo: "users",
          hasMany: false,
        },
        // keep a static copy of these fields as they appear at the time of the order
        {
          name: "name",
          type: "group",
          fields: [
            { name: "first", type: "text" },
            { name: "last", type: "text" },
          ],
        },
        {
          name: "email",
          type: "text",
        },
        { name: "phone", type: "text" },
        { name: "company", type: "text" },
      ],
    },
    ProductItemsField({ readOnly: true }),
    { name: "notified", type: "checkbox", admin: { position: "sidebar" } },
    {
      name: "cartId",
      type: "text",
      required: true,
      admin: { readOnly: true, position: "sidebar" },
    },
  ],
}

export default Orders
