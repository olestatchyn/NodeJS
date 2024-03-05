import express from 'express';
import bodyParser from 'body-parser';
import { productRouter } from './src/controllers/product.controller';
import { cartRouter } from './src/controllers/cart.controller';
import { userRouter } from './src/controllers/user.controller';
import { logger } from './src/middlewares/logger';
import { userIdValidation } from './src/middlewares/userIdValidation';
import { connectToDb } from './src/MonogoDB/connecton';
import dotenv from "dotenv";
import seeding from './src/seeding/seeding';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(userIdValidation, logger);
app.use('/api', productRouter, cartRouter, userRouter);

app.listen(port, async () => {
  await connectToDb();
  await seeding();
  console.log(`App listening on port: http://localhost:${port}/`);
});