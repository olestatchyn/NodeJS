import { getAllProducts, getProductById } from '../repositories/product.repository';

function getProductList(){
  return getAllProducts();
}

function getSingleProduct(productId:string){
  return getProductById(productId);
}

export{ getProductList, getSingleProduct };