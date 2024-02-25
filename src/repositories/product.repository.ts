import { Product } from '../schemas/relations';

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
