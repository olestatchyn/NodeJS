import mongoose from "mongoose";
import { User, Product, CartItem, Cart, Order } from '../schemas/relations';

export default async function seeding() {
  try {
    const user1 = await User.create({ _id: new mongoose.Types.ObjectId('000000000000000000000009'), email: 'admin@example.com', password: 'adminpassword', role: 'admin'});
    const user2 = await User.create({ _id: new mongoose.Types.ObjectId('000000000000000000000099'), email: 'user@example.com', password: 'userpassword', role: 'simple user'});

    const product1 = await Product.create({
      _id: new mongoose.Types.ObjectId('000000000000000000000001'),
      title: 'Product 1',
      description: 'Description for product 1',
      price: 10
    });

    const product2 = await Product.create({
      _id: new mongoose.Types.ObjectId('000000000000000000000002'),
      title: 'Product 2',
      description: 'Description for product 2',
      price: 20
    });

    const product3 = await Product.create({
      _id: new mongoose.Types.ObjectId('000000000000000000000003'),
      title: 'Product 3',
      description: 'Description for product 3',
      price: 30
    });

    const cartItem1 = await CartItem.create({
      _id: new mongoose.Types.ObjectId('000000000000000000000011'),
      count: 2,
      productId: product1._id
    });

    const cartItem2 = await CartItem.create({
      _id: new mongoose.Types.ObjectId('000000000000000000000012'),
      count: 1,
      productId: product2._id
    });

    const cart1 = await Cart.create({
      _id: new mongoose.Types.ObjectId('000000000000000000000101'),
      userId: user1._id,
      cartItems: [cartItem1._id],
    });

    const cart2 = await Cart.create({
      _id: new mongoose.Types.ObjectId('000000000000000000000102'),
      userId: user2._id,
      cartItems: [cartItem1._id, cartItem2._id],
    });

    const order1 = await Order.create({
      _id: new mongoose.Types.ObjectId('000000000000000000001001'),
      payment: { method: 'Credit Card' },
      delivery: { address: 'Address 1' },
      comments: 'Order 1 comments',
      total: 30,
      userId: user1._id,
      cartId: cart1._id,
      cartItems: [cartItem1._id],
    });

    console.log('Records created successfully');
  } catch (error) {
    throw new Error(`Error during seeding: ${error.message}`);
  }
}