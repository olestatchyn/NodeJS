import express, { NextFunction, Request, Response } from 'express';
import { getProductList, getSingleProduct } from '../services/product.service';
import BadRequestError from '../errors/bad-request.error';
import { ErrorMessage } from '../errors/error-consts';

let productRouter = express.Router();

productRouter.get('/products', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productList = await getProductList();
    res.status(200).json(productList);
  } catch (error) {
    // console.log(error);
    next(error);
  }
});

productRouter.get('/products/:productId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.productId;
    const foundProduct = await getSingleProduct(productId);
    if (!foundProduct) {
      throw new BadRequestError(ErrorMessage.productNotFound);
    }
    res.status(200).json(foundProduct);
  } catch (error) {
    // console.log(error);
    next(error);
  }
});

export { productRouter };