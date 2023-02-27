import JobPost from "../models/jobPost.js";

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

export async function searchJobPosts(req, res) {
  try {
    const keyword = req.query.keyword;
    const result = JobPost.find({ $text: { $search: keyword } });
    if (!result) {
      return res.status(404).json({ message: `Job Post not found` });
    }
    res.status(200).json(found);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
}

export async function getJobsByUserId(req, res) {
  try {
    const userId = req.userId;
    const foundAjobs = await JobPost.find({ "description.userId.": userId });
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
    const id = req.postId;
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
  try {
    const { updateJobPost } = req.description;
    const { id } = updateJobPost;
    let jobPost = await JobPost.findById({ id });
    if (!jobPost) {
      return res.status(404).json({ message: `Job Post not found: ${id}` });
    }
    jobPost = updateJobPost;
    res.status(200).json(jobPost);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
}

export async function removeJobPost(req, res, next) {
  try {
    const id = req.postId;
    const deleted = await JobPost.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: `Job Post not found: ${id}` });
    }
    res.status(204).json(deleted);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
}
