import mongoose from 'mongoose';
import { User } from '../schemas/relations';

async function getUserById(userId) {
  try {
    return await User.findOne({ _id: userId });
  } catch (error) {
    throw new Error(`Error getting user by ID: ${error.message}`);
  }
}

async function getUserByEmail(userEmail) {
  try {
    return await User.findOne({ email: userEmail });
  } catch (error) {
    throw new Error(`Error getting user by ID: ${error.message}`);
  }
}

async function createUser(newUser) {
  try {
    return await User.create({
      _id: new mongoose.Types.ObjectId(),
      email: newUser.email,
      password: newUser.password,
      role: 'simple user'
    });
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}

export { getUserById, getUserByEmail, createUser };