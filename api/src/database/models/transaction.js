import Sequelize from 'sequelize';
import { sequelize } from '#db/sequelize';
import product from '#model/product';

const transaction = sequelize.define('TRANSACTION', {
  uuid: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  status: {
    type: Sequelize.BIGINT,
    defaultValue: 0,
  },
  product: {
    type: Sequelize.BIGINT, 
  },
  nick: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  coupon: {
    type: Sequelize.BOOLEAN,
  },
  platform: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.STRING,
  }, 
  pay: {
    type: Sequelize.STRING,
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  }
});

transaction.belongsTo(product, { foreignKey: 'product' });

(async () => {
  await transaction.sync().catch(() => {});
})();

export default transaction;
