import express from 'express';
import { signUp, login, getUserById } from '../controllers/User.js';
import verifyToken from '../middleware/verifyToken.js'; 

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/profile/:id', verifyToken, getUserById);

export default router;
