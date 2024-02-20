import { User } from '../PostgreSQL/connecton';

async function getUserById(userId) {
  return await User.findOne({
    where: {
      id: userId
    }
  });
}

export { getUserById };
