import { SatellitesService } from './satellites.service';
import { CreateSatelliteDto } from './dto/createsatellite.dto';
export declare class SatellitesController {
    private satellitesService;
    constructor(satellitesService: SatellitesService);
    create(createSatelliteDto: CreateSatelliteDto): Promise<import("./schemas/satellite.schema").Satellite>;
    findAll(): Promise<import("./schemas/satellite.schema").Satellite[]>;
    findOne(slug: string): Promise<import("./schemas/satellite.schema").Satellite>;
    deleteSatellite(slug: string): Promise<boolean>;
}
