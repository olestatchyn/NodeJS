import { Request, Response, NextFunction } from 'express';
import { getUserById } from '../repositories/user.repository';

const userIdValidation = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.header('x-user-id');
  if(userId && !getUserById(userId)) {
    res.status(404).send('User not found');
  }
  next();
}

export { userIdValidation }