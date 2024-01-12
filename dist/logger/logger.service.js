"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const common_1 = require("@nestjs/common");
let LoggerService = class LoggerService extends common_1.Logger {
    constructor() {
        super();
        this.winstonLogger = require('../winston.config');
    }
    log(message, context) {
        this.winstonLogger.log({
            level: 'info',
            message: message,
            context: context
        });
        super.log(message, context);
    }
    error(message, trace, context) {
        this.winstonLogger.log({
            level: 'error',
            message: message,
            trace: trace,
            context: context
        });
        super.error(message, trace, context);
    }
    warn(message, context) {
        this.winstonLogger.log({
            level: 'warn',
            message: message,
            context: context
        });
        super.warn(message, context);
    }
    debug(message, context) {
        this.winstonLogger.log({
            level: 'debug',
            message: message,
            context: context
        });
        super.debug(message, context);
    }
    verbose(message, context) {
        this.winstonLogger.log({
            level: 'verbose',
            message: message,
            context: context
        });
        super.verbose(message, context);
    }
    setLogLevel(level) {
        this.winstonLogger.level = level;
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LoggerService);
//# sourceMappingURL=logger.service.js.map