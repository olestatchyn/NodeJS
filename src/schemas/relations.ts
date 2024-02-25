import mongoose from "mongoose";
import userSchema from "./user";
import productSchema from "./product";
import cartItemSchema from "./cartItem";
import cartSchema from "./cart";
import orderSchema from "./order";

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const CartItem = mongoose.model('CartItem', cartItemSchema);
const Cart = mongoose.model('Cart', cartSchema);
const Order = mongoose.model('Order', orderSchema);

export { User, Product, CartItem, Cart, Order }