import {
  Form,
  useActionData,
  useFetcher,
  useNavigate,
  useNavigation,
} from "@remix-run/react"
import { useEffect } from "react"
import FormField from "~/components/FormField"
import LoadingSpinner from "~/components/LoadingSpinner"
import useStore from "~/lib/hooks/useStore"
import type { action } from "./CheckoutRouteAction"

const CheckoutForm = () => {
  const navigation = useNavigation()
  const navigate = useNavigate()
  const data = useActionData<typeof action>()

  const setAlert = useStore((state) => state.alert.setAlert)

  useEffect(() => {
    switch (navigation.state) {
      case "submitting":
        setAlert({
          open: true,
          kind: "info",
          primary: "Processing order.",
        })
        break

      default:
        break
    }
  }, [navigation.state])

  useEffect(() => {
    if (data?.error) {
      setAlert({
        open: true,
        kind: "error",
        primary: "Error Checking Out",
        secondary: data.error,
      })
    }
    if (data?.order) {
      setAlert({
        open: true,
        kind: "success",
        primary: "Order has been successfully created.",
        secondary: "Redirecting...",
      })
      navigate(`/thanks?orderId=${data.order.id}`)
    }
  }, [data])

  return (
    <section
      aria-labelledby="payment-heading"
      className="flex-auto overflow-y-auto px-4 pt-4 pb-16 sm:px-6 sm:pt-4 lg:px-8 lg:pt-0 lg:pb-16"
    >
      <h2 id="payment-heading" className="sr-only">
        Payment and shipping details
      </h2>

      <div className="max-w-2xl mx-auto">
        <Form className="mt-6" method="post" action="/checkout">
          <div className="grid grid-cols-12 gap-y-6 gap-x-4">
            <h2 className="col-span-full text-xl font-semibold">
              Contact details
            </h2>
            <div className="col-span-full grid gap-y-6 md:grid-cols-2 gap-6">
              <FormField
                name="email"
                label="Email Address"
                type="email"
                autoComplete="email"
                containerStyle="w-auto"
              />
              <FormField
                name="phone"
                label="Phone Number"
                type="text"
                autoComplete="tel"
                containerStyle="w-auto"
              />
            </div>

            <div className="col-span-full grid gap-y-6 md:grid-cols-2 gap-6">
              <FormField
                name="firstName"
                label="First Name"
                type="text"
                autoComplete="cc-given-name"
                containerStyle="w-auto"
              />
              <FormField
                name="lastName"
                label="Last Name"
                type="text"
                autoComplete="cc-family-name"
                containerStyle="w-auto"
              />
            </div>

            <FormField
              name="company"
              label="Company"
              type="text"
              autoComplete="organization"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-blue-main border border-transparent rounded shadow-sm py-2 px-4 text-lg font-medium text-white hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-offset-2 outline-none focus:ring-blue-main"
          >
            {false ? (
              <LoadingSpinner size={7} color="white" className="mx-auto" />
            ) : (
              "Place Order"
            )}
          </button>
        </Form>
      </div>
    </section>
  )
}

export default CheckoutForm
