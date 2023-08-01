import { useLoaderData } from "@remix-run/react"
import IconCard from "~/components/Cards/Icon"
import { LoaderData } from "./ContactRouteLoader"
import PageHeader from "~/components/PageHeader"
import EmployeeCard from "~/components/Cards/Employee"
import Map from "~/components/Map"

const ContactRoute = () => {
  const {
    data: { cards, map, salesReps },
  } = useLoaderData<LoaderData>()

  return (
    <>
      {map && (
        <div className="w-full bg-accent flex justify-center">
          <Map map={map} style={{ maxHeight: "400px" }} />
        </div>
      )}
      <div className="mx-auto max-w-7xl">
        <PageHeader title="Contact Us" />

        <div className="relative bg-white py-8">
          <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 pt-4">
              {cards &&
                cards.map((card) => {
                  if (card) {
                    return (
                      <div className="pt-8" key={"contact" + card.title}>
                        <IconCard card={card} />
                      </div>
                    )
                  }
                  return null
                })}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="w-full pl-5 py-4 border-t-2">
            <h2 className="text-2xl px-5 font-extrabold mx-auto lg:max-w-7xl">
              Sales Reps
            </h2>
          </div>
          {salesReps && (
            <div className="relative bg-white pt-8 pb-16">
              <div className="mx-auto max-w-md px-4 sm:max-w-3xl lg:px-8 lg:max-w-7xl">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {salesReps.map((salesRep) => {
                    if (typeof salesRep === "object") {
                      return (
                        <EmployeeCard employee={salesRep} key={salesRep.id} />
                      )
                    }
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ContactRoute
