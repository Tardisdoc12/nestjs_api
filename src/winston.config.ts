import winston = require('winston');
import DailyRotateFile = require('winston-daily-rotate-file');

const transport = new DailyRotateFile({
    filename: 'application-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '24h',
    dirname: 'logs'
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'application-service' },
    transports: [
        transport
    ],
});

module.exports = logger;