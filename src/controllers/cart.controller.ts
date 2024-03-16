import express, { NextFunction, Request, Response } from 'express';
import { getSingleCart, editCart, deleteCart } from '../services/cart.service';
import { createOrder } from '../services/order.service'
import { orderEntitySchema, cartPutEntitySchema } from '../validation/validation'
import { isAdmin } from '../middlewares/isAdmin.middleware';
import BadRequestError from '../errors/bad-request.error';
import { ErrorMessage } from '../errors/error-consts';

let cartRouter = express.Router();

cartRouter.get('/profile/cart', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.header('x-user-id');
    const foundCart = await getSingleCart(userId);
    res.status(200).json(foundCart);
  } catch (error) {
    // console.log(error);
    next(error);
  }
});

cartRouter.put('/profile/cart', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bodyValidation = cartPutEntitySchema.validate(req.body);

    if (bodyValidation.error) {
      throw new BadRequestError(ErrorMessage.invalidData);
    }

    const cartItems = req.body;
    const cartId = req.header('id');
    const editedCart = await editCart(cartId, cartItems);
    res.status(200).json(editedCart);
  } catch (error) {
    // console.log(error);
    next(error);
  }
});

cartRouter.delete('/profile/cart', isAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.header('x-user-id');
    await deleteCart(userId);
    res.status(204).send('Cart successfully deleted');
  } catch (error) {
    // console.log(error);
    next(error);
  }
});

cartRouter.post('/profile/cart/checkout', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bodyValidation = orderEntitySchema.validate(req.body);

    if (bodyValidation.error) {
      throw new BadRequestError(ErrorMessage.invalidData);
    }
    const orderBody = req.body;
    const createdOrder = await createOrder(orderBody);

    res.status(201).json(createdOrder);
  } catch (error) {
    // console.log(error);
    next(error);
  }
});

export { cartRouter }