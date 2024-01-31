import { productsArray } from '../entities/product.entity';

function getAllProducts() {
  return productsArray;
}

function getProductById(productId: string) {
  return productsArray.find(product => product.id === productId);
}

export { getAllProducts, getProductById };