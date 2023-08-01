import { memo } from "react"
import { Link, useNavigate } from "@remix-run/react"

import { Category, Media } from "@org/cms"

// ####
// #### Types
// ####

export type PropsType = {
  name: string
  slug: string
  image?: Media | undefined
  index: number
  wcImage?: Exclude<Category["wc"], undefined>["image"]
}

// ####
// #### Component
// ####

const CarouselCard = memo(
  ({ name, slug, image, index, wcImage }: PropsType) => {
    const navigate = useNavigate()

    const handleClick = (path: string) => {
      navigate(path)
    }

    return (
      <div
        onClick={() => handleClick(`/products/${slug}`)}
        title={name}
        data-testid="carousel-card"
        className="group relative w-56 h-72 rounded cursor-pointer p-6 flex flex-col overflow-hidden"
      >
        <div aria-hidden="true" className="absolute inset-0 w-56 h-72">
          {image?.url ? (
            <div className="w-56 h-72 relative">
              <img
                src={image.url}
                alt={image.alt ?? ""}
                title={name}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            wcImage?.src && (
              <div className="w-56 h-72 relative">
                <img
                  src={wcImage.src}
                  alt={wcImage.alt ?? wcImage.name ?? ""}
                  title={name}
                  className="object-cover w-full h-full"
                />
              </div>
            )
          )}
        </div>
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 group-hover:from-accent transition-all opacity-90"
        />
        <Link
          to={`/products/${slug}`}
          title={name ?? ""}
          className="relative mt-auto text-center text-xl font-bold text-white"
        >
          <span dangerouslySetInnerHTML={{ __html: name }} />
        </Link>
      </div>
    )
  }
)

CarouselCard.displayName = "CarouselCard"

export default CarouselCard
