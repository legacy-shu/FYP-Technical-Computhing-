import { config } from "../config.js";
import app from "./app.js";

app.listen(config.host.port, () => {
  console.log(`Server listning on port ${config.host.port}`);
});
