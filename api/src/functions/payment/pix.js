import { mercadopago } from "#api/mercadopago";
import logger from "#functions/logger";

function pix(value, res) {
  const body = {
    description: `⛃ Pacote ${value.product_name} - ❖ ${
      value.nick
    } || Desconto ${value.discount ? "aplicado!" : "não aplicado!"}`,
    payment_method_id: "pix",
    payer: {
      email: value.email,
    },
    external_reference: value.uuid,
    transaction_amount: parseFloat(value.price),
  };

  mercadopago
    .create({ body })
    .then((x) => {
      res.status(200).json(x.body);
    })
    .catch((err) => {
      logger.error(
        "Error when generating payment in the paid market: " + err.message,
      );

      res
        .status(500)
        .json({
          message:
            "Error when generating payment in the paid market: " + err.messaage,
        });
    });
}

export default pix;