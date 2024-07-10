import express from "express";
import mongoose from "mongoose";
import { MONGODB_URI, PORT } from "./config.js";
import userRoutes from "./routes/userRoutes.js"; 
import connectDB from "./db.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the userRoutes router
app.use("/api", userRoutes);

// Start server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Error starting server: ${error.message}`);
    process.exit(1);
  }
};

startServer();

export default app;
