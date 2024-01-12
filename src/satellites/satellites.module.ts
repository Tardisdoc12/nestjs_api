import { Module, forwardRef } from '@nestjs/common';
import { SatellitesService } from './satellites.service';
import { SatellitesController } from './satellites.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {Satellite, SatelliteSchema} from './schemas/satellite.schema';
import { PlanetsModule } from 'src/planets/planets.module';


@Module({
  exports: [SatellitesService],
  imports: [MongooseModule.forFeature([{ name: Satellite.name, schema: SatelliteSchema }]),forwardRef(() => PlanetsModule)],
  providers: [SatellitesService],
  controllers: [SatellitesController]
})
export class SatellitesModule {}
