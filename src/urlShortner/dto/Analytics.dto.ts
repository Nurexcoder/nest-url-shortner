import { IsString } from 'class-validator';
import { Model } from 'mongoose';
import { Analytics } from 'src/schemas/Analytics.schema';

export class AnalyticsDto extends Model<Analytics> {
    @IsString()
    shortUrl:string


    @IsString()
    originalUrl:string
}
