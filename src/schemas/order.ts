import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  payment: { type: mongoose.Schema.Types.Mixed, required: true },
  delivery: { type: mongoose.Schema.Types.Mixed, required: true },
  comments: { type: String, required: true },
  status: { type: String, enum: ['created', 'completed'], default: 'created' },
  total: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  cartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }]
});

export default orderSchema;