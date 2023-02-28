import express from "express";
import { setupLogging } from "./logging.js";
import { setupProxies } from "./proxy.js";
import { ROUTES } from "./routes.js";

const app = express();
const port = 3000;

setupLogging(app);
setupProxies(app, ROUTES);

app.listen(port, () => {
  console.log("server started on 3000");
});
