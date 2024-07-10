import { search } from '#functions/product/check';
import pix from '#functions/payment/pix';
import Joi from 'joi';

const $create = async (req, res) => {

  const schema = Joi.object({
    product: Joi.number().required(),
    nick: Joi.string().min(4).max(16).required(),
    email: Joi.string().email().min(12).max(80).required(),
    coupon: Joi.string().max(20).optional(), 
    platform: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });

  const item = await search(value);

  if (!item) return res.status(400).json({ error: 'Product not found' });
 
  switch (item.platform) {
    case 'pix':
       pix(item, res);
      break;
    default:
      res.status(505).json({ error: 'Payment method not found' });;
  }

};

export default $create;