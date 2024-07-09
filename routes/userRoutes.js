import express from "express";
import User from "../models/User.js";

const router = express.Router();

export const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Optionally, you can generate and send a token for authentication

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "Failed to sign up", error: error.message });
  }
};

export default router;
