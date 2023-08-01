import { memo, useState } from "react"
import { TrashIcon } from "@heroicons/react/20/solid"

import LoadingSpinner from "~/components/LoadingSpinner"
import { Cart } from "@org/cms"
import { Link } from "@remix-run/react"
import getParsedPrice from "~/lib/utils/getParsedPrice"

// ####
// #### Types
// ####

type PropsType = {
  lineItem: Exclude<Cart["items"], undefined>[0]
  setOpen?: (open: boolean) => void
  removeFromCart: (input: { product: string }) => void
  setCartLoading: (loading: boolean) => void
}

// ####
// #### Component
// ####

const CartItem = memo(
  function CartItemMemo({
    lineItem,
    setOpen,
    removeFromCart,
    setCartLoading,
  }: PropsType) {
    const { product } = lineItem
    if (typeof product !== "object") {
      // TODO: fetch product instead of returning empty component

      return <></>
    }
    const [loading, setLoading] = useState(false)

    const firstCategory =
      typeof product === "object" && (product.categories?.length ?? 0) > 0
        ? product.categories?.at(0)
        : null

    const categorySlug =
      typeof firstCategory === "object" ? firstCategory?.slug : null

    const handleRemoveItem = async (key: string | null | undefined) => {
      setCartLoading(true)
      setLoading(true)
      key && (await removeFromCart({ product: key }))
      // TODO - Handle error case
    }

    const wcImage =
      product?.wc?.images && (product.wc.images.length ?? 0) > 0
        ? product.wc?.images[0]
        : null

    const price = getParsedPrice({ product })

    return (
      <>
        {typeof product === "object" && (
          <li className="py-6 flex items-center justify-between">
            {typeof product?.featuredImage === "object" ? (
              <div className="relative mr-4">
                <img
                  src={product?.featuredImage.url ?? ""}
                  alt={product?.featuredImage.alt ?? ""}
                  width={product?.featuredImage.width ?? 0}
                  height={product?.featuredImage.height ?? undefined}
                  className="w-16 max-h-16 md:w-24 md:max-h-24 border border-gray-200 rounded overflow-hidden"
                />
              </div>
            ) : (
              wcImage && (
                <div className="relative mr-4">
                  <img
                    src={wcImage.src ?? ""}
                    alt={wcImage.alt ?? ""}
                    className="w-16 max-h-16 md:w-24 md:max-h-24 border border-gray-200 rounded overflow-hidden"
                  />
                </div>
              )
            )}

            <div className="w-full h-full flex flex-col justify-center">
              <h3 onClick={() => setOpen && setOpen(false)}>
                <Link
                  to={`/products/${categorySlug}/${product?.slug}`}
                  className="font-bold text-sm text-gray-900"
                >
                  {product?.title}
                </Link>
              </h3>
              {/* {lineItem.variation?.attributes &&
                lineItem.variation?.attributes.length > 0 && (
                  <p className="mt-1 text-sm text-gray-500">
                    {lineItem.variation.attributes
                      ?.map((attribute) => `${attribute?.value}`)
                      .join(" - ")}
                  </p>
                )} */}
              {price !== "$0.00" && (
                <p className="text-sm text-gray-700">Price: {price}</p>
              )}
            </div>
            <div className="">
              {loading ? (
                <LoadingSpinner className="mr-4" size={4} />
              ) : (
                <TrashIcon
                  title="Remove item"
                  className="text-gray-500 hover:text-red-600 transition-colors h-6 cursor-pointer"
                  onClick={async () =>
                    typeof product === "object" &&
                    (await handleRemoveItem(product?.id))
                  }
                />
              )}
            </div>
          </li>
        )}
      </>
    )
  },
  function areEqual(prev, next) {
    if (
      typeof prev.lineItem.product === "object" &&
      typeof next.lineItem.product === "object" &&
      prev.lineItem.product?.id === next.lineItem.product?.id &&
      prev.lineItem?.quantity === next.lineItem?.quantity
    )
      return true
    return false
  }
)

export default CartItem
