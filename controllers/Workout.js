import Workout from '../models/Workout.js';

export const createWorkout = async (req, res) => {
  const { user, category, caloriesBurned, date } = req.body;

  try {
    
    const newWorkout = new Workout({
      user,
      category,
      caloriesBurned,
      date,
    });

    await newWorkout.save();

    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
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
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const workout = await Workout.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Workout.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
