import express from "express";
import * as jobPostController from "../controllers/jobPost.js";

const router = express.Router();

router.post("/", jobPostController.registerJobPost);
router.post("/:id", jobPostController.applyJob);

router.get("/all", jobPostController.getAllJobs);
router.get("/:keyword", jobPostController.getJobsWithKeyWord);

router.get("/:id", jobPostController.getAjobById);
router.get("/", jobPostController.getJobsByEmail);

router.put("/:id", jobPostController.updateJobPost);

router.delete("/:id", jobPostController.removeJobPost);

export default router;
