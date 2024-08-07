import mongoose from 'mongoose';
import connectDB from './db.js';
import User from './models/User.js';

export const uploadUserData = async () => {
  try {
    await connectDB();

    const userData = [
      { name: 'Alice', email: 'alice@example.com', password: 'password123' },
      { name: 'Bob', email: 'bob@example.com', password: 'password456' },
    ];

    const insertedUsers = await User.insertMany(userData);

    console.log('User data uploaded successfully:', insertedUsers);
  } catch (error) {
    console.error('Error uploading user data:', error);
  } finally {
    mongoose.connection.close();
  }
};