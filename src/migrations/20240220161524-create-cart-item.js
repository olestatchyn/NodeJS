'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CartItems', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });

    return queryInterface.sequelize.define('CartItem', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CartItems');
  }
};
