import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaType } from 'mongoose';
import { BrowserType, DeviceType } from 'src/lib/enum';

@Schema()
export class Analytics extends Document {
  @Prop({ type: { type: SchemaType.Types.ObjectId, ref: 'UrlShortner' ,required:true} })
  urlId: string;

  @Prop({required:true})
  shortUrl:string

  @Prop({default:0})
  clicks: number;

  @Prop({default:[]})
  devices: string[];

  @Prop({default:[]})
  browsers: string[];

  @Prop({default:[]})
  os:string[]

  @Prop({default:[]})
  accesses: Date[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const analyticsSchema = SchemaFactory.createForClass(Analytics);
