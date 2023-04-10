import Mongoose from "mongoose";
import { config } from "../../config.js";
export async function connectDB() {
  Mongoose.set("strictQuery", false);
  return Mongoose.connect(config.db.host, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export function useVirtualId(schema) {
  schema.virtual("id").get(function () {
    return this._id.toString();
  });
  schema.set("toJSON", { virtuals: true });
  schema.set("toOject", { virtuals: true });
}