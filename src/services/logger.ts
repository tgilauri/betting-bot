import {createLogger, format, transports} from "winston";
import {config} from "../config";

const toUpperFormat = format(info => {
  info.level = info.level.toUpperCase();
  return info;
});

export const logger = createLogger({
  level: config.LOG_LEVEL,
  transports: [
    new transports.Console({
      format: format.combine(
          toUpperFormat(),
          format.colorize(),
          format.timestamp({
            format: 'HH:mm:ss',
          }),
          format.printf(data => {
            return `${data.timestamp} [${data.level}]: ${data.message}`;
          })
      ),
    }),
  ],
});

