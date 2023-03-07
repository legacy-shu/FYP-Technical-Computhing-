import { createProxyMiddleware } from "http-proxy-middleware";
import { config } from "./config.js";
export const setupProxies = (app, verifyToekn, routes) => {
  // app.use(
  //   "jobs/seedonly",
  //   createProxyMiddleware({
  //     target: `${config.base.url}:${config.job_service.port}`,
  //   })
  // );
  // app.use(
  //   "jobs/seedonly/drop",
  //   createProxyMiddleware({
  //     target: `${config.base.url}:${config.job_service.port}`,
  //   })
  // );
  routes.forEach((route) => {
    console.log(route.auth);
    if (route.auth == false) {
      app.use(route.url, createProxyMiddleware(route.proxy));
    } else {
      app.use(route.url, verifyToekn, createProxyMiddleware(route.proxy));
    }
  });
};
