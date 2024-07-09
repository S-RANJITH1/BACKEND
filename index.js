import express from 'express';
import mongoose from 'mongoose';
import { MONGODB_URI, PORT } from './config.js';
import UserRoutes from './routes/userRoutes.js';
import { connectDB as connectUserData } from './utils/dataUtils.js';
import { connectDB as connectWorkoutData } from './utils/workoutUtils.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', UserRoutes);

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    });
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// Start server
const startServer = async () => {
  try {
    // Connect to user data
    await connectUserData();

    // Connect to workout data
    await connectWorkoutData();

    // Connect to MongoDB
    await connectDB();

    // Start the Express server
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error(`Error starting server: ${error.message}`);
    process.exit(1);
  }
};

startServer();

export default app;
