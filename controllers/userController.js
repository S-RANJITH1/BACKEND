import User from "../models/User.js";

export const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "Failed to sign up", error: error.message });
  }
};

export const signInUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if passwords match (you may want to use bcrypt or similar for secure password handling)
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      // Signin successful
      res.status(200).json({ message: "Signin successful", user });
    } catch (error) {
      console.error("Error signin in:", error);
      res.status(500).json({ message: "Failed to signin", error: error.message });
    }
  };