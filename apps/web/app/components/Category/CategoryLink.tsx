import { Category } from "@org/cms"
import { Link } from "@remix-run/react"

type CategoryLinkPropsType = {
  category: Category
}

const CategoryLink = ({ category }: CategoryLinkPropsType) => {
  return (
    <div
      key={category?.id}
      className="m-4 hover:bg-gray-50 hover:shadow group transition-all hover:rounded overflow-hidden"
    >
      <Link
        to={`/products/${category?.slug}`}
        title={category?.title ?? ""}
        className="relative"
      >
        <div className="h-full">
          <div className="relative w-full mx-auto h-32 pt-2">
            {typeof category?.image === "object" && category.image.url ? (
              <img
                src={category.image.url}
                alt={category.image.alt ?? ""}
                sizes="25vw"
                className="object-cover rounded"
              />
            ) : (
              category.wc?.image?.src && (
                <img
                  src={category.wc.image.src}
                  alt={category.wc.image.alt ?? ""}
                  // sizes="25vw"
                  className="object-cover h-full w-full rounded"
                />
              )
            )}
          </div>
          <div
            className="text-center align-bottom py-2 group-hover:text-gray-900"
            dangerouslySetInnerHTML={{ __html: category?.title ?? "" }}
          ></div>
        </div>
      </Link>
    </div>
  )
}

export default CategoryLink
