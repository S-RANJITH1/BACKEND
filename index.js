import express from "express";
import mongoose from "mongoose";
import { MONGODB_URI, PORT } from "./config.js";
import userRoutes from "./routes/userRoutes.js"; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the userRoutes router
app.use("/api", userRoutes);

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

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
