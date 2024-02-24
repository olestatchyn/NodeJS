const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
});

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const cartItemSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  count: { type: Number, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
});

const cartSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  isDeleted: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const orderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  payment: { type: mongoose.Schema.Types.Mixed, required: true },
  delivery: { type: mongoose.Schema.Types.Mixed, required: true },
  comments: { type: String, required: true },
  status: { type: String, enum: ['created', 'completed'], default: 'created' },
  total: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const CartItem = mongoose.model('CartItem', cartItemSchema);
const Cart = mongoose.model('Cart', cartSchema);
const Order = mongoose.model('Order', orderSchema);

const uri = "mongodb://db:27017/test";
const connectToDb = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected");
  }
  catch (error) {
    console.log("ERROR");
    console.log(error.message);
  } 
}

export { connectToDb, User, Cart, CartItem, Order, Product }