import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaType } from 'mongoose';

@Schema()
export class UrlShortner extends Document {
  @Prop()
  originalUrl: string;

  @Prop()
  shortUrl: string;

  @Prop({ type: [{ type: SchemaType.Types.ObjectId, ref: 'User' }] })
  userIds: string[];
  
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  modifiedAt: Date;
}

export const urlShortnerSchema = SchemaFactory.createForClass(UrlShortner);
