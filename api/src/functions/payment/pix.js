import { mercadopago } from "#api/mercadopago";
import logger from "#functions/logger";

function pix(value, res) {

  const body = {
    description: `⛃ Pacote "${value.product.name}" - ❖ ${value.nick}`,
    payment_method_id: "pix",
    notification_url: 'http://129.148.43.196:8080/payment/notify/mercadopago',
    installments: 1,
    binary_mode: true,
    payer: {
      email: value.email
    },
    transaction_amount: parseFloat(value.pay),
    external_reference: value.uuid
  };
    
  mercadopago.create({ body }).then((x) => {
    res.json({ mercadopago: x });
  }).catch((err) => {
    console.log(err.message);
    res.status(500);
  });
};

export default pix;