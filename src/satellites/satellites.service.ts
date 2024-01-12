import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Satellite } from './schemas/satellite.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSatelliteDto } from './dto/createsatellite.dto';
import { slugify } from 'src/slugcreator/slugcreator.service';
import { PlanetsService } from 'src/planets/planets.service';
import { ApiBody } from '@nestjs/swagger';

@Injectable()
export class SatellitesService {
    constructor(@InjectModel(Satellite.name) private satelliteModel: Model<Satellite>,@Inject(forwardRef(() => PlanetsService))
    private planetsService : PlanetsService) {}

    @ApiBody({type: CreateSatelliteDto})
    async create(createSatelliteDto: CreateSatelliteDto): Promise<Satellite> {
      createSatelliteDto.slug = slugify(createSatelliteDto.name);
      const createdSatellite = new this.satelliteModel(createSatelliteDto);
      await this.planetsService.addSatellite(createSatelliteDto.planet, createdSatellite._id);
      return createdSatellite.save();
    }
  
    async findAll(): Promise<Satellite[]> {
      return this.satelliteModel.find().populate("planet");
    }

    async findOne(slug: string): Promise<Satellite> {
      const satellite = this.satelliteModel.findOne({slug: slug}).populate("planet");
      return satellite;
    }

    async deleteSatellite(slug: string): Promise<boolean> {
      try{
        const satelliteObject = await this.satelliteModel.findOne({slug: slug}).exec();
        await this.planetsService.deleteSatellite(satelliteObject.planet,satelliteObject._id);
        const satellite = await this.satelliteModel.findOneAndDelete({slug: slug});
      } catch (e) {
        return false;
      }
      return true;
    }

    async deletePlanet(planetId: string): Promise<boolean> {
      try{
        const satellites = await this.findSatellitesByPlanet(planetId);
        satellites.forEach(async satellite => {
          await this.deleteSatellite(satellite.slug);
        });
      } catch (e) {
        return false;
      }
      return true;
    }

    //find satellites by planet
    async findSatellitesByPlanet(planet: string): Promise<Satellite[]> {
      return this.satelliteModel.find({planet: planet}).exec();
    }
}
