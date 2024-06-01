import {
  createLogger,
  transports,
  format
} from 'winston';

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'debug',
      format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
      )
    }),
    new transports.File({
      level: 'info',
      dirname: "./.logs",
      filename: `manager.log`,
      format: format.combine(
        format.uncolorize(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
      )
    })
  ]
});

export default logger;