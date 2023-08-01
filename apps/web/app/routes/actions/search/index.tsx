import { LoaderFunction, redirect } from "@remix-run/node"
export { action } from "./searchAction"

export const loader: LoaderFunction = async () => {
  redirect("/shop")
}

const SearchRoute = () => {
  return <div>Search</div>
}

export default SearchRoute
