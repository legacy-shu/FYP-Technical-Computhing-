import express from "express";
import jobs from "./routes/jobPost.js";
import { config } from "../config.js";
import "express-async-errors";
import cors from "cors";

const StartServer = async () => {
  try {
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.use("/jobs", jobs);

    app.listen(config.host.port, () => {
      console.log(`Server listning on port ${config.host.port}`);
    });
  } catch (err) {
    console.log(err);
  }
};
StartServer();
