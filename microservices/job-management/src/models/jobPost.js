import { Schema, model } from "mongoose";
import { useVirtualId } from "../db/database.js";

const jobPostSchema = new Schema(
  {
    description: {
      userId: { type: String, required: true },
      title: { type: String, required: true },
      email: { type: String, required: true },
      company: { type: String, required: true },
      address: {
        country: { type: String, required: true },
        zipCode: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
      },
      salary: { type: String, required: true },
      jobType: { type: String, required: true },
      posted: { type: Date, required: true },
      about: { type: String, required: true },
      roleDetail: { type: String, required: true },
      responsibilities: { type: String, required: true },
      skills: { type: String, required: true },
      applicants: [],
    },
  },
  { timestamps: true }
);
jobPostSchema.index({
  "description.title": "text",
  "description.salary": "text",
  "description.address.city": "text",
  "description.address.country": "text",
  "description.roleDetail": "text",
  "description.responsibilities": "text",
  "description.company": "text",
  "description.about": "text",
  "description.skills": "text",
});
useVirtualId(jobPostSchema);
const JobPost = model("JobPost", jobPostSchema);
export default JobPost;
