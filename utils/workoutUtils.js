import connectDB from "../db.js";
import Workout from "../models/Workout.js";

const connectWorkoutData = async () => {
  try {
    await connectDB();
    console.log("Workout Data MongoDB Connected");
  } catch (error) {
    console.error("Error connecting to Workout Data MongoDB:", error.message);
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
        caloriesBurned: 600,
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
      },
    ];

    const insertedWorkouts = await Workout.insertMany(workoutData);

    console.log("Workout data uploaded successfully:", insertedWorkouts);
  } catch (error) {
    console.error("Error uploading workout data:", error);
  } finally {
    mongoose.connection.close();
  }
};

export { connectWorkoutData, uploadWorkoutData };