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
  host: {
    port: parseInt(required("HOST_PORT")),
  },
  db: {
    host: required("DB_HOST"),
  },
  rabbitmq: required("RABBITMQ_URL"),
};
