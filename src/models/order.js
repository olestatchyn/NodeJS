'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID
    },
    payment: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    delivery: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['created', 'completed'],
      defaultValue: 'created',
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Order',
  });
  return Order;
};