import { Supplier } from "@org/cms"
import { useLoaderData } from "@remix-run/react"
import DistributionComponent from "~/components/Distribution"
import PageHeader from "~/components/PageHeader"

const DistributionRoute = () => {
  const suppliers = useLoaderData<Supplier[]>()

  return (
    <>
      <div className="mx-auto px-8 lg:max-w-7xl">
        <PageHeader title="Distribution" />
        <DistributionComponent suppliers={suppliers} />
      </div>
    </>
  )
}

export default DistributionRoute
