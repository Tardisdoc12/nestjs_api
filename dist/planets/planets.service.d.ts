/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { LoggerService } from '@nestjs/common';
import { Planet } from './schemas/planet.schema';
import { Model } from 'mongoose';
import { CreatePlanetDto } from './dto/createplanet.dto';
import { SatellitesService } from 'src/satellites/satellites.service';
export declare class PlanetsService {
    private planetModel;
    private satellitesService;
    private readonly logger;
    constructor(planetModel: Model<Planet>, satellitesService: SatellitesService, logger: LoggerService);
    create(createPlanetDto: CreatePlanetDto): Promise<Planet>;
    addSatellite(planetId: string, satelliteId: string): Promise<Planet>;
    deleteSatellite(planetId: string | Planet, satelliteId: string): Promise<Planet>;
    findAll(): Promise<Planet[]>;
    findOne(slug: string): Promise<Planet>;
    deletePlanet(slug: string): Promise<boolean>;
    updatePlanet(slug: string, updateData: Partial<Planet>): Promise<Planet>;
}
