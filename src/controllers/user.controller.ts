import express, { NextFunction, Request, Response } from 'express';
import { loginUser, registerUser } from '../services/user.service';
import { userRegisterLoginEntitySchema } from '../validation/validation';
import BadRequestError from '../errors/bad-request.error';
import { ErrorMessage } from '../errors/error-consts';

let userRouter = express.Router();

userRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bodyValidation = userRegisterLoginEntitySchema.validate(req.body);

    if (bodyValidation.error) {
      throw new BadRequestError(ErrorMessage.invalidData);
    }

    let userInfo = req.body;
    const newUser = await registerUser(userInfo);

    res.status(201).json(newUser);
  } catch (error) {
    // console.log(error);
    next(error);
  }
});

userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bodyValidation = userRegisterLoginEntitySchema.validate(req.body);

    if (bodyValidation.error) {
      throw new BadRequestError(ErrorMessage.invalidData);
    }

    let userInfo = req.body;
    const token = await loginUser(userInfo);

    res.status(201).json(token);
  } catch (error) {
    // console.log(error);
    next(error);
  }
});

export { userRouter };