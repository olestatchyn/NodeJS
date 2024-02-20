import { Product } from '../PostgreSQL/connecton';

async function getAllProducts() {
  return await Product.findAll();
}

async function getProductById(productId) {
  return await Product.findOne({
    where: {
      id: productId
    }
  });
}

export { getAllProducts, getProductById };