import jwt from "jsonwebtoken";
import { config } from "./config.js";

export const verifyToekn = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    await jwt.verify(token, config.jwt.secretKey);
    //TODO: change this later
    // req.body.id = decoded.user.id;
    // console.log(req.body);
    return next();
  } catch (error) {
    if (error.message === "jwt expired") {
      return res.status(419).json({
        code: 419,
        message: "the token has expired",
      });
    }
    return res.status(401).json({
      code: 401,
      message: "Unauthorized",
    });
  }
};
