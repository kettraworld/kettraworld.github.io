import logger from "#functions/logger";
import Sequelize from 'sequelize';

const sequelize = new Sequelize('','','', {
  dialect: 'mysql',
  host: '',
  port: '',
  logging: false,
  define: {
    timestamps: false,
  },
});


try {
  
(async () => {
  await sequelize.authenticate();
  logger.info('Connection has been established successfully.');
})();
  
} catch (err) {
  logger.error('Unable to connect to the database:', err.messaage);
};

export { sequelize };
