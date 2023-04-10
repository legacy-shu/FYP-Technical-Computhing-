import express from "express";
import cors from "cors";
import "express-async-errors";
import jobs from "./routes/jobPost.js";
import { connectDB } from "./db/database.js";
const app = express();
try {
  await connectDB();
  console.log("DB connected");
} catch (error) {
  console.log(error);
}

app.use(express.json());
app.use(cors());
app.use("/jobs", jobs);

export default app;
