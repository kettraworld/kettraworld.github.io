import { search } from '#functions/product/check';
import pix from '#functions/payment/pix';
import Joi from 'joi';

const $create = async (req, res) => {

  const schema = Joi.object({
    product: Joi.number().max(1).required(),
    name: Joi.string().min(3).max(35).required(),
    surname: Joi.string().min(2).max(180).required(),
    nick: Joi.string().required(),
    email: Joi.string().email().required(),
    coupon: Joi.string().allow('').optional(), 
    platform: Joi.string().valid('pix').required(),
    address: Joi.string().allow('').optional(), 
    city: Joi.string().allow('').optional(), 
    cep: Joi.string().allow('').optional(), 
    state: Joi.string().allow('').optional(), 
    country: Joi.string().allow('').optional(), 
    latitude: Joi.number().allow('').optional(), 
    longitude: Joi.number().allow('').optional(), 
    ip: Joi.string().max(24).required()
  });

  const { error, value } = schema.validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });

  const item = await search(value);

  if (!item) return res.status(400).json({ error: 'Product not found' });

  console.log(item);
 
  switch (item.platform) {
    case 'pix':
       pix(item, res);
      break;
    default:
      res.status(505).json({ error: 'Payment method not found' });;
  }
  
};

export default $create;