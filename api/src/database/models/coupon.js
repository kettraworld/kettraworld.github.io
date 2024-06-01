import Sequelize from 'sequelize';
import { sequelize } from '#db/sequelize';

const coupon = sequelize.define('COUPON', {
  id: {
    type: Sequelize.INTEGER(1),
    primaryKey: true,
    autoIncrement: true,
  },
  key: {
    type: Sequelize.STRING(28),
    allowNull: false,
  },
  discount: {
    type: Sequelize.BIGINT(2),
    allowNull: false,
  },
  product: {
    type: Sequelize.JSON(50),
    allowNull: false,
  },
});

(async () => {
  await coupon.sync();
})();

export default coupon;
