import { Request, Response, NextFunction } from 'express';
import { getUserById } from '../repositories/user.repository';
import { EntityNotFound } from '../errors/entity-not-found.error';
import { ErrorMessage } from '../errors/error-consts';

export const userIdValidation = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.header('x-user-id');
  if(userId && !getUserById(userId)) {
    throw new EntityNotFound(ErrorMessage.userNotFound);
  }
  next();
}