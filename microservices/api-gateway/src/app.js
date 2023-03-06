import express from "express";
import cors from "cors";
import morgan from "morgan";
import { ROUTES } from "./routes.js";
import { setupProxies } from "./proxy.js";
import { verifyToekn } from "./auth.js";
import { config } from "./config.js";

const app = express();
app.use(cors());
app.use(morgan("dev"));
setupProxies(app, verifyToekn, ROUTES);
app.get("/auth/check", verifyToekn, (req, res) => {
  res.send({ verified: req.body });
});
app.listen(config.host.port, () => {
  console.log(`api gateway server on ${config.host.port}`);
});
