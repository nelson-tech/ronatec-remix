import { Warehouse } from "@org/cms"
import { useLoaderData } from "@remix-run/react"

import OfficeBuildingIcon from "@heroicons/react/24/outline/BuildingOfficeIcon"

import Map from "~/components/Map"
import PageHeader from "~/components/PageHeader"

const WarehouseRoute = () => {
  const { map } = useLoaderData<Warehouse>()

  return (
    <>
      {map && (
        <div className="w-full bg-accent flex justify-center">
          <Map map={map} style={{ maxHeight: "400px" }} />
        </div>
      )}
      <div className="mx-auto px-8 lg:max-w-7xl">
        <PageHeader title="Distribution" />
        <div className="w-full flex justify-center">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 text-sm md:text-base max-w-[90%] md:max-w-[80%]">
            {map?.markers &&
              map.markers.map((warehouse) => {
                return (
                  <div
                    className="flex py-4 items-center text-center"
                    key={"warehouse" + warehouse?.label}
                  >
                    <OfficeBuildingIcon className="h-5 w-5 mr-2" />
                    {warehouse?.label}
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default WarehouseRoute
