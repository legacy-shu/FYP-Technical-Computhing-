import express from 'express';
import * as jobController from '../controller/index.js'
const router = express.Router();
router.get('/', jobController.getJobs)
export default router;