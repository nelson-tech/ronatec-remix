import InformationCircleIcon from "@heroicons/react/20/solid/InformationCircleIcon"
import { Supplier } from "@org/cms"

import Icon from "~/components/ui/Icon"

// ####
// #### Types
// ####

export type ChosenSupplierType = Supplier & {
  title: string
}

export type PropsType = {
  supplier: Supplier
  headerText?: string
  featured?: boolean
  isOpen?: boolean
  setIsOpen?: (open: boolean) => void
  setChosenSupplier?: (chosen: ChosenSupplierType | undefined) => void
  chosenSupplier?: ChosenSupplierType
}

// ####
// #### Component
// ####

const SupplierCard = ({
  supplier: givenSupplier,
  headerText,
  featured = false,
  isOpen,
  setIsOpen,
  setChosenSupplier,
  chosenSupplier,
}: PropsType) => {
  const { title, description, id, image, url } = givenSupplier

  if (givenSupplier) {
    if (featured) {
      return (
        <a
          href={url ?? undefined}
          target="_blank"
          rel="noreferrer"
          className="bg-grey-50 w-full mx-auto mt-0 flex flex-col rounded overflow-hidden shadow mb-8 group"
          data-testid="supplier-card-featured"
        >
          {headerText && (
            <div className="py-2 bg-accent text-white w-full text-center align-center mx-auto">
              <h2 className="text-2xl">{headerText}</h2>
            </div>
          )}
          {image && typeof image === "object" && (
            <div className="w-full relative rounded h-full overflow-hidden">
              <img
                src={image.url}
                width={image.width ?? undefined}
                height={image.height ?? undefined}
                alt={image.alt ?? ""}
                title={title ?? undefined}
              />
            </div>
          )}

          {description && (
            <div className="p-8 h-full">
              <div className="flex items-baseline text-gray-500">
                <p className="text-center">{description}</p>
              </div>
            </div>
          )}

          <div className="bg-accent text-gray-100 text-center w-full">
            <p className="flex py-2 items-center justify-center w-full h-full pl-4">
              <span className="underline-animation group-hover:underline-animation transition-all">
                Visit {title}
              </span>
              <span className="px-4">
                <Icon
                  name="external-link"
                  className="text-gray-400 group-hover:text-white transition-colors w-4 ml-4"
                  type="regular"
                  iconKey={url + "--open-new-window"}
                />
              </span>
            </p>
          </div>
        </a>
      )
    }

    if (setIsOpen && setChosenSupplier) {
      const active = isOpen && chosenSupplier?.title === title
      return (
        <div
          className="bg-grey-50 mx-auto w-full flex items-center flex-row rounded shadow mb-8 cursor-pointer"
          data-testid="supplier-card"
        >
          <div
            onClick={() => {
              setIsOpen(true)
              title && setChosenSupplier({ ...givenSupplier, title })
            }}
            data-testid="supplier-card-clickable"
            className={`
                ${active ? "" : "text-opacity-90"}
                group transition relative px-3 py-2 rounded inline-flex items-center w-full hover:text-opacity-100 focus:outline-none `}
          >
            <div className="py-4 pl-4 pr-5 font-bold text-gray-600 text-xs md:text-base group-hover:text-highlight">
              {title}
            </div>
            <InformationCircleIcon
              className={`${
                active
                  ? "text-highlight"
                  : "text-accent group-hover:text-gray-400"
              }
                  mr-2 h-5 w-5 absolute right-0 transition`}
              aria-hidden="true"
            />
          </div>
        </div>
      )
    }
  }
  return <div data-testid="supplier-card-error">Error</div>
}

export default SupplierCard
