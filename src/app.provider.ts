import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UrlShortner } from './schemas/UrlShortner.schema';
import { Model } from 'mongoose';
import { UrlShortnerService } from './urlShortner/urlShortner.service';
import { DeviceInfo } from './lib/types';

@Injectable()
export class AppProvider {
  constructor(private urlShortnerService: UrlShortnerService ,) {}

  async getOriginalUrl(shortUrl: string,structuredDeviceInfo:DeviceInfo): Promise<string | null> {
    // return (await this.urlShortnerModal.findOne({ shortUrl }).exec()).originalUrl;
    return await this.urlShortnerService.getOriginalUrl(shortUrl,structuredDeviceInfo);
  }
}
