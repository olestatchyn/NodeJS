import express, { Request, Response } from 'express';
import { getProductList, getSingleProduct } from '../services/product.service';

let productRouter = express.Router();

productRouter.get('/products', async (req: Request, res: Response) => {
  try {
    const productList = await getProductList();
    res.status(200).json(productList);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

productRouter.get('/products/:productId', async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const foundProduct = await getSingleProduct(productId);
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