import { config } from "../../config.js";
import jwt from "jsonwebtoken";

export async function createJwtToken(user) {
  return jwt.sign({ user }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}
