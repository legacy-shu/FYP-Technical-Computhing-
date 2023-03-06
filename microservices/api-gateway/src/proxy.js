import { createProxyMiddleware } from "http-proxy-middleware";
export const setupProxies = (app, verifyToekn, routes) => {
  app.use("/jobs/search", createProxyMiddleware({target:"http://localhost:8002"}))
  routes.forEach((route) => {
    console.log(route.auth);
    if (route.auth == false) {
      app.use(route.url, createProxyMiddleware(route.proxy));
    } else {
      app.use(route.url, verifyToekn, createProxyMiddleware(route.proxy));
    }
  });
};
