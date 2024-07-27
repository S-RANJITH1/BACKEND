import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', UserController.signUpUser);
router.post('/signin', UserController.signInUser);
router.get('/', UserController.getAllUsers);
router.post('/', UserController.createUser);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
