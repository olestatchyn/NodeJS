import { createNewOrder } from '../repositories/order.repository';

async function createOrder(orderBody){
  return await createNewOrder(orderBody);
}

export { createOrder }