import { getCartById, addNewCart, editCartById, deleteCartById } from '../repositories/cart.repository';
import mongoose from 'mongoose';

async function getSingleCart(userId){
  const foundCart = await getCartById(userId);
  if(!foundCart) {
    const newCart = {
      _id: new mongoose.Types.ObjectId(),
      userId: userId,
      isDeleted: false,
      cartItems: [],
    };
    await addNewCart(newCart);
    return newCart;
  } else {
    return foundCart;
  }
}

async function editCart(cartId, cartBody){
  return await editCartById(cartId, cartBody);
}

async function deleteCart(userId){
  await deleteCartById(userId);
}

export { getSingleCart, editCart, deleteCart };