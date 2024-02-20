import { getCartById, addNewCart, editCartById, deleteCartById } from '../repositories/cart.repository';
import { v4 as uuidv4 } from 'uuid';

async function getSingleCart(userId){
  const foundCart = await getCartById(userId);
  if(!foundCart) {
    const newCart = {
      id: uuidv4(),
      UserId: userId,
      isDeleted: false
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