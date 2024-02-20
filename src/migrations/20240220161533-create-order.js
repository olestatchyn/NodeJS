'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      payment: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      delivery: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      comments: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('created', 'completed'),
        defaultValue: 'created',
      },
      total: {
        type: Sequelize.FLOAT,
        allowNull: false,
      }
    });

    return queryInterface.sequelize.define('Order', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      payment: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      delivery: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      comments: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('created', 'completed'),
        defaultValue: 'created',
      },
      total: {
        type: Sequelize.FLOAT,
        allowNull: false,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};
