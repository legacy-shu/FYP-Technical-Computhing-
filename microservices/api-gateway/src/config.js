import dotenv from "dotenv";
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  jwt: {
    secretKey: required("JWT_SECRET"),
  },
  base: {
    url: required("HOST_URL", "http://localhost"),
    job_service: required("JOB_MANAGEMENTE_HOST", "http://localhost"),
    user_service: required("USER_MANAGEMENT_HOST", "http://localhost")
  },
  host: {
    port: parseInt(required("HOST_PORT", 8000)),
  },
  user_service: {
    port: parseInt(required("USER_MANAGEMENT_PORT", 8001)),
  },
  job_service: {
    port: parseInt(required("JOB_MANAGEMENT_PORT", 8002)),
  },
};
