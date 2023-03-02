import { createProxyMiddleware } from "http-proxy-middleware";
export const setupProxies = (app, verifyToekn, routes) => {
  routes.forEach((route) => {
    if (route.auth) {
      app.use(route.url, verifyToekn, createProxyMiddleware(route.proxy));
    } else {
      // don't need to check auth login/signup, jobs/all
      app.use(route.url, createProxyMiddleware(route.proxy));
    }
  });
};
