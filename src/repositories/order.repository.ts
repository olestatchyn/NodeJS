import { orderArray } from '../entities/order.entity';

function createNewOrder(order) {
  orderArray.push(order);
  return order;
}

export { createNewOrder }