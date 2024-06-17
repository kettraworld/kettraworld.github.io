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