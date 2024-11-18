import express from 'express';
import { createWorkout, getAllWorkouts, getWorkoutById, updateWorkout, deleteWorkout } from '../controllers/Workout.js';
import verifyToken from '../middleware/verifyToken.js'; 

const router = express.Router();

router.post('/', verifyToken, createWorkout); 
router.get('/', verifyToken, getAllWorkouts);
router.get('/:id', verifyToken, getWorkoutById);
router.put('/:id', verifyToken, updateWorkout);
router.delete('/:id', verifyToken, deleteWorkout);

export default router;
