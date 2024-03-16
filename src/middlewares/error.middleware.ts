import { errorLogger } from "../logger/error.logger";

export const errorHandlerMiddleware = (err, req, res, next) => {
  if (err) {
    const code = err.code || 500;
    const message = err.message || 'Internal Server Error';

    errorLogger.error({ error: err, message, code });

    res.status(code).json({ message, code });
  }
}