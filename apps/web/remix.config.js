const { flatRoutes } = require("remix-flat-routes")

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/*"],
  routes: async (defineRoutes) => {
    return flatRoutes("routes", defineRoutes)
  },
  tailwind: true,
  assetsBuildDirectory: "public/web/build",
  publicPath: "/web/build/",
  serverDependenciesToBundle: ["@org/ui"],
  // appDirectory: "app",
  // serverBuildPath: "build/index.js",
  watchPaths: ["../../packages/ui", "../../packages/shared"],
  future: {
    v2_errorBoundary: true,
    v2_meta: true,
    v2_headers: true,
    v2_routeConvention: true,
    v2_normalizeFormMethod: true,
  },
  // serverModuleFormat: "esm",
}
