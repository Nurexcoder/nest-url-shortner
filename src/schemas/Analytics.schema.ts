import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaType } from 'mongoose';
import { BrowserType, DeviceType } from 'src/lib/enum';

@Schema()
export class Analytics extends Document {
  @Prop({ type: { type: SchemaType.Types.ObjectId, ref: 'UrlShortner' } })
  urlId: string;

  @Prop()
  clicks: number;

  @Prop()
  devices: DeviceType[];

  @Prop()
  browsers: BrowserType[];

  @Prop()
  accesses: Date[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const analyticsSchema = SchemaFactory.createForClass(Analytics);
