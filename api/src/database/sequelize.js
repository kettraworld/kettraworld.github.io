import logger from "#functions/logger";
import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.URL_MYSQL, {
  dialect: 'mysql',
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
