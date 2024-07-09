import mongoose from "mongoose";
import Workout from "../models/Workout.js";

const MONGODB_URI = "mongodb://localhost:27017/yourdatabase"; 

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

const uploadWorkoutData = async () => {
  try {
    await connectDB();

    const workoutData = [
      {
        user: "60e8b02fca785c4cf8f7a3e1",
        category: "Running",
        caloriesBurned: 300,
        date: new Date("2024-07-10"),
      },
      {
        user: "60e8b02fca785c4cf8f7a3e1",
        category: "Weightlifting",
        caloriesBurned: 200,
        date: new Date("2024-07-09"),
      },
      {
        user: "60e8b02fca785c4cf8f7a3e1",
        category: "Skipping",
        caloriesBurned: 400,
        date: new Date("2024-07-10"),
      },
      {
        user: "60e8b02fca785c4cf8f7a3e1",
        category: "Cycling",
        caloriesBurned: 500,
        date: new Date("2024-07-11"),
      }
    ];

    await Workout.insertOne(workoutData);

    console.log("Workout data uploaded successfully");
  } catch (error) {
    console.error("Error uploading workout data:", error);
  } finally {
    mongoose.connection.close();
  }
};

uploadWorkoutData();

export { connectDB, uploadWorkoutData };
