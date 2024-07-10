import $create from '#controllers/payment/create';
import $notify_mercadopago from '#controllers/payment/notification/mercadopago';
import { $get_coupon, $create_coupon } from '#controllers/payment/coupon';
import express from 'express';
const payment = express.Router();

payment.post('/create', $create);
payment.post('/coupon', $get_coupon);
payment.post('/coupon/create', $create_coupon);

payment.get('/notify/mercadopago', $notify_mercadopago);

export default payment;