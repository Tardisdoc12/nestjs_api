import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SatellitesService } from './satellites.service';
import { CreateSatelliteDto } from './dto/createsatellite.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Satellites')
@Controller('satellites')
export class SatellitesController {
    constructor(private satellitesService : SatellitesService) {}
    
    @Post()
    create(@Body() createSatelliteDto: CreateSatelliteDto) {
        return this.satellitesService.create(createSatelliteDto);
    }

    @Get()
    findAll(){
        return this.satellitesService.findAll();
    }

    @Get(':slug')
    findOne(@Param('slug') slug: string) {
        return this.satellitesService.findOne(slug);
    }

    @Delete(':slug')
    async deleteSatellite(@Param('slug') slug: string) {
        return this.satellitesService.deleteSatellite(slug);
    }

    
}
