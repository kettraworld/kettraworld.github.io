import $create from '#controllers/payment/create';
import express from 'express';
const payment = express.Router();

payment.post('/create', $create);

export default payment;