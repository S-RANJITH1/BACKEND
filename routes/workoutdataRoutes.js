import express from 'express';
const router = express.Router();

router.post('/api/workoutdata', (req, res) => {
  try {

    console.log('Received workout data:', req.body);
    res.status(200).json({ message: 'Workout data received successfully' });
  } catch (error) {
    console.error('Error handling workout data:', error);
    res.status(500).json({ message: 'Failed to handle workout data', error: error.message });
  }
});

export default router;
