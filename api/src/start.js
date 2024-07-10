import limit from 'express-rate-limit';
import payment from '#routes/payment';
import product from '#routes/product';
import compression from 'compression';
import logger from "#functions/logger";
import body from 'body-parser';
import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import '#db/sequelize';
const app = express();

app.set('trust proxy', 1);
app.use(helmet());
app.use(body.json());
app.use(compression());
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST'],
  }),
);
app.use(
  limit({
    windowMs: 100 * 60 * 1000,
    max: 1000,
    message: '^^ Please try again later, the request limit has been reached!'
  }),
);

app.use('/payment', payment);
app.use('/product', product);

app.get('*', (req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(process.env.PORT, (err) => {
  
  if (err) throw err.message;

  logger.info(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
  
});

export default app;