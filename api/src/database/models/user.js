import Sequelize from 'sequelize';
import { sequelize } from '#db/sequelize';

const user = sequelize.define('user', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  token: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
  },
  nick: {
    type: Sequelize.STRING,
  },
  level: {
    type: Sequelize.BIGINT,
    defaultValue: 0
  },
  xp: {
    type: Sequelize.BIGINT,
    defaultValue: 3
  },
  coin: {
    type: Sequelize.BIGINT,
    defaultValue: 0
  },
  timeout: {
    type: Sequelize.DATE,
    defaultValue: 0
  }
});

(async () => {
  await user.sync().catch(() => {});
})();

export default user;
