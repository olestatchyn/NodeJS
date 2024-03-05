import { Request, Response, NextFunction } from 'express';
import { getUserById } from '../repositories/user.repository';

export async function isAdmin(req: Request, res: Response, next:NextFunction) {
  const userId = req.header('x-user-id');
  const user = await getUserById(userId);
  
  if (user.role !== 'admin') {
    return res.status(401).send('Only admins can do that');
  }
  next();
}