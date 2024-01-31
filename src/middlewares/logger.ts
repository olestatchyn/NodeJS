import { Request, Response, NextFunction } from 'express'

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`New request: ${req.method}, ${req.url}`);
  next();
}

export { logger }