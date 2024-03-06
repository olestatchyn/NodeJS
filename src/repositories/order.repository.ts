import mongoose from 'mongoose';
import { Order } from '../schemas/relations';

async function createNewOrder(orderBody) {
  const newOrder = await Order.create({
    _id: new mongoose.Types.ObjectId(),
    payment: orderBody.payment,
    delivery: orderBody.delivery,
    comments: orderBody.comments,
    status: 'created',
    total: orderBody.total,
    userId: orderBody.userId,
    cartId: orderBody.cartId,
    cartItems: orderBody.cartItems,
  });

  await Order.create(newOrder);

  return newOrder;
}

export { createNewOrder };