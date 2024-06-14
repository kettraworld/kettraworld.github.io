import { $check } from '#functions/product/check';
import coupon from "#model/coupon";
import Joi from 'joi';

const $get_coupon = async (req, res) => {
  
  const schema = Joi.object({
   id: Joi.number().required(),
   key: Joi.string().required(),
  });
  
  const { error, value } = schema.validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });
  
  const data = await $check(value.id, value.key);
  
  if (!data) return res.status(201).json({ status: false });
  
  res.status(200).json({ discount: data });
  
};

const $create_coupon = async (req, res) => {
  
  const schema = Joi.object({
    key: Joi.string().max(16).required(),
    discount: Joi.number().required(),
    product: Joi.string().required(),
  });
  
  const { error, value } = schema.validate(req.body);
  
  if (error) return res.status(400).json({ error: error.details[0].message });
  
let json_product;

try {
  
  json_product = JSON.parse(value.product);

  if (typeof json_product.all !== 'boolean') return res.status(401).json({ message: 'The "all" field must be a boolean'});
  
  if (!Array.isArray(json_product.id) || !json_product.id.every(num => Number.isInteger(num))) return res.status(401).json({ message: 'The "id" field must be an array of integers'});
  
  if (!json_product.all && json_product.id.length === 0) return res.status(401).json({ message: 'The "id" field must have at least one element when "all" is false' });
  
} catch (e) {
  return res.status(400).json({ err: e.message });
}

  const new_coupon = await coupon.create({
    key: value.key, 
    discount: value.discount,
    product: json_product
  }).catch((e) => {
   return res.status(401).json({ err: e.message })
  });
  
  res.status(200).json(new_coupon);
  
};

export { $create_coupon, $get_coupon };