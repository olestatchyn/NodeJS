import express from 'express';
import bodyParser from 'body-parser';
import { productRouter } from './src/controllers/product.controller';
import { cartRouter } from './src/controllers/cart.controller';
import { userRouter } from './src/controllers/user.controller';
import { logger } from './src/middlewares/logger';
import { userIdValidation } from './src/middlewares/userIdValidation';
import { connectToDb } from './src/MonogoDB/connecton';
import { verifyToken } from './src/middlewares/authentication';
import seeding from './src/seeding/seeding';
import { errorHandlerMiddleware } from './src/middlewares/error.middleware';

const app = express();
const port = process.env.PORT;

app.use(errorHandlerMiddleware);

app.use((req, res, next) => {
  if (req.path !== '/api/login' && req.path !== '/api/register') {
    verifyToken(req, res, next);
  } else {
    next();
  }
});

app.use(bodyParser.json());
app.use(userIdValidation, logger);
app.use('/api', productRouter, cartRouter, userRouter);

app.listen(port, async () => {
  await connectToDb();
  await seeding();
  console.log(`App listening on port: http://localhost:${port}/`);
});