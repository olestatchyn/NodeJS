import express from 'express';
import bodyParser from 'body-parser';
import { productRouter } from './src/controllers/product.controller';
import { cartRouter } from './src/controllers/cart.controller';
import { logger } from './src/middlewares/logger';
import { userIdValidation } from './src/middlewares/userIdValidation';
import { connectToDb } from './src/MonogoDB/connecton';
import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// async function connectToDb() {
//   // await connect();
//   try {
//     const mongoURI = 'mongodb://mongoDB:123456@mongoDB:27017/node_gmp';
//     await mongoose.connect(mongoURI)
//       .then(() => console.log('Connection has been established successfully'));
//     // console.log('All models were synchronized successfully.');
//     // console.log('All seedings were successful');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

connectToDb();

app.use(bodyParser.json());
app.use(userIdValidation, logger);
app.use('/api', productRouter, cartRouter);

app.listen(PORT, async () => {
  console.log(`App listening on port: http://localhost:${PORT}/`);
});