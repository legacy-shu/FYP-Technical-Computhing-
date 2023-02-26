import express from 'express';
import * as authController from '../controllers/auth.js'

const router = express.Router();

router.get('/check', authController.check)
router.post('/login', authController.login)

export default router;
