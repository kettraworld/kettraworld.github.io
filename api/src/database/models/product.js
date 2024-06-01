import Sequelize from 'sequelize';
import { sequelize } from '#db/sequelize';

const product = sequelize.define('PRODUCT', {
  id: {
    type: Sequelize.BIGINT(2),
    primaryKey: true,
    autoIncrement: true, 
  },
  name: {
    type: Sequelize.STRING(18),
  },
  image: {
    type: Sequelize.STRING(140),
  },
  description: {
    type: Sequelize.STRING(140),
  },
  price: {
    type: Sequelize.DECIMAL(5, 2),
  },
  sold: {
    type: Sequelize.BIGINT(3),
  },
});

(async () => {
  await product.sync().catch(() => {});
})();

export default product;
