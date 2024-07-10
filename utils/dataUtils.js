import mongoose from "mongoose";
import User from "../models/User.js";

const MONGODB_URI = "mongodb://localhost:27017/yourdatabase";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

const uploadUser = async () => {
  try {
    await connectDB();

    const userData = {
      name: "Jack Daniel",
      email: "jd2@gmail.com",
      password: "jd4567",
      age: 27
    };

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      console.log("User with this email already exists:", existingUser);
      return;
    }

    const newUser = new User(userData);

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
