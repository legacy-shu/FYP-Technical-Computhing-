import express from "express";
import * as jobPostController from "../controllers/jobPost.js";

const router = express.Router();

router.post("/seedonly", jobPostController.seedonly);
router.get("/seedonly/drop", jobPostController.seedonlyDorpCollection);

router.post("/", jobPostController.registerJobPost);
router.post("/:jobId", jobPostController.applyJob);

router.get("/", jobPostController.getAllJobs);
router.get("/search", jobPostController.searchJobPosts);

router.get("/:jobId", jobPostController.getjobById);
router.get("/:userId/posted", jobPostController.getJobsByUserId);

router.put("/:jobId", jobPostController.updateJobPost);

router.delete("/:jobId", jobPostController.removeJobPost);

export default router;
