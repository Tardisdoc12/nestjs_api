import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanetsModule } from './planets/planets.module';
import { SatellitesModule } from './satellites/satellites.module';
import { SlugcreatorService } from './slugcreator/slugcreator.service';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';


@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), PlanetsModule, SatellitesModule,
    WinstonModule.forRoot(
      {
        level: 'info',
        transports: [
          new DailyRotateFile({
            filename: 'logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            format: winston.format.combine(
              winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
              }),
              winston.format.printf(
                (info) => `${info.timestamp} [${info.level}]: ${info.message}`,
              ),
            ),
          }),
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
              }),
              winston.format.printf(
                (info) => `${info.timestamp} [${info.level}]: ${info.message}`,
              ),
            ),
          }),
        ],
      }
    )
      ],
  controllers: [AppController],
  providers: [AppService, SlugcreatorService],
})
export class AppModule {}
