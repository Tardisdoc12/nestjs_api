import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanetsService } from './planets.service';
import {Planet, PlanetSchema} from './schemas/planet.schema';
import { PlanetsController } from './planets.controller';
import { SatellitesModule } from 'src/satellites/satellites.module';

@Module({
  exports: [PlanetsService],
  imports: [MongooseModule.forFeature([{ name: Planet.name, schema: PlanetSchema }]),forwardRef(() => SatellitesModule)],
  providers: [PlanetsService],
  controllers: [PlanetsController]
})
export class PlanetsModule {}
