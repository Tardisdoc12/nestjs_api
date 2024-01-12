"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SatellitesService = void 0;
const common_1 = require("@nestjs/common");
const satellite_schema_1 = require("./schemas/satellite.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const createsatellite_dto_1 = require("./dto/createsatellite.dto");
const slugcreator_service_1 = require("../slugcreator/slugcreator.service");
const planets_service_1 = require("../planets/planets.service");
const swagger_1 = require("@nestjs/swagger");
let SatellitesService = class SatellitesService {
    constructor(satelliteModel, planetsService) {
        this.satelliteModel = satelliteModel;
        this.planetsService = planetsService;
    }
    async create(createSatelliteDto) {
        createSatelliteDto.slug = (0, slugcreator_service_1.slugify)(createSatelliteDto.name);
        const createdSatellite = new this.satelliteModel(createSatelliteDto);
        await this.planetsService.addSatellite(createSatelliteDto.planet, createdSatellite._id);
        return createdSatellite.save();
    }
    async findAll() {
        return this.satelliteModel.find().populate("planet");
    }
    async findOne(slug) {
        const satellite = this.satelliteModel.findOne({ slug: slug }).populate("planet");
        return satellite;
    }
    async deleteSatellite(slug) {
        try {
            const satelliteObject = await this.satelliteModel.findOne({ slug: slug }).exec();
            await this.planetsService.deleteSatellite(satelliteObject.planet, satelliteObject._id);
            const satellite = await this.satelliteModel.findOneAndDelete({ slug: slug });
        }
        catch (e) {
            return false;
        }
        return true;
    }
    async deletePlanet(planetId) {
        try {
            const satellites = await this.findSatellitesByPlanet(planetId);
            satellites.forEach(async (satellite) => {
                await this.deleteSatellite(satellite.slug);
            });
        }
        catch (e) {
            return false;
        }
        return true;
    }
    async findSatellitesByPlanet(planet) {
        return this.satelliteModel.find({ planet: planet }).exec();
    }
};
exports.SatellitesService = SatellitesService;
__decorate([
    (0, swagger_1.ApiBody)({ type: createsatellite_dto_1.CreateSatelliteDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createsatellite_dto_1.CreateSatelliteDto]),
    __metadata("design:returntype", Promise)
], SatellitesService.prototype, "create", null);
exports.SatellitesService = SatellitesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(satellite_schema_1.Satellite.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => planets_service_1.PlanetsService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        planets_service_1.PlanetsService])
], SatellitesService);
//# sourceMappingURL=satellites.service.js.map