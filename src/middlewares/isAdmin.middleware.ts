import { Request, Response, NextFunction } from 'express';
import { getUser } from '../services/user.service';
import Forbidden from '../errors/forbidden.error';
import { ErrorMessage } from '../errors/error-consts';

export async function isAdmin(req: Request, res: Response, next:NextFunction) {
  const userId = req.header('x-user-id');
  const user = await getUser(userId);
  
  if (user.role !== 'admin') {
    throw new Forbidden(ErrorMessage.notAdmin);
  }
  next();
}