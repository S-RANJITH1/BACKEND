import mongoose from 'mongoose';
import connectDB from './db.js';
import User from './models/User.js';

export const uploadUserData = async () => {
  try {
    await connectDB();

    const userData = [
      { name: 'Alice', email: 'alice@example.com', password: 'password123' },
      { name: 'Bob', email: 'bob@example.com', password: 'password456' },
      { name: 'Ranjith', email: 'ranjith@gmail.com', password: 'password789'}
    ];

    const operations = userData.map(user => ({
      updateOne: {
        filter: { email: user.email },
        update: { $set: user },
        upsert: true
      }
    }));

    const result = await User.bulkWrite(operations);

    console.log('User data processed successfully:', result);

  } catch (error) {
    if (error.code === 11000) {
      console.error('Duplicate key error:', error.message);
    } else {
      console.error('Error uploading user data:', error);
    }
  } finally {
    mongoose.connection.close();
  }
};
