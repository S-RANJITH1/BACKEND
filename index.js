import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config.js";
import UserRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = 7000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", UserRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Default route
app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Welcome to the Full Stack Developer API",
  });
});

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error("Error starting server:", error.message);
    process.exit(1);
  }
};

startServer();

export default app;
