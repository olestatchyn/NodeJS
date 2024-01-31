import Joi from 'joi';

const productEntitySchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
});

const cartItemEntitySchema = Joi.object({
  product: productEntitySchema.required(),
  count: Joi.number().required(),
});

const cartEntitySchema = Joi.object({
  id: Joi.string().required(),
  userId: Joi.string().required(),
  isDeleted: Joi.boolean(),
  items: Joi.array().items(cartItemEntitySchema).required(),
});

const cartPutEntitySchema = Joi.object({
  items: Joi.array().items(cartItemEntitySchema).required(),
});

const orderEntitySchema = Joi.object({
  id: Joi.string().required(),
  userId: Joi.string().required(),
  cartId: Joi.string().required(),
  items: Joi.array().items(cartItemEntitySchema).required(),
  payment: Joi.object({
    type: Joi.string().required(),
    address: Joi.any(),
    creditCard: Joi.any(),
  }),
  delivery: Joi.object({
    type: Joi.string().required(),
    address: Joi.any(),
  }),
  comments: Joi.string(),
  status: Joi.string().valid('created', 'completed').required(),
  total: Joi.number().required(),
});

export { orderEntitySchema, productEntitySchema, cartEntitySchema, cartItemEntitySchema, cartPutEntitySchema }