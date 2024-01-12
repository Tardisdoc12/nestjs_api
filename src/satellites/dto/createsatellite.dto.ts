import { ApiProperty } from '@nestjs/swagger';


export class CreateSatelliteDto {
  @ApiProperty({type: String, description: "The name of the satellite"})
  name: string;
  @ApiProperty({type: String, description: "The slug of the satellite"})
  slug: string;
  @ApiProperty({type: String, description: "The planet of the satellite"})
  planet: string;
}
  