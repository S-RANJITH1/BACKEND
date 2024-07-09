import mongoose from "mongoose";
import User from "./models/User.js"; // Adjust the path to your User model

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

const uploadUser = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Example data to upload
    const userData = {
      name: "Ranjith Kumar",
      email: "ranjithk@gmail.com",
      password: "password123",
      age: 30,
    };

    // Create a new instance of User model
    const newUser = new User(userData);

    // Save the user to MongoDB
    await newUser.save();

    console.log("User uploaded successfully:", newUser);
  } catch (error) {
    console.error("Error uploading user:", error.message);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
};

// Call the upload function
uploadUser();
