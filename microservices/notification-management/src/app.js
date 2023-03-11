import express from "express";
import amqpReceiver from "./amqpReceiver.js";
import { config } from "./config.js";

const PORT = config.server.port;
const app = express();

app.use(express.json());
amqpReceiver();

app.listen(PORT, () =>
  console.log("Nofication server is working on port " + PORT)
);
