import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  isDeleted: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  cartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }]
});

export default cartSchema;