import express from "express";
import { PORT } from "./config.js";
import connectDB from "./db.js";
import userRoutes from "./routes/userRoutes.js";
import workoutdataRoutes from "./routes/workoutdataRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/workoutdata", workoutdataRoutes);

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
