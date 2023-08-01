import { About } from "@org/cms"
import { useLoaderData } from "@remix-run/react"
import PageHeader from "~/components/PageHeader"

const AboutRoute = () => {
  const { cards } = useLoaderData<About>()

  return (
    <>
      <div className="mx-auto max-w-7xl">
        <PageHeader title="About Us" />
        <section className="flex flex-col px-4 md:flex-row pb-8">
          {cards &&
            cards.map((card) => {
              if (card) {
                return (
                  <div className="flex flex-col w-full p-6" key={card.title}>
                    <div className="w-full relative mb-6">
                      {typeof card.image === "object" && (
                        <img
                          alt={card.image.alt ?? ""}
                          src={card.image.url ?? ""}
                          width={card.image.width ?? undefined}
                          height={card.image.height ?? undefined}
                          className="rounded overflow-hidden w-full h-full"
                        />
                      )}
                    </div>
                    <div className="pb-6 text-2xl text-accent">
                      {card.title}
                    </div>
                    <div className="">
                      {card.content && (
                        <span className="text-gray-600 text-md font-medium whitespace-pre-wrap">
                          {card.content}
                        </span>
                      )}
                    </div>
                  </div>
                )
              }
            })}
        </section>
      </div>
    </>
  )
}

export default AboutRoute
