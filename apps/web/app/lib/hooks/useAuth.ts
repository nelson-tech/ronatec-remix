import { useCallback } from "react"

import useStore from "./useStore"

const errorCodes: { [key: string]: string } = {}

const useAuth = () => {
  const { setUser, setLoggedIn, setLoading, setResetError, setToken } =
    useStore((stores) => stores.auth)

  const { setAlert } = useStore((stores) => stores.alert)

  // const register = useCallback(
  //   async (args: MutationUserInput) => {
  //     setLoading(true)

  //     try {
  //       const data = await client.request(CreateUserDocument, { data: args })

  //       if (data.createUser?.id && args.email) {
  //         const user = data.createUser as User
  //         const { email, password } = args

  //         await login({ email, password, skipAlert: true })

  //         setAlert({
  //           open: true,
  //           kind: "success",
  //           primary: `Welcome${user.name && ","}${
  //             user.name && ` ${user.name}`
  //           }!`,
  //           secondary: "You are now registered.",
  //         })
  //       }
  //     } catch (error) {
  //       console.warn("Error during registration:", error)
  //       setAlert({
  //         open: true,
  //         kind: "error",
  //         primary: "Error during registration.",
  //       })
  //     }

  //     setLoading(false)
  //   },
  //   [client, setAlert, setUser, setLoggedIn]
  // )

  // const getCurrentUser = useCallback(async () => {
  //   setLoading(true)

  //   try {
  //     const data = await client.request(GetCurrentUserDocument)

  //     if (data.meUser?.user?.id) {
  //       const { user, token, exp } = data.meUser
  //       setUser(user as User)
  //       token && exp && setToken({ value: token, exp })
  //       setLoggedIn(true)
  //     } else {
  //       setUser(null)
  //       setLoggedIn(false)
  //       // throw new Error("No user details found.")
  //     }
  //   } catch (e) {
  //     setUser(null)
  //     setLoggedIn(false)

  //     console.warn("An error occurred while fetching your account.", e)
  //   }

  //   setLoading(false)
  // }, [])

  // const login = useCallback(
  //   async (args: { email: string; password: string; skipAlert?: boolean }) => {
  //     setLoading(true)

  //     try {
  //       const data = await client.request(LoginUserDocument, args)

  //       if (data.loginUser?.user?.id) {
  //         const { user, token, exp } = data.loginUser
  //         setUser(user as User)
  //         token && exp && setToken({ value: token, exp })
  //         setLoggedIn(true)

  //         !args.skipAlert &&
  //           setAlert({
  //             open: true,
  //             kind: "success",
  //             primary: `Welcome back${user.name && ","}${
  //               user.name && ` ${user.name}`
  //             }!`,
  //             secondary: "You are now logged in.",
  //           })
  //       }
  //     } catch (error) {
  //       console.warn("Error logging in", error)

  //       setAlert({
  //         open: true,
  //         kind: "error",
  //         primary: "Email or password is incorrect.",
  //       })
  //     }

  //     setLoading(false)
  //   },
  //   [client, setAlert, setUser, setLoggedIn]
  // )

  const logout = useCallback(async () => {
    setLoading(true)

    try {
      const logoutResponse = await fetch("/api/users/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })

      if (await logoutResponse.json()) {
        setUser(null)
        setToken({ value: null, exp: null })
        setLoggedIn(false)

        setAlert({
          open: true,
          primary: "Logged out.",
          secondary: "",
          kind: "info",
        })
      }
    } catch (error) {
      setAlert({
        open: true,
        kind: "error",
        primary: "Error logging out.",
      })
    }

    setLoading(false)
  }, [setAlert, setUser, setLoggedIn])

  // const forgotPassword = useCallback(
  //   async (args: { email: string }) => {
  //     setResetError(null)
  //     setLoading(true)

  //     try {
  //       const data = await client.request(ForgotPasswordDocument, args)

  //       setLoading(false)

  //       return true
  //     } catch (error) {
  //       const errors = error as any
  //       const message = errorCodes[errors.message]
  //         ? errorCodes[errors.message]
  //         : `Error: ${errors.message}`

  //       setResetError(message)
  //       setLoading(false)

  //       return false
  //     }
  //   },
  //   [client, setLoading, setResetError, setLoading]
  // )

  // const resetPassword = useCallback(
  //   async (args: {
  //     password: string
  //     passwordConfirm: string
  //     token: string
  //   }) => {
  //     setLoading(true)

  //     try {
  //       const data = await client.request(ResetPasswordDocument, args)

  //       if (data.resetPasswordUser?.user?.id) {
  //         const { user, token } = data.resetPasswordUser
  //         setUser(user as User)
  //         token && setToken(token)
  //         setLoggedIn(true)

  //         setAlert({
  //           open: true,
  //           kind: "success",
  //           primary: `Welcome back${user.name && ","}${
  //             user.name && ` ${user.name}`
  //           }!`,
  //           secondary: "Your password has been reset.",
  //         })

  //         setLoading(false)
  //         return true
  //       }
  //     } catch (error) {
  //       const errors = error as any
  //       const message = errorCodes[errors.message]
  //         ? errorCodes[errors.message]
  //         : `Error: ${errors.message}`

  //       setResetError(message)
  //       setLoading(false)

  //       return false
  //     }

  //     setLoading(false)

  //     return false
  //   },
  //   [client, setLoading, setUser, setResetError, setAlert]
  // )

  // const refreshToken = async (token: string) => {
  //   try {
  //     const refreshedData = await client.request(RefreshTokenDocument, {
  //       token,
  //     })

  //     if (refreshedData.refreshTokenUser?.refreshedToken) {
  //       await getCurrentUser()
  //     } else {
  //       throw new Error("Request was made, but no token returned")
  //     }
  //   } catch (error) {
  //     console.warn("Error refreshing user token")
  //   }
  // }

  return {
    // register,
    // getCurrentUser,
    // login,
    logout,
    // forgotPassword,
    // resetPassword,
    // refreshToken,
  }
}

export default useAuth
