import JobPost from "../models/jobPost.js";
import amqp from "amqplib";
import { config } from "../../config.js";
async function sendMessage(data) {
  try {
    const connection = await amqp.connect(config.rabbitmq);
    const channel = await connection.createChannel();
    await channel.assertQueue("applyjob");
    channel.sendToQueue("applyjob", Buffer.from(JSON.stringify(data)));
    console.log("applyjob sent to message queue");
  } catch (ex) {
    console.log(ex);
  }
}
export async function seedonlyDorpCollection(req, res) {
  try {
    await JobPost.deleteMany({});
    res.status(200).json({ ok: "droped collection" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
}
export async function seedonly(req, res) {
  try {
    const { description } = req.body;
    const savedJobPosting = await new JobPost({ description }).save();
    res.status(201).json({ jobposting: savedJobPosting });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
}

export async function registerJobPost(req, res) {
  try {
    const { description } = req.body;
    //save job posting
    const savedJobPosting = await new JobPost({ description }).save();
    res.status(201).json({ jobposting: savedJobPosting });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
}

export async function applyJob(req, res) {
  try {
    const jobId = req.params.jobId;
    const applicantId = req.body.user.id;
    const find = await JobPost.findById({ _id: jobId }).find({
      "description.applicants": applicantId,
    });

    if (find.length > 0) {
      return res.status(303).json({ message: "exist applicant" });
    }

    const addApplicant = await JobPost.findByIdAndUpdate(
      { _id: jobId },
      { $push: { "description.applicants": applicantId } },
      {
        new: true,
      }
    );
    const data = {
      applicantId,
      cv: req.body.cvlink,
      applicantEmail: req.body.user.email,
      companyEmail: addApplicant.description.email,
      jobTitle: addApplicant.description.title,
      company: addApplicant.description.company,
      salary: addApplicant.description.salary,
      jobType: addApplicant.description.jobType,
      location: `${addApplicant.description.address.city}, ${addApplicant.description.address.country}`,
    };
    await sendMessage(data);
    res.status(200).json({ addApplicant });
  } catch (error) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
}

export async function getAllJobs(req, res) {
  try {
    const result = await JobPost.find().sort({ "description.posted": "desc" });
    if (!result) {
      return res.status(404).json({ message: `Job Post not found` });
    }
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
}

export async function searchJobPosts(req, res) {
  try {
    const keyword = req.query.keyword;
    const result = await JobPost.find({ $text: { $search: keyword } });
    if (!result) {
      return res.status(404).json({ message: `Job Post not found` });
    }
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
}

export async function getJobsByUserId(req, res) {
  try {
    const userId = req.params.userId;
    const foundAjobs = await JobPost.find({
      "description.userId": userId,
    }).sort({ "description.posted": "desc" });
    if (!foundAjobs) {
      return res.status(404).json({ message: `Job Post not found` });
    }
    res.status(200).json(foundAjobs);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
}
export async function getjobById(req, res) {
  try {
    const id = req.params.jobId;
    const jobPost = await JobPost.findById({ _id: id });
    if (!jobPost) {
      return res.status(404).json({ message: `Job Post not found: ${id}` });
    }
    res.status(200).json(jobPost);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
}

export async function updateJobPost(req, res) {
  try {
    const id = req.params.jobId;
    let updatedJobPost = req.body;
    updatedJobPost = await JobPost.findByIdAndUpdate(
      { _id: id },
      updatedJobPost,
      {
        new: true,
      }
    );
    if (!updatedJobPost) {
      return res.status(404).json({ message: `Job Post not found` });
    }
    res.status(200).json({ jobposting: updatedJobPost });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
}

export async function removeJobPost(req, res) {
  try {
    const id = req.params.jobId;
    console.log(`removeJobPost${id}`);
    const deleted = await JobPost.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: `Job Post not found` });
    }
    res.status(204).json(deleted);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
}
