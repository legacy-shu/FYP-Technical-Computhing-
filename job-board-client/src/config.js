export const config = {
  api: {
    auth: {
      login: process.env.API_PATH_AUTH_LOGIN,
      check: process.env.API_PATH_AUTH_CHECK,
    },
    profile: {
      register: process.env.API_PATH_PROFILE_REGISTEER,
      root: process.env.API_PATH_PROFILE,
    },
    job: {
      root: process.env.API_PATH_JOB_POST,
      search: process.env.API_PATH_JOB_POST_SEARCH,
      all: process.env.API_PATH_JOB_POST_GETALL,
      list: process.env.API_PATH_JOB_POST_LIST_USERID,
    },
  },
  baseURL: {
    host: process.env.API_BASE,
  },
};
