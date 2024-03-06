import { EntityNotFound } from '../errors/entity-not-found.error';
import { ErrorMessage } from '../errors/error-consts';
import { Product } from '../schemas/relations';

async function getAllProducts() {
  const products = await Product.find();
  return products;
}

async function getProductById(productId) {
  const product = await Product.findOne({ _id: productId });
  return product;
}

export { getAllProducts, getProductById };
