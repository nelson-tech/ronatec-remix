import { createCookieSessionStorage } from "@remix-run/node"

type SessionData = {
  cartId: string
}

type SessionFlashData = {
  error: string
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "cart_id",
      domain: process.env.COOKIE_DOMAIN,
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      secure: false,
      maxAge: 604_800 * 4, // 4 weeks
      secrets: ["ronatec_upgrade"],
    },
  })

export { getSession, commitSession, destroySession }
