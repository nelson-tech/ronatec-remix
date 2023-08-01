import { LoaderFunction, redirect } from "@remix-run/node"
export { action } from "./addToCartAction"

export const loader: LoaderFunction = async () => {
  redirect("/shop")
}

const AddToCartPage = () => {
  return <div>Add</div>
}

export default AddToCartPage
