import express from 'express';
import bodyParser from 'body-parser';
import { productRouter } from './src/controllers/product.controller';
import { cartRouter } from './src/controllers/cart.controller';
import { logger } from './src/middlewares/logger';
import { userIdValidation } from './src/middlewares/userIdValidation';
import { connect } from './src/PostgreSQL/Connecton';

const app = express();
const port = 5000;

connect();

app.use(bodyParser.json());
app.use(userIdValidation, logger);
app.use('/api', productRouter, cartRouter);

app.listen(port, () => {
  console.log(`App listening on port: http://localhost:${port}/`);
});