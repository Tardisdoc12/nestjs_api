import { CreatePlanetDto } from './dto/createplanet.dto';
import { PlanetsService } from './planets.service';
import { UpdatePlanetDto } from './dto/updateplanet.dto';
export declare class PlanetsController {
    private planetsService;
    constructor(planetsService: PlanetsService);
    create(createPlanetDto: CreatePlanetDto): Promise<import("./schemas/planet.schema").Planet>;
    findAll(): Promise<import("./schemas/planet.schema").Planet[]>;
    findOne(slug: string): Promise<import("./schemas/planet.schema").Planet>;
    deletePlanet(slug: string): Promise<boolean>;
    updatePlanet(slug: string, updatePlanetDto: UpdatePlanetDto): Promise<import("./schemas/planet.schema").Planet>;
}
