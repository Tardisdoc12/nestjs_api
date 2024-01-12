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
exports.PlanetsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const planet_schema_1 = require("./schemas/planet.schema");
const mongoose_2 = require("mongoose");
const slugcreator_service_1 = require("../slugcreator/slugcreator.service");
const satellites_service_1 = require("../satellites/satellites.service");
const nest_winston_1 = require("nest-winston");
let PlanetsService = class PlanetsService {
    constructor(planetModel, satellitesService, logger) {
        this.planetModel = planetModel;
        this.satellitesService = satellitesService;
        this.logger = logger;
    }
    async create(createPlanetDto) {
        createPlanetDto.slug = (0, slugcreator_service_1.slugify)(createPlanetDto.name);
        const createdPlanet = new this.planetModel(createPlanetDto);
        this.logger.log("Planet created");
        return createdPlanet.save();
    }
    async addSatellite(planetId, satelliteId) {
        const planet = await this.planetModel.findById(planetId);
        planet.satellites.push(satelliteId);
        return planet.save();
    }
    async deleteSatellite(planetId, satelliteId) {
        var planet = await this.planetModel.findByIdAndUpdate(planetId, { $pull: { satellites: satelliteId } }, { new: true }).exec();
        return planet;
    }
    async findAll() {
        this.logger.log("All Planets found");
        return this.planetModel.find().populate("satellites");
    }
    async findOne(slug) {
        console.log(slug);
        var planet = await this.planetModel.findOne({ slug: slug }).populate("satellites");
        return planet;
    }
    async deletePlanet(slug) {
        const deletedPlanet = await this.planetModel.findOneAndDelete({ slug: slug });
        await this.satellitesService.deletePlanet(deletedPlanet._id);
        if (!deletedPlanet) {
            throw new common_1.NotFoundException(`La planète avec l'ID ${slug} n'a pas été trouvée.`);
        }
        return true;
    }
    async updatePlanet(slug, updateData) {
        const planet = await this.planetModel.findOne({ slug: slug }).exec();
        if (!planet) {
            throw new common_1.NotFoundException(`La planète avec le slug ${slug} n'a pas été trouvée.`);
        }
        Object.assign(planet, updateData);
        return await planet.save();
    }
};
exports.PlanetsService = PlanetsService;
exports.PlanetsService = PlanetsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(planet_schema_1.Planet.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => satellites_service_1.SatellitesService))),
    __param(2, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        satellites_service_1.SatellitesService, Object])
], PlanetsService);
//# sourceMappingURL=planets.service.js.map