interface ProductEntity {
  id: string;
  title: string;
  description: string;
  price: number;
}

const productBook: ProductEntity = {
  id: '51422fcd-0366-4186-ad5b-c23059b6f64f',
  title: 'Book',
  description: 'A very interesting book',
  price: 100
}

const productLamp: ProductEntity = {
  id: '02482cer-03fe-1334-31cb-deduhd34dfg4',
  title: 'Lamp',
  description: 'Black',
  price: 1999
}

let productsArray: ProductEntity[] = [
  {
    id: '51422fcd-0366-4186-ad5b-c23059b6f64f',
    title: 'Book',
    description: 'A very interesting book',
    price: 100
  },
  {
    id: '02482cer-03fe-1334-31cb-deduhd34dfg4',
    title: 'Lamp',
    description: 'Black',
    price: 1999
  }
];

export { ProductEntity, productBook, productsArray, productLamp };