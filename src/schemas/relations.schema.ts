import mongoose from "mongoose";
import userSchema from "./user.schema";
import productSchema from "./product.schema";
import cartItemSchema from "./cartItem.schema";
import cartSchema from "./cart.schema";
import orderSchema from "./order.schema";

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const CartItem = mongoose.model('CartItem', cartItemSchema);
const Cart = mongoose.model('Cart', cartSchema);
const Order = mongoose.model('Order', orderSchema);

export { User, Product, CartItem, Cart, Order }