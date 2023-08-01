import { CollectionConfig } from "payload/types"
import { Archive } from "../../blocks/Archive"
import { CallToAction } from "../../blocks/CallToAction"
import { Content } from "../../blocks/Content"
import { MediaBlock } from "../../blocks/Media"
import { slugField } from "../../fields/slug"
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types"
import { meta } from "../../fields/meta"

const wcFields: CollectionConfig["fields"] = [
  {
    name: "wc",
    label: false,
    type: "group",
    fields: [
      {
        name: "wc_id",
        label: "ID",
        type: "number",
      },
      {
        name: "name",
        type: "text",
      },
      {
        name: "slug",
        type: "text",
      },
      { name: "parent", type: "number" },
      { name: "type", type: "text" },
      { name: "permalink", type: "text" },
      { name: "sku", type: "text" },
      { name: "short_description", type: "textarea" },
      {
        name: "description",
        type: "textarea",
      },
      { name: "on_sale", type: "checkbox" },
      {
        name: "prices",
        type: "group",
        fields: [
          { name: "price", type: "text" },
          { name: "regular_price", type: "text" },
          { name: "sale_price", type: "text" },
          { name: "price_range", type: "text", required: false },
          { name: "currency_code", type: "text" },
          { name: "currency_symbol", type: "text" },
          { name: "currency_minor_unit", type: "number" },
          { name: "currency_decimal_separator", type: "text" },
          { name: "currency_thousand_separator", type: "text" },
          { name: "currency_prefix", type: "text" },
          { name: "currency_suffix", type: "text" },
        ],
      },
      { name: "price_html", type: "text" },
      { name: "average_rating", type: "text" },
      { name: "review_count", type: "number" },
      {
        name: "images",
        type: "array",
        fields: [
          { name: "wc_id", type: "number" },
          { name: "src", type: "text" },
          { name: "thumbnail", type: "text" },
          { name: "srcset", type: "text" },
          { name: "sizes", type: "text" },
          { name: "name", type: "text" },
          { name: "alt", type: "text" },
        ],
        admin: {
          components: {
            RowLabel: ({ data, index }: RowLabelArgs) => {
              return (
                data?.name ||
                data?.alt ||
                `Attribute ${String(index).padStart(2, "0")}`
              )
            },
          },
        },
      },
      {
        name: "categories",
        type: "array",
        fields: [
          { name: "wc_id", type: "number" },
          { name: "name", type: "text" },
          { name: "slug", type: "text" },
          { name: "link", type: "text" },
        ],
        admin: {
          components: {
            RowLabel: ({ data, index }: RowLabelArgs) => {
              return data?.name || `Category ${String(index).padStart(2, "0")}`
            },
          },
        },
      },
      { name: "tags", type: "array", fields: [] },
      {
        name: "attributes",
        type: "array",
        fields: [
          { name: "wc_id", type: "number" },
          { name: "name", type: "text" },
          { name: "taxonomy", type: "text" },
          { name: "has_variations", type: "checkbox" },
          {
            name: "terms",
            type: "array",
            fields: [
              { name: "wc_id", type: "number" },
              { name: "name", type: "text" },
              { name: "slug", type: "text" },
            ],
            admin: {
              components: {
                RowLabel: ({ data, index }: RowLabelArgs) => {
                  return data?.name || `Term ${String(index).padStart(2, "0")}`
                },
              },
            },
          },
        ],
        admin: {
          components: {
            RowLabel: ({ data, index }: RowLabelArgs) => {
              return data?.name || `Attribute ${String(index).padStart(2, "0")}`
            },
          },
        },
      },
      { name: "variations", type: "array", fields: [] },
      { name: "has_options", type: "checkbox" },
      { name: "is_purchasable", type: "checkbox" },
      { name: "is_in_stock", type: "checkbox" },
      { name: "is_on_backorder", type: "checkbox" },
      { name: "low_stock_remaining", type: "checkbox" },
      { name: "sold_individually", type: "checkbox" },
      {
        name: "add_to_cart",
        type: "group",
        fields: [
          { name: "text", type: "text" },
          { name: "description", type: "text" },
          { name: "url", type: "text" },
          { name: "minimum", type: "number" },
          { name: "maximum", type: "number" },
          { name: "multiple_of", type: "number" },
          { name: "extensions", type: "text" },
        ],
      },

      // variation: string

      // type WCTag = any

      // type WCVariation = any
    ],
    admin: {
      condition: (data, siblingData, { user }) => {
        if (data?.wc?.wc_id) {
          return true
        } else {
          return false
        }
      },
      readOnly: true,
    },
  },
]

export const ProductFields: CollectionConfig["fields"] = [
  {
    name: "title",
    type: "text",
    required: true,
  },
  {
    type: "tabs",
    tabs: [
      {
        label: "Description",
        fields: [
          {
            name: "shortDescription",
            type: "textarea",
            admin: { description: "Shown on product card." },
          },
          {
            name: "description",
            type: "textarea",
            required: false,
            admin: { description: "Shown on product details page." },
          },
        ],
      },
      {
        label: "Images",
        description:
          "Used for gallery on product details page. \
          First image in gallery will be the featured image, then the images here will be added.",
        fields: [
          {
            name: "gallery",
            label: "Product Images",
            type: "array",
            labels: {
              singular: "Slide",
              plural: "Slides",
            },
            fields: [{ name: "image", type: "upload", relationTo: "media" }],
            admin: {
              components: {
                RowLabel: ({ data, index }: RowLabelArgs) => {
                  return (
                    data?.title || `Slide ${String(index).padStart(2, "0")}`
                  )
                },
              },
            },
          },
        ],
      },
      {
        label: "Variations",
        description: "Add variations such as Size, Color, etc.",
        fields: [
          {
            name: "variations",
            type: "array",
            fields: [
              { name: "name", type: "text" },
              slugField("name"),
              {
                type: "array",
                name: "options",
                fields: [
                  { name: "label", type: "text" },
                  { name: "sku", type: "text", unique: true },
                ],
              },
            ],
          },
          {
            name: "hasVariation",
            type: "checkbox",
            hidden: false,
            admin: { readOnly: true, hidden: true },
          },
        ],
      },
      {
        label: "WC Import",
        description: "Data imported from WooCommerce",
        fields: wcFields,
      },
    ],
  },
  slugField(),
  { name: "sku", type: "text", unique: true, admin: { position: "sidebar" } },
  {
    name: "featuredImage",
    type: "upload",
    relationTo: "media",
    admin: {
      position: "sidebar",
    },
  },
  {
    name: "categories",
    type: "relationship",
    relationTo: "categories",
    hasMany: true,
    admin: {
      position: "sidebar",
    },
  },
  {
    name: "tags",
    type: "relationship",
    relationTo: "tags",
    hasMany: true,
    admin: { position: "sidebar", isSortable: true },
  },
  {
    name: "publishedDate",
    type: "date",
    admin: {
      position: "sidebar",
    },
  },
  { name: "sold", type: "number", admin: { position: "sidebar" } },
  { name: "lanco", type: "checkbox", admin: { position: "sidebar" } },
  { name: "price", type: "text", admin: { position: "sidebar" } },
  meta({
    generateTitle: ({ doc }) =>
      `${(doc as { title: { value: string } }).title.value} - Ronatec`,
    generateDescription: ({ doc }) =>
      (doc as { shortDescription: { value: string } }).shortDescription.value,
    generateImage: ({ doc }) =>
      (doc as { featuredImage: { value: string } }).featuredImage?.value,
    generateURL: async ({ doc }) => {
      const fields = (doc as { fields: { slug: { value: string } } }).fields

      return `/products/${fields.slug.value}`
    },
  }),
]
