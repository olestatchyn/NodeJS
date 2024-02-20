import { User, Product, CartItem, Cart, Order } from './connecton';

async function seeding () {
  try {
    await User.bulkCreate([
      { id: '09f02e77-3fb5-40d4-9d2d-440b76627dc8' },
      { id: '70495e80-e9ec-451f-a677-011d53482894' }
    ]);

    await Product.bulkCreate([
      { id: '9249afa9-3538-4772-93ea-526e0b05a852', title: 'Product 1', description: 'Description for product 1', price: 10.99 },
      { id: 'd19f183e-092a-4daa-8911-1f2c31138de5', title: 'Product 2', description: 'Description for product 2', price: 19.99 },
      { id: 'd20f183e-092a-4daa-8911-1f2c31138de5', title: 'Product 3', description: 'Description for product 3', price: 19.99 },
      { id: 'd21f183e-092a-4daa-8911-1f2c31138de5', title: 'Product 4', description: 'Description for product 4', price: 19.99 },
    ]);

    await Cart.bulkCreate([
      { id: '6e0f18a7-fb4f-446e-9a50-1c1aadec6691', isDeleted: false, UserId: '09f02e77-3fb5-40d4-9d2d-440b76627dc8' },
      { id: 'b7b6a339-98ba-44cd-9b97-3ce500b5b140', isDeleted: false, UserId: '70495e80-e9ec-451f-a677-011d53482894' }
    ]);

    await CartItem.bulkCreate([
      { id: 'eda731b2-d4ae-4f64-a319-04c879768e02', count: 2, ProductId: '9249afa9-3538-4772-93ea-526e0b05a852', CartId: '6e0f18a7-fb4f-446e-9a50-1c1aadec6691' },
      { id: '42cd6489-1648-4a9e-a1ff-3d7c28bbbe6c', count: 1, ProductId: 'd19f183e-092a-4daa-8911-1f2c31138de5', CartId: 'b7b6a339-98ba-44cd-9b97-3ce500b5b140' }
    ]);

    await Order.bulkCreate([
      { 
        id: 'e20d0482-0eb4-4f28-9f55-88f14e0a1453', 
        payment: { method: 'credit_card', amount: 30.97 }, 
        delivery: { address: '123 Main St', city: 'Anytown', postal_code: '12345' }, 
        comments: 'Urgent delivery needed', 
        status: 'created', 
        total: 30.97, 
        UserId: '09f02e77-3fb5-40d4-9d2d-440b76627dc8', 
        CartId: '6e0f18a7-fb4f-446e-9a50-1c1aadec6691' 
      }
    ]);

    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

export { seeding };