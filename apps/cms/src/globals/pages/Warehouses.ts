import { GlobalConfig } from "payload/types"
import mapField from "../../fields/map"

const WarehousesPage: GlobalConfig = {
  slug: "warehouses",
  access: {
    read: () => true,
  },
  admin: {
    group: "Pages",
  },
  versions: true,
  fields: [mapField],
}

export default WarehousesPage
