import { Request, Response, NextFunction } from 'express';
import { createLogger, transports, format } from 'winston';

const endpointLogger = createLogger({
  transports: [
    new transports.Console()
  ],
  format: format.combine(
    format.timestamp(),
    format.printf(info => `${info.timestamp} - New request: ${info.message}`)
  )
});

export const expressLogger = (req: Request, res: Response, next: NextFunction) => {
  const { method, url } = req;
  endpointLogger.info(`${method} ${url}`);
  next();
};