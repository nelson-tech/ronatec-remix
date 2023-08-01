import { Link, useLoaderData } from "@remix-run/react"

import { LoaderData } from "./HomeRouteLoader"
import CardCarousel from "./CardCarousel"
import { Category } from "@org/cms"
import IconCard from "~/components/Cards/Icon"
import VideoCard from "~/components/Cards/Video"
import SupplierCard from "~/components/Cards/Supplier"

const HomeRoute = () => {
  const { topSellers, home } = useLoaderData<LoaderData>()

  return (
    <div className="pb-4">
      <div className="mx-auto max-w-7xl px-2 w-full py-16 text-center">
        {home?.hero && (
          <div className="px-4 sm:px-8">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl">
              <span className="block xl:inline">{home.hero.title}</span>{" "}
              <span className="block text-accent xl:inline text-2xl sm:text-3xl">
                {home.hero.subTitle}
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              {home.hero.content}
            </p>
            <div className="mt-10 flex justify-center">
              <div className="shadow">
                <Link
                  to="/products"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent rounded text-white bg-accent hover:bg-blue-dark md:py-4 md:text-lg md:px-10"
                >
                  Shop Now
                </Link>
              </div>
              <div className="rounded shadow ml-3">
                <Link
                  to="/about/contact"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent rounded text-accent bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {home?.carousels && (
        <div className="mt-4">
          {typeof home.carousels.categories?.categories?.at(0) === "object" && (
            <CardCarousel
              header={home.carousels.categories.label ?? "Shop by Category"}
              link={home.carousels.categories.link}
              categories={home.carousels.categories.categories as Category[]}
            />
          )}

          <CardCarousel header="Top Selling Products" products={topSellers} />
        </div>
      )}

      {home?.cards && (
        <div className="mx-auto max-w-7xl relative bg-white pb-16 py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {home?.cards.map((card) => {
              if (card) {
                return (
                  <IconCard
                    card={card}
                    key={card.title ?? "" + card.icon ?? ""}
                  />
                )
              }
            })}
          </div>
        </div>
      )}
      {home?.videos?.map((videoLink) => {
        if (videoLink?.id)
          return (
            <VideoCard
              key={videoLink.id}
              videoLink={videoLink}
              cardStyle={`pb-12 px-5 w-full md:w-4/5 lg:w-2/3 mx-auto`}
              light
            />
          )
      })}

      {typeof home?.featuredSupplier === "object" && (
        <div className="mx-auto max-w-7xl w-full px-5 md:w-2/3 lg:w-1/2">
          <SupplierCard
            headerText="Featured Supplier"
            supplier={home.featuredSupplier}
            featured
          />
        </div>
      )}
    </div>
  )
}

export default HomeRoute
