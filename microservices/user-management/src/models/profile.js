import { Schema, model } from "mongoose";
import { useVirtualId } from "../db/database.js";

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    logo: String,
    company: String,
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true },
    },
    contact: {
      countryCode: { type: Number, required: true },
      phoneNumber: { type: Number, required: true },
    },
    address: {
      country: { type: String, required: true },
      zipCode: { type: String, required: true },
      state: { type: String, required: true },
      city: { type: String, required: true },
    },
  },
  { timestamps: true }
);

useVirtualId(profileSchema);
const Profile = model("Profile", profileSchema);
export default Profile;
