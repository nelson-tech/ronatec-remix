import { Link } from "@remix-run/react"
import PageHeader from "~/components/PageHeader"

// ####
// #### Variables
// ####

const title = "Plating On Plastics"

// ####
// #### Component
// ####

const PlatingOnPlasticsRoute = () => {
  return (
    <>
      <PageHeader title={title} />
      <div className="max-w-7xl p-8 mx-auto">
        <div className="text-gray-800 md:p-8 space-y-4">
          <p>
            Ronatec C2C plastics plating products meet industry environmental
            regulations and standards while offering low-temperature operations,
            superior plating applications, and a high production yield.
          </p>
          <p>
            A complete line of plastics plating processes—including
            accelerators, catalysts, direct plate processing, electroless
            copper, etchants, and electrolytic nickel plating—is available as a
            safer alternative to traditional plating on plastic.
          </p>
          <p>
            <Link
              to="/about/contact"
              className="text-blue-main underline hover:text-highlight focus:text-highlight"
            >
              Contact us
            </Link>{" "}
            today for further information!
          </p>
        </div>
      </div>
    </>
  )
}

export default PlatingOnPlasticsRoute
