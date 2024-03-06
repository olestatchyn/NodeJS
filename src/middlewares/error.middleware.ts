export const errorHandlerMiddleware = (err, req, res, next) => {
  if (err) {
    const code = err?.code || 500;
    const message = err?.message || 'Internal Server Error';

    res.status(code).json({ message, code });
  }
}