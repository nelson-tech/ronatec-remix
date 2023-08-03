import OrderConfirmation from "~/components/OrderConfirmation"
import type { Order } from "@org/cms"
import { Link, useLoaderData } from "@remix-run/react"
import { LoaderData } from "./ThanksRouteLoader"
import useCart from "~/lib/hooks/useCart"
import { useEffect, useState } from "react"

// ####
// #### Component
// ####

// TODO - Fix error/missing display order

const ThanksRoute = () => {
  const [loaded, setLoaded] = useState(false)
  const { order } = useLoaderData<LoaderData>()

  const { fetchCart } = useCart()
  // const order = await getOrderById(searchParams?.order)

  // const loggedIn = useStore(state => state.auth.loggedIn)

  useEffect(() => {
    if (!loaded) {
      fetchCart()
      setLoaded(true)
    }
  }, [])

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="py-8 px-6 w-full h-full">
          {order ? (
            <OrderConfirmation order={order as Order} />
          ) : (
            <>
              <div className="mx-auto max-w-md text-gray-700">
                <h2 className="text-xl font-extrabold text-gray-400 text-center">
                  Oops, no order found...
                </h2>
                <p className="my-8">
                  If you checked out as a guest, you won&apos;t be able to see
                  order details here, but a copy of your order has been emailed
                  to.
                </p>
                <p>
                  Please{" "}
                  <Link
                    to={"/about/contact"}
                    className="text-accent hover:text-highlight transition-colors underline"
                  >
                    contact us
                  </Link>{" "}
                  if you think there&apos;s been a mistake.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ThanksRoute
