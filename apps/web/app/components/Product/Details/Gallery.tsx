import { Tab } from "@headlessui/react"

import { Media, Product } from "@org/cms"

type ProductGalleryPropsType = {
  featuredImage: Media | null
  images: (Media | null)[] | undefined
  wcImages: Exclude<Product["wc"], undefined>["images"]
}

const ProductGallery = ({
  images: productImages,
  featuredImage,
  wcImages,
}: ProductGalleryPropsType) => {
  const images = [featuredImage, ...(productImages ?? [])].filter((i) => i)

  return (
    <div
      id="product-image"
      className="w-full md:w-1/2 lg:w-full md:px-4 lg:px-0 flex justify-center"
    >
      {/* <!-- Image Gallery --> */}
      {images.length > 1 || (wcImages?.length ?? 0) > 1 ? (
        <Tab.Group as="div" className="flex flex-col items-center w-full">
          <Tab.Panels className="object-contain w-full relative" as="div">
            {images.length > 1
              ? images.map(
                  (image, i) =>
                    image?.url && (
                      <Tab.Panel
                        key={image.id + "main"}
                        className="w-full aspect-square"
                      >
                        <img
                          src={image.url}
                          alt={image.alt ?? ""}
                          // width={image.width ?? 0}
                          // height={image.height ?? 0}

                          sizes="50vw"
                          className="rounded object-cover w-full h-full"
                        />
                      </Tab.Panel>
                    )
                )
              : wcImages?.map(
                  (image) =>
                    image.src && (
                      <Tab.Panel
                        key={image.id + "main"}
                        className="w-full aspect-square"
                      >
                        <img
                          src={image.src}
                          alt={image.alt ?? ""}
                          // width={image.width ?? 0}
                          // height={image.height ?? 0}

                          sizes="50vw"
                          className="rounded object-cover w-full h-full"
                        />
                      </Tab.Panel>
                    )
                )}
          </Tab.Panels>

          {/* <!-- Image selector --> */}
          <div className="mx-auto w-full mt-4 px-4 lg:px-0 max-w-2xl sm:block lg:max-w-none">
            <Tab.List className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 gap-6 lg:gap-4">
              {images
                ? images.map(
                    (image) =>
                      image?.url && (
                        <Tab
                          key={image.id + "thumbs"}
                          className="relative flex w-full aspect-square cursor-pointer items-center justify-center rounded-sm
                  focus:outline-none focus:ring focus:ring-accent focus:ring-offset-4"
                        >
                          <span className="sr-only">{image.alt}</span>
                          <span className="absolute inset-0 overflow-hidden rounded-sm w-full aspect-square">
                            <img
                              src={image.url}
                              alt={image.alt ?? ""}
                              sizes="33vw"
                              className="h-full w-full object-cover object-center"
                            />
                          </span>
                          <span
                            className="ring-transparent pointer-events-none absolute inset-0 rounded ring-2 ring-offset-2"
                            aria-hidden="true"
                          />
                        </Tab>
                      )
                  )
                : wcImages &&
                  wcImages.map(
                    (image) =>
                      image?.src && (
                        <Tab
                          key={image.id + "thumbs"}
                          className="relative flex w-full aspect-square cursor-pointer items-center justify-center rounded-sm
              focus:outline-none focus:ring focus:ring-accent focus:ring-offset-4"
                        >
                          <span className="sr-only">{image.alt}</span>
                          <span className="absolute inset-0 overflow-hidden rounded-sm w-full aspect-square">
                            <img
                              src={image.src}
                              alt={image.alt ?? ""}
                              sizes="33vw"
                              className="h-full w-full object-cover object-center"
                            />
                          </span>
                          <span
                            className="ring-transparent pointer-events-none absolute inset-0 rounded ring-2 ring-offset-2"
                            aria-hidden="true"
                          />
                        </Tab>
                      )
                  )}
            </Tab.List>
          </div>
        </Tab.Group>
      ) : images.length > 0 ? (
        <img
          src={images[0]?.url ?? ""}
          alt={images[0]?.alt ?? ""}
          // height={image??.mediaDetails?.height ?? undefined}
          // width={image??.mediaDetails?.width ?? undefined}
          className="object-contain rounded overflow-hidden w-full h-full"
          // sizes={images[0].sizes ?? ""}
        />
      ) : (
        wcImages &&
        (wcImages?.length ?? 0) > 0 && (
          <img
            src={wcImages[0]?.src ?? ""}
            alt={wcImages[0]?.alt ?? ""}
            // height={image??.mediaDetails?.height ?? undefined}
            // width={image??.mediaDetails?.width ?? undefined}
            className="object-contain rounded overflow-hidden w-full h-full"
            // sizes={images[0].sizes ?? ""}
          />
        )
      )}
    </div>
  )
}

export default ProductGallery
