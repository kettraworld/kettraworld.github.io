import product from '#model/product';
import Joi from 'joi';

const $edit = async (req, res) => {

console.log(req.user)

  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().max(18).required(),
    image: Joi.string().max(140).required(),
    description: Joi.string().max(140).required(),
    price: Joi.number().positive().required()
  });

  const { error, value } = schema.validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });

  const exist = await product.findByPk(value.id);

  if (!exist) return res.status(404).json({ error: 'Product not found' });

  const item = await product.update({
    name: value.name,
    image: value.image,
    description: value.description,
    price: value.price
  }, {
  where: {
    id: value.id
  }}).catch((err) => {
    return res.status(404);
  });

 res.status(200).json({ message: 'updated product' });

};

export default $edit;
