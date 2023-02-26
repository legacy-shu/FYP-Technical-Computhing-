import express from 'express';
import * as userController from '../controllers/user.js'

const router = express.Router();

router.post('/', userController.registerUser)
router.get('/:id', userController.getUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.removeUser)

export default router;