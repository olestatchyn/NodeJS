import express, { Request, Response } from 'express';
import { getProductList, getSingleProduct } from '../services/product.service';

let productRouter = express.Router();

productRouter.get('/products', (req: Request, res: Response) => {
  try {
    const productList = getProductList();
    res.status(200).json(productList);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

productRouter.get('/products/:productId', (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const foundProduct = getSingleProduct(productId);
    if (!foundProduct) {
      res.status(404).json('Product not found');
    }
    res.status(200).json(foundProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

export { productRouter };