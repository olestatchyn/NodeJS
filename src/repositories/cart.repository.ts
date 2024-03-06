import { EntityNotFound } from '../errors/entity-not-found.error';
import { ErrorMessage } from '../errors/error-consts';
import { Cart, CartItem } from '../schemas/relations';

async function getCartById(userId) {
  const cart = await Cart.findOne({ userId: userId, isDeleted: false }).populate({
    path: 'cartItems',
    populate: {
      path: 'productId'
    }
  });
  return cart;
}

async function addNewCart(newCart) {
  const createdCart = await Cart.create(newCart);
  return createdCart;
}

async function editCartById(cartId, cartItems) {
  const cart = await Cart.findOne({ _id: cartId, isDeleted: false });

  if (!cart) throw new EntityNotFound(ErrorMessage.cartNotFound);
  
  await updateCartItems(cart, cartItems);
  return cart;
}

async function deleteCartById(userId) {
  const cartToDelete = await Cart.findOne({ userId: userId, isDeleted: false });

  if (!cartToDelete) throw new EntityNotFound(ErrorMessage.cartNotFound);

  await cartToDelete.updateOne({ isDeleted: true });
}

async function updateCartItems(cart, cartItems) {
  for (const cartItem of cartItems.cartItems) {
    const existingCartItem = await CartItem.findOne({ _id: cartItem._id });
    if (existingCartItem) {
      await existingCartItem.updateOne({ count: cartItem.count });
      if (!cart.cartItems.includes(existingCartItem._id)) {
        cart.cartItems.push(existingCartItem._id);
      }
    } else {
      const newCartItem = await CartItem.create({
        _id: cartItem._id,
        count: cartItem.count,
        productId: cartItem.productId
      });
      cart.cartItems.push(newCartItem._id);
    }
  }
  await cart.save();
}

export { getCartById, addNewCart, editCartById, deleteCartById };