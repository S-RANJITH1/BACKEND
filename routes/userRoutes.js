import express from 'express';
import { signUp, login, getUserById } from '../controllers/User.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/profile/:id', verifyToken, getUserById);
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
