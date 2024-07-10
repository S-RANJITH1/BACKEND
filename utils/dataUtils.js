import connectDB from "../db.js";
import User from "../models/User.js";

const connectUserData = async () => {
  try {
    await connectDB();
    console.log("User Data MongoDB Connected");
  } catch (error) {
    console.error("Error connecting to User Data MongoDB:", error.message);
    process.exit(1);
  }
};

export { connectUserData };
