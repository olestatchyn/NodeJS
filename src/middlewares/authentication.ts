import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Unauthorized from '../errors/unauthorized.error';
import { ErrorMessage } from '../errors/error-consts';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export async function verifyToken (req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Unauthorized(ErrorMessage.noToken);
    }

    const [tokenType, token] = authHeader.split(' ');

    if (tokenType !== 'Bearer') {
      throw new Unauthorized(ErrorMessage.noToken);
    }

    const user = jwt.verify(token, process.env.TOKEN_KEY);

    req.user = user;

    return next();
  } catch (error) {
    next(error);
  }
}