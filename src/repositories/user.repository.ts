import { usersArray } from '../entities/user.entity';

function getUserById(userId: string) {
  return usersArray.find(user => user.id === userId);
}

export { getUserById }