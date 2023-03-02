import { config } from "./config.js";
export const ROUTES = [
  {
    url: "/jobs/all",
    proxy: {
      target: `http://localhost:${config.job_service.port}`,
      changeOrigin: true,
      pathRewrite: {
        "/all": "",
      },
    },
  },
  {
    url: "/jobs",
    auth: true,
    proxy: {
      target: `http://localhost:${config.job_service.port}`,
      changeOrigin: true,
    },
  },
  {
    url: "/jobs/search",
    auth: true,
    proxy: {
      target: `http://localhost:${config.job_service.port}`,
      changeOrigin: true,
    },
  },
  {
    url: "/jobs/:userId/posted",
    auth: true,
    proxy: {
      target: `http://localhost:${config.job_service.port}`,
      changeOrigin: true,
    },
  },
  {
    url: "/users/signup",
    proxy: {
      target: `http://localhost:${config.user_service.port}`,
      changeOrigin: true,
      pathRewrite: {
        "/signup": "",
      },
    },
  },
  {
    url: "/users",
    auth: true,
    proxy: {
      target: `http://localhost:${config.user_service.port}`,
      changeOrigin: true,
    },
  },
  {
    url: "/auth/check",
    auth: true,
    proxy: {
      target: `http://localhost:${config.user_service.port}`,
      changeOrigin: true,
    },
  },
  {
    url: "/auth/login",
    proxy: {
      target: `http://localhost:${config.user_service.port}`,
      changeOrigin: true,
    },
  },
];
