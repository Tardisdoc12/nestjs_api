import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { CreatePlanetDto } from './dto/createplanet.dto';
import { PlanetsService } from './planets.service';
import { UpdatePlanetDto } from './dto/updateplanet.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Planets')
@Controller('planets')
export class PlanetsController {
    constructor(private planetsService : PlanetsService) {}
    
    @Post()
    create(@Body() createPlanetDto: CreatePlanetDto) {
        return this.planetsService.create(createPlanetDto);
    }

    @Get()
    findAll(){
        return this.planetsService.findAll();
    }

    @Get(':slug')
    findOne(@Param('slug') slug: string) {
        return this.planetsService.findOne(slug);
    }

    @Delete(':slug')
    async deletePlanet(@Param('slug') slug: string) {
        return this.planetsService.deletePlanet(slug);
    }

    @Put(':slug')
    async updatePlanet(@Param('slug') slug: string, @Body() updatePlanetDto: UpdatePlanetDto) {
      const updatedPlanet = await this.planetsService.updatePlanet(slug, updatePlanetDto);
  
      if (!updatedPlanet) {
        throw new NotFoundException(`La planète avec l'ID ${slug} n'a pas été trouvée.`);
      }
  
      return updatedPlanet;
    }
}
