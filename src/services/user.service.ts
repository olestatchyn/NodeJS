import { createUser, getUserByEmail, getUserPassword } from "../repositories/user.repository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


async function registerUser(userInfo) {
  if(await getUserByEmail(userInfo.email)) {
    return null;
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(userInfo.password, saltRounds);
  userInfo.password = hashedPassword;

  return await createUser(userInfo);
}

async function loginUser(userInfo) {
  const emailReceived =  userInfo.email;
  const passwordReceived =  userInfo.password;

  if(await getUserByEmail(emailReceived)) {
    const storedPassword = await getUserPassword(emailReceived);
    const passwordMatch = await bcrypt.compare(passwordReceived, storedPassword);

    if(passwordMatch){
      const token = jwt.sign({ email: emailReceived }, process.env.TOKEN_KEY, { expiresIn: '2h' });
      return token;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export{ registerUser, loginUser };