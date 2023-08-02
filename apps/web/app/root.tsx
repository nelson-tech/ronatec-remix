import type {
  LinksFunction,
  LoaderFunction,
  ResponseInit,
} from "@remix-run/node"
import { json } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  V2_MetaFunction,
  isRouteErrorResponse,
  useLoaderData,
  useLocation,
  useNavigation,
  useRouteError,
} from "@remix-run/react"
import { AnimatePresence, motion } from "framer-motion"

import type { Cart, Menu, Settings, User } from "@org/cms"
import { destroySession, getSession } from "~/sessions"
import StoreContext from "~/lib/store/StoreContext"

import uiStyles from "@org/ui/styles.css"
import stylesheet from "~/tailwind.css"
import styles from "~/styles/global.css"

import Header from "~/components/Header"
import Modals from "~/components/Modals"
import Footer from "~/components/Footer"
import GlobalLoading from "~/components/GlobalLoading"
import Alerts from "./components/Alerts"

export type RootLoaderData = {
  menus: Menu | null
  settings: Settings | null
  promo: boolean
  user: User | null
  cart: Cart | null
}

type LoaderType = LoaderFunction & (() => Promise<RootLoaderData>)

export const loader: LoaderFunction = async ({
  context: { payload, user },
  request,
}) => {
  const session = await getSession(request.headers.get("Cookie"))
  const cartId = session.data.cartId

  const menusP = payload.findGlobal({ slug: "menus" }) as Promise<Menu>

  const settingsP = payload.findGlobal({
    slug: "settings",
  }) as Promise<Settings>

  let cartP: Promise<Cart | void> = Promise.resolve()

  let cart: Cart | null | undefined = null

  let responseOptions: ResponseInit | undefined

  if (cartId) {
    try {
      cartP = payload
        .findByID({ collection: "carts", id: cartId })
        .catch(async (e) => {
          responseOptions = {
            headers: { "Set-Cookie": await destroySession(session) },
          }
        })
    } catch (error) {
      console.warn("Error fetching guest cart.")
    }
  } else {
    cartP = Promise.resolve()
  }

  const [settings, menus, cartData] = await Promise.all([
    settingsP,
    menusP,
    cartP,
  ])

  const returnVal: RootLoaderData = {
    menus,
    user,
    settings,
    promo: true,
    cart: cartData ?? cart,
  }

  return json(returnVal, responseOptions)
}

export const meta: V2_MetaFunction<LoaderType> = ({ data }) => {
  return [
    {
      charset: "utf-8",
    },
    { title: data?.settings?.seoTitle },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
  ]
}

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: uiStyles,
  },
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "stylesheet",
    href: styles,
  },
]

export default function App() {
  const { menus, settings, user, cart } = useLoaderData<LoaderType>()

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StoreContext user={user} cart={cart}>
          <GlobalLoading />
          <div id="top" />
          <Header />
          <AnimatePresence mode="wait">
            <motion.div
              key={useLocation().pathname}
              variants={{
                initial: { opacity: 0, y: -50 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 50 },
              }}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.2 }}
              // exit="exit"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
          <Footer />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
          <Alerts />
          <Modals />
        </StoreContext>
      </body>
    </html>
  )
}

export const ErrorBoundary = () => {
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
        </head>
        <body>
          <div>ERROR: {error.data.message}</div>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    )
  }
}
