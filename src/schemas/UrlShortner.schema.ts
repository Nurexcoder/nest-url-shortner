import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaType } from 'mongoose';

@Schema()
export class UrlShortner extends Document {
  @Prop()
  originalUrl: string;

  @Prop()
  shortUrl: string;

  @Prop({ type: { type: SchemaType.Types.ObjectId, ref: 'User' }, })
  userId: string;

 

  
  @Prop({ default: Date.now })
  createdAt: Date;


 
}

export const urlShortnerSchema = SchemaFactory.createForClass(UrlShortner);
