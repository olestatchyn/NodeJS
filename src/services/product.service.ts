import { getAllProducts, getProductById } from '../repositories/product.repository';

async function getProductList(){
  return await getAllProducts();
}

async function getSingleProduct(productId:string){
  return await getProductById(productId);
}

export{ getProductList, getSingleProduct };