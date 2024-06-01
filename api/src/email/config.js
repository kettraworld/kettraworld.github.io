import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "kettraworld@gmail.com",
    pass: process.env.GMAIL_PASS,
  },
});

export default transporter;

import { register } from './template/register.js';

( async () => {
const info = await transporter.sendMail({
  from: 'kettraworld@gmail.com',
  to: 'sebastianjnuwu@gmail.com',
  subject: 'Bem vindo ao servidor!',
  html: await register('Chaves', '.git')
});
console.log(info)
})()