// import { Cart, User, CartItem, Product } from '../MonogDB/connecton';

// async function getCartById(userId) {
//   const cart = await Cart.findOne({
//     where: {
//       UserId: userId,
//       isDeleted: false,
//     },
//     include: [
//       {
//         model: CartItem,
//         include: [
//           {
//             model: Product,
//           },
//         ],
//       },
//     ],
//   });
//   return cart;
// }

// async function addNewCart(newCart) {
//   return await Cart.create(newCart);
// }

// async function editCartById(cartId, cartItems: any) {
//   try {
//     const cart = await Cart.findOne({ 
//       where: { 
//         id: cartId, 
//         isDeleted: false 
//       } 
//     });

//     if (cart) {
//       await updateCartItems(cart, cartItems.cartItems);
//       return cart;
//     } else {
//       throw new Error("Cart not found or already deleted");
//     }
//   } catch (error) {
//     throw new Error(`Error editing cart: ${error.message}`);
//   }
// }


// async function deleteCartById(userId) {
//   let cartToDelete = await Cart.findOne({
//     where: {
//       UserId: userId,
//       isDeleted: false
//     }
//   });

//   if (cartToDelete) {
//     await cartToDelete.update({ isDeleted: true });
//   }
// }


// async function updateCartItems(cart, cartItems) {
//   try {
//     for (const cartItem of cartItems) {
//       const existingCartItem = await CartItem.findByPk(cartItem.id);
//       if (existingCartItem) {
//         await existingCartItem.update({ count: cartItem.count });
//       } else {
//         await CartItem.create({
//           id: cartItem.id,
//           count: cartItem.count,
//           ProductId: cartItem.ProductId,
//           CartId: cart.id
//         });
//       }
//     }
//   } catch (error) {
//     throw new Error(`Error updating cart items: ${error.message}`);
//   }
// }

// export { getCartById, addNewCart, editCartById, deleteCartById };

import { Cart, User, CartItem, Product } from '../MonogoDB/connecton';

async function getCartById(userId) {
  try {
    const cart = await Cart.findOne({ userId: userId, isDeleted: false }).populate({
      path: 'cartItems',
      populate: {
        path: 'product'
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
    for (const cartItem of cartItems) {
      const existingCartItem = await CartItem.findOne({ _id: cartItem.id });
      if (existingCartItem) {
        await existingCartItem.updateOne({ count: cartItem.count });
      } else {
        await CartItem.create({
          _id: cartItem.id,
          count: cartItem.count,
          productId: cartItem.productId,
          cartId: cart._id
        });
      }
    }
  } catch (error) {
    throw new Error(`Error updating cart items: ${error.message}`);
  }
}

export { getCartById, addNewCart, editCartById, deleteCartById };