import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  caloriesBurned: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;
