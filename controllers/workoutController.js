import Workout from '../models/Workout.js';

export const createWorkout = async (req, res) => {
  const { user, category, caloriesBurned, date } = req.body;

  if (!user || !category || !caloriesBurned || !date) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    const newWorkout = new Workout({ user, category, caloriesBurned, date });
    await newWorkout.save();
    res.status(201).json({ message: 'Workout created successfully', workout: newWorkout });
  } catch (error) {
    console.error('Error creating workout:', error);
    res.status(500).json({ message: 'Failed to create workout', error: error.message });
  }
};

export const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json(workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({ message: 'Failed to fetch workouts', error: error.message });
  }
};

export const getWorkoutById = async (req, res) => {
  const { id } = req.params;

  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json(workout);
  } catch (error) {
    console.error('Error fetching workout:', error);
    res.status(500).json({ message: 'Failed to fetch workout', error: error.message });
  }
};

export const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const { user, category, caloriesBurned, date } = req.body;

  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    workout.user = user || workout.user;
    workout.category = category || workout.category;
    workout.caloriesBurned = caloriesBurned || workout.caloriesBurned;
    workout.date = date || workout.date;

    await workout.save();
    res.status(200).json({ message: 'Workout updated successfully', workout });
  } catch (error) {
    console.error('Error updating workout:', error);
    res.status(500).json({ message: 'Failed to update workout', error: error.message });
  }
};

export const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWorkout = await Workout.findByIdAndDelete(id);
    if (!deletedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json({ message: 'Workout deleted successfully', workout: deletedWorkout });
  } catch (error) {
    console.error('Error deleting workout:', error);
    res.status(500).json({ message: 'Failed to delete workout', error: error.message });
  }
};

const WorkoutController = {
  createWorkout,
  getAllWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout
};

export default WorkoutController;
