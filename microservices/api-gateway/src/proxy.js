import { createProxyMiddleware } from "http-proxy-middleware";
export const setupProxies = (app, verifyToekn, routes) => {
  routes.forEach((route) => {
    if (route.auth) {
      app.use(route.url, createProxyMiddleware(route.proxy));
    } else {
      app.use(route.url, verifyToekn, createProxyMiddleware(route.proxy));
    }
  });
};
