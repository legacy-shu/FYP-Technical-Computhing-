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
  mail: {
    host: required("MAIL_HOST"),
    port: required("MAIL_PORT"),
    user: required("AUTH_USER"),
    pass: required("AUTH_PASS"),
  },
  rabbitmq: {
    url: required("RABBITMQ_URL"),
  },
  server: {
    port: parseInt(required("PORT")),
  },
};
