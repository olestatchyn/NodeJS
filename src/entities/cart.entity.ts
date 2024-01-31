import { ProductEntity, productBook, productLamp } from './product.entity'

interface CartItemEntity {
  product: ProductEntity;
  count: number;
}

interface CartEntity {
  id: string;
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
}

const cartItemBook: CartItemEntity = {
  product: productBook,
  count: 2,
}

const cartItemLamp: CartItemEntity = {
  product: productLamp,
  count: 8,
}

const cart1: CartEntity = {
  id: '1434fec6-cd85-420d-95c0-eee2301a971d',
  userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
  isDeleted: false,
  items: [cartItemBook],
}

const cart2: CartEntity = {
  id: '4213fec6-cd85-420d-95c0-eee2301a971d',
  userId: '6nt12b43-49bc-4aab-a227-f84df899a6cb',
  isDeleted: false,
  items: [cartItemBook, cartItemLamp]
}

const deleted: CartEntity = {
  id: 'deleted',
  userId: 'deleted',
  isDeleted: true,
  items: [cartItemBook, cartItemLamp]
}

let CartArray: CartEntity[] = [cart1, cart2, deleted];

export { cart1, CartItemEntity, CartEntity, CartArray }