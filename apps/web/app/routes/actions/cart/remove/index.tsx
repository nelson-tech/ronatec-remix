import { LoaderFunction, redirect } from "@remix-run/node"
export { action } from "./removeFromCartAction"

export const loader: LoaderFunction = async () => {
  console.log("Add to cart loader")
  redirect("/shop")
}

const RemoveFromCartPage = () => {
  return <div>Remove</div>
}

export default RemoveFromCartPage
