import { createUser, getUserByEmail } from "../repositories/user.repository";

async function registerUser(userInfo) {
  if(await getUserByEmail(userInfo.email)) {
    return null;
  }
  return await createUser(userInfo);
}

// async function loginUser(productId:string) {
//   return await getUser(productId);
// }

export{ registerUser };