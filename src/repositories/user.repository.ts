import { User } from '../schemas/relations';

async function getUserById(userId) {
  try {
    return await User.findOne({ _id: userId });
  } catch (error) {
    throw new Error(`Error getting user by ID: ${error.message}`);
  }
}

export { getUserById };