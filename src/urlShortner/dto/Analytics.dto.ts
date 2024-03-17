import { IsString } from 'class-validator';
import { Model } from 'mongoose';
import { InfoCount } from 'src/lib/types';
import { Analytics } from 'src/schemas/Analytics.schema';

export class AnalyticsDto {

  constructor ()
  {
    this.urlId = '';
    this.originalUrl = '';
    this.shortUrl = '';
    this.clicks = 0;
    this.devices = {};
    this.browsers = {};
    this.os = {};
    this.activeHours = {};
    this.dates = {};
  }
  @IsString()
  urlId: string;

  originalUrl: string;

  shortUrl: string;

  clicks: number;

  devices: InfoCount;

  os: InfoCount;

  browsers: InfoCount;
  activeHours: InfoCount;
  dates: InfoCount;
}
