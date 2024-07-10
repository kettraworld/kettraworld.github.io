import axios from "axios";
import { approved, disapproved, pending  } from "#functions/payment/sql";

const notification = async (req, res) => {

 await axios.get(`https://api.mercadopago.com/v1/payments/${req.query.id}`, {
  headers: {
    'Authorization': `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
  }
  }).then(async (payment) => {
    
    switch (payment.data.status) {
      case 'approved':
        await approved(payment.data.external_reference);
        res.status(200).json({ message: 'approved' })
       break;
       
      case 'pending':
        await pending(payment.data.external_reference);
        res.status(200).json({ message: 'pending' });
       break;
      
      default:
        await disapproved(payment.data.external_reference);
       res.status(200).json({ message: 'disapproved' });
    };
    
  }).catch(err => {
    console.log(err.message);
    res.status(500).json({ err: err.message });
  });

};

export default notification;