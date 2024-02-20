// import { CartArray } from '../entities/cart.entity';

// function getCartById(userId){
//   return CartArray.find((cart) => cart.userId === userId && cart.isDeleted === false);
// }

// function addNewCart(newCart){
//   return CartArray.push(newCart);
// }

// function editCartById(cartId, cartBody){
//   let cartToUpdate = CartArray.find((cart) => cart.id === cartId && cart.isDeleted === false);
//   Object.assign(cartToUpdate.items, cartBody.items);
//   return cartToUpdate;
// }

// function deleteCartById(userId){
//   let cartToDelete = CartArray.find((cart) => cart.userId === userId && cart.isDeleted === false);
//   cartToDelete.isDeleted = true;
// }

// export { getCartById, addNewCart, editCartById, deleteCartById }

import { Cart, User, CartItem, Product } from '../PostgreSQL/connecton';

async function getCartById(userId) {
  const cart = await Cart.findOne({
    where: {
      UserId: userId,
      isDeleted: false,
    },
    include: [
      {
        model: CartItem,
        include: [
          {
            model: Product,
          },
        ],
      },
    ],
  });
  return cart;
}

async function addNewCart(newCart) {
  return await Cart.create(newCart);
}

async function editCartById(cartId, cartItems: any) {
  try {
    const cart = await Cart.findOne({ 
      where: { 
        id: cartId, 
        isDeleted: false 
      } 
    });

    if (cart) {
      await updateCartItems(cart, cartItems.cartItems);
      return cart;
    } else {
      throw new Error("Cart not found or already deleted");
    }
  } catch (error) {
    throw new Error(`Error editing cart: ${error.message}`);
  }
}


async function deleteCartById(userId) {
  let cartToDelete = await Cart.findOne({
    where: {
      UserId: userId,
      isDeleted: false
    }
  });

  if (cartToDelete) {
    await cartToDelete.update({ isDeleted: true });
  }
}


async function updateCartItems(cart, cartItems) {
  try {
    for (const cartItem of cartItems) {
      const existingCartItem = await CartItem.findByPk(cartItem.id);
      if (existingCartItem) {
        await existingCartItem.update({ count: cartItem.count });
      } else {
        await CartItem.create({
          id: cartItem.id,
          count: cartItem.count,
          ProductId: cartItem.ProductId,
          CartId: cart.id
        });
      }
    }
  } catch (error) {
    throw new Error(`Error updating cart items: ${error.message}`);
  }
}

export { getCartById, addNewCart, editCartById, deleteCartById };