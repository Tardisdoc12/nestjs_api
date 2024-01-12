import { ApiProperty } from "@nestjs/swagger";

export class UpdatePlanetDto {
  @ApiProperty({type: String, description: "The name of the planet"})  
  name?: string;
  @ApiProperty({description: "The planet has water or not"})
  hasWater?: boolean;
  }
  