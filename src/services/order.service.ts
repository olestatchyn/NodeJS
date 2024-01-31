import { createNewOrder } from '../repositories/order.repository';

function createOrder(orderBody){
  return createNewOrder(orderBody);
}

export { createOrder }