import connectDB from '../db.js';
import User from '../models/User.js';

const connectUserData = async () => {
  try {
    await connectDB();
    console.log('User Data MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to User Data MongoDB:', error.message);
    process.exit(1);
  }
};

const createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    console.log('User created successfully:', user);
    return user;
  } catch (error) {
    console.error('Error creating user:', error.message);
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email }).exec();
    if (user) {
      console.log('User found:', user);
    } else {
      console.log('User not found');
    }
    return user;
  } catch (error) {
    console.error('Error finding user:', error.message);
  }
};

const updateUser = async (email, updateData) => {
  try {
    const user = await User.findOneAndUpdate({ email }, updateData, {
      new: true,
    }).exec();
    if (user) {
      console.log('User updated successfully:', user);
    } else {
      console.log('User not found for update');
    }
    return user;
  } catch (error) {
    console.error('Error updating user:', error.message);
  }
};

const deleteUser = async (email) => {
  try {
    const result = await User.deleteOne({ email }).exec();
    if (result.deletedCount > 0) {
      console.log('User deleted successfully');
    } else {
      console.log('User not found for deletion');
    }
    return result;
  } catch (error) {
    console.error('Error deleting user:', error.message);
  }
};

export { connectUserData, createUser, findUserByEmail, updateUser, deleteUser };
