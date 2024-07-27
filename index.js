import express from 'express';
import mongoose from 'mongoose';
import { PORT } from './config.js';
import userRoutes from './routes/userRoutes.js';
import workoutdataRoutes from './routes/workoutdataRoutes.js';
import connectDB from './db.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutdataRoutes);

const startServer = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected successfully');

    const server = app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });

    const shutdown = (signal) => {
      console.log(`Received ${signal}. Closing HTTP server...`);
      server.close(() => {
        console.log('HTTP server closed.');
        mongoose.connection.close(() => {
          console.log('MongoDB connection closed.');
          process.exit(0);
        });
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    console.error(`Error starting server: ${error.message}`);
    process.exit(1);
  }
};

startServer();

export default app;
