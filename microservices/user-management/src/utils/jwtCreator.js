import { config } from "../../config.js";
import jwt from "jsonwebtoken";

export async function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}
