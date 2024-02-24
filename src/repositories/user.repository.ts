// import { User } from '../MonogDB/connecton';

// async function getUserById(userId) {
//   return await User.findOne({
//     where: {
//       id: userId
//     }
//   });
// }

// export { getUserById };

import { User } from "../MonogoDB/connecton";


async function getUserById(userId) {
    try {
      return await User.findOne({ _id: userId });
    } catch (error) {
      throw new Error(`Error getting user by ID: ${error.message}`);
    }
  }
  
export { getUserById };