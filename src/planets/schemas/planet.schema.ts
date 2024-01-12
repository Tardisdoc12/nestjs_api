import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Satellite } from 'src/satellites/schemas/satellite.schema';

@Schema()
export class Planet extends mongoose.Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ default: true })
  hasWater: boolean;

  @Prop({type:[{type: mongoose.Schema.Types.ObjectId, ref: 'Satellite'}],default:[]})
  satellites: Array<Satellite|string>;
}

export const PlanetSchema = SchemaFactory.createForClass(Planet);