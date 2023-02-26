import { Schema, model } from "mongoose";
import { useVirtualId } from "../db/database.js";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

useVirtualId(userSchema);
const User = model("User", userSchema);
export default User;
