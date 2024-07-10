import transaction from "#model/transaction";
import product from "#model/product";
import coupon from "#model/coupon";
import { v4 } from "uuid";

export async function $check(id, key) {
 
  const data = await coupon.findOne({ where: { key }, raw: true }).catch(err => {
      return false;
  });
    
  if (!data) return false;

  if (data.product.all || data.product.id.includes(id)) {
    return data.discount;
  };
 
}

export async function search(value) {
  
  try {
   
   const item = await product.findByPk(value.product, { raw: true });
   
   if (!item) return false;

   const _coupon = await $check(value.product, value.coupon);
   const price = item.price;
   const uuid = v4();
   item.discount = _coupon ? true : false;
  
   if (_coupon) {
    item.price = item.price - (item.price * _coupon) / 100;
    item.price = item.price.toFixed(2);
   };

   await transaction.create({
    uuid: uuid,
    product: value.product,
    nick: value.nick,
    email: value.email,
    coupon: item.discount,
    platform: value.platform,
    price: item.price,
    pay: item.price
   });

   return {
    uuid: uuid,
    product: item,
    nick: value.nick,
    email: value.email,
    platform: value.platform,
    pay: item.price
   };
   
  } catch (err) {
    console.log(err.message);
    return false;
  } 
};
