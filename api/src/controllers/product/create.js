import product from '#model/product';
import Joi from 'joi';

const $create = async (req, res) => {

  const schema = Joi.object({
    name: Joi.string().max(18).required(),
    image: Joi.string().max(140).required(),
    description: Joi.string().max(140).required(),
    price: Joi.number().positive().required()
  });

  const { error, value } = schema.validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });

  const item = await product.create(value);

  res.status(201).json({ message: 'product created' });
  
};

export default $create;
