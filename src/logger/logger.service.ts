import { Injectable, Logger, LogLevel } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService extends Logger {
    private winstonLogger: winston.Logger;

    constructor(){
        super();
        this.winstonLogger = require('../winston.config');

    }

    log(message: string, context?: string) {
        this.winstonLogger.log({
            level: 'info',
            message: message,
            context: context
        });
        super.log(message, context);
    }

    error(message: string, trace: string, context?: string) {
        this.winstonLogger.log({
            level: 'error',
            message: message,
            trace: trace,
            context: context
        });
        super.error(message, trace, context);
    }

    warn(message: string, context?: string) {
        this.winstonLogger.log({
            level: 'warn',
            message: message,
            context: context
        });
        super.warn(message, context);
    }

    debug(message: string, context?: string) {
        this.winstonLogger.log({
            level: 'debug',
            message: message,
            context: context
        });
        super.debug(message, context);
    }

    verbose(message: string, context?: string) {
        this.winstonLogger.log({
            level: 'verbose',
            message: message,
            context: context
        });
        super.verbose(message, context);
    }

    setLogLevel(level: LogLevel) {
        this.winstonLogger.level = level;
    }
}
