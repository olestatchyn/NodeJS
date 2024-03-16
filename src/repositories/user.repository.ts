import mongoose from 'mongoose';
import { User } from '../schemas/relations.schema';
import { EntityNotFound } from '../errors/entity-not-found.error';
import { ErrorMessage } from '../errors/error-consts';

async function getUserById(userId) {
  const user = await User.findOne({ _id: userId });
  return user;
}

async function getUserByEmail(userEmail) {
  const user = await User.findOne({ email: userEmail })
  return user;
}

async function createUser(newUser) {
  return await User.create({
    _id: new mongoose.Types.ObjectId(),
    email: newUser.email,
    password: newUser.password,
    role: 'simple user'
  });
}

export { getUserById, getUserByEmail, createUser };