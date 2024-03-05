import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export async function verifyToken (req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Token is required");
  }

  const [tokenType, token] = authHeader.split(' ');

  if (tokenType !== 'Bearer') {
    return res.status(403).send("Invalid Token");
  }

  try {
    const user = jwt.verify(token, process.env.TOKEN_KEY!);

    req.user = user;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
}