import dotenv from 'dotenv';

dotenv.config();

export const MONGODB_URI = 'mongodb://localhost:27017/yourdatabase';
export const PORT = process.env.PORT || 7000;