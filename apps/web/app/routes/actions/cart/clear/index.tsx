import { LoaderFunction, redirect } from "@remix-run/node"

export { action } from "./clearCartAction"

export const loader: LoaderFunction = async () => {
  redirect("/shop")
}

const ClearCartRoute = () => {
  return <div>Clear</div>
}

export default ClearCartRoute
