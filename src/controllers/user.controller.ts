import express, { Request, Response } from 'express';
import { registerUser } from '../services/user.service';
import { userRegisterEntitySchema } from '../validation/validation';

let userRouter = express.Router();

userRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const bodyValidation = userRegisterEntitySchema.validate(req.body);

    if (bodyValidation.error) {
      return res.status(400).send(bodyValidation.error.message);
    }

    let userInfo = req.body;
    const newUser = await registerUser(userInfo);

    if(newUser === null){
      res.status(409).send({ message: 'User already exists' });
    }

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

userRouter.get('/login', async (req: Request, res: Response) => {
  try {
    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

export { userRouter };