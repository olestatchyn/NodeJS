import express, { Request, Response } from 'express';
import { getSingleCart, editCart, deleteCart } from '../services/cart.service';
import { createOrder } from '../services/order.service'
import { orderEntitySchema, cartPutEntitySchema } from '../validation/validation'

let cartRouter = express.Router();

cartRouter.get('/profile/cart/:userId', (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const foundCart = getSingleCart(userId);
    res.status(200).json(foundCart);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' })
  }
});

cartRouter.put('/profile/cart', (req: Request, res: Response) => {
  try {
    const bodyValidation = cartPutEntitySchema.validate(req.body);

    if (bodyValidation.error) {
      return res.status(500).send(bodyValidation.error.message);
    }
    const cartItems = req.body;
    const cartId = req.header('id');
    const editedCart = editCart(cartId, cartItems);
    res.status(200).json(editedCart);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' })
  }
});

cartRouter.delete('/profile/cart', (req: Request, res: Response) => {
  try {
    const userId = req.header('x-user-id');
    deleteCart(userId);
    res.status(204).send('Cart successfully deleted');
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' })
  }
});

cartRouter.post('/profile/cart/checkout', (req: Request, res: Response) => {
  try {
    const bodyValidation = orderEntitySchema.validate(req.body);

    if (bodyValidation.error) {
      return res.status(500).send(bodyValidation.error.message);
    }
    const orderBody = req.body;
    const createdOrder = createOrder(orderBody);

    res.status(201).json(createdOrder);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' })
  }
});

export { cartRouter }