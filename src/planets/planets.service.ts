import { Inject, Injectable, NotFoundException, forwardRef,LoggerService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Planet } from './schemas/planet.schema';
import { Model } from 'mongoose';
import { CreatePlanetDto } from './dto/createplanet.dto';
import { slugify } from 'src/slugcreator/slugcreator.service';
import { SatellitesService } from 'src/satellites/satellites.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class PlanetsService {
    constructor(@InjectModel(Planet.name) private planetModel: Model<Planet>,
     @Inject(forwardRef(() => SatellitesService))
    private satellitesService: SatellitesService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,) {}

    async create(createPlanetDto: CreatePlanetDto): Promise<Planet> {
      createPlanetDto.slug = slugify(createPlanetDto.name);
      const createdPlanet = new this.planetModel(createPlanetDto);
      this.logger.log("Planet created" );
      return createdPlanet.save();
    }
  
    async addSatellite(planetId: string, satelliteId: string): Promise<Planet> {
      const planet = await this.planetModel.findById(planetId);
      planet.satellites.push(satelliteId);
      return planet.save();
    }

    async deleteSatellite(planetId: string|Planet, satelliteId: string): Promise<Planet> {
      var planet = await this.planetModel.findByIdAndUpdate(
        planetId,
        { $pull: { satellites: satelliteId } },
        { new: true },
      ).exec();
      return planet;
    }

    async findAll(): Promise<Planet[]> {
      this.logger.log("All Planets found");
      return this.planetModel.find().populate("satellites");
    }

    async findOne(slug: string): Promise<Planet> {
      console.log(slug);
      var planet = await this.planetModel.findOne({slug: slug}).populate("satellites");

      return planet;
    }

    async deletePlanet(slug: string): Promise<boolean> {
      const deletedPlanet = await this.planetModel.findOneAndDelete({slug: slug});
      await this.satellitesService.deletePlanet(deletedPlanet._id);
      if (!deletedPlanet) {
        throw new NotFoundException(`La planète avec l'ID ${slug} n'a pas été trouvée.`);
      }
  
      return true;
    }

    async updatePlanet(slug: string, updateData: Partial<Planet>): Promise<Planet> {
      const planet = await this.planetModel.findOne({slug: slug}).exec();
  
      if (!planet) {
        throw new NotFoundException(`La planète avec le slug ${slug} n'a pas été trouvée.`);
      }
  
      Object.assign(planet, updateData); // Met à jour les propriétés de la planète avec les nouvelles données
  
      return await planet.save(); // Sauvegarde les modifications dans la base de données
    }
    
  }
