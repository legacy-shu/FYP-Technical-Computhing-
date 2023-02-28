export const ROUTES = [
  {
    url: "/jobs",
    auth: false,
    creditCheck: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5,
    },
    proxy: {
      target: "http://localhost:8002",
      changeOrigin: true,
    },
  },
  {
    url: "/jobs/search?keyword=ios",
    auth: false,
    creditCheck: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5,
    },
    proxy: {
      target: "http://localhost:8002",
      changeOrigin: true,
    },
  },
  {
    url: "/jobs",
    auth: false,
    creditCheck: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5,
    },
    proxy: {
      target: "http://localhost:8002",
      changeOrigin: true,
    },
  },
  {
    url: "/jobs",
    auth: false,
    creditCheck: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5,
    },
    proxy: {
      target: "http://localhost:8002",
      changeOrigin: true,
    },
  },
  {
    url: "/users/login",
    auth: false,
    creditCheck: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5,
    },
    proxy: {
      target: "http://localhost:8001",
      changeOrigin: true,
    },
  },
  {
    url: "/users",
    auth: false,
    creditCheck: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5,
    },
    proxy: {
      target: "http://localhost:8001",
      changeOrigin: true,
    },
  },
];
