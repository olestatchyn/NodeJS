// import { CartItem, Order } from '../MonogDB/connecton';
// import { v4 as uuidv4 } from 'uuid';

// async function createNewOrder(orderBody) {
//   try {
//     const orderId = uuidv4();

//     const newOrder = await Order.create({
//       id: orderId,
//       payment: orderBody.payment,
//       delivery: orderBody.delivery,
//       comments: orderBody.comments,
//       status: 'created',
//       total: orderBody.total,
//       userId: orderBody.userId,
//       cartId: orderBody.cartId,
//     });

//     await Promise.all(orderBody.items.map(async (itemId) => {
//       await CartItem.update({ orderId: orderId }, { where: { id: itemId } });
//     }));

//     return newOrder;

//   } catch (error) {
//     throw error;
//   }
// }

// export { createNewOrder };

import { CartItem, Order } from '../MonogoDB/connecton';
import { v4 as uuidv4 } from 'uuid';

async function createNewOrder(orderBody) {
  try {
    const orderId = uuidv4();

    const newOrder = await Order.create({
      _id: orderId,
      payment: orderBody.payment,
      delivery: orderBody.delivery,
      comments: orderBody.comments,
      status: 'created',
      total: orderBody.total,
      userId: orderBody.userId,
      cartId: orderBody.cartId,
    });

    await Promise.all(orderBody.items.map(async (itemId) => {
      await CartItem.updateOne({ _id: itemId }, { orderId: orderId });
    }));

    return newOrder;

  } catch (error) {
    throw new Error(`Error creating new order: ${error.message}`);
  }
}

export { createNewOrder };