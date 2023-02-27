import { JobPost } from "../models/jobPost.js";

export async function registerJobPost(req, res) {
  try {
    const { description } = req.body;

    //check existing job posting
    const found = await JobPost.findOne({ title: description.title });
    if (found) {
      return res
        .status(409)
        .json({ message: `${description.title} already exists` });
    }

    //save job posting
    const savedJobPosting = await new JobPost(description).save();

    res.status(201).json({ savedJobPosting });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
}
export async function applyJob(req, res, next) {
  res.status(200).json({ message: "Job Management Service" });
}

export async function getAllJobs(res) {
  try {
    const result = await JobPost.find();
    res.status(200).json(result);
  } catch (err) {}
}
export async function getJobsWithKeyWord(req, res, next) {
  res.status(200).json({ message: "Job Management Service" });
}

export async function getJobsByEmail(req, res) {
  try {
    const email = req.email;
    const foundAjobs = await JobPost.find({ "description.email": email });
    if (!foundAjobs) {
      return res.status(404).json({ message: `Job Post not found` });
    }
    res.status(200).json(foundAjobs);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
}
export async function getAjobById(req, res) {
  try {
    const jobPost = await JobPost.findById({ id });
    if (!jobPost) {
      return res.status(404).json({ message: `Job Post not found: ${id}` });
    }
    res.status(200).json(jobPost);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
}

export async function updateJobPost(req, res, next) {
  res.status(200).json({ message: "Job Management Service" });
}

export async function removeJobPost(req, res, next) {
  res.status(200).json({ message: "Job Management Service" });
}
