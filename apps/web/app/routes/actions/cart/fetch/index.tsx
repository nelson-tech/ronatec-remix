import { LoaderFunction, redirect } from "@remix-run/node"

export { action } from "./fetchCartAction"

export const loader: LoaderFunction = async () => {
  redirect("/shop")
}

const ClearCartRoute = () => {
  return <div>Fetch</div>
}

export default ClearCartRoute
