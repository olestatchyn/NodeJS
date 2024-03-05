import express, { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/user.service';
import { userRegisterLoginEntitySchema } from '../validation/validation';

let userRouter = express.Router();

userRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const bodyValidation = userRegisterLoginEntitySchema.validate(req.body);

    if (bodyValidation.error) {
      return res.status(400).send(bodyValidation.error.message);
    }

    let userInfo = req.body;
    const newUser = await registerUser(userInfo);

    if(newUser === null){
      return res.status(409).send({ message: 'User already exists' });
    }

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

userRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const bodyValidation = userRegisterLoginEntitySchema.validate(req.body);

    if (bodyValidation.error) {
      return res.status(400).send(bodyValidation.error.message);
    }

    let userInfo = req.body;
    const token = await loginUser(userInfo);

    if(token === null){
      return res.status(400).send({ message: 'Wrong email or password' });
    }

    res.status(200).json(token);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

export { userRouter };