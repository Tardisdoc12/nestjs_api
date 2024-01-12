import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Planet } from 'src/planets/schemas/planet.schema';

@Schema()
export class Satellite extends mongoose.Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  slug: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Planet'})
  planet: Planet | string;
}

export const SatelliteSchema = SchemaFactory.createForClass(Satellite);