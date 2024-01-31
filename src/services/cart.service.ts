import { getCartById, addNewCart, editCartById, deleteCartById } from '../repositories/cart.repository';
import { CartEntity } from '../entities/cart.entity';
import { v4 as uuidv4 } from 'uuid';

function getSingleCart(userId){
  const foundCart = getCartById(userId);
  if(!foundCart) {
    const newCart: CartEntity = {
      id: uuidv4(),
      userId: userId,
      isDeleted: false,
      items: []
    };
    addNewCart(newCart);
    return newCart;
  } else {
    return foundCart;
  }
}

function editCart(cartId, cartBody){
  return editCartById(cartId, cartBody);
}

function deleteCart(userId){
  deleteCartById(userId);
}


export { getSingleCart, editCart, deleteCart };