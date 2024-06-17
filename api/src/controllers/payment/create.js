import { search } from '#functions/product/check';
import pix from '#functions/payment/pix';
import Joi from 'joi';

const $create = async (req, res) => {

  const schema = Joi.object({
    product: Joi.number().max(1).required(),
    coupon: Joi.string().allow('').optional(), 
    platform: Joi.string().valid('pix').required(),
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