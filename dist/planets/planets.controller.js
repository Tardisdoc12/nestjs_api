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
exports.PlanetsController = void 0;
const common_1 = require("@nestjs/common");
const createplanet_dto_1 = require("./dto/createplanet.dto");
const planets_service_1 = require("./planets.service");
const updateplanet_dto_1 = require("./dto/updateplanet.dto");
const swagger_1 = require("@nestjs/swagger");
let PlanetsController = class PlanetsController {
    constructor(planetsService) {
        this.planetsService = planetsService;
    }
    create(createPlanetDto) {
        return this.planetsService.create(createPlanetDto);
    }
    findAll() {
        return this.planetsService.findAll();
    }
    findOne(slug) {
        return this.planetsService.findOne(slug);
    }
    async deletePlanet(slug) {
        return this.planetsService.deletePlanet(slug);
    }
    async updatePlanet(slug, updatePlanetDto) {
        const updatedPlanet = await this.planetsService.updatePlanet(slug, updatePlanetDto);
        if (!updatedPlanet) {
            throw new common_1.NotFoundException(`La planète avec l'ID ${slug} n'a pas été trouvée.`);
        }
        return updatedPlanet;
    }
};
exports.PlanetsController = PlanetsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createplanet_dto_1.CreatePlanetDto]),
    __metadata("design:returntype", void 0)
], PlanetsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlanetsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlanetsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlanetsController.prototype, "deletePlanet", null);
__decorate([
    (0, common_1.Put)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateplanet_dto_1.UpdatePlanetDto]),
    __metadata("design:returntype", Promise)
], PlanetsController.prototype, "updatePlanet", null);
exports.PlanetsController = PlanetsController = __decorate([
    (0, swagger_1.ApiTags)('Planets'),
    (0, common_1.Controller)('planets'),
    __metadata("design:paramtypes", [planets_service_1.PlanetsService])
], PlanetsController);
//# sourceMappingURL=planets.controller.js.map