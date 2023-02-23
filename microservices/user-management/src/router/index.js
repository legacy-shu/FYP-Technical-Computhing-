import express from 'express';
import * as userController from '../controller/index.js'
const router = express.Router();
router.get('/', userController.getUser)
export default router;