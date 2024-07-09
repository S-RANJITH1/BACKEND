import mongoose from "mongoose";
import User from "../models/User.js";

const MONGODB_URI = "mongodb://localhost:27017/yourdatabase";

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

const uploadUser = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    const userData = {
      name: "Will Jacks",
      email: "willjack@gmail.com",
      password: "will1234",
      age: 25
    };

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      console.log("User with this email already exists:", existingUser);
      return;
    }
    // Create a new instance of User model
    const newUser = new User(userData);

    // Save the user to MongoDB
    await newUser.save();

    console.log("User uploaded successfully:", newUser);
  } catch (error) {
    console.error("Error uploading user:", error.message);
   if (error.code === 11000) {
    console.error("Duplicate key error. User with this email already exists.");
   }
  } finally {
    mongoose.connection.close();
  }
};

uploadUser();

export { connectDB, uploadUser };
