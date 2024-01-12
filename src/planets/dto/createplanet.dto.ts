import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanetDto {
    @ApiProperty({type: String, description: "The name of the planet"})
    name: string;
    @ApiProperty({type: String, description: "The slug of the planet"})
    slug: string;
    @ApiProperty()
    haswater: boolean;
  }
  