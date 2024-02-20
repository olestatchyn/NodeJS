import { DataTypes, Model, Sequelize } from 'sequelize';
import { seeding } from './seeds';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'db',
  username: 'node_gmp',
  password: '123456',
  database: 'node_gmp',
  port: 5432
});

class User extends Model {}
User.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUID,
  },
}, { sequelize, timestamps: false });

class Product extends Model {}
Product.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUID,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, { sequelize, timestamps: false });

class CartItem extends Model {}
CartItem.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUID,
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, { sequelize, timestamps: false });

class Cart extends Model {}
Cart.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUID,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, { sequelize, timestamps: false });

class Order extends Model {}
Order.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
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
  },
}, { sequelize, timestamps: false });

User.hasOne(Cart);
User.hasOne(Order);
Cart.belongsTo(User);
Cart.hasMany(CartItem); 
CartItem.belongsTo(Product);
CartItem.belongsTo(Cart);
CartItem.belongsTo(Order);
Order.belongsTo(User);
Order.belongsTo(Cart);

async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');
    seeding();
    console.log('All seedings were successful');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export { connect, User, Product, Cart, CartItem, Order }