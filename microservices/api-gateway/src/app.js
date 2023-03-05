import express from "express";
import cors from "cors";
import morgan from "morgan";
import { setupProxies } from "./proxy.js";
import { ROUTES } from "./routes.js";
import { config } from "./config.js";
import { verifyToekn } from "./auth.js";

const app = express();
const port = config.host.port;

app.use(cors());
app.use(morgan("dev"));

setupProxies(app, verifyToekn, ROUTES);

app.listen(port, () => {
  console.log(`api gateway server on ${port}`);
});
