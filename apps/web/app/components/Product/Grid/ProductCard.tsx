import { Product } from "@org/cms"
import { Link } from "@remix-run/react"
import PriceBadge from "~/components/PriceBadge"
import useStore from "~/lib/hooks/useStore"

// ####
// #### Types
// ####

type ProductCardProps = {
  product: Product
}

// ####
// #### Component
// ####

const ProductCard = ({ product }: ProductCardProps) => {
  const viewMode = useStore((state) => state.shop.viewMode)

  const categorySlug = product?.categories
    ? typeof product.categories[0] === "object"
      ? product.categories[0]?.slug
      : ""
    : ""

  const image = product.featuredImage
    ? typeof product.featuredImage === "object"
      ? product.featuredImage
      : null
    : null

  const wcImage =
    product?.wc?.images && (product.wc.images.length ?? 0) > 0
      ? product.wc?.images[0]
      : null

  if (viewMode === "grid") {
    return (
      <div className="group relative bg-white border border-gray-200 rounded w-full flex flex-col overflow-hidden">
        <PriceBadge
          product={product}
          className="absolute top-2 right-2 z-10 bg-highlight text-white rounded-full p-2 text-sm"
        />
        <div className="group-hover:opacity-75 transition-opacity">
          <div className="w-full object-center object-cover sm:w-full sm:h-full aspect-square relative overflow-hidden">
            {image?.url ? (
              <img
                src={image.url}
                alt={image.alt ?? ""}
                // width={product?.image.mediaDetails?.width ?? undefined}
                // height={product?.image.mediaDetails?.height ?? undefined}
                className="object-contain w-full h-full"
              />
            ) : wcImage?.src ? (
              <img
                src={wcImage.src}
                alt={wcImage.alt ?? ""}
                // width={product?.image.mediaDetails?.width ?? undefined}
                // height={product?.image.mediaDetails?.height ?? undefined}
                className="object-contain w-full h-full"
              />
            ) : (
              <div
                className="p-4 w-full text-sm max-h-[140px] line-clamp-[6] md:max-h-full md:line-clamp-none text-gray-500"
                dangerouslySetInnerHTML={{
                  __html:
                    product?.shortDescription ??
                    product.wc?.short_description ??
                    "",
                }}
              />
            )}
          </div>
        </div>

        <div className="flex-1 space-y-2 flex flex-col w-full">
          <h3 className="font-bold px-4 py-2 text-gray-900 group-hover:text-accent transition-colors text-base sm:text-xl">
            <Link
              to={`/products/${categorySlug}/${product?.slug}`}
              title={product?.title ?? ""}
              className="flex flex-col"
            >
              <span aria-hidden="true" className="absolute inset-0" />
              <span
                dangerouslySetInnerHTML={{ __html: product?.title ?? "" }}
              ></span>
            </Link>
          </h3>
          <div className="px-4 pb-2 flex-1 flex flex-col justify-end"></div>
          <div className="bg-accent group-hover:bg-highlight transition-colors w-full text-white py-2 text-center">
            View details
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="group relative py-4" key={product?.id}>
        <Link
          to={`/products/${categorySlug}/${product?.slug}`}
          title={product?.title ?? ""}
          className="flex items-center"
        >
          <div className="flex flex-col w-full">
            <p
              className="font-bold text-accent group-hover:text-highlight transition-colors text-xl"
              dangerouslySetInnerHTML={{ __html: product?.title ?? "" }}
            ></p>
            <div className="flex justify-between items-center">
              <div className="pt-2">
                {(product?.shortDescription ||
                  product.wc?.short_description) && (
                  <p
                    className="text-sm text-gray-500"
                    dangerouslySetInnerHTML={{
                      __html: product.wc?.short_description ?? "",
                    }}
                  />
                )}
              </div>

              <PriceBadge
                product={product}
                className=" bg-highlight text-white rounded-full p-2 text-sm"
              />
            </div>
          </div>
          {image?.url ? (
            <div className="w-16 lg:w-24 aspect-square rounded ml-4">
              <img
                src={image.url}
                alt={image.alt ?? ""}
                // width={product?.image.mediaDetails?.width ?? undefined}
                // height={product?.image.mediaDetails?.height ?? undefined}
                className="object-cover w-full aspect-square rounded"
              />
            </div>
          ) : (
            wcImage && (
              <div className="w-16 lg:w-24 aspect-square rounded ml-4">
                <img
                  src={wcImage.src}
                  alt={wcImage.alt ?? ""}
                  // width={product?.image.mediaDetails?.width ?? undefined}
                  // height={product?.image.mediaDetails?.height ?? undefined}
                  className="object-cover w-full aspect-square rounded"
                />
              </div>
            )
          )}
        </Link>
      </div>
    )
  }
}

export default ProductCard
