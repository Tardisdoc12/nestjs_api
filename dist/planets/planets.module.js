"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanetsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const planets_service_1 = require("./planets.service");
const planet_schema_1 = require("./schemas/planet.schema");
const planets_controller_1 = require("./planets.controller");
const satellites_module_1 = require("../satellites/satellites.module");
let PlanetsModule = class PlanetsModule {
};
exports.PlanetsModule = PlanetsModule;
exports.PlanetsModule = PlanetsModule = __decorate([
    (0, common_1.Module)({
        exports: [planets_service_1.PlanetsService],
        imports: [mongoose_1.MongooseModule.forFeature([{ name: planet_schema_1.Planet.name, schema: planet_schema_1.PlanetSchema }]), (0, common_1.forwardRef)(() => satellites_module_1.SatellitesModule)],
        providers: [planets_service_1.PlanetsService],
        controllers: [planets_controller_1.PlanetsController]
    })
], PlanetsModule);
//# sourceMappingURL=planets.module.js.map