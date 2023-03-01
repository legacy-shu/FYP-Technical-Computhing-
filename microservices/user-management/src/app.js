import express from "express";
import "express-async-errors";
import { config } from "../config.js";
import { connectDB } from "./db/database.js";
import { user, auth } from "./routes/index.js";

const StartServer = async () => {
  try {
    await connectDB();
    console.log("DB connected");

    const app = express();
    app.use(express.json());

    app.use("/auth", auth);
    app.use("/users", user);

    app.listen(config.host.port, () => {
      console.log(`Server listning on port ${config.host.port}`);
    });
  } catch (err) {
    console.log(err);
  }
};
StartServer();
