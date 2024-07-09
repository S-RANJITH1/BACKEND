// uploadWorkoutData.js

import mongoose from "mongoose";
import Workout from "./models/Workout.js"; // Adjust path to your Workout model

const MONGODB_URI = "mongodb://localhost:27017/yourdatabase"; // Replace with your MongoDB URI

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

const uploadWorkoutData = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Example workout data
    const workoutData = [
      {
        user: "60e8b02fca785c4cf8f7a3e1", // Replace with a valid ObjectId of a User document
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
      // Add more workout data as needed
    ];

    // Insert workout data into MongoDB
    await Workout.insertMany(workoutData);

    console.log("Workout data uploaded successfully");
  } catch (error) {
    console.error("Error uploading workout data:", error.message);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
};

// Call the function to upload workout data
uploadWorkoutData();
