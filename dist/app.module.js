"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const planets_module_1 = require("./planets/planets.module");
const satellites_module_1 = require("./satellites/satellites.module");
const slugcreator_service_1 = require("./slugcreator/slugcreator.service");
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI), planets_module_1.PlanetsModule, satellites_module_1.SatellitesModule,
            nest_winston_1.WinstonModule.forRoot({
                level: 'info',
                transports: [
                    new DailyRotateFile({
                        filename: 'logs/application-%DATE%.log',
                        datePattern: 'YYYY-MM-DD-HH',
                        zippedArchive: true,
                        maxSize: '20m',
                        maxFiles: '14d',
                        format: winston.format.combine(winston.format.timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss',
                        }), winston.format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`)),
                    }),
                    new winston.transports.Console({
                        format: winston.format.combine(winston.format.colorize(), winston.format.timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss',
                        }), winston.format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`)),
                    }),
                ],
            })
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, slugcreator_service_1.SlugcreatorService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map