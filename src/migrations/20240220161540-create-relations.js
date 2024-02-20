const User = require('./20240220161503-create-user');
const Product = require('./20240220161346-create-product');
const Cart = require('./20240220161516-create-cart');
const CartItem = require('./20240220161524-create-cart-item');
const Order = require('./20240220161533-create-order');

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Carts', 'userId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    await queryInterface.addColumn('Orders', 'userId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    await queryInterface.addColumn('CartItems', 'cartId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: Cart,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    });
    await queryInterface.addColumn('CartItems', 'productId', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: Product,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    });
    await queryInterface.addColumn('CartItems', 'cartId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: Cart,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    });
    await queryInterface.addColumn('CartItems', 'orderId', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: Order,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    });
    await queryInterface.addColumn('Orders', 'userId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    await queryInterface.addColumn('Orders', 'cartId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Cart,
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }); 
  },
  async down(queryInterface, Sequelize) {
  }
};