import { config } from "./config.js";
export const ROUTES = [
  {
    url: "/jobs/all",
    auth: false,
    proxy: {
      target: `${config.base.url}:${config.job_service.port}`,
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
      target: `${config.base.url}:${config.job_service.port}`,
      changeOrigin: true,
    },
  },
  {
    url: "/jobs/search",
    auth: false,
    proxy: {
      target: `${config.base.url}:${config.job_service.port}`,
      changeOrigin: true,
    },
  },
  {
    url: "/jobs/:userId/posted",
    auth: true,
    proxy: {
      target: `${config.base.url}:${config.job_service.port}`,
      changeOrigin: true,
    },
  },
  {
    url: "/users/signup",
    auth: false,
    proxy: {
      target: `${config.base.url}:${config.user_service.port}`,
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
      target: `${config.base.url}:${config.user_service.port}`,
      changeOrigin: true,
    },
  },
  {
    url: "/auth/login",
    auth: false,
    proxy: {
      target: `${config.base.url}:${config.user_service.port}`,
      changeOrigin: true,
    },
  },
];
