// import { Product } from '../MonogDB/connecton';

// async function getAllProducts() {
//   return await Product.findAll();
// }

// async function getProductById(productId) {
//   return await Product.findOne({
//     where: {
//       id: productId
//     }
//   });
// }

// export { getAllProducts, getProductById };

import { Product } from '../MonogoDB/connecton';

async function getAllProducts() {
  try {
    return await Product.find();
  } catch (error) {
    throw new Error(`Error getting all products: ${error.message}`);
  }
}

async function getProductById(productId) {
  try {
    return await Product.findOne({ _id: productId });
  } catch (error) {
    throw new Error(`Error getting product by ID: ${error.message}`);
  }
}

export { getAllProducts, getProductById };
