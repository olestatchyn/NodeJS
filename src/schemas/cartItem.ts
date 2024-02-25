import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  count: { type: Number, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
});

export default cartItemSchema;