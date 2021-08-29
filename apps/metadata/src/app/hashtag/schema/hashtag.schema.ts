import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HashtagDocument = Hashtag & Document;

@Schema()
export class Hashtag {
  @Prop()
  slug: string;

  @Prop()
  name: string;

  @Prop()
  key: string;

  @Prop()
  created: Date;

  @Prop()
  updated: Date;
}

export const HashtagSchema = SchemaFactory.createForClass(Hashtag);
