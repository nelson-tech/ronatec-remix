// ####
// #### Types
// ####

import { Category, Media, Product } from "@org/cms"

type PropsType = {
  product: Product | string
  quantity: number | null | undefined
}

// ####
// #### Component
// ####

const LineItem = ({ product: productInput, quantity }: PropsType) => {
  const product = productInput as Product

  const image = product.featuredImage as Media
  const wcImage = product.wc?.images?.at(0)
  return (
    <>
      <tr key={product.id}>
        <td className="py-6 pr-8">
          <div className="flex items-center">
            {image ? (
              <div className="w-16 object-center object-cover rounded overflow-hidden mr-6">
                <img
                  src={image.url}
                  alt={image.alt ?? ""}
                  height={image?.height ?? undefined}
                  width={image?.width ?? undefined}
                />
              </div>
            ) : (
              wcImage && (
                <div className="w-16 object-center object-cover rounded overflow-hidden mr-6">
                  <img
                    src={wcImage.src ?? ""}
                    alt={wcImage.alt ?? ""}
                    // height={image?.height ?? undefined}
                    // width={image?.width ?? undefined}
                  />
                </div>
              )
            )}
            <div className="flex flex-col">
              <div className="font-medium text-gray-900">{product.title}</div>
              {/* {product.variations && (
                  <div>
                    {product.variations?.nodes[0]?.attributes?.nodes[0]?.label}:{" "}
                    {product.variations?.nodes[0]?.name?.split(" - ")[1]}
                  </div>
                )} */}
              {/* <div className="mt-1 sm:hidden">{product.price}</div> */}
            </div>
          </div>
        </td>
        {/* <td className="hidden py-6 pr-8 sm:table-cell">
      {product.price}
    </td> */}
        <td className="py-6 pl-2.5 pr-8">
          <div className="hidden sm:table-cell">{quantity}</div>
          <div className="table-cell sm:hidden">
            <div className="w text-right">x{quantity}</div>
            {/* <div className="border-t">
          {"$" +
            (lineItem?.total &&
              numberWithCommas(lineItem?.total))}
        </div> */}
          </div>
        </td>
        {/* <td className="hidden py-6 pr-8 sm:table-cell">
      {"$" +
        (lineItem?.total && numberWithCommas(lineItem?.total))}
    </td> */}
        <td className="py-6 font-medium text-right whitespace-nowrap">
          <a
            href={`/products/${(product.categories?.at(0) as Category)?.slug}/${
              product.slug
            }`}
            className="text-blue-main"
          >
            View
            <span className="hidden lg:inline"> Product</span>
            <span className="sr-only">, {product.title}</span>
          </a>
        </td>
      </tr>
    </>
  )
}

export default LineItem
