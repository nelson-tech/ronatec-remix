import { Supplier } from "@org/cms"
import { useState } from "react"

import SupplierCard, { ChosenSupplierType } from "~/components/Cards/Supplier"
import SupplierModal from "./SupplierModal"

// ####
// #### Types
// ####

type PropsType = {
  suppliers: Supplier[] | null | undefined
}

// ####
// #### Component
// ####

const DistributionComponent = ({ suppliers }: PropsType) => {
  const [isOpen, setIsOpen] = useState(false)
  const [chosenSupplier, setChosenSupplier] = useState<
    ChosenSupplierType | undefined
  >()

  const sortedSuppliers = suppliers
    ? [...suppliers].sort((a, b) => {
        return a?.title! < b?.title! ? -1 : a?.title! < b?.title! ? 1 : 0
      })
    : []

  return (
    <>
      <SupplierModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        chosenSupplier={chosenSupplier}
      />
      <div className="relative bg-white pb-16 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sortedSuppliers.map((supplier) => {
            if (supplier) {
              return (
                <SupplierCard
                  supplier={supplier}
                  key={supplier.id}
                  setChosenSupplier={setChosenSupplier}
                  chosenSupplier={chosenSupplier}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              )
            }
          })}
        </div>
      </div>
    </>
  )
}

export default DistributionComponent
