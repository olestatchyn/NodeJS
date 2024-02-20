import Joi, { string } from 'joi';

const orderEntitySchema = Joi.object({
  userId: Joi.string().required(),
  cartId: Joi.string().required(),
  items: Joi.array().items(Joi.string()).required(),
  payment: Joi.object({
    method: Joi.string().required(),
    amount: Joi.number()
  }),
  delivery: Joi.object({
    address: Joi.string().required(),
    date: Joi.any(),
  }),
  comments: Joi.string(),
  total: Joi.number().required(),
});

const cartPutEntitySchema = Joi.object({
  cartItems: Joi.array().items(Joi.object({
    id: Joi.string().required(),
    count: Joi.number().integer().min(0).required(),
    ProductId: Joi.string().required(),
  })).required(),
});

export { cartPutEntitySchema, orderEntitySchema }