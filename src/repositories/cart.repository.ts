import { CartArray } from '../entities/cart.entity';

function getCartById(userId){
  return CartArray.find((cart) => cart.userId === userId && cart.isDeleted === false);
}

function addNewCart(newCart){
  return CartArray.push(newCart);
}

function editCartById(cartId, cartBody){
  let cartToUpdate = CartArray.find((cart) => cart.id === cartId && cart.isDeleted === false);
  Object.assign(cartToUpdate.items, cartBody.items);
  return cartToUpdate;
}

function deleteCartById(userId){
  let cartToDelete = CartArray.find((cart) => cart.userId === userId && cart.isDeleted === false);
  cartToDelete.isDeleted = true;
}

export { getCartById, addNewCart, editCartById, deleteCartById }