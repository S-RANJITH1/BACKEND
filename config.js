import dotenv from 'dotenv';

dotenv.config();

export const MONGODB_URI = 'mongodb://localhost:27017/fitnesstracker';
export const PORT = process.env.PORT || 8000;