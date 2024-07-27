import express from 'express';
import WorkoutController from '../controllers/workoutController.js'; // Import the controller

const router = express.Router();

router.post('/', WorkoutController.createWorkout);
router.get('/', WorkoutController.getAllWorkouts);
router.get('/:id', WorkoutController.getWorkoutById);
router.put('/:id', WorkoutController.updateWorkout);
router.delete('/:id', WorkoutController.deleteWorkout);

export default router;
