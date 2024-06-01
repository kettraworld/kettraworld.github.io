import transaction from "#model/transaction";
import product from "#model/product";
import coupon from "#model/coupon";
import { v4 } from "uuid";

export async function search(value) {
  
  try {
    
    const item = await product.findByPk(value.product, {
      raw: true,
    });

    if (!item) return false;

    const _coupon = await check(value.coupon);
    const price = item.price;
    const uuid = v4();
    item.discount = _coupon ? true : false;
  
    if (_coupon) {
      item.price = item.price - (item.price * _coupon) / 100;
      item.price = item.price.toFixed(2);
    }

    await transaction.create({
      uuid: uuid,
      product: value.product,
      name: value.name,
      surname: value.surname,
      nick: value.nick,
      email: value.email,
      coupon: value.coupon,
      platform: value.platform,
      address: value.address,
      city: value.city,
      cep: value.cep,
      state: value.state,
      country: value.country,
      latitude: value.latitude,
      longitude: value.longitude,
      price: price,
      pay: item.price,
      ip: value.ip
    });

    return {
        uuid: uuid,
        product: value.product,
        product_name: item.name,
        name: value.name,
        surname: value.surname,
        nick: value.nick,
        email: value.email,
        coupon: value.coupon,
        platform: value.platform,
        address: value.address,
        city: value.city,
        cep: value.cep,
        state: value.state,
        country: value.country,
        latitude: value.latitude,
        longitude: value.longitude,
        price: price,
        pay: item.price,
        ip: value.ip
    };
    
  } catch (e) {
    return false;
  } 
};

async function check(code) {
  const data = await coupon
    .findOne({
      where: {
        key: code,
      },
      raw: true,
    })
    .catch(() => {});

  if (!data) return false;

  const json = JSON.parse(data.product);

  if (json.all) return data.discount;

  for (const itens of json.id) {
    if (itens) return data.discount;
    return false;
  }
};