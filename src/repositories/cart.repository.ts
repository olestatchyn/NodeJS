import { Cart, CartItem } from '../schemas/relations';

async function getCartById(userId) {
  try {
    const cart = await Cart.findOne({ userId: userId, isDeleted: false }).populate({
      path: 'cartItems',
      populate: {
        path: 'productId'
      }
    });
    return cart;
  } catch (error) {
    throw new Error(`Error getting cart: ${error.message}`);
  }
}

async function addNewCart(newCart) {
  try {
    const createdCart = await Cart.create(newCart);
    return createdCart;
  } catch (error) {
    throw new Error(`Error creating cart: ${error.message}`);
  }
}

async function editCartById(cartId, cartItems) {
  try {
    const cart = await Cart.findOne({ _id: cartId, isDeleted: false });
    if (cart) {
      await updateCartItems(cart, cartItems);
      return cart;
    } else {
      throw new Error("Cart not found or already deleted");
    }
  } catch (error) {
    throw new Error(`Error editing cart: ${error.message}`);
  }
}

async function deleteCartById(userId) {
  try {
    const cartToDelete = await Cart.findOne({ userId: userId, isDeleted: false });
    if (cartToDelete) {
      await cartToDelete.updateOne({ isDeleted: true });
    }
  } catch (error) {
    throw new Error(`Error deleting cart: ${error.message}`);
  }
}

async function updateCartItems(cart, cartItems) {
  try {
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
  } catch (error) {
    throw new Error(`Error updating cart items: ${error.message}`);
  }
}

export { getCartById, addNewCart, editCartById, deleteCartById };