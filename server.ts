import express from 'express';
import bodyParser from 'body-parser';
import { productRouter } from './src/controllers/product.controller';
import { cartRouter } from './src/controllers/cart.controller';
import { userRouter } from './src/controllers/user.controller';
import { expressLogger } from './src/logger/endpoint.logger';
import { userIdValidation } from './src/middlewares/userIdValidation.middleware';
import { connectToDb, dbStatus } from './src/MonogoDB/connecton';
import { verifyToken } from './src/middlewares/authentication.middleware';
import handleSeed from './src/seeding/seeding';
import { errorHandlerMiddleware } from './src/middlewares/error.middleware';

const app = express();
const port = process.env.PORT|| 88;

app.use((req, res, next) => {
  if (req.path !== '/api/login' && req.path !== '/api/register' && req.path !== '/health') {
    verifyToken(req, res, next);
  } else {
    next();
  }
});

app.use(userIdValidation, expressLogger);

app.use(bodyParser.json());
app.use('/api', productRouter, cartRouter, userRouter);

app.get('/health', (req, res) => {
  const dbHealth = dbStatus();
  const message = `Application is healthy. Database status: ${dbHealth}`;
  res.status(200).json({ message });
});

app.use(errorHandlerMiddleware);
 
const server = app.listen(port, async () => {
  await connectToDb();
  await handleSeed();
  console.log(`App listening on port: http://localhost:${port}/`);
});

function shutdown() {
  console.log('Received kill signal, shutting down gracefully');
  
  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);