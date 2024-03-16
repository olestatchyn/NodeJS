import { createLogger, transports, format } from 'winston';

export const errorLogger = createLogger({
  transports: [
    new transports.Console(),
  ],
  format: format.combine(
    format.timestamp(),
    format.printf(info => `${info.timestamp} - New error: ${info.message}`)
  )
});