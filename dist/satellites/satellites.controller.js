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
exports.SatellitesController = void 0;
const common_1 = require("@nestjs/common");
const satellites_service_1 = require("./satellites.service");
const createsatellite_dto_1 = require("./dto/createsatellite.dto");
const swagger_1 = require("@nestjs/swagger");
let SatellitesController = class SatellitesController {
    constructor(satellitesService) {
        this.satellitesService = satellitesService;
    }
    create(createSatelliteDto) {
        return this.satellitesService.create(createSatelliteDto);
    }
    findAll() {
        return this.satellitesService.findAll();
    }
    findOne(slug) {
        return this.satellitesService.findOne(slug);
    }
    async deleteSatellite(slug) {
        return this.satellitesService.deleteSatellite(slug);
    }
};
exports.SatellitesController = SatellitesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createsatellite_dto_1.CreateSatelliteDto]),
    __metadata("design:returntype", void 0)
], SatellitesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SatellitesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SatellitesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SatellitesController.prototype, "deleteSatellite", null);
exports.SatellitesController = SatellitesController = __decorate([
    (0, swagger_1.ApiTags)('Satellites'),
    (0, common_1.Controller)('satellites'),
    __metadata("design:paramtypes", [satellites_service_1.SatellitesService])
], SatellitesController);
//# sourceMappingURL=satellites.controller.js.map