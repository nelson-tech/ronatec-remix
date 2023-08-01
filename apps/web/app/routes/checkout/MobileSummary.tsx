import { Disclosure } from "@headlessui/react"
import CartSummary from "./CartSummary"

const MobileSummary = () => {
  return (
    <section
      aria-labelledby="order-heading"
      className="bg-gray-50 px-4 py-6 sm:px-6 lg:hidden"
    >
      <Disclosure as="div" defaultOpen className="max-w-lg mx-auto">
        {({ open }) => (
          <>
            <div className="flex items-center justify-between">
              <h2
                id="order-heading"
                className="text-lg font-medium text-gray-900"
              >
                Your Order
              </h2>
              <Disclosure.Button className="font-medium text-blue-main hover:text-highlight">
                {open ? (
                  <span>Hide full summary</span>
                ) : (
                  <span>Show full summary</span>
                )}
              </Disclosure.Button>
            </div>

            <Disclosure.Panel>
              <ul role="list" className="divide-y divide-gray-200">
                <CartSummary />
              </ul>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </section>
  )
}

export default MobileSummary
