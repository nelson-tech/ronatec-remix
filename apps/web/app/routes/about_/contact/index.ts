import slick from "slick-carousel/slick/slick.css"
import slickTheme from "slick-carousel/slick/slick-theme.css"
import { LinksFunction } from "@remix-run/node"

export { loader } from "./ContactRouteLoader"

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: slick,
  },
  { rel: "stylesheet", href: slickTheme },
]
export { default } from "./ContactRoute"
