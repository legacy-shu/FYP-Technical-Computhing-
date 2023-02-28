import { config } from "./config.js";

export const ROUTES = [
  {
    url: "/jobs/all",
    auth: true,
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
    proxy: {
      target: `http://localhost:${config.job_service.port}`,
      changeOrigin: true,
    },
  },
  {
    url: "/jobs/search",
    proxy: {
      target: `http://localhost:${config.job_service.port}`,
      changeOrigin: true,
    },
  },
  {
    url: "/jobs/:userId/posted",
    proxy: {
      target: `http://localhost:${config.job_service.port}`,
      changeOrigin: true,
    },
  },
  {
    url: "/users/signup",
    auth: true,
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
    proxy: {
      target: `http://localhost:${config.user_service.port}`,
      changeOrigin: true,
    },
  },
  {
    url: "/auth/check",
    proxy: {
      target: `http://localhost:${config.user_service.port}`,
      changeOrigin: true,
    },
  },
  {
    url: "/auth/login",
    auth: true,
    proxy: {
      target: `http://localhost:${config.user_service.port}`,
      changeOrigin: true,
    },
  },
];
